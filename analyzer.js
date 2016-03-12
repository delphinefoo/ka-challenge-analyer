$(function() {

  $('#answer').on('keyup', function() {
    var answer = $('#answer').val();
    //check if answer contains whitelist items

    //check that answer does not contain blacklist items

    //display the error messages below

    console.log(JSON.stringify(esprima.parse(answer), null, 4));
  });

});

