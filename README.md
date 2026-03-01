# Next.js Module Federation Host

This project is the **host** app for a Next.js Module Federation setup using `@module-federation/nextjs-mf`.

The host loads one role-selected remote application:

- `remote1/DashboardShell` (customer)
- `remote2/DashboardShell` (admin)

## Strict Rules (Must Follow)

These rules are mandatory for this app:

- **Node.js**: Use only Node **18** or **20** (LTS).
- **Next.js version**: Keep Next.js at **15.x**. Do **not** upgrade beyond v15.
- **React version**: Keep **React and ReactDOM on 18.x** (current setup: `18.2.0`) and keep both versions aligned.
- **Bundler mode**: Use **Webpack mode only** (no Turbopack). Keep `NEXT_PRIVATE_LOCAL_WEBPACK=true` in scripts.
- **Routing system**: Keep this app on the **Pages Router**. Do not migrate this app to App Router.
- **Federation sharing**: Configure shared packages correctly (especially **React/ReactDOM as singletons**) to avoid duplicate runtimes.
- **Remote contract discipline**: Version remote changes carefully and keep host/remote APIs backward-compatible.
- **Failure handling**: Always provide fallback UI/error handling when a remote fails to load.

Current baseline in this app:

- `next`: `15.3.8`
- `react`: `18.2.0`
- `react-dom`: `18.2.0`
- `@module-federation/nextjs-mf`: `^8.8.56`

## Local Development

1. Install dependencies:

```bash
npm install
```

## Using private GitHub Packages

This app installs `@dasjideepak/*` packages from GitHub Packages and requires auth.

### 1) Generate a GitHub token

Create a Personal Access Token (classic):

1. GitHub -> `Settings` -> `Developer settings` -> `Personal access tokens` -> `Tokens (classic)`
2. Click `Generate new token (classic)`
3. Select scopes:
   - `read:packages` (required to install private packages)
   - `repo` (required when package/repository is private)
   - `write:packages` (only needed for publishing)
4. Copy and store the token securely.

### 2) Configure local auth

This repo expects:

- `GITHUB_PACKAGES_TOKEN`

This app's `.npmrc` uses it:

```ini
@dasjideepak:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

Set token before install:

```bash
export GITHUB_PACKAGES_TOKEN=ghp_xxx_your_token_here
npm install
```

### 3) Configure in Vercel

In Vercel project settings for `host`:

1. Go to `Settings` -> `Environment Variables`
2. Add `GITHUB_PACKAGES_TOKEN`
3. Apply to `Production`, `Preview`, and `Development` as needed
4. Redeploy to apply changes

### 4) Security notes

- Never commit tokens to Git.
- Rotate token immediately if exposed.
- Use least privilege (`read:packages` + `repo` for consumers).

2. Make sure both remote apps are running on `3001` and `3002`.

3. Start the host:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Scripts

- `npm run dev` - run development server with local webpack federation support.
- `npm run build` - create production build with federation support.
- `npm run start` - run production server.
- `npm run lint` - run ESLint.

## Federation Configuration

Federation is configured in `next.config.ts`:

- Host name: `host`
- Remote entry output: `static/chunks/remoteEntry.js`
- Remote entries:
  - `remote1@http://localhost:3001/_next/static/{ssr|chunks}/remoteEntry.js`
  - `remote2@http://localhost:3002/_next/static/{ssr|chunks}/remoteEntry.js`

The host page imports remotes dynamically in `src/pages/index.tsx` with `ssr: false`.
