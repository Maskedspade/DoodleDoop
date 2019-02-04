$(() => {

  const hiddenURL = $('#guest-short-url')[0].textContent;

  function submitAsReturning (event) {
    event.preventDefault();
    $('.error-msg').remove();
    const guestEmail = $('input[name="email"]')[1].value;

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
        if (hint.message === 'success') {
            redirectToGuestEvent(hint.respondentInfo, hint.templateVars, hiddenURL);
        } else {
          const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint.message} </p>`);
          $('#returning-guest #before-err-msg').after(errorMsg);
        }
      }
    });
  }

  function submitAsFirstTime (event) {
    event.preventDefault();
    $('.error-msg').remove();

    const guestEmail = $('input[name="email"]')[1].value;
    const guestName = $('input[name="name"]')[1].value;

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
        if (hint.message === 'success') {
            redirectToGuestEvent(hint.respondentInfo, hint.templateVars, hiddenURL);
        } else {
          const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint.message} </p>`);
          $('#before-err-msg').after(errorMsg);
        }
      }
    });
  }

  const redirectToGuestEvent = (respondentInfo, templateVars, hiddenURL) => {


    // const $newform = $(`<form id="ready-to-submit-to-server" style="display: none" action="/event/${hiddenURL}" method="POST"></form>`);

    // const $newsubmitbtn = $('<input type="submit" name="submit-to-server" value="click to submit"/>');

    // const $newinput1 = $('<input name="respondentInfo-userName"/>');
    // const $newinput2 = $('<input name="respondentInfo-userEmail"/>');
    // const $newinput3 = $('<input name="">');


    // const $newinput2 = $('<input name="templateVars" value="templateVars"/>');
    // $newinput2.val(JSON.parse(templateVars));

    // $newform.append($newinput1);
    // $newform.append($newinput2);
    // $newform.append($newsubmitbtn);

    // $('body').append($newform);

    // $('#ready-to-submit-to-server').submit();

    // return;

  };

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
      $('.container').append($form);
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
      $('.container').append($form);
    }
  };

  //JQUERY EVENT-EMITTERS BELOW
  $('#who-is-this').on('submit', submitIdentity);

});
