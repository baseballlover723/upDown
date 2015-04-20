"use strict";

var UPDATE_INTERVAL = 75; // in MS
var SWITCH_PROBABILITY = 1/100;

var counterButtonDOM;

var counter;
var counterDOM;

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
};

var stop = function() {
    //console.log("\nhit stop");
    //console.log("switched " + numberOfSwitches + " times");
    counterButtonDOM.text("Start \u00BB");
    counterButtonDOM.unbind("click");
    counterButtonDOM.on("click", start);
    clearInterval(interval);
};

function update() {
    //console.log("update");
    updatePosOrNeg();
    updateCounter();
    updateMinMax();
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
        maxDOM.text(max);
    } else if (counter < min) {
        min = counter;
        minDOM.text(min);
    }

}
window.onload = setup;