/* ==========================================================================
   SHARE TRADE ACADEMY - INTERACTIVE LOGIC (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Navigation Scroll Effect
  const header = document.querySelector('header.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    // Initialize on load
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }

  // 2. Active Page Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 3. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuPanel = document.getElementById('mobile-menu-panel');
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', () => {
      const isActive = menuPanel.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isActive);
      
      // Toggle Lucide Icons representation (Menu vs X)
      menuBtn.innerHTML = isActive 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>` 
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>`;
    });

    // Close mobile menu on clicking any link
    const mobileLinks = menuPanel.querySelectorAll('.mobile-nav-link, .mobile-cta-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuPanel.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>`;
      });
    });
  }

  // 4. Testimonials Slider
  const testimonials = [
    { name: "Rahul Sharma", role: "Software Engineer", text: "The structured curriculum and live sessions changed my approach completely. Now I trade with confidence and discipline." },
    { name: "Priya Iyer", role: "Homemaker", text: "I started as a complete beginner. The mentors are patient and the community is incredibly supportive." },
    { name: "Amit Verma", role: "Business Owner", text: "Best investment I made. The risk management framework alone has saved me lakhs." },
    { name: "Sneha Kulkarni", role: "Final Year Student", text: "Practical, real-market focused. I made my first profitable trade within the first month." }
  ];

  const textEl = document.getElementById('testimonial-text');
  const nameEl = document.getElementById('testimonial-name');
  const roleEl = document.getElementById('testimonial-role');
  const avatarEl = document.getElementById('testimonial-avatar');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (textEl && nameEl && roleEl && avatarEl && dotsContainer) {
    let activeIndex = 0;

    const updateTestimonial = (index) => {
      activeIndex = index;
      const t = testimonials[index];
      
      // Update text with transition effects if desired, or simple text change
      textEl.textContent = `"${t.text}"`;
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      
      // Initials for avatar
      avatarEl.textContent = t.name.split(" ").map(n => n[0]).join("");

      // Update Active dot class
      const dots = dotsContainer.querySelectorAll('.dot-btn');
      dots.forEach((dot, idx) => {
        if (idx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    // Render Indicator Dots
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `dot-btn ${idx === activeIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => updateTestimonial(idx));
      dotsContainer.appendChild(dot);
    });

    // Auto rotate testimonials every 6 seconds
    let testimonialInterval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % testimonials.length;
      updateTestimonial(nextIndex);
    }, 6000);

    // Stop auto-rotation when user interacts
    dotsContainer.addEventListener('click', () => {
      clearInterval(testimonialInterval);
    });
  }

  // 5. FAQ Accordion Collapse/Expand
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
          });
          
          // If the clicked one wasn't active, open it
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // 6. Courses Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');
  if (filterBtns.length > 0 && courseCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Hide or Show corresponding course cards
        courseCards.forEach(card => {
          const cardLevel = card.getAttribute('data-level');
          if (filterValue === 'All' || cardLevel === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
  
});
