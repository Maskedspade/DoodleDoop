$(() => {

  // adds a new timeslot input field
  const addTimeslot = (event) => {
    event.preventDefault();
    console.log('adding timeslot');
    const $divPair = $('<div class="row">');
    const $datetimes = $('<input class="col-sm-6" type="text" name="datetimes" placeholder="Date and time here" style="width: 50%"/>');
    const $deletebtn = $('<button class="col-auto delete-input" id="delete-slot">delete</button>');

    $datetimes.daterangepicker({
      timePicker: true,
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A'
      }
    });

    $deletebtn.on('click', function(event){
      event.preventDefault();
      $(this).parent().remove();
    });

    $divPair.append($datetimes);
    $divPair.append($deletebtn);

    $('#last-input').after($divPair);
  };

  // disable/enable Readonly attribute in input and textarea in event pages
  // saves user input as placeholder
  const editInput = (function(event) {
    event.preventDefault();
    const changingInput = $(this).prev();
    if($(this).text() === 'Edit') {
      changingInput.removeAttr('readonly').select();
      changingInput.removeClass('host-input-on-save');
    }else{
      const userInput = $(this).val();
      $(this).attr('placeholder', userInput);
      changingInput.addClass('host-input-on-save');
      changingInput.attr('readonly', 'readonly');
    }
  });

  // usage: toggle edit button <-> save button
  const toggleBtn = (function(event) {
    event.preventDefault();
    $(this).text($(this).text() === 'Edit' ? 'Save' : 'Edit');
  });

 const submitEvent = (event) => {
    event.preventDefault();
    $('.error-msg').remove();

    const eventTitle = $("#create-event input[name='title']").val();
    const eventDes = $("#create-event input[name='description']").val();
    const eventLo = $("#create-event input[name='location']").val();
    const slotArray = document.querySelectorAll('input[name="datetimes"]');

    const timeslots = [];

    for (let key in slotArray) {
      if (key === 'length' || key === 'item' || key === 'entries' || key === 'forEach' || key === 'key' || key === 'values' || key === 'keys') {
        continue;
      }
      timeslots.push(slotArray[key].value);
    }

    $.ajax(
      { method: 'POST',
        url: '/api/users/new-event',
        data:{
          form: 'new-event',
          eventTitle: eventTitle,
          eventDes: eventDes,
          eventLo: eventLo,
          timeslots: timeslots,
        },
        success: (hint) => {
          if (hint.message === 'success') {
            window.location.href = `/host/${hint.hostURL}`;
          }
          else {
            const errorMsg = $(`<p class="error-msg"> ${hint.message} </p>`);
            $('#create-event').append(errorMsg);
          }
        }
      }
    );
  };

  // guest_event view toggle whether going to disable/enable timeslot selection
  const whetherGoing = (event) => {
    event.preventDefault();
    const timeslotForm = $('#timeslot-form .form-check-input');
    timeslotForm.attr('disabled') ? timeslotForm.removeAttr('disabled', false) : timeslotForm.attr('disabled', true);
  };

  // on events page, if guest chose not going, then deletes edit and delete buttons
  function displayEvents() {
    const notGoing = $("#slot[placeholder='NOT GOING']");
    notGoing.next().css('visibility', 'hidden');
    notGoing.next().next().css('visibility', 'hidden');
  }

  // all inputs on event page have no borders unless on edit mode
  $('.edit-input').prev().addClass('host-input-on-save');

  //event emitters below
  $('#create-event').on('submit', submitEvent);
  $('#add-timeslot').on('click', addTimeslot);

  $('.edit-input').on('click', editInput);
  $('.edit-input').on('click', toggleBtn);

  $('#not-going').on('click', whetherGoing);

  displayEvents();
});
