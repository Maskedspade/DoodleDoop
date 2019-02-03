$(() => {

  const submitLogin = (event) => {
    event.preventDefault();
    $('.error-msg').remove();
    const userEmail = $("#login input[name='email']").val();
    const userPassword = $("#login input[name='passid']").val();

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
          else {
            const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint} </p>`);
            $('#before-err-msg').after(errorMsg);
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
            const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint} </p>`);
            $('#before-err-msg').after(errorMsg);
          }
        }
      }
    );
  };

  //JQUERY EVENT-EMITTERS BELOW
  $('#login').on('submit', submitLogin);
  $('#registration').on('submit', submitRegistration);

});
