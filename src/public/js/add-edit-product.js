// functions
function getFormValues(formElement) {
  if (!formElement) return;
  const formValues = {};
  const data = new FormData(formElement);
  for (const [key, value] of data) {
    formValues[key] = value;
  }
  return formValues;
}
function jsonToFormData(formValues) {
  const formData = new FormData();
  for (const key in formValues) {
    formData.set(key, formValues[key]);
  }
  return formData;
}
function initAddForm({ idForm }) {
  const formElement = document.getElementById(idForm);
  if (!formElement) return;
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formValues = getFormValues(formElement);
    const formData = jsonToFormData(formValues);
    const pathname = window.location.pathname;
    if (pathname.includes('edit')) {
      const res = await fetch(formElement.action, {
        method: 'POST',
        body: formData,
      });
      if (res.ok && res.status === 201) {
        toast.success('Cập nhật thành công');
        setTimeout(() => {
          window.location.assign('/admin/products');
        }, 500);
      }
    } else {
      const res = await fetch(formElement.action, {
        method: 'POST',
        body: formData,
      });
      if (res.ok && res.status === 201) {
        toast.success('Thêm mới thành công');
        setTimeout(() => {
          window.location.assign('/admin/products');
        }, 500);
      }
    }
  });
}
function initImage({ idElement, nameFileElement }) {
  const imageEl = document.getElementById(idElement);
  const inputFile = document.querySelector(`input[name='${nameFileElement}']`);
  if (!imageEl && !inputFile) return;
  inputFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imageEl.src = imageUrl;
    }
  });
}
// main
(async () => {
  initImage({
    idElement: 'imageUrl',
    nameFileElement: 'thumb',
  });
  initAddForm({
    idForm: 'formProduct',
  });
})();
