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

  function submitAsReturning (event) {
    event.preventDefault();
    $('.error-msg').remove();

    const guestEmail = $('input[name="email"]').val();
    const hiddenURL = $('#guest-short-url')[0].textContent;

    if (!checkEmpty(guestEmail)) {
      appendError('Cannot be blank');
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: {
        form: 'identity',
        status: 'returning',
        name: null,
        email: guestEmail,
        guestURL: hiddenURL,
      },
      success: (hint) => {
        if (hint === 'success') {
            window.location.href = `/event/${hiddenURL}`;
        } else {
          appendError(hint);
        }
      }
    });
  }

  function submitAsFirstTime (event) {
    event.preventDefault();
    $('.error-msg').remove();

    const guestEmail = $('input[name="email"]').val();
    const guestName = $('input[name="name"]').val();

    if (!(checkEmpty(guestEmail) && checkEmpty(guestName))) {
      appendError('Cannot be blank.');
    }
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data:{
        form: 'identity',
        status: 'first-time',
        name: guestName,
        email: guestEmail,
        guestURL: hiddenURL,
      },
      success: (hint) => {
        if (hint === 'success') {
            window.location.href = `/event/${hiddenURL}`;
        } else {
          appendError(hint);
        }
      }
    });
  }

  const submitIdentity = (event) => {
    event.preventDefault();

    const $radioValue = $("#who-is-this input[name='groupOfRadios']:checked").val();

    if ($radioValue === 'returning-guest') {
      $('#who-is-this').remove();
      const $form = $('<form class="user-input" id="returning-guest">');

      const $divwrapper = $('<div class="row justify-content-between"></div>');
      $divwrapper.append($(`<a href="/event/${hiddenURL}" name="cancel" class="col-sm btn-submit text-center" style="margin-top: 35px">Cancel</a>`));
      $divwrapper.append($('<input class="col btn-submit" type="submit" name="submit" value="Submit" />'));

      $form.append($('<h3 class="row justify-content-center">Hey, friend!</h3>'));
      $form.append($('<input class="row" id="before-err-msg" type="email" name="email" placeholder="Your email here"/>'));
      $form.append($divwrapper);

      $form.on('submit', submitAsReturning);
      $('div[class="container"]').append($form);
    }

    if ($radioValue === 'first-time-guest') {
      $('#who-is-this').remove();
      const $form = $('<form class="user-input" id="first-time-guest">');

      const $divwrapper = $('<div class="row justify-content-between"></div>');
      $divwrapper.append($(`<a href="/event/${hiddenURL}" name="cancel" class="col-sm btn-submit text-center" style="margin-top: 35px">Cancel</a>`));
      $divwrapper.append($('<input class="col btn-submit" type="submit" name="submit" value="Submit" />'));

      $form.append($('<h3 class="row justify-content-center">Hey, new friend!</h3>'));
      $form.append($('<input class="row" type="email" name="email" placeholder="Email"/>'));
      $form.append($('<input class="row" id="before-err-msg" type="text" name="name" placeholder="Name"/>'));
      $form.append($divwrapper);

      $form.on('submit', submitAsFirstTime);
      $('div[class="container"]').append($form);
    }
  };

  $('#who-is-this').on('submit', submitIdentity);
});
