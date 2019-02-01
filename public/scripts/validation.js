$(() => {

  const submitLogin = () => {
    event.preventDefault();

    const userEmail = $("#login input[name='email']").val();
    const userPassword = $("#login input[name='passid']").val();

    $.ajax(
      { method: 'POST',
        url: '/api/users',
        data:{
          userEmail: userEmail,
          userPassword: userPassword,
        },
        success: (hint) => {
          if (hint === 'success') {
            window.location.href = '/';
          }
          else {

          }
        }
      });
  };

  //JQUERY EVENT-EMITTERS BELOW
  $('#login').on('submit', submitLogin);

  // $('.registration').on('submit', submitRegistration);
  // $('.who-is-this').on('submit', submitIdentity);

});