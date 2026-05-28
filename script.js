const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const form = document.getElementById('contactForm');

if (form) {
  const error = document.getElementById('formError');
  const success = document.getElementById('formSuccess');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';

    if (error) error.textContent = '';
    if (success) success.textContent = '';

    if (!email && !phone) {
      if (error) {
        error.textContent = 'Please provide either an email address or phone number so we can contact you.';
      }
      return;
    }

    if (!name || !message) {
      if (error) {
        error.textContent = 'Please complete your name and message before sending.';
      }
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();

        if (success) {
          success.textContent = 'Thank you. Your message has been sent. Redirecting to the homepage...';
        }

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 3500);
      } else {
        const data = await response.json().catch(() => ({}));
        const formspreeError = data?.errors?.map(item => item.message).join(' ') || '';

        if (error) {
          error.textContent = formspreeError || 'Sorry, something went wrong. Please try again or email hello@kerieth.com.';
        }

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      }
    } catch (err) {
      if (error) {
        error.textContent = 'Sorry, something went wrong. Please check your connection or email hello@kerieth.com.';
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    }
  });
}
