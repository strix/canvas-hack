# canvas-hack
Discovering different vulnerabilities in Canvas

###**Hack 1**: 100% on quizzes that allow practice attempts:
**Scripts used:**
 - `quiz_bot.js`: used for taking quizzes using data gathered from the quiz_analyzer.
 - `quiz_analyzer.js`: used to gather and store information about each practice quiz attempt.
 - *TODO: still need to create* `quiz_cyborg.js`: can be used to take the actual test since it does the same thing as the quiz bot but it will mimic human behavior as much as possible (e.g. wait a random second amount between 10-20 seconds to answer questions, skip some and come back to them, flag a question every once in a while, etc.)

**Step-by-step instructions:**
(the more practice attempts, the better)
 1. Copy and paste the `quiz_bot.js` script in the javascript console (to open the javascript console use Cmd / Control + Shift + j in Chrome) on the practice quiz page (if there are no answers the analyzer has already gathered it will select the first answer to every question)
 2. Run `quiz_analyzer.js` on the results page.  To view detailed information of what the script is doing, open your javascript console.  The output includes how many total questions there are in the question / answer bank as well as how many of them are still incorrect.
 3. Repeat steps one and two until a complete answer bank is gathered with 0 answers incorrect.
 4. Type printAnswerKey() in the javascript console and copy and paste the results of that into a [gist](gist.github.com) ........ *TODO: clarify this step and make it easier (less technical)*
 5. Map the gist url to a [tiny url](tinyurl.com) to make it easier to memorize.
 6. When taking the test, secretively open the javascript console (see keyboard shortcut above) and type `$.get('url-to-js-file', function(data){eval(data)});` replacing `url-to-js-file` with the tiny url you created previously.
 7. Congrats, you just got 100% on your test or quiz without even looking at it!  \\\(*O*)/
