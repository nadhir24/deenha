import requests
from bs4 import BeautifulSoup
import json
import re

def inspect_requests():
    url = 'https://www.tokopedia.com/deenha/product'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://www.tokopedia.com/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
    }
    
    session = requests.Session()
    
    print(f"Fetching {url}...")
    try:
        response = session.get(url, headers=headers, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response size: {len(response.text)} chars")
        
        if response.status_code == 200:
            with open('tokopedia_requests.html', 'w', encoding='utf-8') as f:
                f.write(response.text)
            print("✓ Saved HTML to tokopedia_requests.html")
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check for product cards
            products = soup.find_all('div', {'data-testid': 'master-product-card'})
            print(f"✓ Found {len(products)} products via data-testid")
            
            # Look for Apollo/GraphQL state
            apollo_data = None
            scripts = soup.find_all('script')
            for script in scripts:
                if script.string:
                    # Check for __NEXT_DATA__
                    if '__NEXT_DATA__' in script.string:
                        print("✓ Found __NEXT_DATA__ (Next.js data)")
                        try:
                            match = re.search(r'__NEXT_DATA__\s*=\s*({.+?})\s*</script>', script.string, re.DOTALL)
                            if match:
                                next_data = json.loads(match.group(1))
                                with open('tokopedia_next_data.json', 'w', encoding='utf-8') as f:
                                    json.dump(next_data, f, indent=2, ensure_ascii=False)
                                print("✓ Saved Next.js data to tokopedia_next_data.json")
                        except Exception as e:
                            print(f"  Error parsing Next.js data: {e}")
                    
                    # Check for Apollo state
                    if '__APOLLO_STATE__' in script.string or 'window.__apolloState' in script.string:
                        print("✓ Found Apollo State (GraphQL cache)")
                        
            print("\n--- Summary ---")
            print(f"Status: {response.status_code}")
            print(f"Products found: {len(products)}")
            print(f"Total scripts: {len(scripts)}")
            
        else:
            print(f"✗ Failed with status {response.status_code}")
            
    except requests.exceptions.Timeout:
        print("✗ Request timed out")
    except requests.exceptions.ConnectionError:
        print("✗ Connection error")
    except Exception as e:
        print(f"✗ Error: {e}")

if __name__ == "__main__":
    inspect_requests()