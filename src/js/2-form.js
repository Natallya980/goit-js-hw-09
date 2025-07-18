const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

loadFormData();

form.addEventListener('input', onInputChange);
form.addEventListener('submit', onFormSubmit);

function onInputChange(evt) {
  const { name, value } = evt.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (e) {
    console.error('Error parsing saved form data:', e);
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log({ email, message });

  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}
