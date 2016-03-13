var Tester = function() {

  this._whitelist = [];
  this._blacklist = [];
  this._possibilities = {
    for:      {
               name: 'ForStatement',
               string: 'a \'for loop\''
              },
    while:    {
               name: 'WhileStatement',
               string: 'a \'while loop\''
              },
    if:       {
               name: 'IfStatement',
               string: 'an \'if statement\''
              },
    variable: {
               name: 'VariableDeclaration',
               string: 'a \'variable declaration\''
              }

  };
}

this.ast, this.target, this.parsedInputHash, this.outer, this.inner;
/*
Constructs available:
- for loop
- while loop
- if statement
- variable declaration
*/





// var checkFor = function(construct) {
//   target = {};
//   //check for different construct types
//   switch (construct) {
//     case 'for':
//       target.name = 'ForStatement';
//       target.string = 'a \'for loop\'';
//       break;
//     case 'while':
//       target.name = 'WhileStatement';
//       target.string = 'a \'while loop\'';
//       break;
//     case 'if':
//       target.name = 'IfStatement';
//       target.string = 'an \'if statement\'';
//       break;
//     case 'variable':
//       target.name = 'VariableDeclaration';
//       target.string = 'a \'variable declaration\'';
//       break;
//   }
// }

var checkBody = function(array, target) {
  if (array.body && array.body.length) {
    for (var i = 0; i < array.body.length; i++) {
      if (array.body[i].type === target) {
        return true;
      }
    }
  }
  return false;
};

Tester.prototype.parseInput = function(input) {
  this._ast = esprima.parse(input, {sourceType: 'script'});
  // parsedInputHash = {};
  // for (var i = 0; i < array.length; i++) {
  //   parsedInputHash[array[i].type] = true;
  //   if (array[i].type === 'IfStatement') {

  //   }
  // }
  // checkBody(ast.body);
}



Tester.prototype.required = function(constructType) {
  // checkFor(constructType);

  this._whitelist[this._possibilities[constructType].name] = this._possibilities[constructType].string;
};

Tester.prototype.banned = function(constructType) {
  // checkFor(constructType);
  // this._blacklist[target.name] = target.string;
  this._blacklist[this._possibilities[constructType].name] = this._possibilities[constructType].string;

};


Tester.prototype.nested = function(outerConstruct, innerConstruct) {
  outer = [];
  inner = [];

  outer[0] = this._possibilities[outerConstruct][name];
  outer[1] = this._possibilities[outerConstruct][string];

  inner[0] = this._possibilities[innerConstruct][name];
  inner[1] = this._possibilities[innerConstruct][string];
};

Tester.prototype.findNested = function(string) {
  var nestedString = 'There should be ';
  var connectionString = ' and inside of it there should be';
  this.parseInput(string);

  //check for presence of outer statement
  if (this.parsedInputHash[outer[0]]) {
    //check for inner statement
    if (outer[0] === 'IfStatement') {
      for (var i = 0; i < parsedInputHash[outer[0]].consequent.body.length; i++) {
        if(parsedInputHash[outer[0]].consequent.body[i].type === inner[0]) {
          return null;
        }
      }
    } else if (outer[0] === 'WhileStatement' || outer[0] === 'ForStatement') {
      //loop through body array
      for (var i = 0; i < parsedInputHash[outer[0]].consequent.body.length; i++) {
        if(parsedInputHash[outer[0]].consequent.body[i].type === inner[0]) {
          return null;
        }
      }
    }

  }
}

Tester.prototype.findRequired = function(string) {
  var whitelistString = 'This program MUST use ';
  var whitelistErrors = [];
  console.log('in findRequired: ', this._whitelist);
  this.parseInput(string);
  //loop through whitelist items
  for (var key in this._whitelist) {
    //if the items in whitelist are not found in parsed input
    if (!checkBody(this._ast, key)) {
      whitelistErrors.push(this._whitelist[key]);
    }
    // if (!parsedInputHash[key]) {
      //add item to error message
  }

  //produce the final string to print for whitelist errors
  for (var i = 0; i < whitelistErrors.length; i++) {
    if (i === 0) {
      whitelistString += whitelistErrors[i];
    } else {
      whitelistString += ' and ' + whitelistErrors[i];
    }
  }

  if (whitelistErrors.length) {
    return whitelistString;
  } else {
    return null;
  }
};

Tester.prototype.findBanned = function(string) {
  var blacklistString = 'This program MUST NOT use ';
  var blacklistErrors = [];
  //parse the string
  this.parseInput(string);

  //loop through blacklist items
  for (var key in this._blacklist) {
    //if the items in whitelist are not found in parsed input
    if (parsedInputHash[key]) {
      //add item to error message
      blacklistErrors.push(this._blacklist[key]);
    }
  }

  //produce the final string to print for whitelist errors
  for (var i = 0; i < blacklistErrors.length; i++) {
    if (i === 0) {
      blacklistString += blacklistErrors[i];
    } else {
      blacklistString += ' or ' + blacklistErrors[j];
    }
  }

  if (blacklistErrors.length) {
    return blacklistString;
  } else {
    return null;
  }
};

Tester.prototype.findNested = function(string) {
  parseInput(string);
};
