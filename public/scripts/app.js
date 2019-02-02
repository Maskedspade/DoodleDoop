$(() => {

  // adds a new timeslot input field
  const addTimeslot = (event) => {
    event.preventDefault();

    const $divPair = $('<div>');
    const $deletebtn = $('<button class="row" id="delete-slot">delete</button>');

    $deletebtn.on('click', function(event){
      event.preventDefault();
      $(this).parent().remove();
    });

    $divPair.append($('<input class="row" type="text" name="datetimes" placeholder="Date and time here" style="width: 50%"/>'));
    $divPair.append($deletebtn);

    $('#create-event').append($divPair);
  };

  // disable/enable Readonly attribute in input and textarea in event pages
  // saves user input as placeholder
  const editInput = (function(event) {
    event.preventDefault();
    const changingInput = $(this).prev();
    // if(changingInput.hasClass('host-input-on-save')) {
    //   changingInput.removeClass('host-input-on-save');
    // }
    if($(this).text() === 'Edit') {
      changingInput.removeAttr('readonly').select();
    }else{
      const userInput = $(this).val();
      $(this).attr('placeholder', userInput);
      // changingInput.addClass('host-input-on-save');
      changingInput.attr('readonly', 'readonly');
    }
  });

  // usage: toggle edit button <-> save button
  const toggleBtn = (function(event) {
    event.preventDefault();
    $(this).text($(this).text() === 'Edit' ? 'Save' : 'Edit');
  });


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
  // $('#create-event').on('submit', submitEvent);

  $('#add-timeslot').on('click', addTimeslot);
  $('.edit-input').on('click', editInput);
  $('.edit-input').on('click', toggleBtn);




});
