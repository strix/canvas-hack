// quiz cyborg

// TODO: Make a friggin timer.
var timer;
var checkForJquery = function () {
    if (window.jQuery) {
        console.log("Your jQuery version is:", jQuery.fn.jquery);
    } else {
        injectJquery();
    }
};

var injectJquery = function () {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = 'https://code.jquery.com/jquery-latest.min.js';
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
};

// Randy returns a random number between 25000 and 10000. Ultimately these will be milliseconds.
var randy = function() {
    return Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000;
};

// Setup
var setupCyborg = function(){
    // TODO: This will check for jquery, and for answer key, etc.
    // TODO: If there is no answer key, we should end execution.


};

// Main
var Main = function(){
    // TODO: Main program execution.
};