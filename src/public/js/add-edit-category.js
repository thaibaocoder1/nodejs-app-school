import { setTextContent } from '/utils/common.js';
// functions
function createSchema() {}
function initEditFormCategory({ idForm }) {
  const form = document.querySelector(idForm);
  if (!form) return;
  const inputElement = form.querySelector("[name='title']");
  inputElement.addEventListener('blur', () => {
    if (inputElement.value === '') {
      setTextContent(
        inputElement.parentElement,
        '.invalid-feedback',
        'Không được để trống tiêu đề',
      );
      return;
    }
  });
  inputElement.addEventListener('input', () => {
    setTextContent(inputElement.parentElement, '.invalid-feedback', '');
    return;
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      if (inputElement.value === '') {
        setTextContent(
          inputElement.parentElement,
          '.invalid-feedback',
          'Không được để trống tiêu đề',
        );
        return;
      }
      form.submit();
    } catch (error) {
      console.log(error);
    }
  });
}
// main
(() => {
  initEditFormCategory({
    idForm: '#formEditCategory',
  });
})();
