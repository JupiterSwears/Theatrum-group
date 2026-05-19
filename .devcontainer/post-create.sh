#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f hugo.toml ] && [ ! -f config.toml ] && [ ! -f hugo.yaml ] && [ ! -f config.yaml ]; then
  echo "Scaffolding Hugo site..."
  hugo new site . --force
fi

if [ ! -f package.json ]; then
  npm init -y
fi

if [ ! -d node_modules/tinacms ]; then
  echo "Installing TinaCMS..."
  npm install --save-dev tinacms @tinacms/cli
fi

if [ ! -d tina ]; then
  mkdir -p tina
  cat > tina/config.ts <<'EOF'
import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
EOF
fi

node - <<'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts.dev = pkg.scripts.dev || 'tinacms dev -c "hugo server -D --bind=0.0.0.0"';
pkg.scripts.build = pkg.scripts.build || 'tinacms build && hugo --minify';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
EOF

echo "Done. Run: npm run dev"
