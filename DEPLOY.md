# Deploying Calis10x to Vercel

1. Extract this ZIP and upload the `calis10x` folder contents to a new GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository.
3. Settings (Vercel usually detects these automatically):
   - Framework preset: **Other**
   - Install command: `bun install`
   - Build command: `bun run build`
   - Output directory: leave empty (the build writes `.vercel/output` itself)
4. Click **Deploy**.

No environment variables are needed yet — this stage has no backend.
When accounts and the database are added (Stage 2), the required variables will be listed here.

## Run locally

```
bun install
bun run dev      # http://localhost:8080
bun run build    # production build
```

Note: use `bun`, not `npm install` (npm fails on this dependency tree).
