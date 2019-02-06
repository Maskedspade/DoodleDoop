$(() => {
  //FRONT-END HELPER FUNCTIONS
  const appendError = (errorContent) => {
    const errorMsg = $(`<p class="error-msg">${errorContent}</p>`);
    $('#before-err-msg').after(errorMsg);
  };

  function submitTimeslot (event) {
    event.preventDefault();

    const timeslotModify = $('input[name="groupOfSlots"]:checked').val();
    const respondentEmail = $('#respondent-email')[0].innerHTML;
    const respondentName = $('#respondent-name')[0].innerHTML;
    const guestURL = $('#guest-url')[0].innerHTML;

    $.ajax({
      method: 'POST',
      url: '/api/users',
      data:{
        form: 'update-timeslot',
        timeslotModify: timeslotModify,
        respondentName: respondentName,
        respondentEmail: respondentEmail,
        guestURL: guestURL,
      },
      success: (hint) => {
        if (hint === 'success') {
          window.location.href = `/submitted`;
        } else {
          const errorMsg = $(`<p class="row justify-content-center error-msg"> ${hint} </p>`);
          $('#before-err-msg').after(errorMsg);
        }
      }
    });
  }

  // guest_event view toggle whether going to disable/enable timeslot selection
  const whetherGoing = (event) => {
    event.preventDefault();
    const timeslotForm = $('#timeslot-form .form-check-input');
    timeslotForm.attr('disabled') ? timeslotForm.removeAttr('disabled', false) : timeslotForm.attr('disabled', true);
  };

  $('#not-going').on('click', whetherGoing);

  new ClipboardJS('#btn-copy-guest-event');
  new ClipboardJS('#btn-respondent-email');

  $('#timeslot-form').on('submit', submitTimeslot);
  $('#not-going').on('click', whetherGoing);
});