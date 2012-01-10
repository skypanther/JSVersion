// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var platform = Ti.Platform.osname;
var theFontSize = 15;
var theFontFamily = 'Helvetica Neue';
if(platform == 'android') {
	theFontSize = 26;
	theFontFamily = 'Droid Sans';
} else if (platform == 'ipad') {
	theFontSize = 17;
}

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'ECMAScript 5 Tests',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tests',
    window:win1
});

var messageBox = require('/msgBox').createMessageBox();
win1.add(messageBox);

var table = Ti.UI.createTableView();

var tests = [
	{label: 'Object.create', exp:eval(typeof Object.create == 'function'), testcase:"typeof Object.create == 'function')"},
	{label: 'Object.defineProperty', exp:eval(typeof Object.defineProperty == 'function'), testcase: "typeof Object.defineProperty == 'function'"},
	{label: 'Object.defineProperties', exp:eval(typeof Object.defineProperties == 'function'), testcase: "typeof Object.defineProperties == 'function'"},
	{label: 'Object.getPrototypeOf', exp:eval(typeof Object.getPrototypeOf == 'function'), testcase: "typeof Object.getPrototypeOf == 'function'"},
	{label: 'Object.keys', exp:eval(typeof Object.keys == 'function'), testcase: "typeof Object.keys == 'function'"},
	{label: 'Object.seal', exp:eval(typeof Object.seal == 'function'), testcase: "typeof Object.seal == 'function'"},
	{label: 'Object.freeze', exp:eval(typeof Object.freeze == 'function'), testcase: "typeof Object.freeze == 'function'"},
	{label: 'Object.preventExtensions', exp:eval(typeof Object.preventExtensions == 'function'), testcase: "typeof Object.preventExtensions == 'function'"},
	{label: 'Object.isSealed', exp:eval(typeof Object.isSealed == 'function'), testcase: "typeof Object.isSealed == 'function'"},
	{label: 'Object.isFrozen', exp:eval(typeof Object.isFrozen == 'function'), testcase: "typeof Object.isFrozen == 'function'"},
	{label: 'Object.isExtensible', exp:eval(typeof Object.isExtensible == 'function'), testcase: "typeof Object.isExtensible == 'function'"},
	{label: 'Object.getOwnPropertyDescriptor', exp:eval(typeof Object.getOwnPropertyDescriptor == 'function'), testcase: "typeof Object.getOwnPropertyDescriptor == 'function'"},
	{label: 'Object.getOwnPropertyNames', exp:eval(typeof Object.getOwnPropertyNames == 'function'), testcase: "typeof Object.getOwnPropertyNames == 'function'"},
	{label: 'Date.prototype.toISOString', exp:eval(typeof Date.prototype.toISOString == 'function'), testcase: "typeof Date.prototype.toISOString == 'function'"},
	{label: 'Date.now', exp:eval(typeof Date.now == 'function'), testcase: "typeof Date.now == 'function'"},
	{label: 'Array.isArray', exp:eval(typeof Array.isArray == 'function'), testcase: "typeof Array.isArray == 'function'"},
	//{label: 'JSON', exp:eval(typeof JSON == 'object'), testcase: "typeof JSON == 'object'"},
	{label: 'Function.prototype.bind', exp:eval(typeof Function.prototype.bind == 'function'), testcase: "typeof Function.prototype.bind == 'function'"},
	{label: 'String.prototype.trim', exp:eval(typeof String.prototype.trim == 'function'), testcase: "typeof String.prototype.trim == 'function'"},
	{label: 'Array.prototype.indexOf', exp:eval(typeof Array.prototype.indexOf == 'function'), testcase: "typeof Array.prototype.indexOf == 'function'"},
	{label: 'Array.prototype.lastIndexOf', exp:eval(typeof Array.prototype.lastIndexOf == 'function'), testcase: "typeof Array.prototype.lastIndexOf == 'function'"},
	{label: 'Array.prototype.every', exp:eval(typeof Array.prototype.every == 'function'), testcase: "typeof Array.prototype.every == 'function'"},
	{label: 'Array.prototype.some', exp:eval(typeof Array.prototype.some == 'function'), testcase: "typeof Array.prototype.some == 'function'"},
	{label: 'Array.prototype.forEach', exp:eval(typeof Array.prototype.forEach == 'function'), testcase: "typeof Array.prototype.forEach == 'function'"},
	{label: 'Array.prototype.map', exp:eval(typeof Array.prototype.map == 'function'), testcase: "typeof Array.prototype.map == 'function'"},
	{label: 'Array.prototype.filter', exp:eval(typeof Array.prototype.filter == 'function'), testcase: "typeof Array.prototype.filter == 'function'"},
	{label: 'Array.prototype.reduce', exp:eval(typeof Array.prototype.reduce == 'function'), testcase: "typeof Array.prototype.reduce == 'function'"},
	{label: 'Array.prototype.reduceRight', exp:eval(typeof Array.prototype.reduceRight == 'function'), testcase: "typeof Array.prototype.reduceRight == 'function'"},
	{label: 'Getter in property initializer', exp:eval((function(){ try { return eval('({ get x(){ return 1 } }).x === 1') } catch(err) { return false } })()), testcase: "(function(){\n  try {\n    return eval('({ get x(){ return 1 } }).x === 1')\n  }\n  catch(err) {\n    return false\n  }\n})()"},
	{label: 'Setter in property initializer', exp:eval((function(){ try {  var value; eval('({ set x(v){ value = v; } }).x = 1'); return value === 1; } catch(err) { return false; } })()), testcase: "(function(){\n  try {\n    var value;\n    eval('({ set x(v){ value = v; } }).x = 1');\n    return value === 1;\n  }\n  catch(err) {\n    return false;\n  }\n})()"},
	{label: 'Property access on strings', exp:eval('foobar'[3] === 'b'), testcase: "'foobar'[3] === 'b'"},
	{label: 'Reserved words as property names', exp:eval(function(){ try { var obj = { }; eval('obj = ({ if: 1 })'); return obj['if'] === 1; } catch(err) { return false; } }()), testcase: "function(){\n  try {\n    var obj = { };\n    eval('obj = ({ if: 1 })');\n    return obj['if'] === 1;\n  }\n  catch(err) {\n    return false;\n  }\n}()"},
	{label: 'Strict mode', exp:eval((function(){ "use strict"; return !this; })()), testcase: "(function(){\n  'use strict';\n  return !this;\n})()"}
];



var data = [];
for(var i=0, j=tests.length; i<j; i++) {
	data.push({ title: tests[i].label, testcase: tests[i].testcase, rightImage: (tests[i].exp) ? '/images/dark_thumb-up@2x.png' : '/images/dark_thumb-down@2x.png', color:'#000', font:{fontSize:theFontSize, fontFamily:theFontFamily} }); 
}
table.data = data;
win1.add(table);

table.addEventListener('click', function(e){
	messageBox.update(e.rowData.title, e.rowData.testcase);
	messageBox.showMe();
});


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'About',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'About',
    window:win2
});

var webview = Ti.UI.createWebView({
	url:'/html/about.html',
	backgroundColor:'#787878'
});
win2.add(webview);

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
