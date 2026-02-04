import requests
import re

urls = [
    "https://www.instagram.com/p/DUS3CqAASqn/",
    "https://www.instagram.com/p/DULpUtgktmX/",
    "https://www.instagram.com/p/DSZaBWSk7QF/",
    "https://www.instagram.com/p/DKboZc1zJ13/",
    "https://www.instagram.com/p/DSUfzZEE6CN/",
    "https://www.instagram.com/p/DSHVo4yk2F4/"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

results = []
for url in urls:
    try:
        response = requests.get(url, headers=headers, timeout=10)
        img_match = re.search(r'property="og:image" content="([^"]+)"', response.text)
        if img_match:
            results.append({"url": url, "img": img_match.group(1)})
        else:
            results.append({"url": url, "img": None})
    except Exception as e:
        results.append({"url": url, "error": str(e)})

for res in results:
    print(res)
