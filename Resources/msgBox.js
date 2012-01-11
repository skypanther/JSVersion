/*
	Module creates the slide-out message box
*/
var platform = Ti.Platform.osname;
var theFontSize = 15;
var theHeadingFontSize = 17;
var theFontFamily = 'Helvetica Neue';
var textAreaWidth = 320;
if(platform == 'android') {
	theFontSize = 26;
	theHeadingFontSize = 32;
	theFontFamily = 'Droid Sans';
} 
if(platform == 'ipad') {
	textAreaWidth = 500;
}

exports.createMessageBox = function() {
	var msgView = Ti.UI.createView({
		layout:'vertical',
		backgroundColor: '#FFFFCC' /*'#ffe83e'*/,
		border:1,
		borderColor:'#999',
		borderRadius: '10',
		width:'100%',
		height:'90%',
		top: 10,
		left:Ti.Platform.displayCaps.platformWidth+20,
		zIndex:99
	});
	// Title
	var msgTitle = Ti.UI.createLabel({
		text: 'foo',
		height:'auto',
		width:'90%',
		color:'#000',
		top:10,
		left:10,
		font:{
			fontFamily:theFontFamily,
			fontSize: theHeadingFontSize,
			fontWeight:'bold'
		},
		textAlign:'left'
	});
	msgView.add(msgTitle);
	
	var msgTest = Ti.UI.createTextArea({
		value: 'foo',
		top:10,
		left: 10,
		width:textAreaWidth,
		height:400,
		backgroundColor:'#FFFFCC',
		font:{
			fontFamily:theFontFamily,
			fontSize: theFontSize,
			fontWeight:'normal'
		},
		enabled: false
	});
	msgView.add(msgTest);
	
	/*
		Function to update contents of the message box
	*/
	msgView.update = function(title, test) {
		msgTitle.text = title;
		msgTest.value = test;
	};
	
	/*
		Slides the message box into view
	*/
	msgView.showMe = function() {
		msgView.animate({
			left:10,
			duration:500
		}, function() {
			setTimeout(msgView.hideMe, 2500);
		});
		
	};
	/*
		Hides the message box
	*/
	msgView.hideMe = function() {
		msgView.animate({
			left: Ti.Platform.displayCaps.platformWidth+20,
			duration:500
		}, function() {
			msgView.update('','');
		});
	};
	
	return msgView;
};
