"use strict"
var reader;
var curLine;
var elapsed;
var wait;
var now;
var pullTime;

// sound files
var c1_7;
var c1_1;
var c2_1;
var c1_3;
var c1_5;
var boom;

var cp1_1;
var cp1_2;
var cp1_3;
var cp1_5;
var cp1_6;
var cp2_1;

// filter objects
var edenHpf;
var belairLpf;
var reverb;

// to serve as a hashmap with key: ID; value: sound files
var c1Library;
var cp1Library;

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

function getTime(timeString) {
	if (timeString === "now") {
		return Time(hour(), minute(), second(), 0);
	}
	var timeArr = timeString.split(":");

	var h = timeArr[0];
	var m = timeArr[1];
	var s = timeArr[2];
	var ms = timeArr[3];
	
	return new Time(h, m, s, ms);
}

function dateConvert(date) {
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var ms = date.getMilliseconds();

	return new Time(h, m, s, ms);
}

function valueTransform(entryValue) {
	return entryValue/(entryValue+random(0,entryValue));
}

function playSound(entryID, entryValue, reverb, soundLibrary) {
	var sound = soundLibrary[entryID];
	// reverb.process(sound, entryValue,entryValue);
	sound.play();
}

function preload() {
	// Load a soundfile from the /data folder of the sketch and play it back
	c1_7 = loadSound('sounds/C/C-1-7.wav');
	c1_1 = loadSound('sounds/C/C-1-1.wav');
	c2_1 = loadSound('sounds/C/C-2-1.wav');
	c1_3 = loadSound('sounds/C/C-1-3.wav');
	c1_5 = loadSound('sounds/C/C-1-5.wav');
	boom = loadSound('boom.mp3');
	
	c1Library = new Array();
	c1Library['Motion1'] = boom;
	c1Library['Distance1'] = c1_7;
	c1Library['Distance2'] = c1_1;
	c1Library['Distance3'] = c2_1;
	c1Library['Distance4'] = c1_3;
	c1Library['Color1'] = c1_5;

	cp1_1 = loadSound('sounds/Cp/Cp-1-1.wav');
	cp1_2 = loadSound('sounds/Cp/Cp-1-2.wav');
	cp1_3 = loadSound('sounds/Cp/Cp-1-3.wav');
	cp1_5 = loadSound('sounds/Cp/Cp-1-5.wav');
	cp1_6 = loadSound('sounds/Cp/Cp-1-6.wav');
	cp2_1 = loadSound('sounds/Cp/Cp-2-1.wav');

	cp1Library = new Array();
	cp1Library['Distance1'] = cp1_1;
	cp1Library['Distance2'] = cp1_2;
	cp1Library['Distance3'] = cp1_3;
	cp1Library['Distance4'] = cp1_5;
	cp1Library['Color1'] = cp1_6;
	cp1Library['Motion1'] = cp2_1;
}


function determineDelay(pullTime,entryTime) {
	return entryTime.getAbsoluteMil()-pullTime.getAbsoluteMil();
}

function setup() {
	createCanvas(600,600);
	background(255);
	textSize(32);
	text("word", 10, 30);
	fill(0, 102, 153);
	elapsed = millis();
	now = new Date();
	pullTime = new Time(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

	wait = 3000;

	reverb = new p5.Reverb();

	// so we only hear reverb
	// for (var i = 0; i < c1Library.length; i++) {
	// 	c1Library[i].disconnect();
	// }

	loop();
}      

function draw() {
	if (millis() - elapsed >= wait) {
		console.log('-----------------:)-------------------')

		elapsed = millis();

		var xmlhttp = new XMLHttpRequest();
		var url = 'http://localhost:8888/SensorCompz/webpage.js/logFileUpdating.txt';
		var logFile;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var prerequest = new Date();
				console.log('prerequest: '+prerequest.toString());
				logFile = xmlhttp.responseText.split('\n');
				for (var i = 0; i < logFile.length; i++) {
					console.log(logFile[i])
					var entry = logFile[i].split("    ");
					
					var entryTime = getTime(entry[0]);
					var entryID = entry[1];
					var entryValue = entry[2];
					// console.log(pullTime.getHr()+':'+pullTime.getMin()+':'+pullTime.getSec+':'+pullTime.getMil());
					console.log('pull time: ' + pullTime.getHr()+':'+pullTime.getMin()+':'+pullTime.getSec()+':'+pullTime.getMil());
					var delay = determineDelay(pullTime,entryTime);

					now = new Date();
					pullTime = new dateConvert(now);

					if (delay > 0) {
						setTimeout(playSound, delay, entryID, entryValue, reverb, cp1Library);
					} else {
						console.log('WEIRD!!!! delay < 0')
						playSound(entryID, entryValue, reverb, cp1Library);
						console.log(delay);
						// elapsed += delay;
					}
				}
				var postrequest = new Date();
				console.log('postrequest: '+postrequest.toString());
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
}