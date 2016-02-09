"use strict"
var reader;
var curLine;
var elapsed;
var wait;
var now;

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
			outputColor(entry[3]);
		case 'Motion':
			outputMotion(entry[2]);
	}
}

function outputDistance(id, distance) {
	playSound(soundLibrary['Distance']);
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
	}
	else if(color=='Black') {
		background(0);
	}
	else {
		background(128);
	}
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
  grayLibrary['Motion'] = soundG11;
  grayLibrary['Distance'] = soundG17;
  grayLibrary['Color'] = soundG21;

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
  // pullTime = new Time(hour(), minute(), second(), 0);
	now = new Date();
	pullTime = new dateConvert(now);

  wait = 3000;
	currentColor = 'White';
	soundLibrary = whiteLibrary;

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
							now = new Date();
							pullTime = new dateConvert(now);
							if (delay > 0) {
									setTimeout(determineOutput, delay, entry);
							}
              if (delay < 0) {
                console.log('WEIRD!!!! delay < 0:    '+delay)
              }
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
}
