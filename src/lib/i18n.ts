import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  id: {
    translation: {
      nav: {
        home: 'Beranda',
        shop: 'Koleksi',
        journal: 'Jurnal',
        about: 'Tentang Kami',
        contact: 'Kontak'
      },
      hero: {
        title: 'Fashion Muslimah Modern',
        subtitle: 'Elegan namun tetap Syar\'i',
        cta: 'Lihat Koleksi'
      },
      benefits: {
        delivery: { title: 'Pengiriman Global', desc: 'Kirim ke Seluruh Dunia' },
        exchange: { title: 'Tukar Mudah', desc: 'Garansi 7 Hari' },
        secure: { title: 'Pembayaran Aman', desc: 'Enkripsi SSL' },
        support: { title: 'Layanan Premium', desc: 'Bantuan 24/7' }
      },
      featured: {
        subtitle: 'Pilihan Terkurasi',
        title: 'Koleksi Unggulan',
        cta: 'Jelajahi Atelier'
      },
      product: {
        inventory: 'STATUS INVENTARIS',
        available: 'TERSEDIA DI ATELIER',
        outOfStock: 'STOK HABIS',
        addToCart: 'TAMBAHKAN KE KOLEKSI',
        description: 'DESKRIPSI',
        details: 'DETAIL & PERAWATAN',
        shipping: 'PENGIRIMAN & PENGEMBALIAN',
        related: 'PRODUK TERKAIT'
      },
      ramadan: {
        title: 'Selected',
        subtitle: 'Item',
        desc: "get 50 %* disc\njust contact our Customer Via Button WA",
        cta: 'HUBUNGI VIA WHATSAPP',
        whatsapp: 'CHAT VIA WHATSAPP',
        close: 'TAP UNTUK MENUTUP'
      },
      footer: {
        description: 'Menciptakan keanggunan bagi wanita modern yang menghargai tradisi.',
        shop: 'Belanja',
        support: 'Bantuan',
        company: 'Perusahaan',
        rights: '© 2026 DEENHA HIJAB. HAK CIPTA DILINDUNGI.',
        followUs: 'Ikuti Kami'
      },
      search: {
        placeholder: 'CARI KOLEKSI KAMI...',
        results: 'Produk yang cocok',
        noResults: 'Tidak ada produk yang ditemukan untuk',
        typeMore: 'Ketik minimal 3 karakter untuk mencari...'
      },
      language: {
        select: 'Pilih Bahasa'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        shop: 'The Atelier',
        journal: 'Journal',
        about: 'About',
        contact: 'Contact'
      },
      hero: {
        title: 'Modern Modest Fashion',
        subtitle: 'Elegant yet strictly Sharia compliant',
        cta: 'View Collection'
      },
      benefits: {
        delivery: { title: 'Global Delivery', desc: 'Shipping Worldwide' },
        exchange: { title: 'Easy Exchange', desc: '7 Day Return Policy' },
        secure: { title: 'Secure Checkout', desc: 'Encrypted Payments' },
        support: { title: 'Premium Support', desc: 'Dedicated Assistance' }
      },
      featured: {
        subtitle: 'Curated Selection',
        title: 'Featured Collection',
        cta: 'Explore The Atelier'
      },
      product: {
        inventory: 'INVENTORY STATUS',
        available: 'AVAILABLE IN ATELIER',
        outOfStock: 'OUT OF STOCK',
        addToCart: 'ADD TO DISCOVERY',
        description: 'DESCRIPTION',
        details: 'DETAILS & CARE',
        shipping: 'SHIPPING & RETURNS',
        related: 'RELATED PRODUCTS'
      },
      ramadan: {
        title: 'Selected',
        subtitle: 'Item',
        desc: "get 50 %* disc\njust contact our Customer Via Button WA",
        cta: 'CONTACT VIA WHATSAPP',
        whatsapp: 'CHAT VIA WHATSAPP',
        close: 'TAP TO CLOSE'
      },
      footer: {
        description: 'Crafting exquisite modesty for the modern woman who values elegance and tradition.',
        shop: 'Shop',
        support: 'Support',
        company: 'Company',
        rights: '© 2026 DEENHA HIJAB. ALL RIGHTS RESERVED.',
        followUs: 'Follow Us'
      },
      search: {
        placeholder: 'SEARCH THE ATELIER...',
        results: 'Matching Products',
        noResults: 'No products found for',
        typeMore: 'Type at least 3 characters to search...'
      },
      language: {
        select: 'Select Language'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        shop: "L'Atelier",
        journal: 'Journal',
        about: 'À Propos',
        contact: 'Contact'
      },
      hero: {
        title: 'Mode Pudique Moderne',
        subtitle: 'Élégant mais strictement conforme à la Charia',
        cta: 'Voir la Collection'
      },
      benefits: {
        delivery: { title: 'Livraison Mondiale', desc: 'Expédition dans le Monde Entier' },
        exchange: { title: 'Échange Facile', desc: 'Politique de Retour de 7 Jours' },
        secure: { title: 'Paiement Sécurisé', desc: 'Paiements Cryptés' },
        support: { title: 'Support Premium', desc: 'Assistance Dédiée' }
      },
      featured: {
        subtitle: 'Sélection Spéciale',
        title: 'Collection Vedette',
        cta: "Explorer L'Atelier"
      },
      product: {
        inventory: "ÉTAT DES STOCKS",
        available: "DISPONIBLE À L'ATELIER",
        outOfStock: 'RUPTURE DE STOCK',
        addToCart: 'AJOUTER À LA DÉCOUVERTE',
        description: 'DESCRIPTION',
        details: 'DÉTAILS ET ENTRETIEN',
        shipping: 'LIVRAISON ET RETOURS',
        related: 'PRODUITS CONNEXES'
      },
      ramadan: {
        title: 'Selected',
        subtitle: 'Item',
        desc: "get 50 %* disc\njust contact our Customer Via Button WA",
        cta: 'CONTACTER VIA WHATSAPP',
        whatsapp: 'CONTACTER VIA WHATSAPP',
        close: 'TAPPER POUR FERMER'
      },
      footer: {
        description: 'Créer une élégance modeste pour la femme moderne qui valorise la tradition.',
        shop: 'Boutique',
        support: 'Assistance',
        company: 'Entreprise',
        rights: '© 2026 DEENHA HIJAB. TOUS DROITS RÉSERVÉS.',
        followUs: 'Suivez-nous'
      },
      search: {
        placeholder: 'RECHERCHE DANS L\'ATELIER...',
        results: 'Produits Correspondants',
        noResults: 'Aucun produit trouvé pour',
        typeMore: 'Tapez au moins 3 caractères untuk rechercher...'
      },
      language: {
        select: 'Choisir la langue'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        shop: '工作室',
        journal: '日志',
        about: '关于我们',
        contact: '联系我们'
      },
      hero: {
        title: '现代端庄时尚',
        subtitle: '优雅但严格遵守伊斯兰教法',
        cta: '查看系列'
      },
      benefits: {
        delivery: { title: '全球配送', desc: '全球发货' },
        exchange: { title: '轻松换货', desc: '7天无理由退货' },
        secure: { title: '安全结账', desc: '加密支付' },
        support: { title: '优质服务', desc: '专属协助' }
      },
      featured: {
        subtitle: '精心挑选',
        title: '特色系列',
        cta: '探索工作室'
      },
      product: {
        inventory: '库存状态',
        available: '工作室有货',
        outOfStock: '缺货',
        addToCart: '添加到探索',
        description: '描述',
        details: '详情与保养',
        shipping: '配送与退货',
        related: '相关产品'
      },
      ramadan: {
        title: 'Selected',
        subtitle: 'Item',
        desc: "get 50 %* disc\njust contact our Customer Via Button WA",
        cta: '通过 WhatsApp 联系',
        whatsapp: '通过 WHATSAPP 聊天',
        close: '点击关闭'
      },
      footer: {
        description: '为重视优雅和传统的现代女性打造精致的端庄时尚。',
        shop: '商店',
        support: '支持',
        company: '公司',
        rights: '© 2026 DEENHA HIJAB. 版权所有。',
        followUs: '关注我们'
      },
      search: {
        placeholder: '搜索工作室...',
        results: '匹配的产品',
        noResults: '没有找到产品',
        typeMore: '输入至少 3 个字符进行搜索...'
      },
      language: {
        select: '选择语言'
      }
    }
  }
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'id',
      fallbackLng: 'en',
      react: {
        useSuspense: false
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
