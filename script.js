// Toggle navigation menu visibility on hamburger icon click
function toggleNavMenu() {
  const navMenu = document.querySelector('nav');
  const hamburgerIcon = document.querySelector('.hamburger');
  
  if (navMenu && hamburgerIcon) {
    hamburgerIcon.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburgerIcon.classList.toggle('active');
    });
  }
}

// Initialize contact form validation
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const messageInput = form.querySelector('[name="message"]');

  const validateName = (value) => value.trim().length >= 2;
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validateMessage = (value) => value.trim().length >= 10;

  const showError = (input, message) => {
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'feedback error';
      input.after(feedback);
    }
    feedback.textContent = message;
    feedback.className = 'feedback error';
    input.classList.add('invalid');
    input.classList.remove('valid');
  };

  const showSuccess = (input) => {
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'feedback success';
      input.after(feedback);
    }
    feedback.textContent = '✓';
    feedback.className = 'feedback success';
    input.classList.remove('invalid');
    input.classList.add('valid');
  };

  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters');
      } else {
        showSuccess(nameInput);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
      } else {
        showSuccess(emailInput);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters');
      } else {
        showSuccess(messageInput);
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput && !validateName(nameInput.value)) {
      showError(nameInput, 'Name must be at least 2 characters');
      isValid = false;
    }
    if (emailInput && !validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }
    if (messageInput && !validateMessage(messageInput.value)) {
      showError(messageInput, 'Message must be at least 10 characters');
      isValid = false;
    }

    if (isValid) {
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success-message';
      successMsg.textContent = '✓ Thank you! Your message has been sent.';
      form.appendChild(successMsg);
      form.reset();
      form.querySelectorAll('.feedback').forEach(fb => fb.remove());
      form.querySelectorAll('input, textarea').forEach(field => {
        field.classList.remove('valid', 'invalid');
      });
      setTimeout(() => successMsg.remove(), 3000);
    }
  });
}

// Initialize on page load
function initPage() {
  toggleNavMenu();
  initProjectFilters();
  initContactForm();
}

// Projects filter: expects filter buttons with container .project-filters
// each button should have data-filter="tag" (or data-filter="all")
// and project elements should have class .project and data-tags="tag1 tag2"
function initProjectFilters() {
  const filtersContainer = document.querySelector('.project-filters');
  const projects = Array.from(document.querySelectorAll('.project'));
  if (!filtersContainer || projects.length === 0) return;

  filtersContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const filter = btn.getAttribute('data-filter');

    // update active state on buttons
    filtersContainer.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b === btn));

    projects.forEach(p => {
      const tags = (p.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
      const show = filter === 'all' || tags.includes(filter);
      p.style.display = show ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', initPage);

