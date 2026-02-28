# Next.js Module Federation Host

This project is the **host** app for a Next.js Module Federation setup using `@module-federation/nextjs-mf`.

The host loads two remote applications:
- `remote1/DashboardApp`
- `remote2/DashboardApp`

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
