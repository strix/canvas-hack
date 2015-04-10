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

checkForJquery();