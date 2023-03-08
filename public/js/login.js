// Modal functions
function closeModal() {
  const modal = document.querySelector('#modal');
  modal.classList.add('hidden');
  modal.classList.remove('modal-active');
};

function openModal(message) {
  const modal = document.querySelector('#modal');
  const modalMessage = document.querySelector('.modal-message');
  modalMessage.textContent = message;
  modal.classList.remove('hidden');
  modal.classList.add('modal-active');
};

async function loginFormHandler(event) {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#loginEmail').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (email && password) {
    // Send a POST request to the /api/user/login route
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // Clear the email and password fields on unsuccessful login attempt
      document.querySelector('#loginEmail').value = '';
      document.querySelector('#loginPassword').value = '';

      // Display modal with error message
      openModal('Incorrect email or password, please try again');
      // Event listeners
      const loginForm = document.querySelector('#loginContainer');
      const modalCloseButton = document.querySelector('#modal-cancel');
      loginForm.addEventListener('submit', loginFormHandler);
      modalCloseButton.addEventListener('click', closeModal);
    }
  }
}


const signupFunction = async (event) => {
  event.preventDefault();
  $('#loginContainer').hide();
  $('#signupContainer').show();
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#newUserName').value.trim();
  const email = document.querySelector('#newUserEmail').value.trim();
  const password = document.querySelector('#newUserPassword').value.trim();
  const advisor = false;

  if (username && email && password) {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(
        {
          username: username,
          email: email,
          password: password,
          advisor: advisor
        }),
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
