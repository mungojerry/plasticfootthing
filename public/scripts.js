console.log('=== SCRIPTS.JS LOADED ===');

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

console.log('Scripts.js loaded');

// Function to initialize collage modal functionality
function initCollageModal() {
  console.log('Initializing collage modal');
  
  const collageItems = document.querySelectorAll('.collage-item');
  console.log('Found ' + collageItems.length + ' collage items');
  
  if (collageItems.length === 0) {
    console.log('No collage items found');
    return;
  }

  collageItems.forEach(function(item, index) {
    const thumbnail = item.querySelector('img');
    const modal = item.querySelector('.image-modal');
    const overlay = item.querySelector('.collage-overlay');
    
    if (!thumbnail || !modal) {
      return;
    }

    thumbnail.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const modalClone = modal.cloneNode(true);
      modalClone.id = 'active-modal';
      
      if (overlay) {
        const title = overlay.querySelector('h5');
        const desc = overlay.querySelector('p');
        
        let titleText = title ? title.textContent : '';
        let descText = desc ? desc.textContent : '';
        
        let modalInfo = modalClone.querySelector('.modal-info');
        if (!modalInfo) {
          modalInfo = document.createElement('div');
          modalInfo.className = 'modal-info';
          modalClone.appendChild(modalInfo);
        }
        
        modalInfo.innerHTML = '<h5>' + titleText + '</h5><p>' + descText + '</p>';
      }
      
      if (!modalClone.querySelector('.close-modal-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-modal-btn';
        closeBtn.setAttribute('aria-label', 'Close image');
        closeBtn.innerHTML = '&times;';
        modalClone.insertBefore(closeBtn, modalClone.firstChild);
      }
      
      document.body.appendChild(modalClone);
      modalClone.style.display = 'flex';
      
      modalClone.addEventListener('click', function(ev) {
        if (ev.target === modalClone || ev.target.classList.contains('close-modal-btn')) {
          modalClone.remove();
        }
      });
    });
  });
}

// Load external HTML sections
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - loading external sections');
  
  // Load projects section
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    fetch('sections/projects.html')
      .then(function(response) {
        if (!response.ok) throw new Error('Failed to load projects section');
        return response.text();
      })
      .then(function(html) {
        projectsContainer.innerHTML = html;
        console.log('Projects section loaded');
        // Initialize collage after content is loaded
        initCollageModal();
      })
      .catch(function(error) {
        console.error('Error loading projects:', error);
      });
  }

  // Close modal when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activeModal = document.getElementById('active-modal');
      if (activeModal) {
        activeModal.remove();
      }
    }
  });
});
