$(() => {

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
  }


  const submitAsFirstTime = () => {
    const guestEmail = $("#first-time-guest input[name='email']").val();
    const guestEname = $("#first-time-guest input[name='name']");
    $.ajax({
      method: 'POST',
      url: 'api/users',
      data: {
        form: 'identity',
        status: 'first-timer',
        email: guestEmail,
        name: guestName
      },
      success: (hint) => {
        if (hint === 'success') {
          window.location.href = '/event/guestURL';
        } else {
          const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint} </p>`);
          $('#before-err-msg').after(errorMsg);
        }
      }
    });
  };

  const submitAsReturning = () => {
    const guestEmail = $("#first-time-guest input[name='email']").val();
    $.ajax({
      method: 'POST',
      url: 'api/users',
      data: {
        form: 'identity',
        status: 'returning',
        email: guestEmail,
        name: null
      },
      success: (hint) => {
        if (hint === 'success') {
          window.location.href = '/event/guestURL';
        } else {
          const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint} </p>`);
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
