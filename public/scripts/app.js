$(() => {
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

  // on events page, if guest chose not going, then deletes edit and delete buttons
  function displayEvents() {
    const notGoing = $("#slot[placeholder='NOT GOING']");
    notGoing.next().css('visibility', 'hidden');
    notGoing.next().next().css('visibility', 'hidden');
  }

  // all inputs on event page have no borders unless on edit mode
  $('.edit-input').prev().addClass('host-input-on-save');

  $('.edit-input').on('click', editInput);
  $('.edit-input').on('click', toggleBtn);

  new ClipboardJS('#btn-copy-host-event');
  new ClipboardJS('#btn-copy-guest-event');

  displayEvents();
});
