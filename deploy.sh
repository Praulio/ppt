#!/usr/bin/env bash
# Publica el sitio en Cloudflare Pages (https://deusvult.pages.dev). Uso: ./deploy.sh
# Arma una carpeta limpia (sin _gen, _review, guías .md ni variantes de prueba) y la sube con wrangler.
# Credenciales: CLOUDFLARE_API_TOKEN de ~/.zshenv (nunca wrangler login).
set -euo pipefail
cd "$(dirname "$0")"
source ~/.zshenv 2>/dev/null || true
: "${CLOUDFLARE_API_TOKEN:?falta CLOUDFLARE_API_TOKEN}"
export CLOUDFLARE_API_TOKEN
export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-$(curl -s -m 20 -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" https://api.cloudflare.com/client/v4/accounts | python3 -c 'import sys,json;print(json.load(sys.stdin)["result"][0]["id"])')}"
OUT="$(mktemp -d)"
EXC=(--exclude _gen --exclude _review --exclude '*.md' --exclude '*.py' --exclude __pycache__ --exclude .DS_Store)
rsync -a "${EXC[@]}" 00 01 03 music "$OUT"/
mkdir -p "$OUT/02" "$OUT/assets"
rsync -a "${EXC[@]}" 02/motion-b2 "$OUT/02/"
cp index.html favicon.ico favicon-*.png apple-touch-icon.png "$OUT"/
cp assets/cover0{1,2,3}.webp assets/dvl-bg.webp assets/dvl-christ.webp assets/dvl-star*.webp "$OUT/assets/"
cat > "$OUT/_headers" <<'H'
/music/*
  Cache-Control: public, max-age=31536000, immutable
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*/assets/*
  Cache-Control: public, max-age=31536000, immutable
H
npx --yes wrangler pages deploy "$OUT" --project-name deusvult --branch main --commit-dirty=true
rm -rf "$OUT"
