var page_template_html;
var page_template;
var exercisetype_list_template_html;
var exercisetype_list_template;
var exercise_list_template_html;
var exercise_list_template;
var exercise_options_template_html;
var exercise_options_template;

$(document).ready(function(){
	page_template_html = $('#page-template').html();
	page_template = Handlebars.compile(page_template_html);
	exercisetype_list_template_html = $('#exercisetype-list-template').html();
	exercisetype_list_template = Handlebars.compile(exercisetype_list_template_html);
	exercise_list_template_html = $('#exercise-list-template').html();
	exercise_list_template = Handlebars.compile(exercise_list_template_html);
	exercise_options_template_html = $('#exercise-options-template').html();
	exercise_options_template = Handlebars.compile(exercise_options_template_html);
	$('#exercisetypes').prepend(page_template({'title':'', 'content':''}));
	$('#exercises').prepend(page_template({'title':'', 'content':''}));
	$('#exercise-now-what').prepend(page_template({'title':'', 'content':''}));
	window.onpopstate = function(event){
		if(typeof event.target.location.hash != "undefined")
			route(event.target.location.hash, true);
	};
	route('#exercisetypes');
});


function load_exercise_modal(exercise_id, callback)
{
	$.get('/api/exercise/' + exercise_id, function(data){
		var content = exercise_options_template();
		$('#exercise-now-what h1').text(data.name);
		$('#exercise-now-what [data-role="content"]').empty().prepend(content);
		$('#exercise-now-what [data-rel="back"]').hide();
		callback();
	}, 'json');
}


function load_exercises_list(exercisetype_id, callback)
{
	remove_click_handler();
	$.get('/api/exercises/' + exercisetype_id, function(data){
		var content = exercise_list_template({'items' : data});
		$('#exercises h1').text('EXercises');
		$('#exercises [data-role="content"]').empty().prepend(content);
		if($('#exercises').hasClass('ui-page'))
		{
			$('#exercises [data-role="content"]').find('[data-role="listview"]').listview();
		}
		$('#exercises [data-rel="back"]').attr('href', '#exercisetypes').show();
		add_click_handler();
		callback();
	}, 'json');
}


function load_exercisetypes_list(callback)
{
	remove_click_handler();
	$('#exercisetypes [data-role="content"]').empty();
	$.get('/api/exercisetypes', function(data){
		var content = exercisetype_list_template({'items' : data});
		$('#exercisetypes h1').text('PRodigy');
		$('#exercisetypes [data-role="content"]').empty().prepend(content);
		if($('#exercisestypes').hasClass('ui-page'))
		{
			$('#exercisestypes [data-role="content"]').find('[data-role="listview"]').listview();
		}
		$('#exercisetypes').trigger('pagecreate');
		add_click_handler();
		callback();
	}, 'json');
}


function remove_click_handler()
{
	$("a").off("click");
}


function add_click_handler()
{
	$("a").on("click", function(event){
		event.preventDefault();
		route($(this).attr('href'), $(this).attr('data-direction'))
	});
}


function route(hash, is_history_back)
{
	var hash_split = hash.split("/");

	switch (hash_split[0]) {
		case "#exercisetypes":
			load_exercisetypes_list(function(){
				changePage('#exercisetypes', hash, is_history_back);
			});
			break;
		case "#exercises":
			if(typeof hash_split[1] != "undefined" && isNumber(hash_split[1]))
			{
				load_exercises_list(hash_split[1], function(){
					changePage('#exercises', hash, is_history_back);
				});
			} else {
				route('#exercisetypes');
			}
			break;
		case "#exercise-now-what":
			if(typeof hash_split[1] != "undefined" && isNumber(hash_split[1]))
			{
				load_exercise_modal(hash_split[1], function(){
					changePage('#exercise-now-what', hash, is_history_back);
				});
			} else {
				route('#exercisetypes');
			}
			break;
	}
}


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


function changePage(target, original_hash, do_not_push)
{
	if(!do_not_push)
		history.pushState({}, original_hash, original_hash);
	$('[data-role="page"]').hide();
	$(target).show();
}