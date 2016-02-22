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


var Bfmin_11_elevator;
var Bfmin_12_elevator;
var Bfmin_13_elevator;
var Bfmin_14_elevator;
var Bfmin_15_elevator;
var Bfmin_21_elevator;
var Cmaj_11_elevator;
var Cmaj_12_elevator;
var Cmaj_13_elevator;
var Cmaj_14_elevator;
var Cmaj_15_elevator;
var Cmaj_21_elevator;
var Cmin_11_elevator;
var Cmin_12_elevator;
var Cmin_13_elevator;
var Cmin_14_elevator;
var Cmin_15_elevator;
var Cmin_21_elevator;
var Dmaj_11_elevator;
var Dmaj_12_elevator;
var Dmaj_13_elevator;
var Dmaj_14_elevator;
var Dmaj_15_elevator;
var Dmaj_21_elevator;
var Dmin_11_elevator;
var Dmin_12_elevator;
var Dmin_13_elevator;
var Dmin_14_elevator;
var Dmin_15_elevator;
var Dmin_21_elevator;
var Fsmaj_11_elevator;
var Fsmaj_12_elevator;
var Fsmaj_13_elevator;
var Fsmaj_14_elevator;
var Fsmaj_15_elevator;
var Fsmaj_21_elevator;
var Gmaj_11_elevator;
var Gmaj_12_elevator;
var Gmaj_13_elevator;
var Gmaj_14_elevator;
var Gmaj_15_elevator;
var Gmaj_21_elevator;
var Gmin_11_elevator;
var Gmin_12_elevator;
var Gmin_13_elevator;
var Gmin_14_elevator;
var Gmin_15_elevator;
var Gmin_21_elevator;
var Bfmin_11_left;
var Bfmin_12_left;
var Bfmin_13_left;
var Bfmin_14_left;
var Bfmin_15_left;
var Bfmin_21_left;
var Cmaj_11_left;
var Cmaj_12_left;
var Cmaj_13_left;
var Cmaj_14_left;
var Cmaj_15_left;
var Cmaj_21_left;
var Cmin_11_left;
var Cmin_12_left;
var Cmin_13_left;
var Cmin_14_left;
var Cmin_15_left;
var Cmin_21_left;
var Dmaj_11_left;
var Dmaj_12_left;
var Dmaj_13_left;
var Dmaj_14_left;
var Dmaj_15_left;
var Dmaj_21_left;
var Dmin_11_left;
var Dmin_12_left;
var Dmin_13_left;
var Dmin_14_left;
var Dmin_15_left;
var Dmin_21_left;
var Fsmaj_11_left;
var Fsmaj_12_left;
var Fsmaj_13_left;
var Fsmaj_14_left;
var Fsmaj_15_left;
var Fsmaj_21_left;
var Gmaj_11_left;
var Gmaj_12_left;
var Gmaj_13_left;
var Gmaj_14_left;
var Gmaj_15_left;
var Gmaj_21_left;
var Gmin_11_left;
var Gmin_12_left;
var Gmin_13_left;
var Gmin_14_left;
var Gmin_15_left;
var Gmin_21_left;
var Bfmin_11_right;
var Bfmin_12_right;
var Bfmin_13_right;
var Bfmin_14_right;
var Bfmin_15_right;
var Bfmin_21_right;
var Cmaj_11_right;
var Cmaj_12_right;
var Cmaj_13_right;
var Cmaj_14_right;
var Cmaj_15_right;
var Cmaj_21_right;
var Cmin_11_right;
var Cmin_12_right;
var Cmin_13_right;
var Cmin_14_right;
var Cmin_15_right;
var Cmin_21_right;
var Dmaj_11_right;
var Dmaj_12_right;
var Dmaj_13_right;
var Dmaj_14_right;
var Dmaj_15_right;
var Dmaj_21_right;
var Dmin_11_right;
var Dmin_12_right;
var Dmin_13_right;
var Dmin_14_right;
var Dmin_15_right;
var Dmin_21_right;
var Fsmaj_11_right;
var Fsmaj_12_right;
var Fsmaj_13_right;
var Fsmaj_14_right;
var Fsmaj_15_right;
var Fsmaj_21_right;
var Gmaj_11_right;
var Gmaj_12_right;
var Gmaj_13_right;
var Gmaj_14_right;
var Gmaj_15_right;
var Gmaj_21_right;
var Gmin_11_right;
var Gmin_12_right;
var Gmin_13_right;
var Gmin_14_right;
var Gmin_15_right;
var Gmin_21_right;
var Bfmin_11_wave;
var Bfmin_12_wave;
var Bfmin_13_wave;
var Bfmin_14_wave;
var Bfmin_15_wave;
var Bfmin_21_wave;
var Cmaj_11_wave;
var Cmaj_12_wave;
var Cmaj_13_wave;
var Cmaj_14_wave;
var Cmaj_15_wave;
var Cmaj_21_wave;
var Cmin_11_wave;
var Cmin_12_wave;
var Cmin_13_wave;
var Cmin_14_wave;
var Cmin_15_wave;
var Cmin_21_wave;
var Dmaj_11_wave;
var Dmaj_12_wave;
var Dmaj_13_wave;
var Dmaj_14_wave;
var Dmaj_15_wave;
var Dmaj_21_wave;
var Dmin_11_wave;
var Dmin_12_wave;
var Dmin_13_wave;
var Dmin_14_wave;
var Dmin_15_wave;
var Dmin_21_wave;
var Fsmaj_11_wave;
var Fsmaj_12_wave;
var Fsmaj_13_wave;
var Fsmaj_14_wave;
var Fsmaj_15_wave;
var Fsmaj_21_wave;
var Gmaj_11_wave;
var Gmaj_12_wave;
var Gmaj_13_wave;
var Gmaj_14_wave;
var Gmaj_15_wave;
var Gmaj_21_wave;
var Gmin_11_wave;
var Gmin_12_wave;
var Gmin_13_wave;
var Gmin_14_wave;
var Gmin_15_wave;
var Gmin_21_wave;

var thunder_low;
var thunder_med;
var thunder_high;


// sound arrays
var leftCmajSounds;
var rightCmajSounds;
var elevatorCmajSounds;
var waveCmajSounds;
var leftFsmajSounds;
var rightFsmajSounds;
var elevatorFsmajSounds;
var waveFsmajSounds;
var leftGmajSounds;
var rightGmajSounds;
var elevatorGmajSounds;
var waveGmajSounds;
var leftDmajSounds;
var rightDmajSounds;
var elevatorDmajSounds;
var waveDmajSounds;
var leftCminSounds;
var rightCminSounds;
var elevatorCminSounds;
var waveCminSounds;
var leftDminSounds;
var rightDminSounds;
var elevatorDminSounds;
var waveDminSounds;
var leftBfminSounds;
var rightBfminSounds;
var elevatorBfminSounds;
var waveBfminSounds;
var leftGmajSounds;
var rightGmajSounds;
var elevatorGmajSounds;
var waveGmajSounds;

var thunderSounds;

// to serve as a hashmap with key: ID; value: sound files
var displayVideo;
var colorMap;
var videoMap;
var soundLibrary;
var whiteLibrary;
var blackLibrary;
var redLibrary;
var orangeLibrary;
var yellowLibrary;
var greenLibrary;
var blueLibrary;
var violetLibrary;



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

function changePalette(colorValue) {
	var colorEntry = colorMap[colorValue];
	// // displayVideo.loop();
	// imageMode(CENTER);
	// image(displayVideo,700,450);
	console.log('hi?')
	background(colorEntry[1],colorEntry[2],colorEntry[3]);
	switch (colorEntry[0]) {
		case 'Black':
			soundLibrary = blackLibrary;
			break;
		case 'White':
			soundLibrary = whiteLibrary;
			break;
		case 'Red':
			soundLibrary = redLibrary;
			break;
		case 'Orange':
			soundLibrary = orangeLibrary;
			break;
		case 'Yellow':
			soundLibrary = yellowLibrary;
			break;
		case 'Green':
			soundLibrary = greenLibrary;
			break;
		case 'Blue':
			soundLibrary = blueLibrary;
			break;
		case 'Violet':
			soundLibrary = violetLibrary;
			break;
	}

	var videoString = "videos/" + colorEntry[0] + "_1.webm"
	displayVideo = createVideo([videoString]);
	displayVideo.hide();
	displayVideo.loop();
	image(displayVideo,960,540);

}

function outputColor(id, colorValue) {
	console.log(colorValue)
	if(colorValue!='16') {
		if(colorValue != currentColor){
			currentColor = colorValue;
			//console.log("COLOR CHANGE WUSSUP:  "+newColor);
			changePalette(colorValue);

		}
	}
	// reverb.process(soundLibrary['Color'+'-'+id], rgb/50, rgb/50);
	//soundLibrary['Color'+'-'+id].play();
}


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
	distance = int(distance)
	if (distance == 0) {
		console.log("outttahereeee");
		return;
	}
	console.log("got here");
	var baseline;
	switch (id) {
		case '2':
			baseline = 280;
			break;
		case '3':
			baseline = 280;
			break;
		case '4':
			baseline = 200;
			break;
		case '5':
			baseline = 220;
			break;
	}

	var oneOne = baseline/6.0;
	var oneTwo = 2*baseline/6.0;
	var oneThree = 3*baseline/6.0;
	var oneFour = 4*baseline/6.0;
	var oneFive = 5*baseline/6.0;
	var twoOne = baseline;
	var toPlay;

	if (distance < oneOne) {
		toPlay = soundLibrary['Distance'+'-'+id][0];
	} else if (distance < oneTwo) {
		toPlay = soundLibrary['Distance'+'-'+id][1];
	} else if (distance < oneThree) {
		toPlay = soundLibrary['Distance'+'-'+id][2];
	} else if (distance < oneFour) {
		toPlay = soundLibrary['Distance'+'-'+id][3];
	} else if (distance < oneFive) {
		toPlay = soundLibrary['Distance'+'-'+id][4];
	} else if (distance < twoOne) {
		toPlay = soundLibrary['Distance'+'-'+id][5];
	} else {
		return;
	}

	if (!toPlay.isPlaying()) {
		toPlay.play();
	}
}

function outputSound(id, volume) {

	var diff = int(volume) - 160;

	if (diff <= 0) {
		return;
	}

	console.log(diff);
	if (diff < 20) {
		console.log("playing small sound")
		thunder_low.play();
	} else if (diff < 40) {
		console.log("playing medium sound")
		thunder_med.play();
	} else {
		console.log("playing high sound")
		thunder_high.play();
	}
}

function preload() {
	console.log("starting preload");

	thunder_low = loadSound('sounds/thunder/thunder_low.mp3');
	thunder_med = loadSound('sounds/thunder/thunder_med.mp3');
	thunder_high = loadSound('sounds/thunder/thunder_high.mp3');

	// Load a soundfile from the /data folder of the sketch and play it back

	Bfmin_11_elevator = loadSound('sounds/elevator/Bfmin/Bfmin_1-1_elevator.mp3');
	Bfmin_12_elevator = loadSound('sounds/elevator/Bfmin/Bfmin_1-2_elevator.mp3');
	Bfmin_13_elevator = loadSound('sounds/elevator/Bfmin/Bfmin_1-3_elevator.mp3');
	Bfmin_14_elevator = loadSound('sounds/elevator/Bfmin/Bfmin_1-4_elevator.mp3');
	Bfmin_15_elevator = loadSound('sounds/elevator/Bfmin/Bfmin_1-5_elevator.mp3');
	Bfmin_21_elevator = loadSound('sounds/elevator/Bfmin/Bfmin_2-1_elevator.mp3');
	
	Cmaj_11_elevator = loadSound('sounds/elevator/Cmaj/Cmaj_1-1_elevator.mp3');
	Cmaj_12_elevator = loadSound('sounds/elevator/Cmaj/Cmaj_1-2_elevator.mp3');
	Cmaj_13_elevator = loadSound('sounds/elevator/Cmaj/Cmaj_1-3_elevator.mp3');
	Cmaj_14_elevator = loadSound('sounds/elevator/Cmaj/Cmaj_1-4_elevator.mp3');
	Cmaj_15_elevator = loadSound('sounds/elevator/Cmaj/Cmaj_1-5_elevator.mp3');
	Cmaj_21_elevator = loadSound('sounds/elevator/Cmaj/Cmaj_2-1_elevator.mp3');

	Cmin_11_elevator = loadSound('sounds/elevator/Cmin/Cmin_1-1_elevator.mp3');
	Cmin_12_elevator = loadSound('sounds/elevator/Cmin/Cmin_1-2_elevator.mp3');
	Cmin_13_elevator = loadSound('sounds/elevator/Cmin/Cmin_1-3_elevator.mp3');
	Cmin_14_elevator = loadSound('sounds/elevator/Cmin/Cmin_1-4_elevator.mp3');
	Cmin_15_elevator = loadSound('sounds/elevator/Cmin/Cmin_1-5_elevator.mp3');
	Cmin_21_elevator = loadSound('sounds/elevator/Cmin/Cmin_2-1_elevator.mp3');

	Dmaj_11_elevator = loadSound('sounds/elevator/Dmaj/Dmaj_1-1_elevator.mp3');
	Dmaj_12_elevator = loadSound('sounds/elevator/Dmaj/Dmaj_1-2_elevator.mp3');
	Dmaj_13_elevator = loadSound('sounds/elevator/Dmaj/Dmaj_1-3_elevator.mp3');
	Dmaj_14_elevator = loadSound('sounds/elevator/Dmaj/Dmaj_1-4_elevator.mp3');
	Dmaj_15_elevator = loadSound('sounds/elevator/Dmaj/Dmaj_1-5_elevator.mp3');
	Dmaj_21_elevator = loadSound('sounds/elevator/Dmaj/Dmaj_2-1_elevator.mp3');

	Dmin_11_elevator = loadSound('sounds/elevator/Dmin/Dmin_1-1_elevator.mp3');
	Dmin_12_elevator = loadSound('sounds/elevator/Dmin/Dmin_1-2_elevator.mp3');
	Dmin_13_elevator = loadSound('sounds/elevator/Dmin/Dmin_1-3_elevator.mp3');
	Dmin_14_elevator = loadSound('sounds/elevator/Dmin/Dmin_1-4_elevator.mp3');
	Dmin_15_elevator = loadSound('sounds/elevator/Dmin/Dmin_1-5_elevator.mp3');
	Dmin_21_elevator = loadSound('sounds/elevator/Dmin/Dmin_2-1_elevator.mp3');

	Fsmaj_11_elevator = loadSound('sounds/elevator/Fsmaj/Fsmaj_1-1_elevator.mp3');
	Fsmaj_12_elevator = loadSound('sounds/elevator/Fsmaj/Fsmaj_1-2_elevator.mp3');
	Fsmaj_13_elevator = loadSound('sounds/elevator/Fsmaj/Fsmaj_1-3_elevator.mp3');
	Fsmaj_14_elevator = loadSound('sounds/elevator/Fsmaj/Fsmaj_1-4_elevator.mp3');
	Fsmaj_15_elevator = loadSound('sounds/elevator/Fsmaj/Fsmaj_1-5_elevator.mp3');
	Fsmaj_21_elevator = loadSound('sounds/elevator/Fsmaj/Fsmaj_2-1_elevator.mp3');

	Gmaj_11_elevator = loadSound('sounds/elevator/Gmaj/Gmaj_1-1_elevator.mp3');
	Gmaj_12_elevator = loadSound('sounds/elevator/Gmaj/Gmaj_1-2_elevator.mp3');
	Gmaj_13_elevator = loadSound('sounds/elevator/Gmaj/Gmaj_1-3_elevator.mp3');
	Gmaj_14_elevator = loadSound('sounds/elevator/Gmaj/Gmaj_1-4_elevator.mp3');
	Gmaj_15_elevator = loadSound('sounds/elevator/Gmaj/Gmaj_1-5_elevator.mp3');
	Gmaj_21_elevator = loadSound('sounds/elevator/Gmaj/Gmaj_2-1_elevator.mp3');

	Gmin_11_elevator = loadSound('sounds/elevator/Gmin/Gmin_1-1_elevator.mp3');
	Gmin_12_elevator = loadSound('sounds/elevator/Gmin/Gmin_1-2_elevator.mp3');
	Gmin_13_elevator = loadSound('sounds/elevator/Gmin/Gmin_1-3_elevator.mp3');
	Gmin_14_elevator = loadSound('sounds/elevator/Gmin/Gmin_1-4_elevator.mp3');
	Gmin_15_elevator = loadSound('sounds/elevator/Gmin/Gmin_1-5_elevator.mp3');
	Gmin_21_elevator = loadSound('sounds/elevator/Gmin/Gmin_2-1_elevator.mp3');


	////////////////////////////////////////////////////////////////////////////

	Bfmin_11_left = loadSound('sounds/left/Bfmin/Bfmin_1-1_left.mp3');
	Bfmin_12_left = loadSound('sounds/left/Bfmin/Bfmin_1-2_left.mp3');
	Bfmin_13_left = loadSound('sounds/left/Bfmin/Bfmin_1-3_left.mp3');
	Bfmin_14_left = loadSound('sounds/left/Bfmin/Bfmin_1-4_left.mp3');
	Bfmin_15_left = loadSound('sounds/left/Bfmin/Bfmin_1-5_left.mp3');
	Bfmin_21_left = loadSound('sounds/left/Bfmin/Bfmin_2-1_left.mp3');
	
	Cmaj_11_left = loadSound('sounds/left/Cmaj/Cmaj_1-1_left.mp3');
	Cmaj_12_left = loadSound('sounds/left/Cmaj/Cmaj_1-2_left.mp3');
	Cmaj_13_left = loadSound('sounds/left/Cmaj/Cmaj_1-3_left.mp3');
	Cmaj_14_left = loadSound('sounds/left/Cmaj/Cmaj_1-4_left.mp3');
	Cmaj_15_left = loadSound('sounds/left/Cmaj/Cmaj_1-5_left.mp3');
	Cmaj_21_left = loadSound('sounds/left/Cmaj/Cmaj_2-1_left.mp3');

	Cmin_11_left = loadSound('sounds/left/Cmin/Cmin_1-1_left.mp3');
	Cmin_12_left = loadSound('sounds/left/Cmin/Cmin_1-2_left.mp3');
	Cmin_13_left = loadSound('sounds/left/Cmin/Cmin_1-3_left.mp3');
	Cmin_14_left = loadSound('sounds/left/Cmin/Cmin_1-4_left.mp3');
	Cmin_15_left = loadSound('sounds/left/Cmin/Cmin_1-5_left.mp3');
	Cmin_21_left = loadSound('sounds/left/Cmin/Cmin_2-1_left.mp3');

	Dmaj_11_left = loadSound('sounds/left/Dmaj/Dmaj_1-1_left.mp3');
	Dmaj_12_left = loadSound('sounds/left/Dmaj/Dmaj_1-2_left.mp3');
	Dmaj_13_left = loadSound('sounds/left/Dmaj/Dmaj_1-3_left.mp3');
	Dmaj_14_left = loadSound('sounds/left/Dmaj/Dmaj_1-4_left.mp3');
	Dmaj_15_left = loadSound('sounds/left/Dmaj/Dmaj_1-5_left.mp3');
	Dmaj_21_left = loadSound('sounds/left/Dmaj/Dmaj_2-1_left.mp3');

	Dmin_11_left = loadSound('sounds/left/Dmin/Dmin_1-1_left.mp3');
	Dmin_12_left = loadSound('sounds/left/Dmin/Dmin_1-2_left.mp3');
	Dmin_13_left = loadSound('sounds/left/Dmin/Dmin_1-3_left.mp3');
	Dmin_14_left = loadSound('sounds/left/Dmin/Dmin_1-4_left.mp3');
	Dmin_15_left = loadSound('sounds/left/Dmin/Dmin_1-5_left.mp3');
	Dmin_21_left = loadSound('sounds/left/Dmin/Dmin_2-1_left.mp3');

	Fsmaj_11_left = loadSound('sounds/left/Fsmaj/Fsmaj_1-1_left.mp3');
	Fsmaj_12_left = loadSound('sounds/left/Fsmaj/Fsmaj_1-2_left.mp3');
	Fsmaj_13_left = loadSound('sounds/left/Fsmaj/Fsmaj_1-3_left.mp3');
	Fsmaj_14_left = loadSound('sounds/left/Fsmaj/Fsmaj_1-4_left.mp3');
	Fsmaj_15_left = loadSound('sounds/left/Fsmaj/Fsmaj_1-5_left.mp3');
	Fsmaj_21_left = loadSound('sounds/left/Fsmaj/Fsmaj_2-1_left.mp3');

	Gmaj_11_left = loadSound('sounds/left/Gmaj/Gmaj_1-1_left.mp3');
	Gmaj_12_left = loadSound('sounds/left/Gmaj/Gmaj_1-2_left.mp3');
	Gmaj_13_left = loadSound('sounds/left/Gmaj/Gmaj_1-3_left.mp3');
	Gmaj_14_left = loadSound('sounds/left/Gmaj/Gmaj_1-4_left.mp3');
	Gmaj_15_left = loadSound('sounds/left/Gmaj/Gmaj_1-5_left.mp3');
	Gmaj_21_left = loadSound('sounds/left/Gmaj/Gmaj_2-1_left.mp3');

	Gmin_11_left = loadSound('sounds/left/Gmin/Gmin_1-1_left.mp3');
	Gmin_12_left = loadSound('sounds/left/Gmin/Gmin_1-2_left.mp3');
	Gmin_13_left = loadSound('sounds/left/Gmin/Gmin_1-3_left.mp3');
	Gmin_14_left = loadSound('sounds/left/Gmin/Gmin_1-4_left.mp3');
	Gmin_15_left = loadSound('sounds/left/Gmin/Gmin_1-5_left.mp3');
	Gmin_21_left = loadSound('sounds/left/Gmin/Gmin_2-1_left.mp3');

	////////////////////////////////////////////////////////////////////////////

	Bfmin_11_right = loadSound('sounds/right/Bfmin/Bfmin_1-1_right.mp3');
	Bfmin_12_right = loadSound('sounds/right/Bfmin/Bfmin_1-2_right.mp3');
	Bfmin_13_right = loadSound('sounds/right/Bfmin/Bfmin_1-3_right.mp3');
	Bfmin_14_right = loadSound('sounds/right/Bfmin/Bfmin_1-4_right.mp3');
	Bfmin_15_right = loadSound('sounds/right/Bfmin/Bfmin_1-5_right.mp3');
	Bfmin_21_right = loadSound('sounds/right/Bfmin/Bfmin_2-1_right.mp3');
	
	Cmaj_11_right = loadSound('sounds/right/Cmaj/Cmaj_1-1_right.mp3');
	Cmaj_12_right = loadSound('sounds/right/Cmaj/Cmaj_1-2_right.mp3');
	Cmaj_13_right = loadSound('sounds/right/Cmaj/Cmaj_1-3_right.mp3');
	Cmaj_14_right = loadSound('sounds/right/Cmaj/Cmaj_1-4_right.mp3');
	Cmaj_15_right = loadSound('sounds/right/Cmaj/Cmaj_1-5_right.mp3');
	Cmaj_21_right = loadSound('sounds/right/Cmaj/Cmaj_2-1_right.mp3');

	Cmin_11_right = loadSound('sounds/right/Cmin/Cmin_1-1_right.mp3');
	Cmin_12_right = loadSound('sounds/right/Cmin/Cmin_1-2_right.mp3');
	Cmin_13_right = loadSound('sounds/right/Cmin/Cmin_1-3_right.mp3');
	Cmin_14_right = loadSound('sounds/right/Cmin/Cmin_1-4_right.mp3');
	Cmin_15_right = loadSound('sounds/right/Cmin/Cmin_1-5_right.mp3');
	Cmin_21_right = loadSound('sounds/right/Cmin/Cmin_2-1_right.mp3');

	Dmaj_11_right = loadSound('sounds/right/Dmaj/Dmaj_1-1_right.mp3');
	Dmaj_12_right = loadSound('sounds/right/Dmaj/Dmaj_1-2_right.mp3');
	Dmaj_13_right = loadSound('sounds/right/Dmaj/Dmaj_1-3_right.mp3');
	Dmaj_14_right = loadSound('sounds/right/Dmaj/Dmaj_1-4_right.mp3');
	Dmaj_15_right = loadSound('sounds/right/Dmaj/Dmaj_1-5_right.mp3');
	Dmaj_21_right = loadSound('sounds/right/Dmaj/Dmaj_2-1_right.mp3');

	Dmin_11_right = loadSound('sounds/right/Dmin/Dmin_1-1_right.mp3');
	Dmin_12_right = loadSound('sounds/right/Dmin/Dmin_1-2_right.mp3');
	Dmin_13_right = loadSound('sounds/right/Dmin/Dmin_1-3_right.mp3');
	Dmin_14_right = loadSound('sounds/right/Dmin/Dmin_1-4_right.mp3');
	Dmin_15_right = loadSound('sounds/right/Dmin/Dmin_1-5_right.mp3');
	Dmin_21_right = loadSound('sounds/right/Dmin/Dmin_2-1_right.mp3');

	Fsmaj_11_right = loadSound('sounds/right/Fsmaj/Fsmaj_1-1_right.mp3');
	Fsmaj_12_right = loadSound('sounds/right/Fsmaj/Fsmaj_1-2_right.mp3');
	Fsmaj_13_right = loadSound('sounds/right/Fsmaj/Fsmaj_1-3_right.mp3');
	Fsmaj_14_right = loadSound('sounds/right/Fsmaj/Fsmaj_1-4_right.mp3');
	Fsmaj_15_right = loadSound('sounds/right/Fsmaj/Fsmaj_1-5_right.mp3');
	Fsmaj_21_right = loadSound('sounds/right/Fsmaj/Fsmaj_2-1_right.mp3');

	Gmaj_11_right = loadSound('sounds/right/Gmaj/Gmaj_1-1_right.mp3');
	Gmaj_12_right = loadSound('sounds/right/Gmaj/Gmaj_1-2_right.mp3');
	Gmaj_13_right = loadSound('sounds/right/Gmaj/Gmaj_1-3_right.mp3');
	Gmaj_14_right = loadSound('sounds/right/Gmaj/Gmaj_1-4_right.mp3');
	Gmaj_15_right = loadSound('sounds/right/Gmaj/Gmaj_1-5_right.mp3');
	Gmaj_21_right = loadSound('sounds/right/Gmaj/Gmaj_2-1_right.mp3');

	Gmin_11_right = loadSound('sounds/right/Gmin/Gmin_1-1_right.mp3');
	Gmin_12_right = loadSound('sounds/right/Gmin/Gmin_1-2_right.mp3');
	Gmin_13_right = loadSound('sounds/right/Gmin/Gmin_1-3_right.mp3');
	Gmin_14_right = loadSound('sounds/right/Gmin/Gmin_1-4_right.mp3');
	Gmin_15_right = loadSound('sounds/right/Gmin/Gmin_1-5_right.mp3');
	Gmin_21_right = loadSound('sounds/right/Gmin/Gmin_2-1_right.mp3');


	////////////////////////////////////////////////////////////////////////////

	Bfmin_11_wave = loadSound('sounds/wave/Bfmin/Bfmin_1-1_wave.mp3');
	Bfmin_12_wave = loadSound('sounds/wave/Bfmin/Bfmin_1-2_wave.mp3');
	Bfmin_13_wave = loadSound('sounds/wave/Bfmin/Bfmin_1-3_wave.mp3');
	Bfmin_14_wave = loadSound('sounds/wave/Bfmin/Bfmin_1-4_wave.mp3');
	Bfmin_15_wave = loadSound('sounds/wave/Bfmin/Bfmin_1-5_wave.mp3');
	Bfmin_21_wave = loadSound('sounds/wave/Bfmin/Bfmin_2-1_wave.mp3');
	
	Cmaj_11_wave = loadSound('sounds/wave/Cmaj/Cmaj_1-1_wave.mp3');
	Cmaj_12_wave = loadSound('sounds/wave/Cmaj/Cmaj_1-2_wave.mp3');
	Cmaj_13_wave = loadSound('sounds/wave/Cmaj/Cmaj_1-3_wave.mp3');
	Cmaj_14_wave = loadSound('sounds/wave/Cmaj/Cmaj_1-4_wave.mp3');
	Cmaj_15_wave = loadSound('sounds/wave/Cmaj/Cmaj_1-5_wave.mp3');
	Cmaj_21_wave = loadSound('sounds/wave/Cmaj/Cmaj_2-1_wave.mp3');

	Cmin_11_wave = loadSound('sounds/wave/Cmin/Cmin_1-1_wave.mp3');
	Cmin_12_wave = loadSound('sounds/wave/Cmin/Cmin_1-2_wave.mp3');
	Cmin_13_wave = loadSound('sounds/wave/Cmin/Cmin_1-3_wave.mp3');
	Cmin_14_wave = loadSound('sounds/wave/Cmin/Cmin_1-4_wave.mp3');
	Cmin_15_wave = loadSound('sounds/wave/Cmin/Cmin_1-5_wave.mp3');
	Cmin_21_wave = loadSound('sounds/wave/Cmin/Cmin_2-1_wave.mp3');

	Dmaj_11_wave = loadSound('sounds/wave/Dmaj/Dmaj_1-1_wave.mp3');
	Dmaj_12_wave = loadSound('sounds/wave/Dmaj/Dmaj_1-2_wave.mp3');
	Dmaj_13_wave = loadSound('sounds/wave/Dmaj/Dmaj_1-3_wave.mp3');
	Dmaj_14_wave = loadSound('sounds/wave/Dmaj/Dmaj_1-4_wave.mp3');
	Dmaj_15_wave = loadSound('sounds/wave/Dmaj/Dmaj_1-5_wave.mp3');
	Dmaj_21_wave = loadSound('sounds/wave/Dmaj/Dmaj_2-1_wave.mp3');

	Dmin_11_wave = loadSound('sounds/wave/Dmin/Dmin_1-1_wave.mp3');
	Dmin_12_wave = loadSound('sounds/wave/Dmin/Dmin_1-2_wave.mp3');
	Dmin_13_wave = loadSound('sounds/wave/Dmin/Dmin_1-3_wave.mp3');
	Dmin_14_wave = loadSound('sounds/wave/Dmin/Dmin_1-4_wave.mp3');
	Dmin_15_wave = loadSound('sounds/wave/Dmin/Dmin_1-5_wave.mp3');
	Dmin_21_wave = loadSound('sounds/wave/Dmin/Dmin_2-1_wave.mp3');

	Fsmaj_11_wave = loadSound('sounds/wave/Fsmaj/Fsmaj_1-1_wave.mp3');
	Fsmaj_12_wave = loadSound('sounds/wave/Fsmaj/Fsmaj_1-2_wave.mp3');
	Fsmaj_13_wave = loadSound('sounds/wave/Fsmaj/Fsmaj_1-3_wave.mp3');
	Fsmaj_14_wave = loadSound('sounds/wave/Fsmaj/Fsmaj_1-4_wave.mp3');
	Fsmaj_15_wave = loadSound('sounds/wave/Fsmaj/Fsmaj_1-5_wave.mp3');
	Fsmaj_21_wave = loadSound('sounds/wave/Fsmaj/Fsmaj_2-1_wave.mp3');

	Gmaj_11_wave = loadSound('sounds/wave/Gmaj/Gmaj_1-1_wave.mp3');
	Gmaj_12_wave = loadSound('sounds/wave/Gmaj/Gmaj_1-2_wave.mp3');
	Gmaj_13_wave = loadSound('sounds/wave/Gmaj/Gmaj_1-3_wave.mp3');
	Gmaj_14_wave = loadSound('sounds/wave/Gmaj/Gmaj_1-4_wave.mp3');
	Gmaj_15_wave = loadSound('sounds/wave/Gmaj/Gmaj_1-5_wave.mp3');
	Gmaj_21_wave = loadSound('sounds/wave/Gmaj/Gmaj_2-1_wave.mp3');

	Gmin_11_wave = loadSound('sounds/wave/Gmin/Gmin_1-1_wave.mp3');
	Gmin_12_wave = loadSound('sounds/wave/Gmin/Gmin_1-2_wave.mp3');
	Gmin_13_wave = loadSound('sounds/wave/Gmin/Gmin_1-3_wave.mp3');
	Gmin_14_wave = loadSound('sounds/wave/Gmin/Gmin_1-4_wave.mp3');
	Gmin_15_wave = loadSound('sounds/wave/Gmin/Gmin_1-5_wave.mp3');
	Gmin_21_wave = loadSound('sounds/wave/Gmin/Gmin_2-1_wave.mp3');

	console.log("done loading sounds");


	////////////////////////////////////////////////////////////////////////////

	leftCmajSounds = [Cmaj_11_left, Cmaj_12_left, Cmaj_13_left, Cmaj_14_left, Cmaj_15_left, Cmaj_21_left];
	rightCmajSounds = [Cmaj_11_right, Cmaj_12_right, Cmaj_13_right, Cmaj_14_right, Cmaj_15_right, Cmaj_21_right];
	elevatorCmajSounds = [Cmaj_11_elevator, Cmaj_12_elevator, Cmaj_13_elevator, Cmaj_14_elevator, Cmaj_15_elevator, Cmaj_21_elevator];
	waveCmajSounds = [Cmaj_11_wave, Cmaj_12_wave, Cmaj_13_wave, Cmaj_14_wave, Cmaj_15_wave, Cmaj_21_wave];

	leftFsmajSounds = [Fsmaj_11_left, Fsmaj_12_left, Fsmaj_13_left, Fsmaj_14_left, Fsmaj_15_left, Fsmaj_21_left];
	rightFsmajSounds = [Fsmaj_11_right, Fsmaj_12_right, Fsmaj_13_right, Fsmaj_14_right, Fsmaj_15_right, Fsmaj_21_right];
	elevatorFsmajSounds = [Fsmaj_11_elevator, Fsmaj_12_elevator, Fsmaj_13_elevator, Fsmaj_14_elevator, Fsmaj_15_elevator, Fsmaj_21_elevator];
	waveFsmajSounds = [Fsmaj_11_wave, Fsmaj_12_wave, Fsmaj_13_wave, Fsmaj_14_wave, Fsmaj_15_wave, Fsmaj_21_wave];

	leftGmajSounds = [Gmaj_11_left, Gmaj_12_left, Gmaj_13_left, Gmaj_14_left, Gmaj_15_left, Gmaj_21_left];
	rightGmajSounds = [Gmaj_11_right, Gmaj_12_right, Gmaj_13_right, Gmaj_14_right, Gmaj_15_right, Gmaj_21_right];
	elevatorGmajSounds = [Gmaj_11_elevator, Gmaj_12_elevator, Gmaj_13_elevator, Gmaj_14_elevator, Gmaj_15_elevator, Gmaj_21_elevator];
	waveGmajSounds = [Gmaj_11_wave, Gmaj_12_wave, Gmaj_13_wave, Gmaj_14_wave, Gmaj_15_wave, Gmaj_21_wave];

	leftDmajSounds = [Dmaj_11_left, Dmaj_12_left, Dmaj_13_left, Dmaj_14_left, Dmaj_15_left, Dmaj_21_left];
	rightDmajSounds = [Dmaj_11_right, Dmaj_12_right, Dmaj_13_right, Dmaj_14_right, Dmaj_15_right, Dmaj_21_right];
	elevatorDmajSounds = [Dmaj_11_elevator, Dmaj_12_elevator, Dmaj_13_elevator, Dmaj_14_elevator, Dmaj_15_elevator, Dmaj_21_elevator];
	waveDmajSounds = [Dmaj_11_wave, Dmaj_12_wave, Dmaj_13_wave, Dmaj_14_wave, Dmaj_15_wave, Dmaj_21_wave];

	leftCminSounds = [Cmin_11_left, Cmin_12_left, Cmin_13_left, Cmin_14_left, Cmin_15_left, Cmin_21_left];
	rightCminSounds = [Cmin_11_right, Cmin_12_right, Cmin_13_right, Cmin_14_right, Cmin_15_right, Cmin_21_right];
	elevatorCminSounds = [Cmin_11_elevator, Cmin_12_elevator, Cmin_13_elevator, Cmin_14_elevator, Cmin_15_elevator, Cmin_21_elevator];
	waveCminSounds = [Cmin_11_wave, Cmin_12_wave, Cmin_13_wave, Cmin_14_wave, Cmin_15_wave, Cmin_21_wave];

	leftDminSounds = [Dmin_11_left, Dmin_12_left, Dmin_13_left, Dmin_14_left, Dmin_15_left, Dmin_21_left];
	rightDminSounds = [Dmin_11_right, Dmin_12_right, Dmin_13_right, Dmin_14_right, Dmin_15_right, Dmin_21_right];
	elevatorDminSounds = [Dmin_11_elevator, Dmin_12_elevator, Dmin_13_elevator, Dmin_14_elevator, Dmin_15_elevator, Dmin_21_elevator];
	waveDminSounds = [Dmin_11_wave, Dmin_12_wave, Dmin_13_wave, Dmin_14_wave, Dmin_15_wave, Dmin_21_wave];

	leftBfminSounds = [Bfmin_11_left, Bfmin_12_left, Bfmin_13_left, Bfmin_14_left, Bfmin_15_left, Bfmin_21_left];
	rightBfminSounds = [Bfmin_11_right, Bfmin_12_right, Bfmin_13_right, Bfmin_14_right, Bfmin_15_right, Bfmin_21_right];
	elevatorBfminSounds = [Bfmin_11_elevator, Bfmin_12_elevator, Bfmin_13_elevator, Bfmin_14_elevator, Bfmin_15_elevator, Bfmin_21_elevator];
	waveBfminSounds = [Bfmin_11_wave, Bfmin_12_wave, Bfmin_13_wave, Bfmin_14_wave, Bfmin_15_wave, Bfmin_21_wave];

	leftGmajSounds = [Gmaj_11_left, Gmaj_12_left, Gmaj_13_left, Gmaj_14_left, Gmaj_15_left, Gmaj_21_left];
	rightGmajSounds = [Gmaj_11_right, Gmaj_12_right, Gmaj_13_right, Gmaj_14_right, Gmaj_15_right, Gmaj_21_right];
	elevatorGmajSounds = [Gmaj_11_elevator, Gmaj_12_elevator, Gmaj_13_elevator, Gmaj_14_elevator, Gmaj_15_elevator, Gmaj_21_elevator];
	waveGmajSounds = [Gmaj_11_wave, Gmaj_12_wave, Gmaj_13_wave, Gmaj_14_wave, Gmaj_15_wave, Gmaj_21_wave];


	////////////////////////////////////////////////////////////////////////////

	thunderSounds = [thunder_low, thunder_med, thunder_high];

	////////////////////////////////////////////////////////////////////////////

	whiteLibrary = new Array();

	whiteLibrary['Distance-2'] = leftCmajSounds;
	whiteLibrary['Distance-3'] = rightCmajSounds;
	whiteLibrary['Distance-4'] = waveCmajSounds;
	whiteLibrary['Distance-5'] = elevatorCmajSounds;

	orangeLibrary = new Array();

	orangeLibrary['Distance-2'] = leftFsmajSounds;
	orangeLibrary['Distance-3'] = rightFsmajSounds;
	orangeLibrary['Distance-4'] = waveFsmajSounds;
	orangeLibrary['Distance-5'] = elevatorFsmajSounds;

	redLibrary = new Array();

	redLibrary['Distance-2'] = leftGmajSounds;
	redLibrary['Distance-3'] = rightGmajSounds;
	redLibrary['Distance-4'] = waveGmajSounds;
	redLibrary['Distance-5'] = elevatorGmajSounds;

	yellowLibrary = new Array();

	yellowLibrary['Distance-2'] = leftDmajSounds;
	yellowLibrary['Distance-3'] = rightDmajSounds;
	yellowLibrary['Distance-4'] = waveDmajSounds;
	yellowLibrary['Distance-5'] = elevatorDmajSounds;

	blackLibrary = new Array();

	blackLibrary['Distance-2'] = leftCminSounds;
	blackLibrary['Distance-3'] = rightCminSounds;
	blackLibrary['Distance-4'] = waveCminSounds;
	blackLibrary['Distance-5'] = elevatorCminSounds;

	blueLibrary = new Array();

	blueLibrary['Distance-2'] = leftDminSounds;
	blueLibrary['Distance-3'] = rightDminSounds;
	blueLibrary['Distance-4'] = waveDminSounds;
	blueLibrary['Distance-5'] = elevatorDminSounds;

	violetLibrary = new Array();

	violetLibrary['Distance-2'] = leftBfminSounds;
	violetLibrary['Distance-3'] = rightBfminSounds;
	violetLibrary['Distance-4'] = waveBfminSounds;
	violetLibrary['Distance-5'] = elevatorBfminSounds;

	greenLibrary = new Array();

	greenLibrary['Distance-2'] = leftGmajSounds;
	greenLibrary['Distance-3'] = rightGmajSounds;
	greenLibrary['Distance-4'] = waveGmajSounds;
	greenLibrary['Distance-5'] = elevatorGmajSounds;


	////////////////////////////////////////////////////////////////////////////

	colorMap = new Array();

	colorMap['0'] = ['Black',0,0,0];
	colorMap['1'] = ['White',255,255,255];
	colorMap['11'] = ['Red',200, 20, 20];
	colorMap['12'] = ['Orange',248, 171, 38];
	colorMap['13'] = ['Yellow',239, 242, 3];
	colorMap['14'] = ['Green',72, 199, 51];
	colorMap['15'] = ['Blue',51,58,200];
	colorMap['16'] = ['Blue',51,58,200];
	colorMap['17'] = ['Violet',102,36,163];

	// videoMap['0'] = [createVideo(['videos/videosample.webm'])];
	// videoMap['1'] = [createVideo(['videos/videosample.webm'])];
	// videoMap['11'] = [createVideo(['videos/videosample.webm'])];
	// videoMap['12'] = [createVideo(['videos/videosample.webm'])];
	// videoMap['13'] = [createVideo(['videos/videosample.webm'])];

	// videoMap['14'] = [createVideo(['videos/videosample.webm'])];
	// videoMap['15'] = [createVideo(['videos/videosample.webm'])];
	// videoMap['16'] = [createVideo(['videos/videosample.webm'])];
	// videoMap['17'] = [createVideo(['videos/videosample.webm'])];


// displayVideo3 = createVideo(['videos/videosample.webm']);
// displayVideo4 = createVideo(['videos/videosample.webm']);
// displayVideo5 = createVideo(['videos/videosample.webm']);
	// displayVideo2 = createVideo(['videos/videosample.webm']);
	// displayVideo2.hide();
	// displayVideo2.pause();

	displayVideo = createVideo(['videos/violet_1.webm']);
	displayVideo.hide();
	displayVideo.loop();
	console.log("done preloading");
}


function determineDelay(pullTime,entryTime) {
	return entryTime.getAbsoluteMil()-pullTime.getAbsoluteMil();
}

function setup() {
	console.log("start setup");
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
	currentColor = 0;
	soundLibrary = whiteLibrary;

	prevEntry = "";

	soundQueue = [];
	imageMode(CENTER);
	image(displayVideo,960,540);
	console.log("done setup");
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
		image(displayVideo,960,540);

		var xmlhttp = new XMLHttpRequest();
		var url = 'http://127.0.0.1:8000/SensorCompz/webpage.js/logFileUpdating.txt';
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
						console.log(entry)

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
	displayVideo.loop();
	image(displayVideo,960,540);
}
