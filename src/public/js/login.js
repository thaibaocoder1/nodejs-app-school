async function handleOnSubmitForm(data) {
  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const dataRes = await res.json();
    if (dataRes.accessToken && dataRes.refreshToken) {
      setTimeout(() => {
        window.location.assign('/');
      }, 1000);
    }
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
