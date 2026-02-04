'use strict';

// Sticky navigation functionality
(function() {
  const nav = document.querySelector('.cv-nav');
  if (!nav) return;
  
  let navOffsetTop = 0;
  
  function updatePositions() {
    if (!nav.classList.contains('is-stuck')) {
      navOffsetTop = nav.offsetTop;
    }
  }
  
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    nav.classList.toggle('is-stuck', scrollTop > navOffsetTop);
  }
  
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

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    mobileNav.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  burger.addEventListener('click', openMobileNav);
  closeBtn.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));
})();

// Collage modal functionality - uses data attribute to avoid duplicate img src
function initCollageModal() {
  const collageItems = document.querySelectorAll('.collage-item');
  if (!collageItems.length) return;

  collageItems.forEach(item => {
    const thumbnail = item.querySelector('img');
    const overlay = item.querySelector('.collage-overlay');
    
    if (!thumbnail) return;

    thumbnail.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      
      // Create modal dynamically instead of cloning hidden duplicate
      const modal = document.createElement('div');
      modal.id = 'active-modal';
      modal.className = 'image-modal';
      modal.style.display = 'flex';
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-modal-btn';
      closeBtn.setAttribute('aria-label', 'Close image');
      closeBtn.innerHTML = '&times;';
      
      const modalImg = document.createElement('img');
      modalImg.src = thumbnail.src;
      modalImg.alt = 'Full screen view';
      
      modal.appendChild(closeBtn);
      modal.appendChild(modalImg);
      
      if (overlay) {
        const title = overlay.querySelector('h5');
        const desc = overlay.querySelector('p');
        const modalInfo = document.createElement('div');
        modalInfo.className = 'modal-info';
        modalInfo.innerHTML = `<h5>${title?.textContent || ''}</h5><p>${desc?.textContent || ''}</p>`;
        modal.appendChild(modalInfo);
      }
      
      document.body.appendChild(modal);
      
      modal.addEventListener('click', ev => {
        if (ev.target === modal || ev.target.classList.contains('close-modal-btn')) {
          modal.remove();
        }
      });
    });
  });
}

// Close modal on Escape key
function closeActiveModal() {
  const activeModal = document.getElementById('active-modal');
  if (activeModal) activeModal.remove();
}

// Load external HTML sections
document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    fetch('sections/projects.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load projects section');
        return response.text();
      })
      .then(html => {
        projectsContainer.innerHTML = html;
        initCollageModal();
      })
      .catch(error => console.error('Error loading projects:', error));
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeActiveModal();
  });
});
