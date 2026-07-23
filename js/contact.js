'use strict';

// Handles validation and submission for the contact form.
document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------
  const FIELD_NAMES = ['name', 'email', 'subject', 'message'];
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MESSAGE_MIN_LENGTH = 10;

  // ---------------------------------------------------------------------
  // DOM elements
  // ---------------------------------------------------------------------
  const form = document.querySelector('#contact-form');
  const successMessage = document.querySelector('#form-success');

  if (!form) return;

  // ---------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------

  // Checks one field and returns an error message, or an empty string if it's valid
  function getFieldError(name, value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return 'This field is required.';
    }

    if (name === 'email' && !EMAIL_PATTERN.test(trimmedValue)) {
      return 'Enter a valid email address.';
    }

    if (name === 'message' && trimmedValue.length < MESSAGE_MIN_LENGTH) {
      return 'Please enter at least 10 characters.';
    }

    return '';
  }

  // Validates every field, shows any errors, and returns whether the form is valid
  function validateForm() {
    let isValid = true;

    FIELD_NAMES.forEach(name => {
      const field = form.elements[name];
      const errorElement = document.querySelector(`#${name}-error`);
      const errorMessage = getFieldError(name, field.value);

      errorElement.textContent = errorMessage;
      field.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');

      if (errorMessage) {
        isValid = false;
      }
    });

    return isValid;
  }

  // ---------------------------------------------------------------------
  // Form submission
  // ---------------------------------------------------------------------

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!validateForm()) return;

    successMessage.hidden = false;
    form.reset();
  });
});
