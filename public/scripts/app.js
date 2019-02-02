$(() => {

 const addTimeslot = (event) => {
    event.preventDefault();

    const $divPair = $('<div>');
    const $deletebtn = $('<button class="row" id="delete-slot">delete </button>');
    const $datetimes = $('<input class="row" type="text" name="datetimes" placeholder="Date and time here" style="width: 50%"/>');

    $deletebtn.on('click', function(event){
      event.preventDefault();
      $(this).parent().remove();
    });

    $datetimes.daterangepicker({
      timePicker: true,
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A'
      }
    });

    $divPair.append($datetimes);
    $divPair.append($deletebtn);

    $('#create-event').append($divPair);
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
        // success: (hint) => {
        //   if (hint === 'success') {
        //     // window.location.href = '/';
        //   }
        //   else {
        //     const errorMsg = $(`<p class="error-msg"> ${hint} </p>`);
        //     $('ul').append(errorMsg);
        //   }
        // }
      }
    );
  };



 // const submitEvent = (event) => {
 //    event.preventDefault();
 //    $('.error-msg').remove();

 //    const eventTitle = $("#create-event input[name='title']").val();
 //    const eventDes = $("#create-event input[name='description']").val();
 //    const eventLo = $("#create-event input[name='location']").val();
 //    const slotArray = document.querySelectorAll('input[name="timeslot"]');

 //    let timeSlots = [];

 //    slotArray.forEach( key => timeSlots.push(key.value));
 //    console.log(timeSlots);

 //    $.ajax(
 //      { method: 'POST',
 //        url: '/api/users/new-event',
 //        data:{
 //          form: 'new-event',
 //          eventTitle: eventTitle,
 //          eventDes: eventDes,
 //          eventLo: eventLo,
 //          eventTS: eventTS,
 //        },
 //        success: (hint) => {
 //          if (hint === 'success') {
 //            // window.location.href = '/';
 //          }
 //          else {
 //            const errorMsg = $(`<p class="error-msg"> ${hint} </p>`);
 //            $('ul').append(errorMsg);
 //          }
 //        }
 //      }
 //    );
 //  };

  //JQUERY EVENT-EMITTERS BELOW
  $('#create-event').on('submit', submitEvent);
  $('#add-timeslot').on('click', addTimeslot);




});
