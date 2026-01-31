import json
import re
from bs4 import BeautifulSoup

def parse_local_html():
    try:
        with open('tokopedia_requests.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Method 1: Try to parse from window.__cache (JSON data)
        print("Attempting to parse JSON data from window.__cache...")
        scripts = soup.find_all('script')
        product_data = []
        
        for script in scripts:
            if script.string and 'window.__cache' in script.string:
                # Extract the JSON object
                match = re.search(r'window\.__cache\s*=\s*({.*});', script.string)
                if match:
                    json_str = match.group(1)
                    try:
                        data = json.loads(json_str)
                        # Navigate to GetShopProduct
                        for key, value in data.items():
                            if 'GetShopProduct' in key and 'result' in value:
                                products = value.get('result', [])
                                print(f"Found {len(products)} products in JSON cache.")
                                
                                for p in products:
                                    # The structure might vary, let's inspect one if possible or try standard fields
                                    # Note: In the dump, the cache keys are complex. 
                                    # Let's look for lists of products.
                                    pass
                                    
                        # Alternative: Look for the specific key structure from the dump
                        # "$ROOT_QUERY.GetShopProduct(...)"
                        
                    except json.JSONDecodeError:
                        print("Failed to decode JSON")
        
        # Method 2: Parse HTML directly (Fallback and often easier if classes are stable-ish)
        # Based on the dump, products are in div.css-79elbk inside the grid
        print("\nAttempting to parse HTML structure...")
        products = []
        
        # The grid container seems to be css-tjjb18 (based on the dump view)
        # But classes change. Let's look for anchors with product links
        
        # Find all links that look like product links
        links = soup.find_all('a', href=True)
        for link in links:
            href = link['href']
            if '/deenha/' in href and 'whid=' in href: # pattern seen in dump
                # This is likely a product card
                name_elem = link.find('div', {'class': lambda x: x and 'SzILjt' in x}) # partial match from dump
                # Or just find the text in the first span/div
                
                # Let's try a more generic approach for the card
                # The card usually has an image, a name, and a price
                
                # Name is usually in a specific container. In the dump: 
                # <span class="+tnoqZhn89+NHUA43BpiJg==">Deenha Mukena Turkish Pattern Blue</span>
                
                # Price: Rp645.000
                
                card_text = link.get_text(separator='|', strip=True)
                # Deenha Mukena Turkish Pattern Blue|Rp645.000|Rp999.000
                
                parts = card_text.split('|')
                if len(parts) >= 2:
                    name = parts[0]
                    price = parts[1]
                    img_tag = link.find('img')
                    img_url = img_tag['src'] if img_tag else "No Image"
                    
                    products.append({
                        'name': name,
                        'price': price,
                        'link': href,
                        'image': img_url
                    })

        # Remove duplicates
        unique_products = {p['link']: p for p in products}.values()
        
        print(f"Extracted {len(unique_products)} unique products from HTML.")
        
        # Categorization Logic
        categorized = {}
        for p in unique_products:
            name_lower = p['name'].lower()
            category = 'Lainnya'
            
            if 'mukena' in name_lower:
                category = 'Mukena'
            elif 'hijab' in name_lower or 'voal' in name_lower or 'scarf' in name_lower or 'pashmina' in name_lower:
                category = 'Hijab/Scarf'
            elif 'dress' in name_lower or 'gamis' in name_lower:
                category = 'Dress'
            elif 'tas' in name_lower:
                category = 'Tas'
            elif 'sajadah' in name_lower:
                category = 'Sajadah'
                
            if category not in categorized:
                categorized[category] = []
            categorized[category].append(p)
            
        # Output results
        for cat, items in categorized.items():
            print(f"\nCategory: {cat} ({len(items)} items)")
            for item in items[:3]: # Show top 3
                print(f"  - {item['name']} ({item['price']})")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    parse_local_html()
