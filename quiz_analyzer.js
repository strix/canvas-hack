// quiz analyzer

// localStorage.setItem('test', JSON.stringify({ 'one': 1, 'two': 2, 'three': 3 })) // saves stringified js object in localStorage
// JSON.parse(localStorage.getItem('test')) // gets and parses that object from localStorage
// localStorage.removeItem(key); // removes the item from localStorage to start running against a new quiz

var retrieveAnswerKey = function () {
	return JSON.parse(localStorage.getItem('answerKey'));
}
var localStorageExists = function () {
	var a_key = retrieveAnswerKey();
	if (typeof a_key !== "undefined" && a_key && a_key.length > 0) {
		return true;
	} else {
		return false;
	}
}
var printAnswerKey = function () {
	var a_key = localStorage.getItem('answerKey');
	if (a_key) {
		return a_key;
	} else {
		console.log("No answer key is available :(");
	}
}

var answer_key = localStorageExists() ? retrieveAnswerKey() : [];

var create_and_push = function (obj, incorrect) {
	if (incorrect) {
		obj.incorrects.push(obj.a_id);
	} else {
		obj.correct = true;
	}
	answer_key.push(obj);
	console.log("created new");
	console.log(obj);
};

var update_answer = function (obj, incorrect) {
	for (var i = 0; i < answer_key.length; i++) {
		var curr_ans = answer_key[i];
		if(curr_ans.is_matching){
			continue;
		}
		if (curr_ans.q_id == obj.q_id) {
			answer_key[i].a_id = obj.a_id;
			answer_key[i].a_text = obj.a_text;
			if (!curr_ans.correct) {
				if (incorrect) {
					if (curr_ans.incorrects.indexOf(curr_ans.a_id) == -1) {
						answer_key[i].incorrects.push(curr_ans.a_id);
					} else {
						// console.log('answer already exists in incorrects');
					}
				} else {
					// console.log(!curr_ans.correct);
					// console.log(incorrect);
					answer_key[i].correct = true;
					// console.log('curr_ans updated to true');
				}
			}
		}
	}
};

var alreadyDone = function (id) {
	for (var i = 0; i < answer_key.length; i++) {
		if (id == answer_key[i].q_id) {
			return true;
		}
	}
	return false;
};

function main() {
	$('.display_question').each(function (index, div) {
		try {
			var incorrect = $(div).hasClass('incorrect');
			var q_id = $(div).attr('id').split('_')[1];
			var q_text;
			var a_id;
			var a_text;
			var is_matching = false;
			var correct = false;
			if ($(div).hasClass('matching_question')) {
				// Matching question!
				$(div).find('div.text > div > div > div.answer_for_').each(function (index, div) {
					a_id = $(div).find('div > span.id')[0].textContent;
					match = $(div).find('div > span.match_id')[0].textContent;
					q_text = $(div).find('.answer_text')[0].textContent;
					a_text = "NOT AVAILABLE";
					is_matching = true;
					var qaObj = {
						q_id,
						a_id,
						q_text,
						a_text,
						correct,
						is_matching,
						match
					}
					if (localStorageExists() && alreadyDone(qaObj.q_id)) {
						update_answer(qaObj, incorrect);
					} else {
						create_and_push(qaObj, incorrect);
					}
				});
			} else {
				q_text = $(div).find('.question_text').text().trim();
				a_id = $(div).find('.selected_answer .select_answer > input').attr('id').split('-')[1];
				a_text = $(div).find('.selected_answer .select_answer').text().trim();
				is_matching = false;
				qaObj = {
					q_id,
					q_text,
					a_id,
					a_text,
					'incorrects': [],
					'correct': false,
					is_matching
				};
				if (localStorageExists() && alreadyDone(qaObj.q_id)) {
					update_answer(qaObj, incorrect);
				} else {
					create_and_push(qaObj, incorrect);
				}
			}
		} catch (e) {
			// TODO code for other input options
			console.log('something went wrong...');
			console.log(e);
		}
	});
	localStorage.setItem('answerKey', JSON.stringify(answer_key));
	var stored_answer_key = retrieveAnswerKey();
	console.log(printAnswerKey());
	console.log(stored_answer_key);

	var still_incorrect = answer_key.filter(function (el) {
		return !el.correct;
	});
	console.log(still_incorrect.length + " are still incorrect");
	console.log(still_incorrect);
	console.log('Total in answer_key: ' + answer_key.length);
}

main();