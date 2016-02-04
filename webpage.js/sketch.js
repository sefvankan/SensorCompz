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

function readTextFile(file) {
v
}

function Entry(t, i, v) {
  this.time = t;
  this.id = i;
  this.value = v;
  
  this.getTime = function() {
    return this.time;
  };
  this.getId = function() {
    return this.id;
  };
  this.getValue = function() {
    return this.value;
  };
}

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

// return -1 if time1 < time2
// return 0 if time1 == time2
// return 1 if time1 > time2
function compare(time1, time2) {
  var hr1 = time1.getHr();
  var min1 = time1.getMin();
  var sec1 = time1.getSec();
  
  var hr2 = time2.getHr();
  var min2 = time2.getMin();
  var sec2 = time2.getSec();
  
  if (hr1 < hr2) {
    return -1;
  } else if (hr1 == hr2) {
    if (min1 < min2) {
      return -1;
    } else if (min1 > min2) {
      return 1;
    } else {
      if (sec1 < sec2) {
        return -1;
      } else if (sec1 > sec2) {
        return 1;
      } else {
        return 0;
      }
    }
    // hr1 < hr2
  } else {
    return 1;
  }
}

function getTime(timeString) {
  if (timeString === "now") {
    return Time(hour(), minute(), second());
  }
  var timeArr = timeString.split(":");
  var h = int(timeArr[0]);
  var m = int(timeArr[1]);
  var s = int(timeArr[2]);
  return Time(h, m, s);
}

function isConcurrent (time1, time2) {
  if (compare(time1,time2) == 0) {
    return true;
  }
  return false;
}

function checkLog(line) {
  // split by tabs
  entry = line.split("\t");
  
  var lineTime = getTime(entry[0]);
  var lineId = entry[1];
  var lineValue = int(entry[2]);
  
  lineEntry = new Entry(lineTime, lineId, lineValue);
  
  return lineEntry;
  return new Entry(new Time(0,0,0), "test", 0);
 }

function preload() {
  // Load a soundfile from the /data folder of the sketch and play it back
  hello = loadSound('hello.mp3');
  boom = loadSound('1.mp3');
  eden = loadSound('eden.mp3');
  belair = loadSound('belair.mp3');
}

function setup() {
  createCanvas(600,600);
  background(255);
  textSize(32);
  text("word", 10, 30);
  fill(0, 102, 153);
  elapsed = millis();
  wait = 1000;
  loop();
}      

function determineDelay(lastTime,newTime) {
  return newTime.getAbsoluteSec()-lastTime.getAbsoluteSec();
}

function draw() {
  //print(millis());
  if (millis() < 2000) {
    // reader = new FileReader();
    // curLine = reader.readAsText('logFile.txt').split('\n')[0];
    // curLine = readTextFile('logFile.txt').split('\n')[0];
    elapsed = millis();
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:8888/web-export/logFile.txt';
    var myArr;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myArr = xmlhttp.responseText.split('\n');
            alert(myArr);
        }
    };
    var timenew = new Time(21,0,3);
    var timeold = new Time(20,59,51);
    alert(determineDelay(timeold,timenew));
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    var trigValue = 1000;
    edenHpf = new p5.HighPass();
    edenHpf.freq(trigValue*60);
    eden.connect(edenHpf);
    eden.play();
    belairLpf = new p5.LowPass();
    belairLpf.freq(trigValue*10);
    belair.connect(belairLpf);
    belair.play();
    
    // var curTime = new Time(hour(), minute(), second());

    // var entry = checkLog(curLine);
    // var trigTime = entry.getTime();
    // var trigId = entry.getId();
    // var trigValue = entry.getValue();
    

    //   if (isConcurrent(curTime, trigTime)){
    //     if (trigId.equals("distance")) {
    //       edenHpf = new p5.HighPass();
    //       edenHpf.freq(trigValue*60);
    //       eden.connect(edenHpf);
    //       eden.play();
    //       belairLpf = new p5.LowPass();
    //       belairLpf.freq(trigValue*10);
    //       belair.connect(belairLpf);
    //       belair.play();
    //     } else if (trigId.equals("motion")) {
    //       boom.play();
    //     }
    //   }
    }
}