
import os
import re
import requests
from urllib.parse import unquote

# Configuration
SUPABASE_BASE = "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/"
TARGET_DIR = "public/images"
PROJECT_ROOT = "."

def download_images():
    if not os.path.exists(TARGET_DIR):
        os.makedirs(TARGET_DIR)
        
    print("Scraping Supabase URLs...")
    pattern = re.compile(rf"{re.escape(SUPABASE_BASE)}\S+")
    
    unique_urls = set()
    for root, dirs, files in os.walk(PROJECT_ROOT):
        # Skip node_modules and .git
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if '.git' in dirs: dirs.remove('.git')
        if 'dist' in dirs: dirs.remove('dist')
            
        for name in files:
            if name.endswith(('.sql', '.js', '.tsx', '.ts', '.json', '.html', '.md')):
                path = os.path.join(root, name)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = unquote(f.read())
                        found = pattern.findall(content)
                        for url in found:
                            # Clean up trailing characters like ", ', ), ; etc
                            clean_url = url.split('"')[0].split("'")[0].split(")")[0].split(";")[0]
                            unique_urls.add(clean_url)
                except Exception as e:
                    pass

    print(f"Found {len(unique_urls)} unique Supabase URLs.")
    
    mapping = {}
    for url in unique_urls:
        filename = unquote(url.split("/")[-1])
        # Sanitize filename (remove spaces, etc)
        filename = re.sub(r'[^a-zA-Z0-9._-]', '_', filename)
        
        target_path = os.path.join(TARGET_DIR, filename)
        
        if os.path.exists(target_path):
            print(f"Skipping (already exists): {filename}")
            mapping[url] = f"/images/{filename}"
            continue
            
        print(f"Downloading {url}...")
        try:
            r = requests.get(url, timeout=10)
            if r.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(r.content)
                mapping[url] = f"/images/{filename}"
                print(f"Saved to {target_path}")
            else:
                print(f"Failed (Store error {r.status_code}): {url}")
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            
    return mapping

def replace_in_files(mapping):
    print("Updating project files with local paths...")
    for root, dirs, files in os.walk(PROJECT_ROOT):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if '.git' in dirs: dirs.remove('.git')
            
        for name in files:
            if name.endswith(('.sql', '.js', '.tsx', '.ts', '.json', '.html', '.md')):
                if name == "rescue_assets.py": continue
                
                path = os.path.join(root, name)
                updated = False
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    new_content = unquote(content) # Decode URL encoding first to match
                    for old_url, new_path in mapping.items():
                        if old_url in new_content:
                            new_content = new_content.replace(old_url, new_path)
                            updated = True
                            
                    if updated:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {path}")
                except Exception as e:
                    pass

if __name__ == "__main__":
    url_mapping = download_images()
    if url_mapping:
        replace_in_files(url_mapping)
    print("Migration complete! All Supabase storage assets are now hosted locally in /public/images/")
