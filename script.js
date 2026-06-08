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

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === 'index.html' && href === '/')
    ) {
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
      const header = document.querySelector('header.site-header');
      const isActive = menuPanel.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isActive);

      if (header) {
        header.classList.toggle('menu-open', isActive);
      }

      // Toggle Lucide Icons representation (Menu vs X)
      menuBtn.innerHTML = isActive
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>`;
    });

    // Close mobile menu on clicking any link
    const mobileLinks = menuPanel.querySelectorAll(
      '.mobile-nav-link, .mobile-cta-link',
    );
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuPanel.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>`;

        const header = document.querySelector('header.site-header');
        if (header) {
          header.classList.remove('menu-open');
        }
      });
    });
  }

  // 4. Testimonials Slider
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      text: 'The structured curriculum and live sessions changed my approach completely. Now I trade with confidence and discipline.',
    },
    {
      name: 'Priya Iyer',
      role: 'Homemaker',
      text: 'I started as a complete beginner. The mentors are patient and the community is incredibly supportive.',
    },
    {
      name: 'Amit Verma',
      role: 'Business Owner',
      text: 'Best investment I made. The risk management framework alone has saved me lakhs.',
    },
    {
      name: 'Sneha Kulkarni',
      role: 'Final Year Student',
      text: 'Practical, real-market focused. I made my first profitable trade within the first month.',
    },
  ];

  const textEl = document.getElementById('testimonial-text');
  const nameEl = document.getElementById('testimonial-name');
  const roleEl = document.getElementById('testimonial-role');
  const avatarEl = document.getElementById('testimonial-avatar');
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev-btn');
  const nextBtn = document.getElementById('testimonial-next-btn');
  const contentWrapper = document.querySelector('.testimonial-content-wrapper');

  if (textEl && nameEl && roleEl && avatarEl && dotsContainer) {
    let activeIndex = 0;
    let isTransitioning = false;

    const updateTestimonial = (index, direction = 'next') => {
      if (index === activeIndex || isTransitioning) return;
      isTransitioning = true;

      const t = testimonials[index];

      if (contentWrapper) {
        // Step 1: Add exit transition class
        const fadeOutClass =
          direction === 'next' ? 'fade-out-left' : 'fade-out-right';
        contentWrapper.classList.add(fadeOutClass);

        setTimeout(() => {
          // Step 2: Swap content mid-fade
          textEl.textContent = `"${t.text}"`;
          nameEl.textContent = t.name;
          roleEl.textContent = t.role;
          avatarEl.textContent = t.name
            .split(' ')
            .map((n) => n[0])
            .join('');

          // Update dot state
          const dots = dotsContainer.querySelectorAll('.dot-btn');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
          });

          // Step 3: Switch exit class to entry class
          contentWrapper.classList.remove(fadeOutClass);
          const fadeInClass =
            direction === 'next' ? 'fade-in-left' : 'fade-in-right';
          contentWrapper.classList.add(fadeInClass);

          // Force layout reflow to register new transition
          contentWrapper.offsetHeight;

          // Step 4: Slide back to original center
          contentWrapper.classList.remove(fadeInClass);

          activeIndex = index;
          isTransitioning = false;
        }, 250); // Matches CSS transition duration
      } else {
        // Fallback
        textEl.textContent = `"${t.text}"`;
        nameEl.textContent = t.name;
        roleEl.textContent = t.role;
        avatarEl.textContent = t.name
          .split(' ')
          .map((n) => n[0])
          .join('');

        const dots = dotsContainer.querySelectorAll('.dot-btn');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === index);
        });

        activeIndex = index;
        isTransitioning = false;
      }
    };

    // Render Indicator Dots
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `dot-btn ${idx === activeIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        if (idx === activeIndex) return;
        const dir = idx > activeIndex ? 'next' : 'prev';
        updateTestimonial(idx, dir);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });

    // Next/Prev Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let prevIndex =
          (activeIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(prevIndex, 'prev');
        resetInterval();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let nextIndex = (activeIndex + 1) % testimonials.length;
        updateTestimonial(nextIndex, 'next');
        resetInterval();
      });
    }

    // Auto rotate testimonials every 6 seconds
    let testimonialInterval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % testimonials.length;
      updateTestimonial(nextIndex, 'next');
    }, 6000);

    function resetInterval() {
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(() => {
        let nextIndex = (activeIndex + 1) % testimonials.length;
        updateTestimonial(nextIndex, 'next');
      }, 6000);
    }
  }

  // 5. FAQ Accordion Collapse/Expand
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all FAQ items
          faqItems.forEach((otherItem) => {
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
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Hide or Show corresponding course cards
        courseCards.forEach((card) => {
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

  // 7. Interactive Contact Form Submission logic
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      if (!name || !email) return;

      // Create glassmorphic success overlay popup
      const popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.inset = '0';
      popup.style.zIndex = '9999';
      popup.style.display = 'grid';
      popup.style.placeItems = 'center';
      popup.style.background = 'rgba(10, 37, 64, 0.6)';
      popup.style.backdropFilter = 'blur(10px)';
      popup.style.padding = '1.25rem';

      popup.innerHTML = `
        <div class="glass" style="max-width: 400px; width: 100%; padding: 2.5rem; text-align: center; border-radius: var(--radius-3xl); border: 1px solid rgba(255, 255, 255, 0.45); box-shadow: var(--shadow-premium);">
          <div class="feature-icon-container gradient-green shadow-glow-green animate-float" style="margin: 0 auto 1.5rem auto; width: 3.5rem; height: 3.5rem; border-radius: 50%; display: grid; place-items: center; color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--navy); font-family: var(--font-display);">Message Sent!</h3>
          <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-top: 0.75rem; line-height: 1.6;">
            Thank you, <strong>${name}</strong>. We have received your query. Our counsellor will contact you at <strong>${email}</strong> shortly.
          </p>
          <button id="close-popup-btn" class="btn btn-primary mt-6 btn-full" style="background-image: var(--gradient-hero); color: white;">
            Got it
          </button>
        </div>
      `;

      document.body.appendChild(popup);

      // Reset form
      contactForm.reset();

      const closeBtn = document.getElementById('close-popup-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          popup.remove();
        });
      }
    });
  }

  // 8. Live NIFTY Widget Simulation (Real-Time Chart Updates)
  const niftyValEl = document.getElementById('nifty-value');
  const niftyChgEl = document.getElementById('nifty-change');
  const chartBars = document.querySelectorAll('.floating-widget .chart-bar');

  if (niftyValEl && niftyChgEl && chartBars.length > 0) {
    let currentVal = 1.84;
    let currentPts = 412.5;

    setInterval(() => {
      // Random change between -0.05% and +0.07%
      const change = Math.random() * 0.12 - 0.05;
      currentVal += change;
      const ptsChange = change * 224.2;
      currentPts += ptsChange;

      // Update values
      niftyValEl.textContent = `${currentVal >= 0 ? '+' : ''}${currentVal.toFixed(2)}%`;
      niftyChgEl.textContent = `${currentVal >= 0 ? '▲' : '▼'} ${Math.abs(currentPts).toFixed(2)} pts`;

      // Color updates
      if (change >= 0) {
        niftyValEl.style.color = 'var(--secondary)';
        niftyChgEl.style.color = 'var(--secondary)';
      } else {
        niftyValEl.style.color = 'var(--destructive)';
        niftyChgEl.style.color = 'var(--destructive)';
      }

      // Update chart bar heights dynamically (slide values left, push new)
      const heights = Array.from(chartBars).map((bar) =>
        parseFloat(bar.style.height || 50),
      );
      heights.shift(); // remove first
      let newHeight = heights[heights.length - 1] + (Math.random() * 20 - 10);
      newHeight = Math.max(30, Math.min(95, newHeight));
      heights.push(newHeight);

      chartBars.forEach((bar, idx) => {
        bar.style.height = `${heights[idx]}%`;
      });
    }, 2500);
  }

  // 9. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach((el) => revealOnScroll.observe(el));
  }
});
