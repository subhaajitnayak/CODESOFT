document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.textContent.toLowerCase();
      const targetSection = document.querySelector(`.${targetId}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hire me button scrolls to contact form
  const hireMeBtn = document.getElementById('hireMeBtn');
  if (hireMeBtn) {
    hireMeBtn.addEventListener('click', () => {
      const contactSection = document.querySelector('.contact_info');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Download CV button triggers download of CV file
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      window.open('Subhajit_Nayak_CV.pdf', '_blank');
    });
  }

  // Basic form validation and submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      // Simple validation example
      if (!contactForm.checkValidity()) {
        alert('Please fill out all required fields correctly.');
        return;
      }
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
});
