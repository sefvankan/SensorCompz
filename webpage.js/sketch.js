"use strict"
var reader;
var curLine;
var elapsed;
var wait;

var hello;
var boom;
var belair;
var eden;

var edenHpf;
var belairLpf;
var oldTime;

function readTextFile(file) {
v
}

// function Entry(t, i, v) {
//   this.time = t;
//   this.id = i;
//   this.value = v;
  
//   this.getTime = function() {
//     return this.time;
//   };
//   this.getId = function() {
//     return this.id;
//   };
//   this.getValue = function() {
//     return this.value;
//   };
// }

function Time(h, m, s) {  
    this.hr = h;
    this.min = m;
    this.sec = s;
    
  this.getHr = function() {
    return this.hr;
  };
  this.getMin = function() {
    return this.min;
  };
  this.getSec = function() {
    return this.sec;
  };
  this.getAbsoluteSec = function() {
    return this.sec+this.min*60+this.hr*60*60;
  }
}

// // return -1 if time1 < time2
// // return 0 if time1 == time2
// // return 1 if time1 > time2
// function compare(time1, time2) {
//   var hr1 = time1.getHr();
//   var min1 = time1.getMin();
//   var sec1 = time1.getSec();
  
//   var hr2 = time2.getHr();
//   var min2 = time2.getMin();
//   var sec2 = time2.getSec();
  
//   if (hr1 < hr2) {
//     return -1;
//   } else if (hr1 == hr2) {
//     if (min1 < min2) {
//       return -1;
//     } else if (min1 > min2) {
//       return 1;
//     } else {
//       if (sec1 < sec2) {
//         return -1;
//       } else if (sec1 > sec2) {
//         return 1;
//       } else {
//         return 0;
//       }
//     }
//     // hr1 < hr2
//   } else {
//     return 1;
//   }
// }

function getTime(timeString) {
  if (timeString === "now") {
    return Time(hour(), minute(), second());
  }
  var timeArr = timeString.split(":");

  var h = int(timeArr[0]);
  var m = int(timeArr[1]);
  var s = int(timeArr[2]);
  console.log(m);
  console.log(s);
  
  return Time(h, m, s);
}

function preload() {
  // Load a soundfile from the /data folder of the sketch and play it back
  hello = loadSound('hello.mp3');
  boom = loadSound('1.mp3');
  eden = loadSound('eden.mp3');
  belair = loadSound('belair.mp3');
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
              var logLine = logFile[i].split("    ");
              
              console.log(logLine[0]);
              console.log(logLine[1]);
              console.log(logLine[2]);
              var logTime = getTime(logLine[0]);
              console.log(logLine[2]);
              var delay = determineDelay(oldTime,logTime)*1000;
              setTimeout(belair.play(),delay);
              
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    //oldTime = new Time(hour(), minute(), second());
    elapsed = 10000000000;
  }
}