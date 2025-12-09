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

// Burger menu functionality
(function() {
  const burger = document.querySelector('.burger-menu');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.querySelector('.close-mobile-nav');
  if (!burger || !mobileNav || !closeBtn) return;

  burger.addEventListener('click', function() {
    mobileNav.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', function() {
    mobileNav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();
