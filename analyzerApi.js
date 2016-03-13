var Tester = function() {
  this._whitelist = [];
  this._blacklist = [];
}

Tester.prototype.required = function(construct) {
  //check for different construct types
  var target, string;
  switch (construct) {
    case 'for':
      target = 'ForStatement';
      string = 'for loop';
      break;
    case 'while':
      target = 'WhileStatement';
      string = 'while loop';
      break;
    case 'if':
      target = 'IfStatement';
      string = 'if statement';
      break;
    case 'variable':
      target = 'VariableDeclaration';
      string = 'variable declaration';
      break;
  }

  this._whitelist[target] = string;

};

Tester.prototype.banned = function(construct) {
  //check for different construct types
  var target, string;
  switch (construct) {
    case 'for':
      target = 'ForStatement';
      string = 'for loop';
      break;
    case 'while':
      target = 'WhileStatement';
      string = 'while loop';
      break;
    case 'if':
      target = 'IfStatement';
      string = 'if statement';
      break;
    case 'variable':
      target = 'VariableDeclaration';
      string = 'variable declaration';
      break;
  }

  this._blacklist[target] = string;

};


Tester.prototype.nested = function(outerConstruct, innerConstruct) {

};

Tester.prototype.findRequired = function(string) {
  var whitelistString = 'This program MUST use a ';
  var parsedInputHash = {};
  var whitelistErrors = [];
  var allErrorMessages = [];
  //parse the string
  var parsedInput = esprima.parse(string, {sourceType: 'script'});
  //keep track of the constructs present in input code
  for (var i = 0; i < parsedInput.body.length; i++) {
    parsedInputHash[parsedInput.body[i].type] = true;
  }

  //loop through whitelist items
  for (var key in this._whitelist) {
    //if the items in whitelist are not found in parsed input
    if (!parsedInputHash[key]) {
      //add item to error message
      whitelistErrors.push(this._whitelist[key]);
    }
  }

  //produce the final string to print for whitelist errors
  for (var j = 0; j < whitelistErrors.length; j++) {
    if (j === 0) {
      whitelistString += whitelistErrors[0];
    } else {
      whitelistString += ' and a ' + whitelistErrors[i];
    }
  }

  if (whitelistErrors.length) {
    return whitelistString;
  } else {
    return null;
  }
};




/*
Constructs available:
- for loop
- while loop
- if statement
- variable declaration
*/