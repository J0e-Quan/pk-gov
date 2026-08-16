#!/usr/bin/env bash
set -euo pipefail

TARGET_DOMAIN="https://pk-gov.onrender.com"
DOMAIN_NAME="${TARGET_DOMAIN#https://}"
SITEMAP_FILE="public/sitemap.xml"

echo "==> Step 1: Discovering page URLs..."
# Crawl site, extract URLs, and filter out static assets
wget --spider --recursive --no-verbose --domains="${DOMAIN_NAME}" "$TARGET_DOMAIN" 2>&1 \
  | grep -oE 'https?://[a-zA-Z0-9./_-]+' \
  | grep -vE '\.(png|jpg|jpeg|gif|svg|ico|webp|zip|css|js|woff|woff2|ttf|eot|pdf|json|xml)$' \
  | sort -u > urls.txt

echo "Found $(wc -l < urls.txt) page URLs."

echo "==> Step 2: Generating sitemap.xml..."
mkdir -p public
cat <<EOF > "$SITEMAP_FILE"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

while read -r url; do
  echo "  <url><loc>${url}</loc></url>" >> "$SITEMAP_FILE"
done < urls.txt

echo "</urlset>" >> "$SITEMAP_FILE"
echo "Sitemap generated at $SITEMAP_FILE"

echo "==> Step 3: Submitting pages to Wayback Machine..."
while read -r url; do
  echo "Archiving: $url"
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://web.archive.org/save/$url")
  
  if [ "$status" -eq 200 ] || [ "$status" -eq 302 ]; then
    echo "  [SUCCESS] Status $status"
  else
    echo "  [FAILED] Status $status"
  fi

  # 6-second pause to prevent hitting rate limits
  sleep 6
done < urls.txt

echo "==> Done!"