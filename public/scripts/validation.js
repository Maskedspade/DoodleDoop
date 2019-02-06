$(() => {

  // front-end helper function
  const appendError = (errorContent) => {
    const errorMsg = $(`<p class="row justify-content-center error-msg">${errorContent}</p>`);
    $('#before-err-msg').after(errorMsg);
  };

   const checkEmpty = (content) => {
    if (!content) {
      return false;
    }
    if (content.split(' ').join('') === '') {
      return false;
    }
    return true;
  };

  const submitLogin = (event) => {
    event.preventDefault();
    $('.error-msg').remove();
    const userEmail = $("#login input[name='email']").val();
    const userPassword = $("#login input[name='passid']").val();

    if (!(checkEmpty(userEmail) && checkEmpty(userPassword))) {
      appendError('Cannot be blank.');
      return;
    }
    $.ajax(
      { method: 'POST',
        url: '/api/users',
        data:{
          form: 'login',
          userEmail: userEmail,
          userPassword: userPassword,
        },
        success: (hint) => {
          if (hint === 'success') {
            window.location.href = '/';
          }
          if (hint !== 'success') {
            appendError(hint);
          }
        }
      }
    );
  };

  const submitRegistration = (event) => {
    event.preventDefault();
    $('.error-msg').remove();
    const userName = $("#registration input[name='name']").val();
    const userEmail = $("#registration input[name='email']").val();
    const userPassword = $("#registration input[name='passid']").val();
    const userPassword2 = $("#registration input[name='passid2']").val();

    if (!(checkEmpty(userName) && checkEmpty(userEmail) && checkEmpty(userPassword) && checkEmpty(userPassword2))) {
      appendError('Cannot be blank.');
      return;
    }
    if (userPassword !== userPassword2) {
      appendError('Password does not match');
      return;
    }
    $.ajax(
      { method: 'POST',
        url: '/api/users',
        data:{
          form: 'registration',
          userName: userName,
          userEmail: userEmail,
          userPassword: userPassword,
          userPassword2: userPassword2,
        },
        success: (hint) => {
          if (hint === 'success') {
            window.location.href = '/';
          }
          else {
            appendError(hint);
          }
        }
      }
    );
  };

  $('#login').on('submit', submitLogin);
  $('#registration').on('submit', submitRegistration);

});
