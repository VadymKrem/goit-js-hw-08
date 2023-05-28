import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form')
}

const getDataFromLocalStorage = localStorage.getItem("feedback-form-state");

onReadDataForm();
function onReadDataForm() {
    if (getDataFromLocalStorage) {
        refs.form.email.value = JSON.parse(getDataFromLocalStorage).email;
        refs.form.message.value = JSON.parse(getDataFromLocalStorage).message;
    } 
}


refs.form.addEventListener('input', throttle(onNewInputEmail, 500));
refs.form.addEventListener('submit', onSubmitForm);

function onNewInputEmail() {
    const dataForm = new FormData(refs.form)
    const dataStorage = {};
    dataForm.forEach((value, name) => {
    dataStorage[name] = value;
  });
  localStorage.setItem("feedback-form-state", JSON.stringify(dataStorage));
}

function onSubmitForm(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
}
