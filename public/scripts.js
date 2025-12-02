// Sticky navigation functionality
(function() {
  'use strict';
  
  const nav = document.querySelector('.cv-nav');
  const header = document.querySelector('.cv-header');
  
  if (!nav || !header) return;
  
  // Get initial positions
  let navTop = 0;
  let headerBottom = 0;
  
  function updatePositions() {
    const headerRect = header.getBoundingClientRect();
    headerBottom = header.offsetHeight;
    navTop = header.offsetHeight;
  }
  
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add stuck class when scrolled past the header
    if (scrollTop >= headerBottom) {
      nav.classList.add('is-stuck');
    } else {
      nav.classList.remove('is-stuck');
    }
  }
  
  // Initialize
  updatePositions();
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', updatePositions);
  window.addEventListener('load', () => {
    updatePositions();
    handleScroll();
  });
})();
