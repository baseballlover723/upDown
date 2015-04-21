"use strict";

var UPDATE_INTERVAL = 75; // in MS
var SWITCH_PROBABILITY = 1/100;

var counterButtonDOM;

var counter;
var counterDOM;

var timeWasted;
var timeWastedDOM;
var timeInterval;

var updates;
var updatesDOM;

var max = 0;
var maxDOM;

var min = 0;
var minDOM;

var numberOfSwitches = 0;
var numberOfSwitchesDOM;

var posOrNeg;
var interval;

function setup() {
    counter = 0;
    counterDOM = $("#counter");

    counterButtonDOM = $("#counter-button");
    counterButtonDOM.click(start);

    timeWasted = 0;
    timeWastedDOM = $("#time-wasted");

    updates = 0;
    updatesDOM = $("#updates");

    max = 0;
    maxDOM = $("#max");
    min = 0;
    minDOM = $("#min");

    numberOfSwitchesDOM = $("#number-of-switches");
    numberOfSwitches = 0;

    posOrNeg = Math.random() < 0.5 ? -1 : 1;
}
var start = function() {
    //console.log("\nhit start");
    counterButtonDOM.text("Stop \u00BB");
    counterButtonDOM.unbind("click");
    counterButtonDOM.on("click", stop);

    interval = setInterval(update, UPDATE_INTERVAL);
    timeInterval = setInterval(updateTime, 1000);
};

var stop = function() {
    //console.log("\nhit stop");
    //console.log("switched " + numberOfSwitches + " times");
    counterButtonDOM.text("Start \u00BB");
    counterButtonDOM.unbind("click");
    counterButtonDOM.on("click", start);
    clearInterval(interval);
    clearInterval(timeInterval);
};

function updateTime() {
    timeWasted++;
    timeWastedDOM.text(timeToString(timeWasted));
}

function timeToString(time) {
    var returnString = "";

    // seconds
    //console.log("before seconds: " + time);
    var seconds = time % 60;
    if (seconds == 0) {
        returnString = seconds + " second";
    } else {
        returnString = seconds + " seconds";
    }
    time = (time - seconds) / 60;

    // minutes
    //console.log("before minutes: "  + time);
    if (time > 0) {
        var minutes = time % 60;
        if (time == 1) {
            returnString = minutes + " minute " + returnString;
        } else {
            returnString = minutes + " minutes " + returnString;
        }
        time = (time - minutes) / 60;
    }

    // hours
    //console.log("before hour: " + time);
    if (time > 0) {
        var hours = time % 24;
        if (time == 1) {
            returnString = hours + " hour " + returnString;
        } else {
            returnString = hours + " hours " + returnString;
        }
        time = (time - hours) / 24;
    }
    return returnString;

}

function update() {
    //console.log("update");
    updateUpdate();
    updatePosOrNeg();
    updateCounter();
    updateMinMax();
}

function updateUpdate() {
    updates++;
    updatesDOM.text(updates);
}

function updatePosOrNeg() {
    if (Math.random() < SWITCH_PROBABILITY) {
        posOrNeg = -posOrNeg;
        updateNumberOfSwitches();
    }
}

function updateNumberOfSwitches() {
    //console.log("switched direction");
    numberOfSwitches++;
    numberOfSwitchesDOM.text(numberOfSwitches);

}

function updateCounter() {
    counter += posOrNeg;
    counterDOM.text(counter);
}

function updateMinMax() {
    if (counter > max) {
        max = counter;
        maxDOM.text(max + " at " + timeToString(timeWasted));
    } else if (counter < min) {
        min = counter;
        minDOM.text(min + " at " + timeToString(timeWasted));
    }

}
window.onload = setup;