$(function() {
  var tester = new Tester;
  tester.required('for');
  tester.required('if');
  tester.banned('while');
  tester.banned('variable');
  $('#answer').on('keyup', function() {
    var answer = $('#answer').val();
    var whitelistError = tester.findRequired(answer);
    var blacklistError = tester.findBanned(answer);
    $('#error ul').empty();
    if (whitelistError !== null) {
      $('#error ul').append('<li>' + whitelistError + '</li>');
    }
    if (blacklistError !== null) {
      $('#error ul').append('<li>' + blacklistError + '</li>');
    }
  });

});

