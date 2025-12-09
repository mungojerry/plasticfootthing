// Sticky navigation functionality
(function() {
  'use strict';
  
  const nav = document.querySelector('.cv-nav');
  if (!nav) return;
  
  // Store the initial offset position of the nav
  let navOffsetTop = 0;
  
  function updatePositions() {
    // Only update if nav is not stuck (to get the original position)
    if (!nav.classList.contains('is-stuck')) {
      navOffsetTop = nav.offsetTop;
    }
  }
  
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add stuck class when scrolled past the nav's original position
    if (scrollTop > navOffsetTop) {
      nav.classList.add('is-stuck');
    } else {
      nav.classList.remove('is-stuck');
    }
  }
  
  // Initialize
  updatePositions();
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
    nav.classList.remove('is-stuck');
    setTimeout(updatePositions, 0);
  });
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
