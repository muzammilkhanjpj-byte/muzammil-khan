/**
 * Interactive Logic for Muzammil Khan Portfolio Gallery (app.js)
 * Implements:
 * 1. Gallery Filtering by Category
 * 2. Glassmorphic Lightbox Modal (Open, Close, Escape Key, Prefilled WhatsApp Inquiry)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // GALLERY FILTER SYSTEM
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // 2. Filter gallery items with smooth fading
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          // Show item
          item.classList.remove('hidden');
          // Re-trigger scroll reveal observer check if needed, or force opacity
          setTimeout(() => {
            item.classList.add('active');
          }, 50);
        } else {
          // Hide item
          item.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================================================
  // LIGHTBOX MODAL SYSTEM
  // ==========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCategory = lightbox.querySelector('.lightbox-category');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const lightboxDate = lightbox.querySelector('.lightbox-date');
  const lightboxLocation = lightbox.querySelector('.lightbox-location');
  const lightboxClose = lightbox.querySelector('.lightbox-close-btn');
  const lightboxPrimaryBtn = lightbox.querySelector('.lightbox-primary-btn');

  // Contact number config
  const contactNumber = '923310216815';

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgUrl = item.querySelector('img').src;
      const title = item.getAttribute('data-title');
      const category = item.getAttribute('data-category');
      const desc = item.getAttribute('data-desc');
      const date = item.getAttribute('data-date');
      const location = item.getAttribute('data-location');
      const liveUrl = item.getAttribute('data-live');

      // Populate data
      lightboxImg.src = imgUrl;
      lightboxImg.alt = title;
      lightboxCategory.textContent = category;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightboxDate.textContent = date;
      lightboxLocation.textContent = location;

      // Update primary button actions and text based on project URL availability
      if (liveUrl) {
        lightboxPrimaryBtn.href = liveUrl;
        lightboxPrimaryBtn.innerHTML = `
          <!-- External Link Icon -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Visit Website
        `;
      } else {
        const waText = `Hi Muzammil, I am interested in inquiring about your project: "${title}" (${category.toUpperCase()}). Can you share more details?`;
        lightboxPrimaryBtn.href = `https://wa.me/${contactNumber}?text=${encodeURIComponent(waText)}`;
        lightboxPrimaryBtn.innerHTML = `
          <!-- WhatsApp Icon -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.808 1.238h.005c5.507 0 9.99-4.478 9.99-9.985A9.98 9.98 0 0 0 12.012 2zm5.727 14.12c-.25.706-1.464 1.296-2.01 1.348-.5.048-1.154.276-3.344-.633-2.793-1.157-4.577-3.99-4.717-4.178-.14-.188-1.135-1.507-1.135-2.875 0-1.367.72-2.04.976-2.323.257-.282.56-.353.748-.353.187 0 .375.002.538.01.173.007.406-.066.637.49.237.57.813 1.986.883 2.128.07.141.117.306.023.493-.093.188-.14.306-.28.47-.14.165-.296.37-.42.495-.14.14-.287.293-.122.574.165.281.733 1.21 1.575 1.96.166.147.332.274.502.378.857.697 1.62.906 1.916.713.296-.192.57-.492.79-.817.158-.236.31-.19.516-.114.205.076 1.3.612 1.52.72.22.109.367.163.42.257.054.093.054.542-.196 1.248z"/>
          </svg>
          Inquire Project
        `;
      }

      // Show lightbox and lock background scrolling
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Lightbox function
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Clear image src after fadeout to prevent flash of old image next time
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  };

  // Close triggers
  lightboxClose.addEventListener('click', closeLightbox);

  // Close when clicking outside content (on the blurred overlay)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Mobile / Tablet Hamburger Toggle Logic
  const navToggle = document.getElementById('nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (navToggle && mobileNavMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      mobileNavMenu.classList.toggle('active');
    });

    // Close when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileNavMenu.classList.remove('active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !mobileNavMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        mobileNavMenu.classList.remove('active');
      }
    });
  }
});
