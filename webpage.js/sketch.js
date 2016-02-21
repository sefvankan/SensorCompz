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

var logText
var prevEntry

// filter objects
var reverb;
var currentColor;
var previousColor;

// to serve as a hashmap with key: ID; value: sound files
var colorMap;
var soundLibrary;
var whiteLibrary;
var grayLibrary;
var blackLibrary;
var soundC11;
var soundC13;
var soundC15;
var soundC17;
var soundC21;
var soundD11;
var soundD13;
var soundD15;
var soundD17;
var soundD21;
var soundG11;
var soundG13;
var soundG15;
var soundG17;
var soundG21;
var soundBoom;
var soundCp11;
var soundCp12;
var soundCp13;
var soundCp15;
var soundCp16;
var soundCp21;

var sandmanLongCmp11;
var sandmanLongCmp12;
var sandmanLongCmp13;
var sandmanLongCmp14;
var sandmanLongCmp15;
var sandmanLongCmp21;
var sandmanShortCmp11;
var sandmanShortCmp12;
var sandmanShortCmp13;
var sandmanShortCmp14;
var sandmanShortCmp15;
var sandmanShortCmp21;

var belair;

var snare;

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

// trigger is a SoundToPlay object
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
		case 'Sound':
			outputSound(trigger.getID(), trigger.getValue());
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

function changePalette(colorValue) {
	var colorEntry = colorMap[colorValue];
	background(colorEntry[1],colorEntry[2],colorEntry[3]);
}

function outputColor(id, colorValue) {
	console.log('Color value: ' + colorValue)
	if(colorValue != currentColor){
		currentColor = colorValue;
		//console.log("COLOR CHANGE WUSSUP:  "+newColor);
		changePalette(colorValue);
	}
	// reverb.process(soundLibrary['Color'+'-'+id], rgb/50, rgb/50);
	//soundLibrary['Color'+'-'+id].play();
}

function outputMotion(id) {
	soundLibrary['Motion'+'-'+id].play();
}

// function outputDistance(id, distance) {
// 	soundLibrary['Distance'+'-'+id].play();
// }

function determinePan(sound, distance) {
	var SoundToPlay = sound
	if (distance % 3 == 1) {
		SoundToPlay = sound.pan(-.35)
	} else if (distance % 3 == 2) {
		SoundToPlay = sound.pan(.35)
	}
	return SoundToPlay
}

function outputDistance(id, distance) {

	if (distance < 40 && distance != 0) {
		soundLibrary['Distance'+'-'+id][1].pan(.85);
		soundLibrary['Distance'+'-'+id][1].play();
		soundLibrary['Distance'+'-'+id][1].play();
		soundLibrary['Distance'+'-'+id][1].play();
		soundLibrary['Distance'+'-'+id][1].play();
		sandmanLongCmp21.play();
		sandmanLongCmp21.play();
		soundLibrary['Distance'+'-'+id][1].pan(0);
	} else if (distance < 235) {
		soundLibrary['Distance'+'-'+id][0].play();
	} else if (distance < 275) {
		soundLibrary['Distance'+'-'+id][1].pan(-.85);
		soundLibrary['Distance'+'-'+id][1].play();
		soundLibrary['Distance'+'-'+id][1].pan(0);
	}
}

function outputSound(id, volume) {

	var diff = int(volume) - 140;
	var nextLevelDiff = diff - 20
	console.log("diff");
	console.log(diff);
	if (diff > 0 && diff < 20) {
		console.log("playing small sound")
		soundLibrary['VContainer1-'+id].setVolume(.6);
		soundLibrary['VContainer1-'+id].play();
		soundLibrary['VContainer1-'+id].play();
	} else if (nextLevelDiff > 0) {
		console.log("NEXT LEVEL DIFF: ");
		console.log(nextLevelDiff);
		var newVolume = .6 + (nextLevelDiff%10)/7.5;
		console.log("new volume:");
		console.log(newVolume)
		soundLibrary['VContainer1-'+id].setVolume(newVolume);
		soundLibrary['VContainer1-'+id].play();
		soundLibrary['VContainer1-'+id].play();
		soundLibrary['VContainer1-'+id].setVolume(.6);
	}
}

function preload() {

	// Load a soundfile from the /data folder of the sketch and play it back
	soundC11 = loadSound('sounds/C/C-1-1.mp3');
	soundC13 = loadSound('sounds/C/C-1-3.mp3');
	soundC15 = loadSound('sounds/C/C-1-5.mp3');
	soundC17 = loadSound('sounds/C/C-1-7.mp3');
	soundC21 = loadSound('sounds/C/C-1-5.mp3');
	soundD11 = loadSound('sounds/D/D-1-1.mp3');
	soundD13 = loadSound('sounds/D/D-1-3.mp3');
	soundD15 = loadSound('sounds/D/D-1-5.mp3');
	soundD17 = loadSound('sounds/D/D-1-7.mp3');
	soundD21 = loadSound('sounds/D/D-1-5.mp3');
	soundG11 = loadSound('sounds/G/G-1-1.mp3');
	soundG13 = loadSound('sounds/G/G-1-3.mp3');
	soundG15 = loadSound('sounds/G/G-1-5.mp3');
	soundG17 = loadSound('sounds/G/G-1-7.mp3');
	soundG21 = loadSound('sounds/G/G-2-1.mp3');
	soundBoom = loadSound('sounds/boom.mp3');
	soundCp11 = loadSound('sounds/Cp/Cp-1-1.mp3');
	soundCp12 = loadSound('sounds/Cp/Cp-1-2.mp3');
	soundCp13 = loadSound('sounds/Cp/Cp-1-3.mp3');
	soundCp15 = loadSound('sounds/Cp/Cp-1-5.mp3');
	soundCp16 = loadSound('sounds/Cp/Cp-1-6.mp3');
	soundCp21 = loadSound('sounds/Cp/Cp-2-1.mp3');

	sandmanLongCmp11 = loadSound('sounds/Cmp/Cmp-1-1.mp3');
	sandmanLongCmp12 = loadSound('sounds/Cmp/Cmp-1-2.mp3');
	sandmanLongCmp13 = loadSound('sounds/Cmp/Cmp-1-3.mp3');
	sandmanLongCmp14 = loadSound('sounds/Cmp/Cmp-1-4.mp3');
	sandmanLongCmp15 = loadSound('sounds/Cmp/Cmp-1-5.mp3');
	sandmanLongCmp21 = loadSound('sounds/Cmp/Cmp-2-1.mp3');
	sandmanShortCmp11 = loadSound('sounds/Cmp/Cmp-1-1_short.mp3');
	sandmanShortCmp12 = loadSound('sounds/Cmp/Cmp-1-2_short.mp3');
	sandmanShortCmp13 = loadSound('sounds/Cmp/Cmp-1-3_short.mp3');
	sandmanShortCmp14 = loadSound('sounds/Cmp/Cmp-1-4_short.mp3');
	sandmanShortCmp15 = loadSound('sounds/Cmp/Cmp-1-5_short.mp3');
	sandmanShortCmp21 = loadSound('sounds/Cmp/Cmp-2-1_short.mp3');

	snare = loadSound('sounds/snare.mp3')

	colorMap = new Array();
	colorMap['0'] = ['Black',0,0,0];
	colorMap['1'] = ['White',255,255,255];
	colorMap['11'] = ['Red',255,0,0];
	colorMap['12'] = ['Orange',255,180,0];
	colorMap['13'] = ['Yellow',255,255,0];
	colorMap['14'] = ['Green',0,255,0];
	colorMap['15'] = ['Blue',0,0,255];
	colorMap['16'] = ['Indigo',0,255,255];
	colorMap['17'] = ['Violet',100,0,200];

	whiteLibrary = new Array();
	// whiteLibrary['Motion-1'] = soundC11;
	// whiteLibrary['Distance-1'] = soundC13;
	// whiteLibrary['Distance-2'] = soundC15;
	// whiteLibrary['Distance-3'] = soundC17;
	// whiteLibrary['Distance-4'] = soundC21;
	// whiteLibrary['Color-1'] = soundBoom;

	// whiteLibrary['Motion-1'] = soundCp11;
	// whiteLibrary['Distance-1'] = soundCp12;
	// whiteLibrary['Distance-2'] = soundCp13;
	// whiteLibrary['Distance-3'] = soundCp15;
	// whiteLibrary['Distance-4'] = soundCp16;
	// whiteLibrary['Color-1'] = soundCp21;

	whiteLibrary['Distance-1'] = [sandmanLongCmp11, sandmanShortCmp11];
	whiteLibrary['Distance-2'] = [sandmanLongCmp12, sandmanShortCmp12];
	whiteLibrary['Distance-3'] = [sandmanLongCmp13, sandmanShortCmp13];
	whiteLibrary['Distance-4'] = [sandmanLongCmp14, sandmanShortCmp14];
	whiteLibrary['Distance-5'] = [sandmanLongCmp15, sandmanShortCmp15];
	whiteLibrary['Distance-6'] = [sandmanLongCmp21, sandmanShortCmp21];
	whiteLibrary['VContainer1-31'] = snare;


	grayLibrary = new Array();
	grayLibrary['Motion-1'] = soundD11;
	grayLibrary['Distance-1'] = soundD13;
	grayLibrary['Distance-2'] = soundD15;
	grayLibrary['Distance-3'] = soundD17;
	grayLibrary['Distance-4'] = soundD21;
	grayLibrary['Color-1'] = soundD11;

	blackLibrary = new Array();
	blackLibrary['Motion-1'] = soundG11;
	blackLibrary['Distance-1'] = soundG13;
	blackLibrary['Distance-2'] = soundG15;
	blackLibrary['Distance-3'] = soundG17;
	blackLibrary['Distance-4'] = soundG21;
	blackLibrary['Color-1'] = soundG11;


	belair = loadSound('belair.mp3');
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

	reverb = new p5.Reverb();

	offset = 0;
	noOffset = true;

	wait = 0;
	currentColor = 'White';
	soundLibrary = whiteLibrary;

	prevEntry = "";

	soundQueue = [];

	loop();
}

function draw() {
	var cur = new Date();
	var curTime = dateConvert(cur);
	// console.log(curTime);
	var diff = curTime.getAbsoluteMil() - startTime.getAbsoluteMil();

	if (soundQueue.length > 0) {
		// if it's time to play the next sound
		if (millis() - offset >= soundQueue[0].getDelay()) {
			// shift off sound from queue
			var toPlay = soundQueue.shift();
			// play the sound
			determineOutput(toPlay);
		}
	}

	// every {wait} milliseconds:
	if (millis() - elapsed >= wait) {

		elapsed = millis();

		var xmlhttp = new XMLHttpRequest();
		var url = 'http://localhost:8888/SensorCompz/webpage.js/logFileUpdating.txt';
		var logFile;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				logText = xmlhttp.responseText;
				if (logText != prevEntry) {
					logFile = logText.split('\n');
					for (var i = 0; i < logFile.length-1; i++) {
						// console.log(logFile[i])
						var entry = logFile[i].split("\t");
						var entryTime = getTime(entry[0]);
						var entrySensor = entry[1];
						var entryID = entry[2];
						var entryValue = entry[3];
						console.log(entry);

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
							console.log('WEIRD!!!! delay < 0:\t'+delay)
							soundQueue.push(nextSound);
							elapsed += delay;
					  	}
					}
					prevEntry = logText;
				}
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
}
