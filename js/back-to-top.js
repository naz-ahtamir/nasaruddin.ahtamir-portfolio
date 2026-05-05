// Back to top button - muncul saat scroll > 200px
(function() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  // Tampilkan/sembunyikan tombol berdasarkan posisi scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  // Smooth scroll ke atas saat diklik
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();