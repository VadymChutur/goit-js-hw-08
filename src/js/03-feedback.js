import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputField, 500));

populateMessageOutput();

function onInputField(evt) {
  const { name, value } = evt.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateMessageOutput() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (parsedMessage) {
    refs.textarea.value = parsedMessage.message;
    refs.form.email.value = parsedMessage.email;
  }
}
