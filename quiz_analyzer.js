// quiz analyzer

// localStorage.setItem('test', JSON.stringify({ 'one': 1, 'two': 2, 'three': 3 })) // saves stringified js object in localStorage
// JSON.parse(localStorage.getItem('test')) // gets and parses that object from localStorage
// localStorage.removeItem(key); // removes the item from localStorage to start running against a new quiz

var retrieveAnswerKey = function(){
	return JSON.parse(localStorage.getItem('answerKey'));
}
var localStorageExists = function(){
	var a_key = retrieveAnswerKey();
	if(typeof a_key !== "undefined" && a_key && a_key.length>0){
		return true;
	} else{
		return false;
	}
}
var printAnswerKey = function(){
	var a_key = localStorage.getItem('answerKey');
	if(a_key){
		return a_key;
	} else{
		console.log("No answer key is available :(");
	}
}

var answer_key = localStorageExists() ? retrieveAnswerKey() : [];

var create_and_push = function(obj, incorrect){
	if(incorrect){
		obj.incorrects.push(obj.a_id);
	} else {
		obj.correct = true;
	}
	answer_key.push(obj);
	console.log("created new");
	console.log(obj);
};

var update_answer = function(obj, incorrect){
	for(var i=0; i<answer_key.length; i++){
		var curr_ans = answer_key[i];
		if(curr_ans.q_id == obj.q_id){
			answer_key[i].a_id = obj.a_id;
			answer_key[i].a_text = obj.a_text;
			if(!curr_ans.correct){
				if(incorrect){
					if(curr_ans.incorrects.indexOf(curr_ans.a_id) == -1){
						answer_key[i].incorrects.push(curr_ans.a_id);
					} else{
						// console.log('answer already exists in incorrects');
					}
				} else{
					// console.log(!curr_ans.correct);
					// console.log(incorrect);
					answer_key[i].correct = true;
					// console.log('curr_ans updated to true');
				}
			}
		}
	}
};

var alreadyDone = function(id){
	for(var i=0; i<answer_key.length; i++){
		if(id == answer_key[i].q_id){
			return true;
		}
	}
	return false;
};

function main(){
	$('.display_question').each(function(){
		try{	
			var incorrect = $(this).hasClass('incorrect'),
				question_id = $(this).attr('id').split('_')[1],
				question_text = $(this).find('.question_text').text().trim(),
				answer_id = $(this).find('.selected_answer .select_answer > input').attr('id').split('-')[1],
				answer_text = $(this).find('.selected_answer .select_answer').text().trim();
				qaObj = {
					'q_id': question_id,
					'q_text': question_text,
					'a_id': answer_id,
					'a_text': answer_text,
					'incorrects': [],
					'correct': false,
				};
			if(localStorageExists() && alreadyDone(qaObj.q_id)){
				update_answer(qaObj, incorrect);
			} else{
				create_and_push(qaObj, incorrect);
			}
		} catch(e){
			// TODO code for other input options
			console.log('something went wrong... (probably due to a mutli-selection question)');
			console.log(e);
		}
	});
	localStorage.setItem('answerKey', JSON.stringify(answer_key));
	var stored_answer_key = retrieveAnswerKey();
	console.log(printAnswerKey());
	console.log(stored_answer_key);
	
	var still_incorrect = answer_key.filter(function(el){
		return !el.correct;
	});
	console.log(still_incorrect.length+" are still incorrect");
	console.log(still_incorrect);
	console.log('Total in answer_key: '+answer_key.length);
}

main();