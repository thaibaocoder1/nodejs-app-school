async function handleOnSubmitForm(data) {
  try {
    console.log(data);
  } catch (error) {
    console.log('Đăng nhập thất bại');
  }
}
// main
(() => {
  Validator({
    formID: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isRequired('#email'),
      Validator.isEmail('#email'),
      Validator.isRequired('#password'),
      Validator.minLength('#password', 6),
    ],
    onSubmit: handleOnSubmitForm,
  });
})();
