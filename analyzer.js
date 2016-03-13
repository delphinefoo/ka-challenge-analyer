$(function() {
  var tester = new Tester;
  tester.required('for');
  tester.required('if');
  //tester.banned('while');
  //tester.banned('variable');

  $('#answer').on('keyup', function() {
    var answer = $('#answer').val();
    var whitelistError = tester.findRequired(answer);
    //var blacklistError = tester.findBanned(answer);

    console.log(whitelistError);

    $('#message ul').empty();
    if (whitelistError) {
    //if (whitelistError || blacklistError) {
      $('#message').addClass('error');
      $('#message').removeClass('success');
    } else {
      $('#message').addClass('success');
      $('#message').removeClass('error');
      $('#message ul').append('<li>Good job!</li>');
    }


    if (whitelistError !== null) {
      $('#message ul').append('<li>' + whitelistError + '</li>');
    }

    // if (blacklistError !== null) {
    //   $('#message ul').append('<li>' + blacklistError + '</li>');
    // }
  });

});

