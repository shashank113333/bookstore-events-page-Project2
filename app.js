/**
 * Independent Bookstore Events Page - Core Logic
 * Ticket ID: ENG-18072
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. शुरुआती डेटा (Initial Events Data)
  // ==========================================
  let eventsList = [
    {
      id: 'evt-1',
      title: 'Contemporary Fiction Book Club',
      author: 'Hosted by Shashank Vishwakarma',
      date: '2026-10-15',
      time: '18:00',
      category: 'Reading Club',
      capacity: 30,
      description: 'Join us for a lively discussion on the latest award-winning fiction releases. Refreshments provided.'
    },
    {
      id: 'evt-2',
      title: 'Sci-Fi Universe: Author Q&A',
      author: 'Featuring Amit Sharma',
      date: '2026-10-20',
      time: '19:30',
      category: 'Author Q&A',
      capacity: 75,
      description: 'An exclusive interactive evening with senior science fiction authors discussing world-building and future tech.'
    },
    {
      id: 'evt-3',
      title: 'Children\'s Weekend Storytime',
      author: 'Hosted by Neha Gupta',
      date: '2026-10-24',
      time: '11:00',
      category: 'Children\'s Storytime',
      capacity: 40,
      description: 'Interactive storytelling session for children aged 4-10 with crafts and picture book readings.'
    }
  ];

  // DOM एलिमेंट्स को सेलेक्ट करना
  const eventsGrid = document.getElementById('events-grid');
  const emptyState = document.getElementById('empty-state');
  const loadingIndicator = document.getElementById('loading-indicator');
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const resetSearchBtn = document.getElementById('reset-search-btn');
  const addEventForm = document.getElementById('add-event-form');
  const formErrorAlert = document.getElementById('form-error-alert');

  // ==========================================
  // 2. XSS Input Sanitization (सुरक्षा NFR)
  // ==========================================
  /**
   * हानिकारक HTML कोड को हटाकर इनपुट को सेफ बनाता है
   */
  function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    const tempDiv = document.createElement('div');
    tempDiv.textContent = str;
    return tempDiv.innerHTML.trim();
  }

  // ==========================================
  // 3. Telemetry Analytics Simulation (NFR)
  // ==========================================
  /**
   * ब्राउज़र कंसोल में एनालिटिक्स मैसेज प्रिंट करता है
   */
  function logTelemetry(actionDetail) {
    console.log(`[Analytics] User interacted with Independent Bookstore Events Page - ${actionDetail}`);
  }

  // पेज लोड होने पर एनालिटिक्स पिंग
  logTelemetry('Initial Page Load Completed');

  // ==========================================
  // 4. Async Loading Simulation (Bad Connectivity Support)
  // ==========================================
  /**
   * धीमे इंटरनेट ऑपरेशन्स के दौरान स्पिनर दिखाता है
   */
  function simulateAsyncOperation(callback) {
    loadingIndicator.hidden = false;
    eventsGrid.style.opacity = '0.3';
    
    // 3G कनेक्शन की लेटेंसी सिमुलेट करना (400ms)
    setTimeout(() => {
      loadingIndicator.hidden = true;
      eventsGrid.style.opacity = '1';
      if (callback) callback();
    }, 400);
  }

  // ==========================================
  // 5. इवेंट्स रेंडर करना और Empty State हैंडलिंग
  // ==========================================
  function renderEvents() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    // फिल्टर लॉजिक
    const filteredEvents = eventsList.filter(evt => {
      const matchesSearch = 
        evt.title.toLowerCase().includes(query) ||
        evt.author.toLowerCase().includes(query) ||
        evt.description.toLowerCase().includes(query);
      
      const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    eventsGrid.innerHTML = '';

    // Empty State Handling (Unhappy Path Requirement)
    if (filteredEvents.length === 0) {
      emptyState.hidden = false;
      eventsGrid.hidden = true;
      return;
    }

    emptyState.hidden = true;
    eventsGrid.hidden = false;

    // इवेंट कार्ड्स बनाना
    filteredEvents.forEach(evt => {
      const card = document.createElement('article');
      card.className = 'event-card';
      card.setAttribute('aria-label', `Event: ${evt.title}`);

      card.innerHTML = `
        <span class="event-badge">${sanitizeInput(evt.category)}</span>
        <h3 class="event-card-title">${sanitizeInput(evt.title)}</h3>
        <div class="event-meta">
          <p><strong>Host:</strong> ${sanitizeInput(evt.author)}</p>
          <p><strong>Date & Time:</strong> ${sanitizeInput(evt.date)} at ${sanitizeInput(evt.time)}</p>
          <p><strong>Capacity:</strong> ${sanitizeInput(String(evt.capacity))} Seats</p>
        </div>
        <p class="event-description">${sanitizeInput(evt.description)}</p>
      `;

      eventsGrid.appendChild(card);
    });
  }

  // शुरुआत में इवेंट्स रेंडर करना
  renderEvents();

  // ==========================================
  // 6. सर्च और फ़िल्टर इवेंट लिसनर्स
  // ==========================================
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      logTelemetry(`Search Query Changed to "${searchInput.value}"`);
      simulateAsyncOperation(renderEvents);
    }, 300);
  });

  categoryFilter.addEventListener('change', () => {
    logTelemetry(`Category Filter Changed to "${categoryFilter.value}"`);
    simulateAsyncOperation(renderEvents);
  });

  resetSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = 'all';
    logTelemetry('Reset Search & Filters Clicked');
    simulateAsyncOperation(renderEvents);
  });

  // ==========================================
  // 7. फॉर्म वैलिडेशन और Red Highlighting (Unhappy Path)
  // ==========================================
  const formFields = [
    { id: 'event-title', name: 'Title', errorId: 'title-error' },
    { id: 'event-author', name: 'Author / Host', errorId: 'author-error' },
    { id: 'event-date', name: 'Date', errorId: 'date-error' },
    { id: 'event-time', name: 'Time', errorId: 'time-error' },
    { id: 'event-category', name: 'Category', errorId: 'category-error' },
    { id: 'event-capacity', name: 'Capacity', errorId: 'capacity-error' },
    { id: 'event-description', name: 'Description', errorId: 'description-error' }
  ];

  function clearValidationErrors() {
    formErrorAlert.hidden = true;
    formFields.forEach(field => {
      const inputEl = document.getElementById(field.id);
      const errorSpan = document.getElementById(field.errorId);
      if (inputEl) inputEl.classList.remove('invalid');
      if (errorSpan) errorSpan.textContent = '';
    });
  }

  function validateForm() {
    clearValidationErrors();
    let isValid = true;
    let firstInvalidInput = null;

    formFields.forEach(field => {
      const inputEl = document.getElementById(field.id);
      const errorSpan = document.getElementById(field.errorId);
      const val = inputEl ? inputEl.value.trim() : '';

      if (!val) {
        isValid = false;
        if (inputEl) inputEl.classList.add('invalid'); // इनपुट पर लाल बॉर्डर लगाना
        if (errorSpan) errorSpan.textContent = `${field.name} is required.`;
        if (!firstInvalidInput) firstInvalidInput = inputEl;
      } else if (field.id === 'event-capacity' && (isNaN(val) || Number(val) <= 0)) {
        isValid = false;
        if (inputEl) inputEl.classList.add('invalid');
        if (errorSpan) errorSpan.textContent = 'Please enter a valid capacity greater than 0.';
        if (!firstInvalidInput) firstInvalidInput = inputEl;
      }
    });

    if (!isValid) {
      formErrorAlert.hidden = false;
      if (firstInvalidInput) firstInvalidInput.focus();
    }

    return isValid;
  }

  // टाइप करते ही लाल बॉर्डर हटाना
  formFields.forEach(field => {
    const inputEl = document.getElementById(field.id);
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        if (inputEl.classList.contains('invalid') && inputEl.value.trim()) {
          inputEl.classList.remove('invalid');
          const errorSpan = document.getElementById(field.errorId);
          if (errorSpan) errorSpan.textContent = '';
        }
      });
    }
  });

  // फॉर्म सबमिशन
  addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      logTelemetry('Form Submission Failed - Validation Errors Highlighted in Red');
      return;
    }

    // सैनिटाइज्ड वैल्यूज निकालना
    const newEvent = {
      id: `evt-${Date.now()}`,
      title: sanitizeInput(document.getElementById('event-title').value.trim()),
      author: sanitizeInput(document.getElementById('event-author').value.trim()),
      date: sanitizeInput(document.getElementById('event-date').value),
      time: sanitizeInput(document.getElementById('event-time').value),
      category: sanitizeInput(document.getElementById('event-category').value),
      capacity: Number(document.getElementById('event-capacity').value),
      description: sanitizeInput(document.getElementById('event-description').value.trim())
    };

    eventsList.unshift(newEvent);

    logTelemetry(`Successfully Created New Event: "${newEvent.title}"`);

    addEventForm.reset();
    clearValidationErrors();

    simulateAsyncOperation(() => {
      renderEvents();
      document.querySelector('.events-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
});