"use strict"

var reader;
var curLine;
var elapsed;
var wait;
var startTime
var now;
var offset;
var noOffset;

var nextSound;
var soundQueue;

// sound files
var hello;
var boom;
var belair;
var eden;

// filter objects
var edenHpf;
var belairLpf;
var pullTime;
var currentColor;
var previousColor;

// to serve as a hashmap with key: ID; value: sound files
var soundLibrary;
var whiteLibrary;
var grayLibrary;
var blackLibrary;
var soundC11;
var soundC17;
var soundC21;
var soundD11;
var soundD17;
var soundD21;
var soundG11;
var soundG17;
var soundG21;


function dateConvert(date) {
	return new Time(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

// function Time(h, m, s) {
function Time(h, m, s, ms) {
	this.hr = int(h);
	this.min = int(m);
	this.sec = int(s);
	this.mil = int(ms);
	this.getHr = function() {
		return this.hr;
	};
	this.getMin = function() {
		return this.min;
	};
	this.getSec = function() {
		return this.sec;
	};
	this.getMil = function() {
		return this.mil;
	};
	this.getAbsoluteSec = function() {
		return this.sec+this.min*60+this.hr*60*60;
	};
	this.getAbsoluteMil = function() {
		return 1000*this.getAbsoluteSec()+this.mil;
	};
}

function Entry(t, i, s, v) {
	this.time = t;
	this.id = i;
	this.sensor = s;
	this.value = v;

	this.getTime = function() {
		return this.time;
	};
	this.getSensor = function() {
		return this.sensor;
	};
	this.getID = function() {
		return this.id;
	};
	this.getValue = function() {
		return this.value;
	};
}

function SoundToPlay(entry, delay) {
	this.entry = entry;
	this.sensor = entry[1];
	this.id = entry[2];
	this.value = int(entry[3]);
	this.delay = int(delay);

	this.getEntry = function () {
		return this.entry;
	}
	this.getSensor = function() {
		return this.sensor;
	}
	this.getID = function() {
		return this.id;
	}
	this.getValue = function() {
		return this.value;
	}
	this.getDelay = function() {
		return this.delay;
	}
}

function getTime(timeString) {
	var timeArr = timeString.split(":");

	var h = timeArr[0];
	var m = timeArr[1];
	var s = timeArr[2];
	var ms = timeArr[3];

	return new Time(h, m, s, ms);
}

function determineOutput(trigger) {
	switch (trigger.getSensor()) {
		case 'Distance':
			outputDistance(trigger.getID(), trigger.getValue());
			break;
		case 'Color':
			outputColor(trigger.getID(), trigger.getValue());
			break;
		case 'Motion':
			outputMotion(trigger.getID());
			break;
	}
}

function getColor(rgb) {
	if(rgb<80) {
		return 'Black';
	}
	else if(rgb>180) {
		return 'White';
	}
	else {
		return 'Gray';
	}

	// will use this one we start getting real RGB values

	// var red = parseInt(string.substring(0,3), 16);
	// var green = parseInt(string.substring(2,5), 16);
	// var blue = parseInt(string.substring(4,7), 16);
	// console.log(red + ',' + green + ',' + blue);
}

function changePalette(color) {
	if(color=='White') {
		background(255);
		soundLibrary = whiteLibrary;
	}
	else if(color=='Black') {
		background(0);
		soundLibrary = blackLibrary;
	}
	else {
		background(128);
		soundLibrary = grayLibrary;
	}
}

function outputColor(id, rgb) {
	var newColor = getColor(rgb);
	if(newColor != currentColor){
		console.log("COLOR CHANGE WUSSUP")
		currentColor = newColor;
		changePalette(newColor);

	}
	playSound(soundLibrary['Color']);
}

function outputMotion(id) {
	playSound(soundLibrary['Motion']);
}

function outputDistance(id, distance) {
	playSound(soundLibrary['Distance']);
}

function playSound(soundFile) {
	soundFile.play();
}

function preload() {
	// Load a soundfile from the /data folder of the sketch and play it back
	soundC11 = loadSound('sounds/C/C-1-1.mp3');
	soundC17 = loadSound('sounds/C/C-1-7.mp3');
	soundC21 = loadSound('sounds/C/C-1-5.mp3');
	soundD11 = loadSound('sounds/D/D-1-1.mp3');
	soundD17 = loadSound('sounds/D/D-1-7.mp3');
	soundD21 = loadSound('sounds/D/D-1-5.mp3');
	soundG11 = loadSound('sounds/G/G-1-1.mp3');
	soundG17 = loadSound('sounds/G/G-1-7.mp3');
	soundG21 = loadSound('sounds/G/G-1-5.mp3');

	whiteLibrary = new Array();
	whiteLibrary['Motion'] = soundC11;
	whiteLibrary['Distance'] = soundC17;
	whiteLibrary['Color'] = soundC21;

	grayLibrary = new Array();
	grayLibrary['Motion'] = soundD11;
	grayLibrary['Distance'] = soundD17;
	grayLibrary['Color'] = soundD21;

	blackLibrary = new Array();
	blackLibrary['Motion'] = soundG11;
	blackLibrary['Distance'] = soundG17;
	blackLibrary['Color'] = soundG21;
}


function determineDelay(pullTime,entryTime) {
	return entryTime.getAbsoluteMil()-pullTime.getAbsoluteMil();
}

function setup() {
	now = new Date();
	startTime = new dateConvert(now);

	createCanvas(1400,900);
	background(255);
	textSize(32);
	text("word", 10, 30);
	fill(0, 102, 153);
	elapsed = millis();
	
	offset = 0;
	noOffset = true;

	wait = 3000;
	currentColor = 'White';
	soundLibrary = whiteLibrary;

	soundQueue = [];

	loop();
}

function draw() {
	var cur = new Date();
	var curTime = dateConvert(cur);
	var diff = curTime.getAbsoluteMil() - startTime.getAbsoluteMil();

	if (soundQueue.length > 0) {
		// if it's time to play the next sound
		if (millis() - offset >= soundQueue[0].getDelay()) {
			// shift off sound from queue
			var toPlay = soundQueue.shift();
			console.log(toPlay.getEntry());
			// play the sound
			determineOutput(toPlay);
		}
	}

	if (millis() - elapsed >= wait) {
		console.log('------------------');

		elapsed = millis();

		var xmlhttp = new XMLHttpRequest();
		var url = 'http://localhost:8888/SensorCompz/webpage.js/logFileUpdating.txt';
		var logFile;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				logFile = xmlhttp.responseText.split('\n');
				for (var i = 0; i < logFile.length; i++) {
					console.log(logFile[i])
					var entry = logFile[i].split("    ");
					var entryTime = getTime(entry[0]);
					var entrySensor = entry[1];
					var entryID = entry[2];
					var entryValue = entry[3];

					var delay = determineDelay(startTime,entryTime);

					// determine offset for checking when to play sound
					// only set offset for first sound
					if (noOffset) {
						offset = millis() - delay;
						noOffset = false;
					}
					
					nextSound = new SoundToPlay(entry, delay);
					if (delay > 0) {
						soundQueue.push(nextSound);
					}
					if (delay < 0) {
						console.log('WEIRD!!!! delay < 0:    '+delay)
						soundQueue.push(nextSound);
						elapsed += delay;
				  	}
				}
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
}
