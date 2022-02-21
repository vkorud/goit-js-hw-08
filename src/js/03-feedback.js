import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";
const formEl = document.querySelector(".feedback-form");
initForm();

function initForm() {
    const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (formData) {
        Object.entries(formData).forEach(([name, value]) => { formEl.elements[name].value = value })
}
};

formEl.addEventListener("submit", evt => {
    evt.preventDefault();

    const {
    elements: { email, message }
    } = evt.currentTarget;
    console.log({ email: email.value, message: message.value });
    
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
})

formEl.addEventListener("input", throttle((evt => {
    let formData = localStorage.getItem(STORAGE_KEY);
    formData = formData ? JSON.parse(formData) : {};
    formData[evt.target.name] = evt.target.value;

    if (formData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
}), 1000));


