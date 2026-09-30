# Independent Bookstore Events Page 📖
**Ticket ID:** ENG-18072  
**Epic:** Core Infrastructure Overhaul  
**Priority:** P1 (High)  

## 🎯 Project Overview
A digital events management portal built for bookstore floor staff to view, search, filter, and publish bookstore events (author signings, book clubs, Q&A sessions), replacing manual paper/excel systems.

## ✨ Key Features
- **Semantic HTML5 & Monochromatic CSS:** Clean corporate design with consistent 16px/32px spacing.
- **Unhappy Path Handling:**
  - **Empty States:** Displays user-friendly "No data found" screen when search returns 0 results.
  - **Bad Connectivity Support:** Visual loading spinner for async search & filtering latency.
  - **Invalid Inputs:** Form validation with high-contrast red border highlighting on error.
- **Accessibility (a11y):** 100% Lighthouse accessibility rating with complete keyboard navigation & ARIA attributes.
- **Telemetry Simulation:** Simulated analytics ping logged to console (`[Analytics] User interacted...`).
- **Security:** XSS input sanitization before state storage.

## 🛠️ Tech Stack
- Pure Semantic HTML5
- Vanilla CSS
- Vanilla JavaScript (ES6)

## 🚀 Live Demo
- **Deployed URL:** [(https://bookstore-events-page-project2.vercel.app/)]
