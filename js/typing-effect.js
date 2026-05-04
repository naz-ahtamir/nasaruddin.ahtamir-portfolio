// typing-effect.js
// Efek mengetik otomatis, looping multi-kata dengan hapus

document.addEventListener('DOMContentLoaded', function() {
  // Pilih elemen tempat teks akan diketik
  const element = document.querySelector('.typing-text');
  if (!element) return;

  // Daftar kata yang akan ditampilkan bergantian (sesuaikan dengan keinginan)
  const words = ['bin AHTAMIR', 'bin AHMAD', 'bin SIME'];
  
  let kataSaatIni = 0;       // index kata yang sedang diproses
  let indeksKarakter = 0;    // posisi karakter dalam kata
  let sedangHapus = false;   // status: sedang mengetik atau menghapus?
  let timer;                 // untuk menyimpan setTimeout

  function efekKetik() {
    const kata = words[kataSaatIni];
    
    if (sedangHapus) {
      // Menghapus 1 karakter
      element.textContent = kata.substring(0, indeksKarakter - 1);
      indeksKarakter--;
    } else {
      // Mengetik 1 karakter
      element.textContent = kata.substring(0, indeksKarakter + 1);
      indeksKarakter++;
    }

    // Cek apakah sudah selesai mengetik satu kata
    if (!sedangHapus && indeksKarakter === kata.length) {
      sedangHapus = true;
      timer = setTimeout(efekKetik, 1500); // jeda sebelum hapus (1.5 detik)
      return;
    }
    
    // Cek apakah sudah selesai menghapus kata
    if (sedangHapus && indeksKarakter === 0) {
      sedangHapus = false;
      // Pindah ke kata berikutnya (jika sudah terakhir, kembali ke awal)
      kataSaatIni = (kataSaatIni + 1) % words.length;
      timer = setTimeout(efekKetik, 300); // jeda sebelum ngetik kata baru
      return;
    }

    // Tentukan kecepatan: hapus lebih cepat (50ms), ketik normal (100ms)
    const kecepatan = sedangHapus ? 50 : 100;
    timer = setTimeout(efekKetik, kecepatan);
  }

  // Tambahkan class untuk efek kursor berkedip (pastikan CSS sudah ada)
  element.classList.add('blinking');
  
  // Mulai animasi
  efekKetik();

  // Bersihkan timer jika halaman ditutup (opsional, agar tidak error)
  window.addEventListener('beforeunload', function() {
    if (timer) clearTimeout(timer);
  });
});