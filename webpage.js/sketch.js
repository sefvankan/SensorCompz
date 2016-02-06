"use strict"
var reader;
var curLine;
var elapsed;
var wait;
var now;
var pullTime;

// sound files
var b1;
var c1;
var c2;
var e1;
var g1;
var boom;

// filter objects
var edenHpf;
var belairLpf;
var reverb;

// to serve as a hashmap with key: ID; value: sound files
var soundLibrary;

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

function playSound(entryID, entryValue, reverb) {
	var sound = soundLibrary[entryID];
	reverb.process(sound, entryValue,entryValue);
	sound.play();
}

function preload() {
	// Load a soundfile from the /data folder of the sketch and play it back
	b1 = loadSound('B1.wav.m4a');
	c1 = loadSound('C1.wav.m4a');
	c2 = loadSound('C2.wav.m4a');
	e1 = loadSound('E1.wav.m4a');
	g1 = loadSound('G1.wav.m4a');
	boom = loadSound('boom.mp3');
	
	
	
	soundLibrary = new Array();
	soundLibrary['Motion1'] = boom;
	soundLibrary['Distance1'] = b1;
	soundLibrary['Distance2'] = c1;
	soundLibrary['Distance3'] = c2;
	soundLibrary['Distance4'] = e1;
	soundLibrary['Color1'] = g1;
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
	// for (var i = 0; i < soundLibrary.length; i++) {
	// 	soundLibrary[i].disconnect();
	// }

	loop();
}      

function draw() {
	if (millis() - elapsed >= wait) {

		elapsed = millis();

		now = new Date();
		pullTime = new dateConvert(now);

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
						var entryID = entry[1];
						var entryValue = entry[2];
						// console.log(pullTime.getHr()+':'+pullTime.getMin()+':'+pullTime.getSec+':'+pullTime.getMil());
						console.log(pullTime.getHr()+':'+pullTime.getMin()+':'+pullTime.getSec()+':'+pullTime.getMil());
						var delay = determineDelay(pullTime,entryTime);
						if (delay > 0) {
							setTimeout(playSound, delay, entryID, entryValue, reverb);
						} else {
							console.log('WEIRD!!!! delay < 0')
							playSound(entryID, entryValue, reverb);
							console.log(delay);
							// elapsed += delay;
						}
					}
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
}