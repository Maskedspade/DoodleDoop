$(() => {

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

 const submitIdentity = (event) => {
    event.preventDefault();
    // $('.error-msg').remove();

    const checked = $("input[type='radio'][name='identity']:checked").val();

    $.ajax(
      { method: 'POST',
        url: '/api/users',
        data:{
          form: 'identity',
          userIdentity: checked,
        },
        success: (hint) => {
          // if (hint === 'success') {
          //   window.location.href = '/';
          // }
          // else {
          //   const errorMsg = $(`<p class="error-msg"> ${hint} </p>`);
          //   $('ul').append(errorMsg);
          // }
        }
      }
    );
  };

  //JQUERY EVENT-EMITTERS BELOW
  $('#who-is-this').on('submit', submitIdentity);

});
