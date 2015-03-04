// quiz bot
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

var answer_key = localStorageExists() ? retrieveAnswerKey() : [];

var wrongAnswer = function(qid, aid){
	for(var i=0; i<answer_key.length; i++){
		var q = answer_key[i];
		if(qid == q.q_id){
			return q.incorrects.indexOf(aid) > -1;
		}
	}
};

function runBot(){
	$('.display_question').each(function(){
		var question_id = $(this).attr('id').split('_')[1],
			question_text = $(this).find('.question_text').text().trim();
		for(var i=0; i<answer_key.length; i++){
			if(question_id == answer_key[i].q_id){
				if(answer_key[i].correct){
					$('#question_'+answer_key[i].q_id+'_answer_'+answer_key[i].a_id).click().attr('checked','checked');
				} else{ // get this working.  Right now it won't work because of the loop above...maybe take out of the answer_key loop and run separately...
					$(this).find('.answer_input > input').each(function(){
						var answer_id = $(this).attr('value');
						if(!wrongAnswer(question_id, answer_id)){
							$('#question_'+question_id+'_answer_'+answer_id.click().attr('checked','checked'));
						}
					});
				}
			}
		}
	});
}

if(answer_key.length == 0){
	console.log("There isn't an answer key!!!");
} else{
	runBot();
}