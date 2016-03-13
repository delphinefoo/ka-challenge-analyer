$(function() {
  var tester = new Tester;
  tester.required('while');
  tester.required('if');
  tester.banned('variable');
  // tester.nested('while', 'if');

  $('#answer').on('keyup', function() {
    var answer = $('#answer').val();
    var whitelistError = tester.findRequired(answer) || null;
    var blacklistError = tester.findBanned(answer) || null;
    // var nestedError = tester.findNested(answer) || null;

    $('#message ul').empty();
    if (whitelistError || blacklistError || nestedError) {
      $('#message').addClass('error');
      $('#message').removeClass('success');
    } else {
      $('#message').addClass('success');
      $('#message').removeClass('error');
      $('#message ul').append('<li>Good job!</li>');
    }


    if (whitelistError && whitelistError !== null) {
      $('#message ul').append('<li>' + whitelistError + '</li>');
    }

    if (blacklistError && blacklistError !== null) {
      $('#message ul').append('<li>' + blacklistError + '</li>');
    }

    // if (nestedError && nestedError !== null) {
    //   $('#message ul').append('<li>' + nestedError + '</li>');
    // }
  });

});

