#!/usr/bin/env python3
"""Extract Instagram post thumbnail URLs from public post pages using og:image meta tag."""

import requests
import re
import time
import sys

urls = [
    "https://www.instagram.com/p/DUS3CqAASqn/",
    "https://www.instagram.com/p/DULpUtgktmX/",
    "https://www.instagram.com/p/DSZaBWSk7QF/",
    "https://www.instagram.com/p/DKboZc1zJ13/",
    "https://www.instagram.com/p/DSUfzZEE6CN/",
    "https://www.instagram.com/p/DSHVo4yk2F4/"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

# Instagram rate-limits aggressively — use delays between requests
DELAY_SECONDS = 2
MAX_RETRIES = 2

def extract_og_image(url: str) -> dict:
    """Extract og:image from an Instagram post page. Retries once on failure."""
    for attempt in range(MAX_RETRIES + 1):
        try:
            response = requests.get(url, headers=headers, timeout=15)
            response.raise_for_status()

            # Instagram embeds og:image in a <meta property="og:image" content="...">
            match = re.search(
                r'<meta\s+property="og:image"\s+content="([^"]+)"',
                response.text,
                re.IGNORECASE
            )
            if match:
                return {"url": url, "img": match.group(1)}

            # Fallback: try twitter:image
            match = re.search(
                r'<meta\s+name="twitter:image"\s+content="([^"]+)"',
                response.text,
                re.IGNORECASE
            )
            if match:
                return {"url": url, "img": match.group(1)}

            return {"url": url, "img": None, "note": "no og:image or twitter:image found"}

        except requests.exceptions.RequestException as e:
            if attempt < MAX_RETRIES:
                print(f"Retry {attempt + 1} for {url}: {e}", file=sys.stderr)
                time.sleep(2)
            else:
                return {"url": url, "error": str(e)}

    return {"url": url, "error": "max retries exceeded"}


def main():
    results = []
    for i, url in enumerate(urls):
        if i > 0:
            time.sleep(DELAY_SECONDS)
        print(f"Fetching {url}...", file=sys.stderr)
        results.append(extract_og_image(url))

    for res in results:
        print(res)


if __name__ == "__main__":
    main()
