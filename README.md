# Bit & Bean — Golden Hour Café

Game kafe **3D real-time** dengan Three.js: interior diorama, mesin espresso, counter kayu, pelanggan, tanaman, lampu gantung, bayangan dinamis, animasi uap, dan tiga sudut kamera. Bukan gambar latar yang diberi label 3D. Gaya visual stylized, bukan fotorealistis/AAA.

## Bermain

Baca resep pada tiket. Klik setiap bahan sesuai jumlah resep lalu **Sajikan pesanan**. Urutan bahan bebas. Racikan salah akan dikosongkan tanpa pendapatan. Jika waktu habis, sesi berakhir. Menu **Jeda** menghentikan timer; berpindah tab juga menghentikannya.

- Shift 1: 3 pesanan, 55 detik per pesanan, Americano dan Kopi Susu.
- Shift 2: 4 pesanan, 45 detik, tambahan Kopi Susu Gula Aren dan Matcha Latte.
- Shift 3: 5 pesanan, 35 detik, tambahan Waffle Cokelat dan Chocolate Latte.
- Kontrol: klik/sentuh, Tab dan Enter untuk tombol, tombol Putar kamera untuk 3 sudut.
- Grafik tinggi menggunakan shadow map 2048 dan resolusi maksimum 2x. Pilih hemat untuk mematikan bayangan dan mengurangi resolusi.
- Harga adalah nilai simulasi game. Tidak ada transaksi nyata. Sesi tidak disimpan; hanya pendapatan terbaik tersimpan lokal jika storage tersedia.

## Menjalankan

Gunakan server HTTP, **bukan** membuka file langsung, karena game memakai ES modules:

```sh
python3 -m http.server 8000
```

Buka `http://localhost:8000`. Memerlukan internet untuk Three.js versi tetap `0.180.0` dari jsDelivr dan browser modern dengan WebGL2/akselerasi grafis. Jika CDN atau WebGL tidak tersedia, halaman menampilkan pesan dan menonaktifkan tombol mulai, bukan berpura-pura memiliki grafik 3D.

## GitHub Pages

Pada repositori pilih **Settings > Pages > Deploy from a branch > main > /(root) > Save**. Gunakan URL yang ditampilkan GitHub setelah publikasi selesai. Tidak perlu build atau workflow custom. Mengunggah file tidak otomatis mengaktifkan Pages.

## Struktur

- `scene.js`: mesh, material, cahaya, kamera, bayangan, animasi.
- `engine.mjs`: aturan resep, pendapatan, shift, dan waktu.
- `app.js`: UI dan integrasi gameplay.
- `index.html`, `style.css`: tampilan dan panel responsif.
- `engine.test.mjs`: pengujian aturan permainan.

Jalankan `node --test engine.test.mjs`. Tes logika tidak menjamin performa/penampilan grafis pada setiap perangkat.

## Materi Pertemuan 3

Navigasi: menu, panduan, permainan, jeda, hasil shift, kemenangan/kekalahan. Core loop: menerima pesanan, meracik, mencocokkan resep, menyajikan, menerima pendapatan. Asset: geometri 3D mesin kopi, gelas, counter, pelanggan, tanaman, dan UI. Progresi: variasi resep meningkat, waktu menurun. Latihan: tambah resep, perbaiki animasi pelanggan, atau pisahkan stasiun waffle.

Seluruh model dibuat secara prosedural di kode. Ini prototype dengan interaksi melalui panel, belum simulasi berjalan bebas atau menuangkan cairan secara fisik. Tidak ada audio di versi awal.

Three.js: https://threejs.org/ (lisensi MIT). Modul dimuat dari CDN, tidak disalin ke repositori.
