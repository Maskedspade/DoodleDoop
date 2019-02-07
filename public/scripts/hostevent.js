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

  const checkForRepeated = (timeslots) => {
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
  // jot down number of initial available timeslots when page first loads, including 'NOT GOING'
  const refCounter = document.querySelectorAll('input[name="timeslot"]').length;

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

  // reference arrays used to recognize timeslots modification
  // put in 'placeholder' element to prevent empty array from being erased by json processing and becomng 'undefined'
  let timeslots = ['placeholder'];
  let storeOldSlot = ['placeholder'];

  const deleteEvent = (event) => {
    event.preventDefault();
    const hostURL = $("input[id='hostURL']").val();

    let popupDelete = confirm('Are you sure you want to delete this event?');
    if (popupDelete == false) {
      return;
    }

    $.ajax(
      { method: 'POST',
        url: '/api/users/delete-event',
        data:{
          form: 'delete-event',
          hostURL: hostURL,
        },
        success: (hint) => {
          if (hint === 'success') {
            window.location.href = `/submitted`;
          }
          else {
            appendError(hint);
          }
        }
      }
    );

  };

  const modifyEvent = (event) => {
      event.preventDefault();
      $('.error-msg').remove();

      // check empty inputs before sending them to server
      const fillAllRequired = 'Please fill all required';

      const eventTitle = $("input[name='title']").val();
      const eventDes = $("textarea[name='description']").val();
      const eventLo = $("input[name='location']").val();
      const slotArray = document.querySelectorAll('input[name="datetimes"]');
      const hostURL = $("input[id='hostURL']").val();

      if (!(checkEmpty(eventTitle) && checkEmpty(eventDes) && checkEmpty(eventLo))) {
        appendError(fillAllRequired);
        return;
      }

      if (slotArray !== undefined){
        if (slotArray.length > 0) {
          let generatedArray = [];
          for (let key in slotArray) { // rule ou extra prototype properties of DOM object
            if (key === 'length' || key === 'item' || key === 'entries' || key === 'forEach' || key === 'key' || key === 'values' || key === 'keys') {
              continue;
            }
            generatedArray.push(slotArray[key].value);
          }
          let result = true;
          generatedArray.forEach( item => {
            if (!checkEmpty(item)) {
              result = false;
            }
          });
          if (result === false) {
            appendError(fillAllRequired);
            return;
          }
          if (!checkForRepeated(generatedArray)) {
            appendError('Please make sure all timeslots are unique');
            return;
          }
          for (let key in slotArray) {
            if (key === 'length' || key === 'item' || key === 'entries' || key === 'forEach' || key === 'key' || key === 'values' || key === 'keys') {
            continue;
          }
          timeslots.push(slotArray[key].value);
          }
        }
      }

      if (timeslots.length === 1 && storeOldSlot.length == refCounter) {
        alert('Seems like you have no available timeslot left for this event. Do you want to delete this event instead? To unsave your change, please refresh this page without submitting.');
        return;
      }

      $.ajax(
        { method: 'POST',
          url: '/api/users/modify-event',
          data:{
            form: 'modify-event',
            hostURL: hostURL,
            eventTitle: eventTitle,
            eventDes: eventDes,
            eventLo: eventLo,
            timeslots: timeslots,
            storeOldSlot: storeOldSlot,
          },
          success: (hint) => {
            if (hint === 'success') {
              window.location.href = `/submitted`;
            }
            else {
              appendError(hint);
            }
          }
        }
      );
    };

  function deleteOldSlot(event) {
    event.preventDefault();

    let value = $(this).prev().val();
    let popupAlert = confirm(`Are you sure you want to delete this timeslot ${value}`);
    if (popupAlert == true) {
      storeOldSlot.push(value);
      $(this).parent().next().remove();
      $(this).parent().remove();

    } else {
      return;
    }
    return;
  }

  $('button[id="add-timeslot"]').on('click', addTimeslot);
  $('#modify-event-submit').on('submit', modifyEvent);
  $('button[id="delete-old-slot"]').on('click', deleteOldSlot);
  $('button[id="delete-event"]').on('click', deleteEvent);
});