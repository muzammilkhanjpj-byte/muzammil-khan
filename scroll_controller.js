/**
 * Premium Design System Scroll Controller (scroll_controller.js)
 * Implements standard IntersectionObserver to animate elements as they enter the viewport.
 */

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null, // Viewport
    rootMargin: '0px 0px -10% 0px', // Trigger slightly before the element fully enters
    threshold: 0.1 // 10% of the element must be visible
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add active class to trigger the CSS transition
        entry.target.classList.add('active');
        
        // Optional: stop observing once animate is complete
        // observer.unobserve(entry.target);
      } else {
        // Optional: remove active class if we want animations to replay when scrolling up
        // entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });
});
