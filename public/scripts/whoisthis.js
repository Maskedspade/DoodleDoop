$(() => {

  const hiddenURL = $('#guest-short-url');

  const submitIdentity = (event) => {
    event.preventDefault();

    // value is either first-time-guest or returning-guest
    const radioValue = $("#who-is-this input[name='groupOfRadios']:checked").val();

      $('#who-is-this').fadeOut("slow", function() {
      if (radioValue === 'first-time-guest') {
        $("#first-time-guest").fadeIn();
      }
      if(radioValue === 'returning-guest') {
        $("#returning-guest").fadeIn();
      }
    });
  };

  const redirectToGuestEvent = (respondentInfo, templateVars) => {};

  const submitAsFirstTime = (event) => {
    event.preventDefault();
    $('.error-msg').remove();
    const guestEmail = $("#first-time-guest input[name='email']").val();
    const guestName = $("#first-time-guest input[name='name']").val();

    console.log(guestEmail, guestName);
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: {
        form: 'identity',
        status: 'first-timer',
        email: guestEmail,
        name: guestName
      },
      success: (hint) => {
        if (hint.message === 'success') {
            redirectToGuestEvent(hint['respondentInfo'], hint['templateVars']);
        } else {
          const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint} </p>`);
          console.log($('#before-err-msg'), errorMsg);
          $('body').append(errorMsg);
          $('#before-err-msg').after(errorMsg);
        }
      }
    });
  };

  const submitAsReturning = (event) => {
    event.preventDefault();
    $('.error-msg').remove();
    const guestEmail = $("#first-time-guest input[name='email']").val();
    $.ajax({
      method: 'POST',
        url: '/api/users',
      data: {
        form: 'identity',
        status: 'returning',
        email: guestEmail,
        name: null
      },
      success: (hint) => {
        if (hint.message === 'success') {
            redirectToGuestEvent(hint['respondentInfo'], hint['templateVars']);
        } else {
          const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint.message} </p>`);
          $('#before-err-msg').after(errorMsg);
        }
      }
    });
  };



  //JQUERY EVENT-EMITTERS BELOW
  $('#who-is-this').on('submit', submitIdentity);
  $('#first-time-guest').on('submit', submitAsFirstTime);
  $('#returning-guest').on('submit', submitAsReturning);
});
