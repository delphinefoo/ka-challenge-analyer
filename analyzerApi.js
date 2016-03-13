var Tester = function() {
  this._whitelist = [];
  this._blacklist = [];

  /*
  Constructs available:
  - for loop
  - while loop
  - if statement
  - variable declaration
  */
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
};



Tester.prototype._checkBody = function(array, target) {
  if (array.body && array.body.length) {
    for (var i = 0; i < array.body.length; i++) {
      if (array.body[i].type === target) {
        return [true, i];
      }
    }
  }
  return false;
};

Tester.prototype._parseInput = function(input) {
  this._ast = esprima.parse(input, {sourceType: 'script'});
};

Tester.prototype.required = function(constructType) {
  this._whitelist[this._possibilities[constructType].name] = this._possibilities[constructType].string;
};

Tester.prototype.banned = function(constructType) {
  this._blacklist[this._possibilities[constructType].name] = this._possibilities[constructType].string;

};

Tester.prototype.nested = function(outerConstruct, innerConstruct) {
  this._outer = [];
  this._inner = [];

  this._outer[0] = this._possibilities[outerConstruct]['name'];
  this._outer[1] = this._possibilities[outerConstruct]['string'];

  this._inner[0] = this._possibilities[innerConstruct]['name'];
  this._inner[1] = this._possibilities[innerConstruct]['string'];
};

Tester.prototype.findNested = function(string) {
  var idx;
  var nestedStr = 'There should be ';
  var connectionStr = ' and inside of it there should be ';
  this._parseInput(string);

  //check for presence of outer statement
  if (this._checkBody(this._ast, this._outer[0])) {
    idx = this._checkBody(this._ast, this._outer[0])[1];
    //check for outer if statement
    if (this._outer[0] === 'IfStatement') {
      //check for inner statement in consequent's body array
      if (this._checkBody(this._ast.body[idx].consequent, this._inner[0])) {
        //this means that nested construct exists
        //so return null
        return null;
      }
    } else if (this._outer[0] === 'WhileStatement' || this._outer[0] === 'ForStatement') {
      console.log(this._ast.body[idx].body, idx);
      if (this._checkBody(this._ast.body[idx].body, this._inner[0])) {
        //this means that nested construct exists
        //so return null
        console.log('inside inner checkBody');
        return null;
      }
    }
  }
  console.log(this._ast);
  return nestedStr + this._outer[1] + connectionStr + this._inner[1];
}

Tester.prototype.findRequired = function(string) {
  var whitelistString = 'This program MUST use ';
  var whitelistErrors = [];
  this._parseInput(string);

  for (var key in this._whitelist) {
    if (!this._checkBody(this._ast, key)) {
      whitelistErrors.push(this._whitelist[key]);
    }
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
  this._parseInput(string);

  //loop through blacklist items
  for (var key in this._blacklist) {
    //if the items in whitelist are not found in parsed input
    if (this._checkBody(this._ast, key)) {
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
