# Bit & Bean — Behind the Bar (v2)

Perombakan menjadi simulator barista orang pertama. Versi pertama masih tersedia dalam riwayat Git; versi ini mengganti panel pilih-bahan dengan berjalan dan memakai stasiun di ruang 3D.

## Kontrol dan alur

WASD bergerak dalam koridor bar yang dibatasi agar tidak menembus meja. Seret layar untuk melihat. E memakai stasiun terdekat jika berjarak horizontal kurang dari 0,68 unit dan cukup dekat meja. Tidak perlu membidik tepat dengan crosshair. Tombol gerak/interaksi juga tersedia di layar.

1. Ambil gelas dari rak.
2. Giling kopi (2 detik).
3. Pada mesin: padatkan, tekan lagi untuk memulai ekstraksi.
4. Tekan E lagi di mesin pada 4–7 detik untuk hasil terbaik. Lewat 12 detik pompa berhenti otomatis dengan kualitas rendah.
5. Tambahkan air untuk Americano atau susu untuk Kopi Susu (2,5 detik).
6. Serahkan pesanan di terminal.
7. Bersihkan mesin di bak cuci sebelum memulai racikan berikutnya. Bak juga membuang gelas yang masih di tangan.

9 pesanan dalam tiga tahap dengan kesabaran 150, 125, lalu 100 detik. Tiga pelanggan pergi mengakhiri sesi. Tip mengikuti kualitas ekstraksi dan combo. Tidak ada transaksi uang nyata. Waktu merupakan penyederhanaan game, bukan panduan membuat espresso nyata.

## Perubahan visual dan interaksi

Kamera first-person dengan gerakan kepala ringan, tangan dan gelas mengikuti kamera, aliran minuman serta uap, tekstur serat kayu prosedural, label stasiun, suara sintetis mesin, animasi pelanggan berpindah setelah pelayanan. Grafik tinggi atau hemat. Perspektif menu masih diorama.

Fokus versi ini adalah dua resep lengkap. Enam resep tombol pada versi lama, termasuk waffle, tidak disertakan dalam gameplay v2. Belum ada fisika cairan, tangan rigged realistis, antrean AI kompleks, atau model fotorealistis. Stok tidak terbatas. Tidak ada simpan sesi. Semua pekerjaan/timer berhenti saat jeda atau tab tidak aktif.

## Menjalankan dan publikasi

Server lokal: `python3 -m http.server 8000`, buka localhost:8000. Memerlukan internet untuk Three.js 0.180.0 dari jsDelivr dan WebGL2. Jangan buka index.html dengan file://.

GitHub Pages: Settings > Pages > Deploy from a branch > main > /(root) > Save. Jika sudah aktif, push ke main memicu publikasi sesuai pengaturan repositori. Gunakan URL yang ditampilkan GitHub.

## Pengujian

`node --test engine.test.mjs` memeriksa urutan proses, durasi, kualitas ekstraksi, resep salah, kebersihan, kekalahan, dan penyelesaian 9 pesanan. Tes unit tidak menggantikan pengujian tampilan dan performa GPU.

File: engine.mjs (state dan aturan), scene.js (3D, kamera, gerak), app.js (UI, audio, timer), index.html, style.css.
Three.js berlisensi MIT: https://threejs.org/
