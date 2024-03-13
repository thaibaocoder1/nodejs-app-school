async function handleOnSubmitForm(data) {
  if (data) {
    data['roleID'] = 1;
    data['imageUrl'] = 'https://placehold.co/400x400';
  }
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.status) {
      window.location.assign('/login');
    }
  } catch (error) {
    console.log('error', error);
  }
}
// main
(() => {
  Validator({
    formID: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ'),
      Validator.isRequired('#username', 'Vui lòng nhập tên đăng nhập'),
      Validator.isRequired('#email'),
      Validator.isEmail('#email'),
      Validator.isRequired('#phone'),
      Validator.isPhone('#phone'),
      Validator.isRequired('#password'),
      Validator.minLength('#password', 6),
      Validator.isRequired('#password_confirmation'),
      Validator.isConfirmed(
        '#password_confirmation',
        function () {
          return document.querySelector('#form-1 #password').value;
        },
        'Mật khẩu nhập lại không khớp',
      ),
    ],
    onSubmit: handleOnSubmitForm,
  });
})();
