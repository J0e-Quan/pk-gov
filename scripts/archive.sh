#!/usr/bin/env bash
set -euo pipefail

TARGET_DOMAIN="https://pk-gov.onrender.com"
DOMAIN_NAME="${TARGET_DOMAIN#https://}"

echo "==> Step 1: Discovering page URLs..."
wget --spider --recursive --no-verbose --domains="${DOMAIN_NAME}" "$TARGET_DOMAIN" 2>&1 \
  | grep -oE 'https?://[a-zA-Z0-9./_-]+' \
  | grep -vE '\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|pdf|json|xml|zip)$' \
  | sed -E 's/#.*$//' \
  | sed -E 's|/index\.html$|/|' \
  | sed -E 's|/+$|/|' \
  | sort -u > urls.txt

echo "Found $(wc -l < urls.txt) page URLs."

echo "==> Step 2: Submitting pages to Wayback Machine..."
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