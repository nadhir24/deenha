from playwright.sync_api import sync_playwright
import time
import os
import re
import json
from datetime import datetime

def log(msg):
    timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
    print(f"[{timestamp}] {msg}")

def sanitize_filename(name):
    return re.sub(r'[<>:"/\\|?*]', '_', name)[:100]

def get_hd_shopee_image(img_url):
    hd_url = img_url.replace('_tn', '')
    hd_url = re.sub(r'_\d+x\d+', '', hd_url)
    hd_url = hd_url.split('?')[0]
    if 'shopee' in hd_url or 'susercontent' in hd_url:
        if '.' in hd_url:
            parts = hd_url.rsplit('.', 1)
            hd_url = f"{parts[0]}_2048x2048.{parts[1]}"
    return hd_url

def scrape_shopee_with_chrome_profile():
    log("=" * 70)
    log("🚀 SHOPEE SCRAPER - NADHIR456 MODE")
    log("=" * 70)
    
    # Konfigurasi Path Chrome Profile
    # Secara otomatis mengambil path lokal AppData Windows
    user_data_dir = os.path.join(os.environ['LOCALAPPDATA'], 'Google/Chrome/User Data')
    profile_name = "Profile 1" # Nadhir456
    
    product_links = [
        "https://shopee.co.id/Hijab-Arabic-Pattern-Voal-Premium-Ultrafine-Laser-Cut-Jahit-Tepi-120-x-120-cm-i.223652722.12116792683",
        "https://shopee.co.id/Hijab-Gradasi-Monogram-Logo-DEENHA-Voal-Ultrafine-Premium-120-x-120-cm-i.223652722.14368718618",
        "https://shopee.co.id/PROMO-DEENHA-Sajadah-Travelling-Printing-Lipat-ukuran-Standar-dan-Kecil-i.223652722.11108933738",
        "https://shopee.co.id/Batik-Parang-Hijab-Printing-Voal-Premium-Ultrafine-120-x-120-cm-i.223652722.16935950405",
        "https://shopee.co.id/Mukena-Deenha-Gradasi-Prayset-Silky-Premium-Material-Design-Purple-Pink-Blue-Yellow-i.223652722.40203586309",
        "https://shopee.co.id/Mukena-Deenha-Armani-Silk-Premium-Sage-Pink-Navy-Jombo-Size-i.223652722.42153745798",
        "https://shopee.co.id/Batik-Kawung-Jawa-Tengah-Hijab-Voal-Ultrafine-Premium-Segi-Empat-by-DEENHA-i.223652722.12216788817",
        "https://shopee.co.id/Flowers-Painting-Hijab-Warna-Pastel-Segiempat-Voal-Premium-Ultrafine-i.223652722.8667124215",
        "https://shopee.co.id/Istanbul-Sketsa-City-View-Turkey-Voal-Ultrafine-Segiempat-120-x-120-cm-i.223652722.8258303274",
        "https://shopee.co.id/Hijab-Chain-Series-Ultrafine-Voal-Premium-Size-120-x-120-cm-by-deenha-i.223652722.7290203089",
        "https://shopee.co.id/Bergo-Hijab-Instan-Nyaman-Dipakai-Daily-Warna-Pastel-Crinkle-Premium-Hanara-Series-i.223652722.19886298904",
        "https://shopee.co.id/Bergo-Hijab-Instan-Premium-Tidak-Nerawang-Nyaman-Di-Pakai-Basic-Series-i.223652722.17999264402",
        "https://shopee.co.id/Promo-Hampers-Mukena-Silky-Premium-Box-i.223652722.5586982327",
        "https://shopee.co.id/DEENHA-HAMPERS-BOX-i.223652722.25768408087",
        "https://shopee.co.id/Istanbul-Galata-Hagia-Sophia-Blue-Mosque-Sketsa-Hijab-Segiempat-Voal-Ultrafine-i.223652722.14639037873",
        "https://shopee.co.id/Hijab-Japan-Monogram-Voal-Ultrafine-Premium-120-x-120-cm-Segiempat-i.223652722.9451810569",
        "https://shopee.co.id/Bromo-Series-Hijab-Segiempat-Voal-Ultrafine-Premium-120-x-120-cm-i.223652722.11752850863",
        "https://shopee.co.id/Mesjid-Nabawi-Madinah-Hijab-Umroh-Haji-Segiempat-Voal-Premium-Ultrafine-120-x-120-cm-i.223652722.23483580386",
        "https://shopee.co.id/Citra-Kirana-Voal-Ultrafine-Premium-Design-2-Warna-dalam-1-Hijab-i.223652722.12370447300",
        "https://shopee.co.id/Mukena-Umroh-Haji-Putih-Broken-White-Premium-Renda-Prayset-Mukena-Nyaman-i.223652722.20184182694",
        "https://shopee.co.id/Deenha-Hijab-Watermelon-Series-Ultrafine-Printing-120-x-120-cm-i.223652722.23961915469",
        "https://shopee.co.id/Mukena-Tulip-Full-printing-Premium-Silky-Bahan-Adem-by-DEENHA-i.223652722.26737460954",
        "https://shopee.co.id/Promo-Hijab-Printing-Jumbo-Syari-size-140-x-140-cm-Voal-Premium-i.223652722.25922248304",
        "https://shopee.co.id/Blooming-Flowers-Hijab-Segiempat-Premium-Voal-Ultrafine-Premium-i.223652722.8194411133",
        "https://shopee.co.id/Mukena-Printing-Pink-Remaja-Dewasa-Delisha-Series-i.223652722.14578689068",
        "https://shopee.co.id/Mukena-Alat-Solat-Printing-Premium-Silky-Toile-The-Joul-Navy-Hitam-Pink-White-Blue-i.223652722.23771743237",
        "https://shopee.co.id/Mukena-Monogram-Printing-Sage-Blue-Pink-Brown-Bunga-Warna-Pastel-i.223652722.40903470793",
        "https://shopee.co.id/Batik-Songket-Hijab-Sumatra-Lombok-Palembang-Segiempat-Ultrafine-Premium-Voal-i.223652722.12284812414",
        "https://shopee.co.id/Mukena-Deenha-Turkish-Pattern-Printing-Premium-Silky-i.223652722.29716067914",
        "https://shopee.co.id/Batik-Lombok-Sejauh-Mata-Memandang-Hijab-Ultrafine-Voal-Segiempat-120-x-120-cm-i.223652722.25766019788",
        "https://shopee.co.id/Hijab-Mandala-Voal-Ultrafine-Premium-120-x-120-cm-Segiempat-i.223652722.9460300847",
        "https://shopee.co.id/Deenha-Dress-Syari-Silk-i.223652722.3691902975",
        "https://shopee.co.id/Cairo-Muhammad-Ali-Mosque-Hijab-Ultrafine-Voal-Printing-120-x-120-cm-i.223652722.11202051911",
        "https://shopee.co.id/Tas-Goni-Totebag-Deenha-i.223652722.17806904898",
        "https://shopee.co.id/Hampers-Mukena-Premium-Box-i.223652722.25269742834",
        "https://shopee.co.id/DEFECT-SALE-DEENHA-Sarung-Tenun-Salur-Modern-Majalaya-Hitam-i.223652722.14824247218",
        "https://shopee.co.id/Deenha-Dress-Pink-Kalse-i.223652722.10322247014"
    ]
    
    output_folder = "shopee_deenha_products"
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    with sync_playwright() as p:
        log(f"🌐 Launching Chrome with Profile: {profile_name}...")
        
        # Menggunakan Persistent Context untuk akses login/cookies Profile 1
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            channel="chrome",  # Memaksa menggunakan aplikasi Chrome asli
            headless=False,
            args=[f"--profile-directory={profile_name}", "--disable-blink-features=AutomationControlled"],
            viewport={'width': 1366, 'height': 768}
        )
        
        page = context.pages[0] if context.pages else context.new_page()
        
        log("✅ Profile Loaded. Starting Scraping...")
        
        success = 0
        errors = 0
        
        for idx, product_url in enumerate(product_links, 1):
            log(f"\n{'='*70}")
            log(f"[{idx}/{len(product_links)}] Processing Product...")
            log('='*70)
            
            try:
                page.goto(product_url, wait_until='domcontentloaded', timeout=60000)
                
                # Cek jika ada verifikasi manual
                if "verify" in page.url or "captcha" in page.url:
                    log("⚠️  Selesaikan verifikasi di browser!")
                    time.sleep(10) 
                
                time.sleep(4) 
                
                # Ambil Nama Produk
                product_name = page.evaluate("""
                    () => {
                        const selectors = [
                            'span[class*="WVZT"]',
                            'h1',
                            '[data-sqe="name"]',
                            '.product-briefing span',
                            'div[class*="product_name"]'
                        ];
                        for (const s of selectors) {
                            const el = document.querySelector(s);
                            if (el && el.textContent.trim()) return el.textContent.trim();
                        }
                        return null;
                    }
                """)
                
                product_name = sanitize_filename(product_name) if product_name else f"product_{idx}"
                log(f"📦 {product_name}")
                
                product_folder = os.path.join(output_folder, f"{idx:03d}_{product_name}")
                if not os.path.exists(product_folder):
                    os.makedirs(product_folder)
                
                # Ambil Harga
                price = page.evaluate("""
                    () => {
                        const selectors = [
                            '[class*="price"]',
                            '.pqf6-d',
                            'div[class*="product_price"]',
                            'span[class*="price"]'
                        ];
                        for (const s of selectors) {
                            const el = document.querySelector(s);
                            if (el && el.textContent.trim()) return el.textContent.trim();
                        }
                        return 'N/A';
                    }
                """)
                log(f"💰 {price}")
                
                # Ambil Gambar
                images = page.evaluate("""
                    () => {
                        const imgs = new Set();
                        document.querySelectorAll('img').forEach(img => {
                            const src = img.src || img.getAttribute('data-src');
                            if (src && (src.includes('shopee') || src.includes('susercontent'))) {
                                if (!src.includes('avatar') && !src.includes('icon')) imgs.add(src);
                            }
                        });
                        return Array.from(imgs);
                    }
                """)
                
                downloaded = 0
                for img_idx, img_url in enumerate(images, 1):
                    try:
                        hd_url = get_hd_shopee_image(img_url)
                        # Gunakan context.request agar tetap dalam sesi profile yang sama
                        response = context.request.get(hd_url, timeout=10000)
                        if response.status == 200:
                            img_path = os.path.join(product_folder, f"img_{img_idx:02d}.jpg")
                            with open(img_path, 'wb') as f:
                                f.write(response.body())
                            downloaded += 1
                    except:
                        continue
                
                # Simpan JSON
                with open(os.path.join(product_folder, 'info.json'), 'w', encoding='utf-8') as f:
                    json.dump({'name': product_name, 'price': price, 'url': product_url, 'images': downloaded}, f, indent=2)
                
                log(f"✅ Success: {downloaded} images saved")
                success += 1
                
            except Exception as e:
                log(f"❌ Error: {str(e)[:50]}")
                errors += 1
            
            time.sleep(2) # Delay antar produk agar tidak kena ban
            
        log("\n" + "=" * 70)
        log(f"COMPLETED! Success: {success} | Errors: {errors}")
        context.close()

if __name__ == "__main__":
    scrape_shopee_with_chrome_profile()