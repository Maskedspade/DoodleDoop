$(function() {
  // front-end helper function
  const appendError = (errorContent) => {
    const errorMsg = $(`<p class="error-msg">${errorContent}</p>`);
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

  const checkEmptyArray = (array) => {
    for (let key in array) {
      if (array[key] === undefined) {
        return false;
      }
    }
    return true;
  };

  const checkRepeated = (timeslots) => {
    let counts = [];
    for(let i = 0; i <= timeslots.length; i++) {
        if(counts[timeslots[i]] === undefined) {
            counts[timeslots[i]] = 1;
        } else {
            return false;
        }
    }
    return true;
  };

  $('input[name="datetimes"]').daterangepicker({
    timePicker: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: 'M/DD hh:mm A'
    }
  });

  const addTimeslot = (event) => {
    event.preventDefault();

    const $divPair = $('<div>');
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

      if (!(checkEmpty(eventTitle) && checkEmpty(eventDes) && checkEmpty(eventLo) && checkEmptyArray(timeslots))) {
        appendError('Please fill all required');
        return;
      }

      if (!checkRepeated(timeslots)) {
        appendError('Please make sure all timeslots are unique');
        return;
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
              appendError(hint);
            }
          }
        }
      );
    };

  $('#create-event').on('submit', submitEvent);
  $('#add-timeslot').on('click', addTimeslot);
});