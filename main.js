
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = document.createElement('img');


var controller = new Leap.Controller();
var button = document.querySelector('button');
var onControllerConnect = function() {
	console.log('I am connected to the leap');
};
var onDeviceConnected = function() {
	console.log('A device is connected');
};
var onDeviceDisconnected = function() {
	console.log('A device is disconnected');
};
var connect = function() {
	controller.connect();
};
var onFrame = (function(frame) {
	//console.log('# of fingerz: ', frame.fingers.length);
	//debugger;
	var times = 0,
		numFingers = 0,
		lineNumber = 2,
		textWidth = 10,
		textHeight = 25,
		maxPerLine = 100;
	
	return function(frame) {
		debugger;
		if(frame.fingers.length === numFingers) {
			return;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.strokeText(frame.fingers.length, (times % maxPerLine) * textWidth, lineNumber * textHeight);
		times += 1;
		if(times % maxPerLine === 0) {
			lineNumber += 1;
		}
		numFingers = frame.fingers.length;
	};
	
}());

var onWindowLoad = function() {
	if(!'conroller' in window) {
		// try again in 500 ms
		window.setTimeout(onWindowLoad, 500);
		console.log('controller not created yet');
	} else {
		// controller instance is ready.
		setupCanvas();
		controller.connect();
		console.log('controller object created');
	}
};
var onControllerReady = function() {
	console.log('controller ready');
};
var setupCanvas = function() {
	context.font = '50px Arial';
	context.strokeStyle = 'rgba(0,0,0)';
	context.textAlign = 'center';
    context.textBaseline = 'middle';
};

// plugged in
controller.on('deviceConnected', onDeviceConnected);

// unplugges
controller.on('deviceDisconnected', onDeviceDisconnected);

// connected
controller.on('connect', onControllerConnect);

// ready for use
controller.on('ready', onControllerReady);

// incoming new frame (by default, animationFrame)
controller.on('frame', onFrame);

// kick off 
window.onload = onWindowLoad;