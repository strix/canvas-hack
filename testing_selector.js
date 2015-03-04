$('.display_question').each(function(){
	$(this).find('.answer_input > input').each(function(){
		console.log($(this).attr('value'));
	});
});