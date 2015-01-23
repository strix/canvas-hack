// $('.text .question_text').text() // returns all the question text
// $('.display_question') // returns all q&a blocks
// $('.display_question.incorrect') // returns all incorrect q&a block
// $.get('url-to-js-file', function(data){eval(data)}); // to get and run the code
// localStorage.setItem('test', JSON.stringify({ 'one': 1, 'two': 2, 'three': 3 })) // saves stringified js object in localStorage
// JSON.parse(localStorage.getItem('test')) // gets and parses that object from localStorage


var printIt = function(arr){
	for(var i=0; i<arr.length; i++){
		console.log('Q: '+arr[i].q_text+'\n');
		console.log('A: '+arr[i].a_text+'\n\n');
	}
};

var rights = [],
	wrongs = [];
$('.display_question').each(function(){
	var incorrect = $(this).hasClass('incorrect'),
		question_text = $(this).find('.question_text').text().trim(),
		answer_text = $(this).find('.selected_answer .select_answer').text().trim(),
		qaObj = {
			'q_text': question_text,
			'a_text': incorrect ? 'NOT '+answer_text : answer_text,
		};
	if(incorrect){
		wrongs.push(qaObj);
	} else {
		rights.push(qaObj);
	}
});
console.log(rights.length+' correct');
console.log(wrongs.length+' incorrect');

console.log('CORRECT:\n');
printIt(rights);

console.log('INCORRECT:\n');
printIt(wrongs);