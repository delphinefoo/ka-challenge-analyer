$(function() {
  var tester = new Tester;
  tester.required('for');
  $('#answer').on('keyup', function() {
    var answer = $('#answer').val();
    var whitelistError = tester.findRequired(answer);
    var blacklistError = test.findBanned(answer);
    $('#error ul').empty();
    if (whitelistError !== null) {
      $('#error ul').append('<li>' + whitelistError + '</li>');
    }
  });

});

