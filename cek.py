from bs4 import BeautifulSoup
import json
import re

def analyze_html():
    print("📖 Reading saved HTML...")
    with open('tokopedia_debug.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    print(f"✓ HTML size: {len(html):,} chars\n")
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Check for product cards
    print("🔍 Searching for products...")
    products = soup.find_all('div', {'data-testid': 'master-product-card'})
    print(f"   Products with data-testid: {len(products)}")
    
    # 2. Check for Next.js data
    print("\n🔍 Searching for Next.js data...")
    scripts = soup.find_all('script', {'id': '__NEXT_DATA__'})
    for script in scripts:
        if script.string:
            try:
                data = json.loads(script.string)
                print("   ✓ Found __NEXT_DATA__!")
                
                # Save to file
                with open('next_data.json', 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print("   ✓ Saved to: next_data.json")
                
                # Try to find product data
                data_str = json.dumps(data)
                if 'product' in data_str.lower():
                    print("   ✓ Contains product data!")
                if 'price' in data_str.lower():
                    print("   ✓ Contains price data!")
                    
            except Exception as e:
                print(f"   ✗ Error parsing: {e}")
    
    # 3. Check for Apollo/GraphQL state
    print("\n🔍 Searching for Apollo/GraphQL state...")
    for script in soup.find_all('script'):
        if script.string:
            if 'apolloState' in script.string or '__APOLLO_STATE__' in script.string:
                print("   ✓ Found Apollo state!")
                # Extract it
                try:
                    match = re.search(r'window\.__APOLLO_STATE__\s*=\s*({.+?});', script.string, re.DOTALL)
                    if match:
                        apollo_data = json.loads(match.group(1))
                        with open('apollo_state.json', 'w', encoding='utf-8') as f:
                            json.dump(apollo_data, f, indent=2, ensure_ascii=False)
                        print("   ✓ Saved to: apollo_state.json")
                except Exception as e:
                    print(f"   ⚠ Could not extract: {e}")
                break
    
    # 4. Look for any JSON-like structures
    print("\n🔍 Searching for other JSON data...")
    all_scripts = soup.find_all('script')
    print(f"   Total script tags: {len(all_scripts)}")
    
    json_scripts = 0
    for script in all_scripts:
        if script.string and '{' in script.string[:100]:
            json_scripts += 1
    print(f"   Scripts with JSON-like content: {json_scripts}")
    
    # 5. Check for product images
    print("\n🔍 Searching for product images...")
    imgs = soup.find_all('img')
    product_imgs = [img for img in imgs if img.get('src') and 'product' in img.get('src', '').lower()]
    print(f"   Total images: {len(imgs)}")
    print(f"   Product-related images: {len(product_imgs)}")
    
    # 6. Quick text search
    print("\n🔍 Text content analysis...")
    text = soup.get_text()
    if 'Rp' in text:
        prices = re.findall(r'Rp[\d.,]+', text)
        print(f"   ✓ Found {len(prices)} price mentions")
        if prices:
            print(f"   Examples: {prices[:3]}")
    
    print("\n" + "="*60)
    print("📊 SUMMARY")
    print("="*60)
    print(f"HTML successfully downloaded: ✓")
    print(f"Next.js data found: {'✓' if scripts else '✗'}")
    print(f"Product cards found: {len(products)}")
    print(f"Next step: Check the screenshot (tokopedia_debug.png)")
    print("="*60)

if __name__ == "__main__":
    analyze_html()