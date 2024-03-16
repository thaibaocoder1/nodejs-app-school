import { setTextContent } from '/utils/common.js';
import { toast } from '/utils/toast.js';
import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1.4.0/+esm';

function setFieldError(form, name, error) {
  const element = form.querySelector(`input[name='${name}']`);
  if (element) {
    element.setCustomValidity(error);
    setTextContent(element.parentElement, '.invalid-feedback', error);
  }
}
function getCategorySchema() {
  return yup.object({
    title: yup
      .string()
      .required('Không được để trống trường này')
      .test(
        'at-least-two-words',
        'Danh mục phải tối thiểu 1 từ',
        (value) =>
          value.split(' ').filter((x) => !!x && x.length >= 3).length >= 1,
      ),
  });
}
async function vaidateEditCategoryForm(form, formValues) {
  try {
    ['title'].forEach((name) => setFieldError(form, name, ''));
    const schema = getCategorySchema();
    await schema.validate(formValues, {
      abortEarly: false,
    });
  } catch (error) {
    const errorLog = {};
    for (const validationError of error.inner) {
      const name = validationError.path;
      if (errorLog[name]) continue;
      setFieldError(form, name, validationError.message);
      errorLog[name] = true;
    }
  }
  const isValid = form.checkValidity();
  if (!isValid) form.classList.add('was-validated');
  return isValid;
}
// functions
function initEditFormCategory({ idForm }) {
  const form = document.querySelector(idForm);
  if (!form) return;
  const inputElement = form.querySelector("[name='title']");
  const { pathname } = window.location;
  inputElement.addEventListener('blur', async () => {
    await vaidateEditCategoryForm(form, {
      title: inputElement.value,
    });
  });
  inputElement.addEventListener('input', () => {
    ['title'].forEach((name) => setFieldError(form, name, ''));
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const isValid = await vaidateEditCategoryForm(form, {
        title: inputElement.value,
      });
      if (!isValid) return;
      const res = await fetch(form.action, {
        method: pathname.includes('add') ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inputElement.value,
        }),
      });
      if (res.status === 201 && res.ok) {
        toast.success(
          pathname.includes('add')
            ? 'Thêm mới thành công'
            : 'Cập nhật thành công',
        );
        setTimeout(() => {
          window.location.assign('/admin/category');
        }, 500);
      }
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
