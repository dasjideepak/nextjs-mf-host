import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hostRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(hostRoot, "..");

const SOURCE_DIRS = [
  path.join(repoRoot, "remote1", "src"),
  path.join(repoRoot, "remote2", "src"),
];

const OUTPUT_FILE = path.join(hostRoot, "src", "styles", "remote-safelist.txt");
const CODE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

const STATIC_CLASSNAME_REGEX = [
  /className\s*=\s*"([^"]*)"/g,
  /className\s*=\s*'([^']*)'/g,
  /className\s*=\s*\{`([\s\S]*?)`\}/g,
];

const SIMPLE_TAILWIND_TOKENS = new Set([
  "flex",
  "grid",
  "hidden",
  "block",
  "inline-flex",
  "sticky",
  "truncate",
  "capitalize",
  "relative",
  "absolute",
  "fixed",
  "static",
  "container",
]);

async function collectFiles(dirPath) {
  const files = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }
    if (CODE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function isLikelyTailwindToken(token) {
  if (!token) return false;
  if (token.includes("${")) return false;
  if (token.startsWith("http://") || token.startsWith("https://")) return false;
  if (!/^[A-Za-z0-9!_:\-[\]/().%]+$/.test(token)) return false;
  if (SIMPLE_TAILWIND_TOKENS.has(token)) return true;

  return (
    token.includes("-") ||
    token.includes(":") ||
    token.includes("[") ||
    token.includes("]")
  );
}

function addTokensFromClassString(classString, tokens) {
  for (const token of classString.split(/\s+/)) {
    const trimmed = token.trim();
    if (isLikelyTailwindToken(trimmed)) {
      tokens.add(trimmed);
    }
  }
}

function extractTokensFromTemplateLiteral(templateLiteral, tokens) {
  const interpolationMatches = [...templateLiteral.matchAll(/\$\{([\s\S]*?)\}/g)];

  for (const match of interpolationMatches) {
    const expression = match[1];
    for (const quoted of expression.matchAll(/"([^"]+)"|'([^']+)'/g)) {
      const classCandidate = quoted[1] ?? quoted[2];
      if (classCandidate) {
        addTokensFromClassString(classCandidate, tokens);
      }
    }
  }

  const staticOnly = templateLiteral.replace(/\$\{[\s\S]*?\}/g, " ");
  addTokensFromClassString(staticOnly, tokens);
}

function extractTokensFromFile(content, tokens) {
  for (const regex of STATIC_CLASSNAME_REGEX) {
    const matches = content.matchAll(regex);
    for (const match of matches) {
      const classValue = match[1];
      if (!classValue) continue;

      if (regex === STATIC_CLASSNAME_REGEX[2]) {
        extractTokensFromTemplateLiteral(classValue, tokens);
      } else {
        addTokensFromClassString(classValue, tokens);
      }
    }
  }
}

async function main() {
  const tokens = new Set();

  for (const sourceDir of SOURCE_DIRS) {
    const files = await collectFiles(sourceDir);
    for (const filePath of files) {
      const content = await fs.readFile(filePath, "utf8");
      extractTokensFromFile(content, tokens);
    }
  }

  const output = `${[...tokens].sort().join("\n")}\n`;
  await fs.writeFile(OUTPUT_FILE, output, "utf8");
  process.stdout.write(
    `Generated ${path.relative(hostRoot, OUTPUT_FILE)} with ${tokens.size} classes.\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
