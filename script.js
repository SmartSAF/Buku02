let currentPage = 0;
const pages = document.querySelectorAll('.page');
const flipper = document.getElementById('flipper');
const pageTurnSound = document.getElementById('pageTurnSound');
const totalPages = pages.length;

// Tampilkan halaman yang relevan (halaman aktif dan tetangga) untuk kelancaran animasi
function updatePages() {
  pages.forEach((page, index) => {
    if (index === currentPage || index === currentPage + 1 || index === currentPage - 1) {
      page.classList.add('visible');
    } else {
      page.classList.remove('visible');
    }
  });
}
updatePages();

// Fungsi untuk memainkan suara saat pergantian halaman
function playSound() {
  if (pageTurnSound) {
    pageTurnSound.currentTime = 0;
    // Pastikan pemutaran terjadi setelah interaksi pengguna (misalnya, keydown atau touch)
    pageTurnSound.play().catch((e) => {
      console.log("Pemutaran audio gagal: ", e);
    });
  }
}

// Animasi flip ke depan (menuju halaman berikutnya) dengan efek advanced
function nextPage() {
  if (currentPage < totalPages - 1) {
    updatePages(); // Pastikan halaman berikutnya juga terlihat
    // Salin konten halaman saat ini ke elemen flipper
    flipper.innerHTML = pages[currentPage].innerHTML;
    flipper.style.display = 'block';
    flipper.style.transformOrigin = 'left';
    flipper.style.animation = 'flipForwardAdvanced 1s forwards';
    playSound();

    // Setelah animasi selesai, update currentPage dan sembunyikan flipper
    setTimeout(() => {
      currentPage++;
      flipper.style.display = 'none';
      flipper.style.animation = '';
      updatePages();
    }, 1000);
  }
}

// Animasi flip ke belakang (menuju halaman sebelumnya) dengan efek advanced
function prevPage() {
  if (currentPage > 0) {
    updatePages(); // Pastikan halaman sebelumnya juga terlihat
    // Salin konten halaman sebelumnya ke elemen flipper untuk animasi mundur
    flipper.innerHTML = pages[currentPage - 1].innerHTML;
    flipper.style.display = 'block';
    flipper.style.transformOrigin = 'right';
    // Set kondisi awal flipper (mulai dari rotasi 180 derajat)
    flipper.style.transform = 'rotateY(180deg) scale(1)';
    // Paksa reflow agar browser mendeteksi perubahan
    void flipper.offsetWidth;
    flipper.style.animation = 'flipBackwardAdvanced 1s forwards';
    playSound();

    setTimeout(() => {
      currentPage--;
      flipper.style.display = 'none';
      flipper.style.animation = '';
      updatePages();
    }, 1000);
  }
}

// Navigasi dengan keyboard: panah kanan untuk halaman berikutnya, panah kiri untuk halaman sebelumnya
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextPage();
  } else if (e.key === 'ArrowLeft') {
    prevPage();
  }
});

// Navigasi dengan swipe untuk perangkat layar sentuh
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
});
document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  if (diff > 50) {  // Swipe ke kiri: halaman berikutnya
    nextPage();
  } else if (diff < -50) {  // Swipe ke kanan: halaman sebelumnya
    prevPage();
  }
});
