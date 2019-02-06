$(function() {
  //FRONT-END HELPER FUNCTIONS
  const appendError = (errorContent) => {
    const errorMsg = $(`<p class="error-msg">${errorContent}</p>`);
    $('#before-err-msg').after(errorMsg);
  };


  const addTimeslot = (event) => {
    event.preventDefault();

    const $divPair = $('<div class="row justify-content-start user-input">');
    const $datelabel = $('<label class="col-auto align-self-end" for="slot">Timeslot: </label>');
    const $timeslot = $('<input class="col-sm-4" id="slot" type="text" name="datetimes" placeholder="Date and time here" style="width: 50%"/>');
    const $editbtn = $('<button class="col-auto align-self-end edit-input">Edit</button>');
    const $deletebtn = $('<button class="col-auto align-self-end delete-input">Delete</button>');

    $deletebtn.on('click', function(event){
      event.preventDefault();
      $(this).parent().remove();
    });

    $divPair.append($datelabel);
    $divPair.append($timeslot);
    $divPair.append($editbtn);
    $divPair.append($deletebtn);

    $('#last-input').append($divPair);
  };

  const modifyEvent = (event) => {
      event.preventDefault();
      $('.error-msg').remove();

      //CHECK EMPTY BEFORE SENDING TO SERVER
      const fillAllRequired = 'Please fill all required';

      const eventTitle = $("input[name='title']").val();
      const eventDes = $("input[name='description']").val();
      const eventLo = $("input[name='location']").val();
      const slotArray = document.querySelectorAll('input[name="datetimes"]');

      const timeslots = [];

      if (!(eventTitle && eventDes && eventLo)) {
        appendError(fillAllRequired);
      }

      if (slotArray.length > 0) {
        for (let key in slotArray) { //RULED OUT EXTRA PROTO PROPERTIES OF DOM OBJECT
          if (key === 'length' || key === 'item' || key === 'entries' || key === 'forEach' || key === 'key' || key === 'values' || key === 'keys') {
            continue;
          }
          if (slotArray[key].value) {
            appendError(fillAllRequired);
            return;
          }
          if (slotArray[key].value.split(' ').join('')) {
            appendError(fillAllRequired);
            return;
          }
        }
        for (let key in slotArray) {
          if (key === 'length' || key === 'item' || key === 'entries' || key === 'forEach' || key === 'key' || key === 'values' || key === 'keys') {
          continue;
          }
          timeslots.push(slotArray[key].value);
        }
      }

      $.ajax(
        { method: 'POST',
          url: '/api/users/modify-event',
          data:{
            form: 'modify-event',
            eventTitle: eventTitle,
            eventDes: eventDes,
            eventLo: eventLo,
            timeslots: timeslots,
          },
          success: (hint) => {
            if (hint.message === 'success') {
              window.location.href = `/submitted`;
            }
            else {
              const errorMsg = $(`<p class="error-msg"> ${hint.message} </p>`);
              $('#before-err-msg').after(errorMsg);
            }
          }
        }
      );
    };

  $('button[id="add-timeslot"]').on('click', addTimeslot);
  $('#modify-event-submit').on('submit', modifyEvent);
});