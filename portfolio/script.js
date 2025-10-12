function createStars() {
      const starsContainer = document.getElementById('stars');
      const numStars = 150;

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
      }
    }

    // Create floating particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const numParticles = 20;

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particlesContainer.appendChild(particle);
      }
    }

    // Initialize background animations
    createStars();
    createParticles();

    // Mobile navigation functionality
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    // Close mobile nav when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Navigation functionality   
 const sections = [
  { element: document.querySelector('#home'), id: 'home' },
  { element: document.querySelector('#about'), id: 'about' },
  { element: document.querySelector('#projects'), id: 'projects' },
  { element: document.querySelector('#contact'), id: 'contact' }
];

const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  let activeSection = 'home';

  // Check each section
  sections.forEach(section => {
    if (section.element) {
      const offsetTop = section.element.offsetTop;
      const height = section.element.offsetHeight;
      
      if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
        activeSection = section.id;
      }
    }
  });

  // Update active class - only for matching section
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    
    if (href === activeSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
        
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Project cards animation on scroll
    const projectObserverOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          const delay = entry.target.dataset.delay || '0';
          entry.target.style.animation = `slideInRight 0.8s ease-out forwards ${delay}s`;
        }
      });
    }, projectObserverOptions);

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
      projectObserver.observe(card);
    });

    // Add slideInRight animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);

    // Contact form functionality
    // Contact form functionality with in-form message
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent default page reload

  const form = this;
  const button = form.querySelector('button');
  const data = new FormData(form);

  // Show sending state
  button.innerHTML = 'Sending...';
  button.disabled = true;

  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Show "Message Sent" in the button itself
      button.innerHTML = 'Message Sent!';
      button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
      form.reset(); // clear form inputs
    } else {
      button.innerHTML = 'Error sending message';
      button.style.background = 'linear-gradient(45deg, #dc3545, #c82333)';
    }

    // Restore button text and color after 3 seconds
    setTimeout(() => {
      button.innerHTML = 'Send Message';
      button.style.background = 'linear-gradient(45deg, #ff6600, #ff8800)';
      button.disabled = false;
    }, 3000);
  })
  .catch(error => {
    console.error(error);
    button.innerHTML = 'Error sending message';
    button.style.background = 'linear-gradient(45deg, #dc3545, #c82333)';
    setTimeout(() => {
      button.innerHTML = 'Send Message';
      button.style.background = 'linear-gradient(45deg, #ff6600, #ff8800)';
      button.disabled = false;
    }, 3000);
  });
});


    // Initialize animations on page load
    document.addEventListener('DOMContentLoaded', () => {
      updateActiveNav();
    });

    // Error handling for missing elements
    window.addEventListener('error', (e) => {
      console.log('Error caught:', e.error);
    });

    // Accessibility improvements
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      }

    });

