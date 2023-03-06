module.exports = { closeModal: () => {const modal = document.querySelector('.modal');
modal.classList.remove('modal--active');}, openModal: (message) => {const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal__message');
modalMessage.textContent = message;
modal.classList.add('modal--active');} };

//closeModal function defined


//openModal function defined


//Export closeModal, openModal to be used within login.js

