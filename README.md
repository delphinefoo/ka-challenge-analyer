# Code Challenge Analyzer

An API for testing JavaScript code for the presence of specific constructs.

##Usage

Dependencies: Esprima parser, jQuery, and normalize.css.
To install dependencies, run:
```
npm install
```
To view an example implementation, open the analyzer.html file in your browser.

##API

This API's current release allows testing for the presence of 'if' statements, 'while' loops, 'for' loops, and variable declarations. It also allows for testing for the presence of one-level-deep nesting of these constructs.

To access the API, initialize a new tester object:

```
var tester = new Tester();
```

####Whitelist

The whitelist contains constructs that must be present in the code being analyzed. To add a construct to the whitelist, call:
<pre>
tester.required(<em>construct string</em>);
</pre>
Available *construct strings*: 'if', 'while', 'for', 'variable'.
<br>
<br>
To analyze code using the whitelist:
<pre>
tester.findRequired(<em>input string</em>);
</pre>
*.findRequired* eturns an error string if the constructs in the whitelist are not found, eg. "The program MUST  use an 'if statement'.". Returns null if whitelist constructs are present.

####Blacklist

The blacklist contains constructs that must not be present in the code being analyzed. To add a construct to the blacklist, call:
<pre>
tester.banned(<em>construct string</em>)
</pre>
Available *construct strings*: 'if', 'while', 'for', 'variable'
<br>
<br>
To analyze code using the blacklist:
<pre>
tester.findBanned(<em>input string</em>);
</pre>
*.findBanned* returns an error string if the constructs in the blacklist are present, eg.
"The program MUST NOT use an 'if statement'.". Returns null if blacklist constructs are not present.

####Nested constructs

To specify constructs that should be nested, call:
<pre>
tester.nested(<em>outer construct, inner construct</em>)
</pre>
Available *constructs*: 'if', 'while', 'for', 'variable'
<br>
<br>
To analyze code for nested constructs, call:
<pre>
tester.findNested(<em>input string</em>);
</pre>
*.findNested* returns an error string if the nesting is not present, eg.
"There should be a 'while loop' and inside of it there should be an 'if statement'". Returns null if nested construct is found.

##Example
The example implementation in analyzerExample.js has a whitelist that contains 'while' loop and 'if' statement, and a blacklist that contains 'variable' declaration.
