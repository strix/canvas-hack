// quiz cyborg

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

};

var getAllQuestions = function () {
    return $('.display_question');
}

var flagQuestion = function (element) {
    $(element).find('flag_question').click();
}

var skipQuestion = function (element) {
    // We don't want to remove from array because
    // we have an active for loop going. just add the
    // the element to the end of the array and keep going.
    var index = questions.indexOf(element);
    questions.splice(questions.length, 0, element);
}

var flagAndAnswerQuestion = function (element) {
    flagQuestion(element);
    answerQuestion(element);
}

var flagAndSkipQuestion = function () {
    flagQuestion(element);
    skipQuestion(element);
}

var scrollToElement = function (element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 2000);
}

var answerQuestion = function (element) {
    var question_id = $(element).attr('id').split('_')[1];
    var key = qidInAnswerkey(question_id)
    if (key) {
        if (key.is_matching) {
            $('#question_' + key.q_id + '_answer_' + key.a_id).val(key.match).change();
        } else {
            if (key.correct) {
                $('#question_' + key.q_id + '_answer_' + key.a_id).click().attr('checked', 'checked');
            } else {
                console.log(`The answer for ${question_id} is incorrect! Leaving blank and flagging.`);
                flagQuestion(element);
            }
        }

    } else {
        console.log(`Question ${question_id} not found! Leaving blank and flagging.`);
        flagQuestion(element);
    }
}

// Setup
var questions;

var cyborg = {
    first: 1,
    last: 6,
    max: 25000,
    min: 10000,
    random: function (high, low) {
        return Math.floor((Math.random() * high) + low);
    },
    run: function () {
        for (var i = 0; i < questions.length; i++) {
            var element = questions[i];
            this.doSetTimeout(element);
        }
    },
    doSetTimeout: function (element) {
        var index = this.random(this.last, this.first);
        var milliseconds = this.random(this.max, this.min);
        setTimeout(function () {
            scrollToElement(element);
            this.functions[index](element);
        }, milliseconds);
    },
    setDelayInSeconds: function (max, min) {
        this.max = max * 1000; // because milliseconds
        this.min = min * 1000;
    },
    functions: {},
    addFunction: function (key, fn) {
        this.functions[key] = fn;
    }

}

var setupCyborg = function () {
    checkForJquery();
    cyborg.addFunction(1, skipQuestion);
    cyborg.addFunction(2, flagAndAnswerQuestion);
    cyborg.addFunction(3, flagAndSkipQuestion);
    cyborg.addFunction(4, answerQuestion);
    cyborg.addFunction(5, answerQuestion);
    cyborg.addFunction(6, answerQuestion);
};

// Main
var Main = function(){
    // TODO: Main program execution.
};