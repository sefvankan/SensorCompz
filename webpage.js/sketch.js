"use strict"
var reader;
var curLine;
var elapsed;
var wait;

// sound files
var hello;
var boom;
var belair;
var eden;

// filter objects
var edenHpf;
var belairLpf;
var pullTime;
var previousColor;

// to serve as a hashmap with key: ID; value: sound files
var soundLibrary;

// function Time(h, m, s) {
function Time(h, m, s, ms) {
    this.hr = h;
    this.min = m;
    this.sec = s;
    this.mil = ms;
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

  var h = int(timeArr[0]);
  var m = int(timeArr[1]);
  var s = int(timeArr[2]);
  var ms = int(timeArr[3]);

  return new Time(h, m, s, ms);
}

function determineOutput(entry) {
	var sensorType = entry[1];
	switch (sensorType) {
		case 'Distance':
			outputDistance(entry[2],entry[3]);
		case 'Color':
			outputColor(entry[2]);
		case 'Motion':
			outputMotion(entry[2]);
	}
}

function outputDistance(id, distance) {
	playSound(soundLibrary['Distance']);
}

function getColor(rgb) {
	var red = parseInt(string.substring(0,3), 16);
	var green = parseInt(string.substring(2,5), 16);
	var blue = parseInt(string.substring(4,7), 16);
	console.log(red + ',' + green + ',' + blue);
}

function changePalette(rgb) {

}

function outputColor(rgb) {
	playSound(soundLibrary['Color']);
}

function outputMotion(id) {
	playSound(soundLibrary['Motion']);
}

function playSound(soundFile) {
  soundFile.play();
}

function preload() {
  // Load a soundfile from the /data folder of the sketch and play it back
  hello = loadSound('hello.mp3');
  boom = loadSound('1.mp3');
  eden = loadSound('eden.mp3');
  belair = loadSound('belair.mp3');

  soundLibrary = new Array();
  soundLibrary['Motion'] = belair;
  soundLibrary['Distance'] = eden;
  soundLibrary['Color'] = boom;
}


function determineDelay(pullTime,entryTime) {
	return entryTime.getAbsoluteMil()-pullTime.getAbsoluteMil();
}

function setup() {
  createCanvas(1400,900);
  background(255);
  textSize(32);
  text("word", 10, 30);
  fill(0, 102, 153);
  elapsed = millis();
  pullTime = new Time(hour(), minute(), second(), 0);
  wait = 3000;
	oldColor = 'White';

  loop();
}

function draw() {
  if (millis() - elapsed >= wait) {

    elapsed = millis();

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:8888/SensorCompz/webpage.js/logFileUpdating.txt';
    var logFile;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						pullTime = new Time(hour(), minute(), second(), 0);
            logFile = xmlhttp.responseText.split('\n');
            for (var i = 0; i < logFile.length; i++) {
              //console.log(logFile[i])
              var entry = logFile[i].split("    ");
              var entryTime = getTime(entry[0]);
              var delay = determineDelay(pullTime,entryTime);
							console.log(delay)
              setTimeout(determineOutput, delay, entry);
              if (delay < 0) {
                console.log('WEIRD!!!! delay < 0')
              }
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
}
