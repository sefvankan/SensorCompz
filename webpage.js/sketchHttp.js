"use strict"

var reader;
var curLine;
var elapsed;
var wait;
var startTime
var now;
var offset;
var noOffset;

var prevEntry;
var logText;
var stopTime;
var stopLine;

var sensorMap;

var nextSound;
var soundQueue;

// filter objects
var reverb;
var currentColor;
var previousColor;

// to serve as a hashmap with key: ID; value: sound files
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
		currentColor = newColor;
		console.log("COLOR CHANGE WUSSUP:  "+newColor);
		changePalette(newColor);
	}
	// reverb.process(soundLibrary['Color'+'-'+id], rgb/50, rgb/50);
	soundLibrary['Color'+'-'+id].play();
}

function outputMotion(id) {
	soundLibrary['Motion'+'-'+id].play();
}

// function outputDistance(id, distance) {
// 	soundLibrary['Distance'+'-'+id].play();
// }

function outputDistance(id, distance) {
	if (distance > 50) {
		if (distance % 3 == 1) {
			soundLibrary['Distance'+'-'+id][0].pan(-.35);
		} else if (distance % 3 == 2) {
			soundLibrary['Distance'+'-'+id][0].pan(.35);
		}
		soundLibrary['Distance'+'-'+id][0].play();	
	} else if (distance < 150) {
		if (distance % 3 == 1) {
			soundLibrary['Distance'+'-'+id][1].pan(-.85);
		} else if (distance % 3 == 2) {
			soundLibrary['Distance'+'-'+id][1].pan(.85);
		}
		soundLibrary['Distance'+'-'+id][1].play();	
	}
	
}

// function httpGetAsync(url, callback) {
function httpGetAsync(url) {
	var rText = null
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = true;
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            // callback(xmlHttp.responseText);
        	rText = xmlHttp.responseText;
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
    return rText
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


	// whiteLibrary['Distance-31'] = [sandmanLongCmp11, sandmanShortCmp11];
	// whiteLibrary['Distance-2'] = [sandmanLongCmp12, sandmanShortCmp12];
	// whiteLibrary['Distance-3'] = [sandmanLongCmp13, sandmanShortCmp13];
	// whiteLibrary['Distance-4'] = [sandmanLongCmp14, sandmanShortCmp14];
	whiteLibrary['Distance-33'] = [sandmanLongCmp15, sandmanShortCmp15];
	whiteLibrary['Distance-34'] = [sandmanLongCmp21, sandmanShortCmp21];

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
}


function determineDelay(pullTime,entryTime) {
	return entryTime.getAbsoluteMil()-pullTime.getAbsoluteMil();
}



function parseLog(logText, sensorMap, valueTypes, soundDeque, startTime, stopTime, noOffset, soundQueue) {
	var isEntry;
	var isFirst;
	logFile = logText.split('\n');

	// iterate backwards through logFile
	for (var i = logFile.length-1; i > -1; i--) {
		isEntry = false;
		for (var j = 0; j < valueTypes.length; j++) {
			if (logText.indexOf(valueTypes[j]) > -1) {
				isEntry = true;
				break;
			}
		}
		if (isEntry) {

			var fieldsRaw = logFile[i].split(",");
			var fields = []
			for (var j = 0; j < fieldsRaw.length; j++) {
				fields.push(fieldsRaw[j].trimLeft());
			}

			var entryID = fields[3].split(" ")[0].trim();
			if (entryID == '31') {
				continue;
			}
			var entryValue = fields[2].trim();
			var timeStamp = fields[0].split("\t")[1].split(" ")[1].replace(".", ":");
			var entryTime = getTime(timeStamp);
			var entryType = sensorMap[entryID];
			var entry = [timeStamp, entryType, entryID, entryValue]

			var delay = determineDelay(startTime,entryTime);

			if (isFirst) {
				stopTime = entryTime;
			}

			if (entryTime.getAbsoluteMil() < stopTime.getAbsoluteMil()) {
				console.log('BREAAAAAK');
				break;
			}

			console.log(timeStamp+'\t'+entryType+'\t'+entryID+'\t'+entryValue);

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
	}
	return stopTime;
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

	soundQueue = [];

	prevEntry = "";
	stopLine = "";
	stopTime = startTime;

	sensorMap = new Array();
	sensorMap['34'] = 'Distance';
	sensorMap['33'] = 'Distance';

	loop();
}

function draw() {
	var cur = new Date();
	var curTime = dateConvert(cur);
	var diff = curTime.getAbsoluteMil() - startTime.getAbsoluteMil();

	console.log('offset:  '+offset);

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

	// httpGetAsync('http://localhost:8888/SensorCompz/webpage.js/');
	logText = httpGetAsync("http://137.22.30.136/cgi-bin/cmh/log.sh?Device=LuaUPnP");

	stopTime = parseLog(logText, sensorMap, valueTypes, soundDeque, startTime, stopTime, noOffset, soundQueue);

	// // every {wait} milliseconds:
	// if (millis() - elapsed >= wait) {

	// 	elapsed = millis();

	// 	var xmlhttp = new XMLHttpRequest();
	// 	var url = 'http://localhost:8888/SensorCompz/webpage.js/logFileUpdating.txt';
	// 	var logFile;
	// 	xmlhttp.onreadystatechange = function() {
	// 		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	// 			logText = xmlhttp.responseText;
	// 			if (logText != prevEntry) {
	// 				logFile = logText.split('\n');
	// 				for (var i = 0; i < logFile.length-1; i++) {
	// 					// console.log(logFile[i])
	// 					var entry = logFile[i].split("\t");
	// 					var entryTime = getTime(entry[0]);
	// 					var entrySensor = entry[1];
	// 					var entryID = entry[2];
	// 					var entryValue = entry[3];

	// 					var delay = determineDelay(startTime,entryTime);

	// 					// determine offset for checking when to play sound
	// 					// only set offset for first sound
	// 					if (noOffset) {
	// 						offset = millis() - delay;
	// 						noOffset = false;
	// 					}
						
	// 					nextSound = new SoundToPlay(entry, delay);
	// 					if (delay > 0) {
	// 						soundQueue.push(nextSound);
	// 					}
	// 					if (delay < 0) {
	// 						console.log('WEIRD!!!! delay < 0:\t'+delay)
	// 						soundQueue.push(nextSound);
	// 						elapsed += delay;
	// 				  	}
	// 				}
	// 				prevEntry = logText;
	// 			}
	// 		}
	// 	};
	// 	xmlhttp.open("GET", url, true);
	// 	xmlhttp.send();
	// }
}
