// Import modal functions
import { openModal, closeModal } from '../views/partials/loginPartial.js';

async function loginFormHandler(event) {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#loginEmail').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (email && password) {
    // Send a POST request to the /api/user/login route
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      console.error(response.statusText);
      // Clear the email and password fields on unsuccessful login attempt
      document.querySelector('#loginEmail').value = '';
      document.querySelector('#loginPassword').value = '';

      // Display modal with error message
      const modal = document.querySelector('.modal');
      const modalMessage = document.querySelector('.modal__message');
      modalMessage.textContent = 'Incorrect email or password.';
      modal.classList.add('modal--active');
    }
  }
}

// Hide modal on click
const modalCloseHandler = (event) => {
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal--active');
};

// Event listeners
const loginForm = document.querySelector('#loginForm');
const modalCloseButton = document.querySelector('#modal-cancel');
loginForm.addEventListener('submit', loginFormHandler);
modalCloseButton.addEventListener('click', modalCloseHandler);

const signupFunction = async (event) => {
  event.preventDefault();
  $('#loginContainer').hide();
  $('#signupContainer').show();
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ name: name, email: email, password: password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.error(response.statusText);
    }
  }
};

document
  .getElementById('loginBtnSignIn')
  .addEventListener('click', loginFormHandler); // add event listener for when the login button is clicked

document.getElementById('signupBtn').addEventListener('click', signupFunction);

document
  .getElementById('signupSubmit')
  .addEventListener('click', signupFormHandler);
