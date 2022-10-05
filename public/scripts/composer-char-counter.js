$(document).ready(function () {

  $('textarea').on('input', function () {
    const charCount = 140;
    const inputLength = $(this).val().length;
    
    $('.counter').text(charCount - inputLength);
    if (charCount - inputLength < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#545149");
    }
  });

});