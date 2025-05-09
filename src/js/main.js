// Import our custom CSS
import '../scss/styles.scss';
import './faq-icons';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { Tooltip, Toast, Modal } from 'bootstrap';

// Initialize a tooltip
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl);
});

