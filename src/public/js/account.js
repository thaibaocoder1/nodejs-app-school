import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1.4.0/+esm';

function getSchema() {
  return yup.object({
    oldPassword: yup.string().required('Không được để trống trường này'),
    password: yup.string().required('Không được để trống trường này'),
    retypePassword: yup.string().required('Không được để trống trường này'),
  });
}
function initForm({ idForm }) {
  const form = document.getElementById(idForm);
  if (!form) return;
}
// main
(async () => {
  const toggleWrapper = document.querySelectorAll('.icons-toggle');
  [...toggleWrapper].forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const input = this.parentElement.querySelector('.password');
      input?.setAttribute(
        'type',
        `${input.type === 'password' ? 'text' : 'password'}`,
      );
      const listIcon = this.children;
      Array.from(listIcon).forEach((icon) =>
        icon.classList.toggle('is-active'),
      );
    });
  });
  initForm({
    idForm: 'formChangePassword',
  });
})();
