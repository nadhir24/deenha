import requests
from bs4 import BeautifulSoup
import os
import re
from urllib.parse import urljoin, urlparse
import time

# Create directory for scraped images
OUTPUT_DIR = "scraped_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Headers to mimic browser
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

BASE_URL = "https://deenha.co.id"

# Pages to scrape
PAGES = [
    "/",
    "/shop",
    "/new-arrival",
    "/best-seller",
    "/about"
]

def extract_images_from_html(html, base_url):
    """Extract all image URLs from HTML content"""
    soup = BeautifulSoup(html, 'html.parser')
    images = set()
    
    # Find all img tags
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
        if src:
            full_url = urljoin(base_url, src)
            images.add(full_url)
        
        # Check srcset
        srcset = img.get('srcset')
        if srcset:
            for item in srcset.split(','):
                url = item.strip().split(' ')[0]
                if url:
                    full_url = urljoin(base_url, url)
                    images.add(full_url)
    
    # Find background images in style attributes
    for element in soup.find_all(style=True):
        style = element.get('style', '')
        urls = re.findall(r'url\(["\']?([^)"\']+)["\']?\)', style)
        for url in urls:
            full_url = urljoin(base_url, url)
            images.add(full_url)
    
    # Find images in inline styles
    for style in soup.find_all('style'):
        if style.string:
            urls = re.findall(r'url\(["\']?([^)"\']+)["\']?\)', style.string)
            for url in urls:
                full_url = urljoin(base_url, url)
                images.add(full_url)
    
    # Find picture sources
    for source in soup.find_all('source'):
        srcset = source.get('srcset')
        if srcset:
            for item in srcset.split(','):
                url = item.strip().split(' ')[0]
                if url:
                    full_url = urljoin(base_url, url)
                    images.add(full_url)
    
    # Filter only valid image URLs
    valid_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif')
    filtered_images = set()
    for img_url in images:
        parsed = urlparse(img_url)
        path_lower = parsed.path.lower()
        if any(path_lower.endswith(ext) for ext in valid_extensions):
            filtered_images.add(img_url)
        elif 'image' in img_url.lower() or 'img' in img_url.lower():
            filtered_images.add(img_url)
    
    return filtered_images

def download_image(url, folder):
    """Download a single image"""
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code == 200:
            # Get filename from URL
            parsed = urlparse(url)
            filename = os.path.basename(parsed.path)
            if not filename or '.' not in filename:
                # Generate filename based on URL hash
                filename = f"image_{hash(url) % 10000}.jpg"
            
            # Clean filename
            filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
            filepath = os.path.join(folder, filename)
            
            # Avoid duplicates
            if os.path.exists(filepath):
                base, ext = os.path.splitext(filename)
                filepath = os.path.join(folder, f"{base}_{hash(url) % 1000}{ext}")
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"✓ Downloaded: {filename}")
            return True
    except Exception as e:
        print(f"✗ Failed to download {url}: {e}")
    return False

def main():
    all_images = set()
    
    print("=" * 60)
    print("DEENHA.CO.ID IMAGE SCRAPER")
    print("=" * 60)
    
    # Scrape each page
    for page in PAGES:
        url = BASE_URL + page
        print(f"\n📄 Scraping: {url}")
        
        try:
            response = requests.get(url, headers=HEADERS, timeout=30)
            if response.status_code == 200:
                images = extract_images_from_html(response.text, url)
                print(f"   Found {len(images)} images")
                all_images.update(images)
            else:
                print(f"   Failed: Status {response.status_code}")
        except Exception as e:
            print(f"   Error: {e}")
        
        time.sleep(1)  # Be polite
    
    print(f"\n{'=' * 60}")
    print(f"Total unique images found: {len(all_images)}")
    print("=" * 60)
    
    # Print all found image URLs
    print("\n📷 Image URLs found:")
    for i, img in enumerate(sorted(all_images), 1):
        print(f"  {i}. {img}")
    
    # Download images
    if all_images:
        print(f"\n📥 Downloading images to '{OUTPUT_DIR}' folder...")
        downloaded = 0
        for img_url in all_images:
            if download_image(img_url, OUTPUT_DIR):
                downloaded += 1
            time.sleep(0.5)  # Rate limiting
        
        print(f"\n✅ Successfully downloaded {downloaded}/{len(all_images)} images")
    else:
        print("\n⚠️ No images found. The website might use JavaScript rendering.")
        print("   Try using Selenium or Playwright for dynamic content.")

if __name__ == "__main__":
    main()
