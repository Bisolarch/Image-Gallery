/* 
   SELECT ELEMENTS
 */
const images = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentIndex = 0;
let visibleImages = [];

/* 
   OPEN LIGHTBOX
 */
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    visibleImages = Array.from(images).filter(image => {
      const wrapper = image.closest('figure') || image;
      return wrapper.style.display !== 'none';
    });

    currentIndex = visibleImages.indexOf(img);
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

/* 
   CLOSE LIGHTBOX */
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

/* 
   NEXT IMAGE
 */
nextBtn.addEventListener('click', () => {
  if (!visibleImages.length) return;

  currentIndex = (currentIndex + 1) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
});

/* 
   PREVIOUS IMAGE */
prevBtn.addEventListener('click', () => {
  if (!visibleImages.length) return;

  currentIndex =
    (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
});

/*
   FILTER IMAGES (FIXED)
*/
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    images.forEach(img => {
      const wrapper = img.closest('figure') || img;

      if (filter === 'all' || img.dataset.category === filter) {
        wrapper.style.display = '';
      } else {
        wrapper.style.display = 'none';
      }
    });
  });
});

/* 
   CLOSE LIGHTBOX ON OVERLAY CLICK
 */
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

/* 
   KEYBOARD NAVIGATION (BONUS) */
document.addEventListener('keydown', e => {
  if (lightbox.style.display !== 'flex') return;

  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') lightbox.style.display = 'none';
});


 