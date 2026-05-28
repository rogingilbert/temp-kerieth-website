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


/* Static website-only chatbot */
const chatbotKnowledge = [
  {
    keywords: ['service', 'services', 'bookkeeping', 'reporting', 'financial statement', 'reconciliation', 'reconcile'],
    answer: 'Kerieth offers bookkeeping and financial reporting, cleanup and catch-up work, day-to-day accounting support, and systems/process improvement. You can view details on the <a href="services.html">Services page</a>.'
  },
  {
    keywords: ['cleanup', 'catch up', 'catch-up', 'historical', 'messy books', 'behind'],
    answer: 'Cleanup and catch-up work helps organize historical records, reconcile accounts, correct inconsistencies, and rebuild reliable accounting records.'
  },
  {
    keywords: ['day to day', 'daily', 'ap', 'ar', 'accounts payable', 'accounts receivable', 'payroll', 'expense'],
    answer: 'Day-to-day accounting support can include AP, AR, expense reporting, payroll coordination, documentation, and accounting administration.'
  },
  {
    keywords: ['system', 'process', 'workflow', 'dashboard', 'controls', 'automation'],
    answer: 'Kerieth helps with accounting workflow reviews, system setup support, dashboards, controls, and practical automation ideas to make finance operations easier.'
  },
  {
    keywords: ['about', 'founder', 'steffy', 'sam', 'experience'],
    answer: 'Kerieth is led by Steffy Sam, Founder & Accounting Consultant. The firm focuses on clean records, clear reporting, and practical accounting systems. You can learn more on the <a href="about.html">About page</a>.'
  },
  {
    keywords: ['why', 'different', 'choose', 'kerieth', 'benefit'],
    answer: 'Kerieth focuses on personal attention, a clear monthly rhythm, better systems, and an audit-ready mindset. The goal is dependable support without unnecessary complexity.'
  },
  {
    keywords: ['contact', 'email', 'phone', 'location', 'address'],
    answer: 'You can contact Kerieth at <a href="mailto:hello@kerieth.com">hello@kerieth.com</a> or by phone at <a href="tel:5409902630">(540) 990-2630</a>. Kerieth is based in Blacksburg, VA.'
  },
  {
    keywords: ['book', 'schedule', 'consultation', 'call', 'meeting', 'appointment'],
    answer: 'You can book a free 30-minute consultation through the embedded calendar on the <a href="contact.html#schedule">Contact page</a>.'
  },
  {
    keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'package'],
    answer: 'Pricing depends on the level of support needed. The best next step is to book a free 30-minute consultation so Kerieth can understand your needs.'
  },
  {
    keywords: ['remote', 'virtual', 'in person'],
    answer: 'Kerieth can support clients virtually. For specific availability or location questions, please use the contact form or book a consultation.'
  },
  {
    keywords: ['form', 'message', 'send'],
    answer: 'You can send a message through the form on the <a href="contact.html">Contact page</a>. Please provide either an email address or phone number so Kerieth can respond.'
  }
];

function getChatbotAnswer(question) {
  const text = question.toLowerCase();

  if (['hi', 'hello', 'hey'].some(word => text.trim() === word)) {
    return 'Hello. I can help with Kerieth’s services, contact details, and booking information.';
  }

  const match = chatbotKnowledge.find(item =>
    item.keywords.some(keyword => text.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return 'I can only answer questions about Kerieth Accounting Solutions, including services, contact details, and booking a consultation. For anything specific, please use the contact form or book a free 30-minute consultation.';
}

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

function addChatbotMessage(content, type) {
  if (!chatbotMessages) return;

  const message = document.createElement('div');
  message.className = type === 'user' ? 'user-message' : 'bot-message';
  message.innerHTML = content;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatbotToggle && chatbotPanel) {
  chatbotToggle.addEventListener('click', () => {
    chatbotPanel.classList.toggle('open');
  });
}

if (chatbotClose && chatbotPanel) {
  chatbotClose.addEventListener('click', () => {
    chatbotPanel.classList.remove('open');
  });
}

if (chatbotForm && chatbotInput) {
  chatbotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = chatbotInput.value.trim();

    if (!question) return;

    addChatbotMessage(question, 'user');
    chatbotInput.value = '';

    setTimeout(() => {
      addChatbotMessage(getChatbotAnswer(question), 'bot');
    }, 250);
  });
}


/* Back to top button */
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  toggleBackToTop();
}
