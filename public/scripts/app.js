$(() => {

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
  // $('form').on('submit', addTimeslot);



});
