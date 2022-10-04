import throttle from 'lodash.throttle';
import { save, load, remove } from './storage-control';

const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

populateMessageOutput();

const onFormInput = evt => {
  const { name, value } = evt.target;
  let saveData = load(STORAGE_KEY);
  saveData = saveData ? saveData : {};
  saveData[name] = value;
  save(STORAGE_KEY, saveData);
};

const throttleOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttleOnFormInput);

function populateMessageOutput() {
  const saveData = load(STORAGE_KEY);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

const onFormSubmit = evt => {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();
  remove(STORAGE_KEY);
};

formRef.addEventListener('submit', onFormSubmit);
