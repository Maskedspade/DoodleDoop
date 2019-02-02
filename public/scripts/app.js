$(() => {

 const addTimeslot = (event) => {
    event.preventDefault();

    const $divPair = $('<div>');

    const $deletebtn = $('<button class="row" id="delete-slot">delete &#43;</button>');
    console.log($deletebtn, 'delete btn')

    $deletebtn.on('click', function(event){
      event.preventDefault();
      $(this).parent().remove();
    });

    $divPair.append($('<input class="row" type="text" name="timeslot" placeholder="Date and time here" style="width: 50%"/>'));
    $divPair.append($deletebtn);

    $('#create-event').append($divPair);
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
  // $('#create-event').on('submit', submitEvent);
  $('#add-timeslot').on('click', addTimeslot);



});
