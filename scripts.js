// This script sets up the 'change the heartbeat' functionality
// by changing a couple of animation parameters on the fly:
// 1. pulse rate
// 2. colorChange rate
//
// Be careful...messy code ahead...learned a lot along the way here.
// Did you know that Safari sometimes has issues dealing with CSS animation parameter changes?
// I didn't, either.
//


$(".dial").knob({
	// set up the dial options (most of them)
	'min':20,
	'max':200,
	'angleArc': 100,
	'angleOffset': 310,
	'lineCap': "round",
	'inputColor': "#f2f2f2",
	'fgColor': "#F364B4",
	'displayInput': true,
	'cursor': true,
	'font': "Dosis",
	'thickness': .12,
	'width': 200,
	'height': 100,
	// ok, so what happens when a value gets set? Let's do some ECMAScripting!
	'release': function(value) {
	var beatsPerMinute = value;

	// round animationDuration to nearest tenth
	var beatsPerSecond = (Math.round((value / 60 ) * 10) / 10).toFixed(2);

	// animation duration  = seconds per beat!
	var animationDuration = (Math.round((1/beatsPerSecond) *10) / 10).toFixed(2) + "s";

	// need !important tag here, I guess -- color changing wasn't working without it.
	var animationDurationColor = animationDuration + " !important";

	// console.log(value);
	// console.log("Animation Duration: " + animationDuration);
	// console.log(document.styleSheets[0]);

	// Change animation duration for pulse
	var heartShape = document.getElementsByClassName("animated");

	// apparently you can access webkit prefixes by capitalizing the first letter instead of doing normal camelCase
	 heartShape[0].style.webkitAnimationDuration = animationDuration;
	// document.getElementById('heart').style.webkitAnimationDuration = animationDuration;

	// WATCH OUT! STUPID HACK! This triggers a DOM repaint or something. Now it works in Safari. Yay.	
	$('#heart').css("-webkit-animation-duration", animationDuration).hide().show(0);
	// heartShape[0].style.animationDuration = animationDuration;


	console.log(animationDuration);

	// Change animation duration for color change. This is a weird way to do it,
	// but necessary because of the pseudo selectors in play here.
	document.styleSheets[0].addRule('#heart:before, #heart:after','-webkit-animation-duration:'+animationDurationColor+';');
	document.styleSheets[0].addRule('#heart:before, #heart:after','animation-duration:'+animationDurationColor+';');


	// 
	// Ok, last thing. This should fix the issue where Safari (Mac and iOS) does not seem 
	// to 'get' the change to the pulse rate. It was changing the color rate just fine, 
	// but the pulse wouldn't update. Turns out that there's an issue where Safari needs 
	// help with 'frame refresh'. It needs to be told to repaint the DOM. 
	// Source: http://www.eccesignum.org/blog/solving-display-refreshredrawrepaint-issues-in-webkit-browsers
	//


	// Set the scale of the element to 1. Doesn't actually change anything visually
	// because by default everything is set to scale 1.

	// document.getElementsByClassName('.heart-container').style.webkitTransform = 'scale(1)';

	/*	Silently append and remove a text node	
		This is the fix that worked for me in the Phonegap/Android application
		the setTimeout allows a 'tick' to happen in the browser refresh,
		giving the UI time to update
	*/
	// var n = document.createTextNode(' ');
	// $('#heart').append(n);
	// setTimeout(function(){n.parentNode.removeChild(n)}, 0);
	
	}
});