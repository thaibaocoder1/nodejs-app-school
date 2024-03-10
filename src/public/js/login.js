function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
async function handleOnSubmitForm(data) {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    if (dataRes.success) {
      setCookie('token', dataRes.token, 1);
      setTimeout(() => {
        window.location.assign('/login');
      }, 1000);
    }
  } catch (error) {
    console.log('Đăng nhập thất bại');
  }
}
// main
(() => {
  // check if exists access_token
  let infoUser = localStorage.getItem('user_info');
  if (infoUser !== null) {
    infoUser = JSON.parse(localStorage.getItem('user_info'));
    if (infoUser.length !== 0) {
      const isHasRoleAdmin = infoUser.findIndex((user) => user?.roleID === 2);
      if (isHasRoleAdmin < 0) window.location.assign('/index.html');
    }
  }
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
