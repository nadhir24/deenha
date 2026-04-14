from fpdf import FPDF
import os

FONT_DIR = r"C:\Windows\Fonts"

class StudyGuidePDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_font("Arial", "", os.path.join(FONT_DIR, "arial.ttf"), uni=True)
        self.add_font("Arial", "B", os.path.join(FONT_DIR, "arialbd.ttf"), uni=True)
        self.add_font("Arial", "I", os.path.join(FONT_DIR, "ariali.ttf"), uni=True)
        self.add_font("Arial", "BI", os.path.join(FONT_DIR, "arialbi.ttf"), uni=True)
        self.set_auto_page_break(auto=True, margin=20)

    def header(self):
        if self.page_no() > 1:
            self.set_font("Arial", "I", 8)
            self.set_text_color(150, 150, 150)
            self.cell(0, 8, "Rangkuman Simpel: Creative Digital Marketing", align="C")
            self.ln(5)
            self.set_draw_color(200, 200, 200)
            self.line(15, self.get_y(), self.w - 15, self.get_y())
            self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Halaman {self.page_no()}/{{nb}}", align="C")

    def section_title(self, text):
        self.ln(4)
        self.set_font("Arial", "B", 14)
        self.set_text_color(30, 80, 160)
        self.cell(0, 10, text, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(30, 80, 160)
        self.line(15, self.get_y(), self.w - 15, self.get_y())
        self.ln(4)

    def sub_title(self, text):
        self.ln(2)
        self.set_font("Arial", "B", 11)
        self.set_text_color(50, 50, 50)
        self.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body_text(self, text):
        self.set_font("Arial", "", 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 6, text)
        self.ln(2)

    def bold_text(self, text):
        self.set_font("Arial", "B", 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 6, text)
        self.ln(1)

    def italic_text(self, text):
        self.set_font("Arial", "I", 10)
        self.set_text_color(100, 100, 100)
        self.multi_cell(0, 6, text)
        self.ln(2)

    def bullet(self, text):
        self.set_font("Arial", "", 10)
        self.set_text_color(40, 40, 40)
        x = self.get_x()
        self.cell(8, 6, "\u2022")
        self.multi_cell(0, 6, text)
        self.ln(1)

    def tip_box(self, text):
        self.ln(2)
        x = self.get_x()
        y = self.get_y()
        self.set_fill_color(240, 248, 255)
        self.set_draw_color(30, 80, 160)
        self.set_font("Arial", "I", 10)
        self.set_text_color(30, 80, 100)
        # Calculate height
        w = self.w - 30
        lines = self.multi_cell(w - 10, 6, text, dry_run=True, output="LINES")
        h = len(lines) * 6 + 10
        self.rect(x, y, w, h, style="DF")
        self.set_xy(x + 5, y + 5)
        self.multi_cell(w - 10, 6, text)
        self.ln(4)

    def table(self, headers, rows, col_widths=None):
        self.ln(2)
        if col_widths is None:
            n = len(headers)
            available = self.w - 30
            col_widths = [available / n] * n

        # Header
        self.set_font("Arial", "B", 9)
        self.set_fill_color(30, 80, 160)
        self.set_text_color(255, 255, 255)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 8, h, border=1, fill=True, align="C")
        self.ln()

        # Rows
        self.set_font("Arial", "", 9)
        self.set_text_color(40, 40, 40)
        fill = False
        for row in rows:
            max_h = 8
            # Calculate max height needed
            cell_lines = []
            for i, cell in enumerate(row):
                lines = self.multi_cell(col_widths[i], 6, str(cell), dry_run=True, output="LINES")
                cell_lines.append(lines)
                h = len(lines) * 6 + 2
                if h > max_h:
                    max_h = h

            if fill:
                self.set_fill_color(245, 245, 250)
            else:
                self.set_fill_color(255, 255, 255)

            y_start = self.get_y()
            x_start = self.get_x()

            # Check if we need a new page
            if y_start + max_h > self.h - 20:
                self.add_page()
                y_start = self.get_y()
                x_start = self.get_x()

            for i, cell in enumerate(row):
                x = x_start + sum(col_widths[:i])
                self.rect(x, y_start, col_widths[i], max_h, style="DF")
                self.set_xy(x + 1, y_start + 1)
                self.multi_cell(col_widths[i] - 2, 6, str(cell))

            self.set_xy(x_start, y_start + max_h)
            fill = not fill
        self.ln(4)

    def numbered_item(self, num, text):
        self.set_font("Arial", "B", 10)
        self.set_text_color(30, 80, 160)
        self.cell(8, 6, f"{num}.")
        self.set_font("Arial", "", 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 6, text)
        self.ln(1)

    def answer_block(self, num, question, answer):
        self.ln(1)
        self.set_font("Arial", "B", 10)
        self.set_text_color(30, 80, 160)
        self.cell(0, 7, f"{num}. {question}", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Arial", "", 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 6, answer)
        self.ln(3)


def build_pdf():
    pdf = StudyGuidePDF()
    pdf.alias_nb_pages()
    pdf.set_margins(15, 15, 15)

    # ==================== COVER PAGE ====================
    pdf.add_page()
    pdf.ln(40)
    pdf.set_font("Arial", "B", 28)
    pdf.set_text_color(30, 80, 160)
    pdf.cell(0, 15, "Rangkuman Simpel", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Arial", "B", 22)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 12, "Creative Digital Marketing", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)
    pdf.set_draw_color(30, 80, 160)
    pdf.line(60, pdf.get_y(), pdf.w - 60, pdf.get_y())
    pdf.ln(10)
    pdf.set_font("Arial", "I", 12)
    pdf.set_text_color(120, 120, 120)
    pdf.cell(0, 8, "Versi gampang buat anak kuliah", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "Lengkap dengan kunci jawaban", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(30)
    pdf.set_font("Arial", "", 10)
    pdf.set_text_color(150, 150, 150)
    pdf.cell(0, 8, "Disusun dari: Panduan Belajar Creative Digital Marketing", align="C", new_x="LMARGIN", new_y="NEXT")

    # ==================== DAFTAR ISI ====================
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    pdf.set_text_color(30, 80, 160)
    pdf.cell(0, 12, "Daftar Isi", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)

    toc_items = [
        "1. Digital Marketing Itu Apa Sih?",
        "2. Tiga Jenis Media yang Harus Kamu Tau",
        "3. Kenapa UMKM Wajib Go Digital?",
        "4. SEO vs SEM",
        "5. B2B vs B2C",
        "6. Customer Journey",
        "7. Content Marketing Funnel",
        "8. Viral Marketing",
        "9. Cheat Sheet Istilah Penting",
        "10. Latihan Soal + Kunci Jawaban",
        "11. Pertanyaan Esai",
    ]
    for item in toc_items:
        pdf.set_font("Arial", "", 11)
        pdf.set_text_color(40, 40, 40)
        pdf.cell(0, 8, item, new_x="LMARGIN", new_y="NEXT")

    # ==================== 1. DIGITAL MARKETING ====================
    pdf.add_page()
    pdf.section_title("1. Digital Marketing Itu Apa Sih?")
    pdf.body_text(
        "Intinya: jualan atau promosi lewat internet. Bisa lewat Instagram, Google, Email, TikTok, dan platform digital lainnya."
    )
    pdf.body_text(
        "Tujuannya ada 3:"
    )
    pdf.bullet("Biar orang KENAL produk kamu (visibility)")
    pdf.bullet("Biar orang TERTARIK dan engage (engagement)")
    pdf.bullet("Biar orang BELI (conversion)")
    pdf.tip_box("Simpelnya: Digital marketing = semua usaha promosi yang kamu lakuin di dunia online.")

    # ==================== 2. TIGA JENIS MEDIA ====================
    pdf.section_title("2. Tiga Jenis Media yang Harus Kamu Tau")
    pdf.table(
        ["Jenis", "Artinya", "Contoh"],
        [
            ["Owned Media", "Platform punya kamu sendiri", "Website, akun IG bisnis"],
            ["Earned Media", "Orang lain ngomongin kamu (gratis!)", "Review pelanggan, di-repost orang"],
            ["Paid Media", "Kamu bayar buat promosi", "Instagram Ads, Google Ads"],
        ],
        [40, 60, 80],
    )
    pdf.tip_box("Analogi: Owned = rumah kamu, Earned = orang muji rumah kamu, Paid = pasang iklan rumah kamu.")

    # ==================== 3. UMKM GO DIGITAL ====================
    pdf.section_title("3. Kenapa UMKM Wajib Go Digital?")
    pdf.bold_text("Keuntungan:")
    pdf.bullet("Murah - dibanding pasang billboard atau iklan TV")
    pdf.bullet("Jangkauan luas - bisa sampai luar kota bahkan luar negeri")
    pdf.bullet("Bisa dilacak - tau siapa yang klik, beli, atau cuma lihat-lihat")
    pdf.bullet("Bisa bersaing - UMKM kecil bisa head-to-head sama brand besar")
    pdf.ln(2)
    pdf.bold_text("Tantangannya:")
    pdf.bullet("Budget tipis")
    pdf.bullet("Belum ngerti teknisnya")
    pdf.bullet("Harus bersaing sama perusahaan besar yang modalnya gede")
    pdf.bullet("Susah mengelola reputasi online")

    # ==================== 4. SEO vs SEM ====================
    pdf.section_title("4. SEO vs SEM - Bedanya Apa?")
    pdf.table(
        ["Aspek", "SEO", "SEM"],
        [
            ["Bayar?", "Gratis (organik)", "Bayar (iklan)"],
            ["Kecepatan?", "Lambat, butuh waktu", "Langsung muncul"],
            ["Jangka panjang?", "Investasi jangka panjang", "Berhenti bayar = hilang"],
            ["Contoh", "Bikin artikel blog SEO-friendly", "Pasang Google Ads"],
        ],
        [35, 72, 72],
    )
    pdf.tip_box("Analogi: SEO = nanem pohon (lama tapi hasilnya terus). SEM = beli buah di supermarket (cepat tapi harus terus bayar).")
    pdf.ln(2)
    pdf.sub_title("PPC (Pay Per Click)")
    pdf.body_text(
        "Model iklan di mana kamu cuma bayar kalau ada yang klik iklan kamu. Jadi nggak rugi kalau cuma dilihat doang. Biasanya muncul di Google atau media sosial berdasarkan kata kunci tertentu."
    )

    # ==================== 5. B2B vs B2C ====================
    pdf.section_title("5. B2B vs B2C")
    pdf.table(
        ["Aspek", "B2B", "B2C"],
        [
            ["Siapa beli?", "Perusahaan ke perusahaan", "Perusahaan ke konsumen"],
            ["Contoh", "Pabrik jual bahan ke restoran", "Shopee jual ke kamu"],
            ["Proses beli", "Lama, banyak pertimbangan", "Cepat, bisa impulsif"],
        ],
        [35, 72, 72],
    )

    # ==================== 6. CUSTOMER JOURNEY ====================
    pdf.section_title("6. Customer Journey - Perjalanan Pembeli")
    pdf.body_text(
        "Ini tahapan yang dilalui orang dari nggak kenal sampai jadi pelanggan setia:"
    )
    pdf.ln(2)
    pdf.set_font("Arial", "B", 10)
    pdf.set_text_color(30, 80, 160)
    pdf.cell(0, 8, "Nggak tau  -->  Tau  -->  Tertarik  -->  Pertimbangkan  -->  Beli  -->  Pelanggan Setia", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)
    pdf.body_text(
        "Kenapa penting? Biar kamu tau konten apa yang harus dikasih di setiap tahap. Orang yang baru kenal butuh konten beda sama orang yang udah mau beli."
    )

    # ==================== 7. CONTENT MARKETING FUNNEL ====================
    pdf.section_title("7. Content Marketing Funnel")
    pdf.body_text("Bayangin corong - atas lebar, bawah sempit:")
    pdf.table(
        ["Tahap", "Nama", "Tujuan", "Contoh Konten"],
        [
            ["Atas", "TOFU (Top of Funnel)", "Bikin orang KENAL", "Reels lucu, infografis, blog"],
            ["Tengah", "MOFU (Middle of Funnel)", "Bikin orang NGERTI & PERCAYA", "Webinar, e-book, case study"],
            ["Bawah", "BOFU (Bottom of Funnel)", "Bikin orang BELI", "Free trial, diskon, testimoni"],
        ],
        [20, 50, 45, 65],
    )
    pdf.tip_box("Intinya: Jangan langsung jualan. Kenalan dulu -> edukasi -> baru closing.")

    # ==================== 8. VIRAL MARKETING ====================
    pdf.section_title("8. Viral Marketing")
    pdf.body_text(
        "Strategi bikin konten yang nyebar sendiri kayak virus. Pertumbuhan audiens bisa eksponensial - dari 10 orang bisa jadi 10.000 dalam hitungan jam."
    )
    pdf.bold_text("Orang share karena:")
    pdf.bullet("Lucu / relate")
    pdf.bullet("Kontroversial (tapi hati-hati)")
    pdf.bullet("Bermanfaat banget")
    pdf.tip_box("Kunci viral: Bikin konten yang bikin orang PENGEN share ke temennya tanpa disuruh.")

    # ==================== 9. CHEAT SHEET ====================
    pdf.add_page()
    pdf.section_title("9. Cheat Sheet Istilah Penting")
    pdf.table(
        ["Istilah", "Arti Simpelnya"],
        [
            ["SEO", "Optimasi biar muncul di Google tanpa bayar"],
            ["SEM", "Bayar biar muncul di Google"],
            ["PPC", "Bayar per klik iklan"],
            ["B2B", "Bisnis jual ke bisnis"],
            ["B2C", "Bisnis jual ke konsumen"],
            ["TOFU", "Tahap awal - bikin orang kenal"],
            ["MOFU", "Tahap tengah - edukasi"],
            ["BOFU", "Tahap akhir - closing/beli"],
            ["Backlink", "Link dari web lain ke web kamu (bagus buat SEO)"],
            ["Lead", "Calon pembeli yang udah kasih kontak"],
            ["Brand Awareness", "Seberapa orang kenal merek kamu"],
            ["E-Commerce", "Jual beli online"],
            ["Customer Journey", "Perjalanan orang dari nggak kenal sampai beli"],
            ["Viral Marketing", "Konten yang nyebar cepat kayak virus"],
        ],
        [40, 140],
    )

    # ==================== 10. SOAL + KUNCI JAWABAN ====================
    pdf.add_page()
    pdf.section_title("10. Latihan Soal + Kunci Jawaban")

    pdf.sub_title("Soal Jawaban Singkat")
    questions = [
        "Apa itu digital marketing?",
        "Bedanya Earned Media vs Owned Media?",
        "Kenapa UMKM harus go digital?",
        "Apa fungsi SEO?",
        "Gimana cara kerja PPC?",
        "Bedanya B2B dan B2C?",
        "Apa itu Customer Journey?",
        "Sebutin 3 tahap Content Marketing Funnel!",
        "Tantangan UMKM di dunia digital?",
        "Apa itu Viral Marketing?",
    ]
    for i, q in enumerate(questions, 1):
        pdf.numbered_item(i, q)

    pdf.ln(5)
    pdf.set_draw_color(30, 80, 160)
    pdf.line(15, pdf.get_y(), pdf.w - 15, pdf.get_y())
    pdf.ln(5)

    pdf.sub_title("Kunci Jawaban")

    pdf.answer_block(
        1,
        "Apa itu digital marketing?",
        "Digital marketing adalah kegiatan promosi produk, layanan, atau merek lewat internet dan berbagai platform digital seperti media sosial, mesin pencari, dan email. Tujuannya biar produk makin dikenal (visibility), orang makin engage, dan akhirnya beli (conversion).",
    )

    pdf.answer_block(
        2,
        "Bedanya Earned Media vs Owned Media?",
        "Owned Media = platform yang kamu punya dan kontrol sendiri, kayak website atau akun IG bisnis kamu. Earned Media = orang lain yang ngomongin brand kamu secara sukarela, kayak review pelanggan atau word of mouth. Intinya: Owned kamu yang bikin, Earned orang lain yang bikin.",
    )

    pdf.answer_block(
        3,
        "Kenapa UMKM harus go digital?",
        "Karena digital marketing bikin UMKM bisa jangkau pasar yang lebih luas dengan biaya yang jauh lebih murah dibanding pemasaran tradisional. Selain itu, UMKM bisa lacak perilaku konsumen secara real-time, bangun kepercayaan merek, dan bersaing sama perusahaan besar.",
    )

    pdf.answer_block(
        4,
        "Apa fungsi SEO?",
        "SEO berfungsi buat optimasi website biar muncul di peringkat atas hasil pencarian Google secara organik (tanpa bayar). Kalau SEO-nya bagus, traffic ke website naik tanpa harus terus-terusan keluar duit buat iklan.",
    )

    pdf.answer_block(
        5,
        "Gimana cara kerja PPC?",
        "PPC (Pay Per Click) adalah model iklan di mana kamu cuma bayar kalau ada orang yang klik iklan kamu. Iklannya biasanya muncul di Google atau media sosial berdasarkan kata kunci yang relevan sama produk kamu.",
    )

    pdf.answer_block(
        6,
        "Bedanya B2B dan B2C?",
        "B2B (Business-to-Business) = transaksi antar perusahaan, contohnya pabrik jual bahan ke restoran. Proses belinya lama dan banyak pertimbangan. B2C (Business-to-Consumer) = perusahaan jual langsung ke konsumen, contohnya Shopee jual ke kamu. Proses belinya lebih cepat dan bisa impulsif.",
    )

    pdf.answer_block(
        7,
        "Apa itu Customer Journey?",
        "Customer Journey adalah perjalanan yang dilalui pelanggan mulai dari nggak kenal produk, jadi tau, tertarik, pertimbangin, beli, sampai jadi pelanggan setia. Penting dipahami biar kamu bisa kasih konten yang tepat di setiap tahapnya.",
    )

    pdf.answer_block(
        8,
        "Sebutin 3 tahap Content Marketing Funnel!",
        "1) TOFU (Top of Funnel) - tahap awal buat bikin orang kenal/sadar sama brand kamu. 2) MOFU (Middle of Funnel) - tahap tengah buat edukasi dan bangun kepercayaan. 3) BOFU (Bottom of Funnel) - tahap akhir buat dorong orang beli/konversi.",
    )

    pdf.answer_block(
        9,
        "Tantangan UMKM di dunia digital?",
        "Tantangan utamanya: budget terbatas, kurang keahlian teknis digital, susah mengelola reputasi online, dan harus bersaing sama perusahaan besar yang punya sumber daya jauh lebih banyak.",
    )

    pdf.answer_block(
        10,
        "Apa itu Viral Marketing?",
        "Viral marketing adalah strategi yang bikin orang mau nyebarin info tentang produk/layanan kamu secara luas lewat media sosial. Ciri khasnya: penyebarannya cepat banget kayak virus dan bisa bikin audiens tumbuh eksponensial dalam waktu singkat.",
    )

    # ==================== 11. PERTANYAAN ESAI ====================
    pdf.add_page()
    pdf.section_title("11. Pertanyaan Esai (Analisis Mendalam)")
    pdf.italic_text("Bagian ini untuk latihan analisis. Jawaban tidak disediakan - gunakan pemahaman kamu sendiri.")
    pdf.ln(3)

    essay_questions = [
        ("Analisis Peran Ekonomi Kreatif", "Jelaskan gimana ekonomi kreatif dan digital marketing saling berinteraksi dalam meningkatkan PDB nasional. Kasih contoh implementasinya di sektor UMKM."),
        ("Evaluasi SEO vs SEM", "Bandingin efektivitas SEO dan SEM buat bisnis baru yang budgetnya terbatas. Mana yang harus diprioritaskan dan kenapa?"),
        ("Konten dalam Branding", "Diskusikan gimana pembuatan konten yang konsisten bisa bangun brand awareness dan kepercayaan pelanggan jangka panjang, di tengah 'kelelahan iklan' yang dialami konsumen."),
        ("Dampak Teknologi Baru", "Evaluasi gimana inovasi kayak AI dan Augmented Reality (AR) bisa ngubah cara bisnis berinteraksi sama pelanggan di masa depan."),
        ("Strategi Customer Retention", "Jelaskan peran strategi digital marketing di tahap pasca-pembelian buat jaga loyalitas pelanggan dan dorong mereka jadi brand advocates."),
    ]

    for i, (title, desc) in enumerate(essay_questions, 1):
        pdf.set_font("Arial", "B", 11)
        pdf.set_text_color(30, 80, 160)
        pdf.cell(0, 8, f"{i}. {title}", new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Arial", "", 10)
        pdf.set_text_color(40, 40, 40)
        pdf.multi_cell(0, 6, desc)
        pdf.ln(5)

    # ==================== TIPS BELAJAR ====================
    pdf.ln(5)
    pdf.set_draw_color(30, 80, 160)
    pdf.line(15, pdf.get_y(), pdf.w - 15, pdf.get_y())
    pdf.ln(5)
    pdf.set_font("Arial", "B", 12)
    pdf.set_text_color(30, 80, 160)
    pdf.cell(0, 10, "Tips Belajar", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Arial", "", 10)
    pdf.set_text_color(40, 40, 40)
    pdf.bullet("Pahami KONSEPNYA, jangan hafal definisi")
    pdf.bullet("Kalau bisa jelasin ke temen pakai bahasa sendiri = kamu udah ngerti")
    pdf.bullet("Coba hubungkan teori sama contoh nyata di kehidupan sehari-hari")
    pdf.bullet("Latihan jawab soal esai buat persiapan ujian")

    # Save
    output_path = r"C:\Users\Administrator\Downloads\Rangkuman_Creative_Digital_Marketing.pdf"
    pdf.output(output_path)
    print(f"PDF berhasil dibuat: {output_path}")


if __name__ == "__main__":
    build_pdf()
