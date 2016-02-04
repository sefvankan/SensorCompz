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
var oldTime;

// to serve as a hashmap with key: ID; value: sound files
var soundLibrary;

function Time(h, m, s) {  
// function Time(h, m, s, ms) {  
    this.hr = h;
    this.min = m;
    this.sec = s;
    // this.mil = ms;
  this.getHr = function() {
    return this.hr;
  };
  this.getMin = function() {
    return this.min;
  };
  this.getSec = function() {
    return this.sec;
  };
  // this.getMil = function() {
  //   return this.mil;
  // };
  this.getAbsoluteSec = function() {
    return this.sec+this.min*60+this.hr*60*60;
  };
  // this.getAbsoluteMil = function() {
  //   return 1000*this.getAbsoluteSec()+this.mil;
  // };
}

function getTime(timeString) {
  if (timeString === "now") {
    return Time(hour(), minute(), second());
  }
  var timeArr = timeString.split(":");

  var h = int(timeArr[0]);
  var m = int(timeArr[1]);
  var s = int(timeArr[2]);
  
  return new Time(h, m, s);
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
}


function determineDelay(pullTime,entryTime) {
  return entryTime.getAbsoluteSec()-pullTime.getAbsoluteSec();
}

function setup() {
  createCanvas(600,600);
  background(255);
  textSize(32);
  text("word", 10, 30);
  fill(0, 102, 153);
  elapsed = millis();
  //oldTime = Time(hour(), minute(), second());
  oldTime = new Time(21, 22, 10);
  wait = 1000;

  loop();
}      

function draw() {
  //print(millis());
  if (millis() - elapsed >= 3000) {
    console.log('hi');
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:8888/SensorCompz/webpage.js/logFile2.txt';
    var logFile;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            logFile = xmlhttp.responseText.split('\n');
            for (var i = 0; i < logFile.length; i++) {
              var entry = logFile[i].split("    ");
              
              var entryTime = getTime(entry[0]);
              var entryID = entry[1];
              
              var delay = determineDelay(oldTime,entryTime)*1000;
              console.log(delay);
              setTimeout(playSound, delay, soundLibrary[entryID]);
              
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    //oldTime = new Time(hour(), minute(), second());
    elapsed = 10000000000;
  }
}