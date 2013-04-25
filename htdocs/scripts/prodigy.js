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
	route('#exercisetypes');
});


function load_exercise_modal(exercise_id, callback)
{
	remove_click_handler();
	$('#exercise-now-what').empty();
	$.get('/api/exercise/' + exercise_id, function(data){
		var content = exercise_options_template();
		var context = {'title' : data.name, 'content' : content, 'back_target' : '#exercises/' + data.exercisetype_id};
		$('#exercise-now-what').prepend(page_template(context)).trigger('pagecreate');
		add_click_handler();
		callback();
	}, 'json');
}


function load_exercises_list(exercisetype_id)
{
	remove_click_handler();
	$('#exercises').empty();
	return $.get('/api/exercises/' + exercisetype_id, function(data){
		var content = exercise_list_template({'items' : data});
		var context = {'title' : 'EXercises', 'content' : content, 'back_target' : '#exercisetypes'};
		$('#exercises').prepend(page_template(context)).trigger('pagecreate');
		add_click_handler();
		return true;
	}, 'json');
}


function load_exercisetypes_list()
{
	remove_click_handler();
	$('#exercisetypes').empty();
	return $.get('/api/exercisetypes', function(data){
		var content = exercisetype_list_template({'items' : data});
		var context = {'title' : 'PRodigy', 'content' : content}
		$('#exercisetypes').prepend(page_template(context)).trigger('pagecreate');
		add_click_handler();
		return true;
	}, 'json');
}


function remove_click_handler()
{
	$("a").off("click");
}


function add_click_handler()
{
	// Define a click binding for all anchors in the page
	$("a").on("click", function(event){
		// Prevent the usual navigation behavior
		event.preventDefault();

		// Alter the url according to the anchor's href attribute, and
		// store the data-foo attribute information with the url
		route($(this).attr('href'), $(this).attr('data-direction'))
		// Hypothetical content alteration based on the url. E.g, make
		// an AJAX request for JSON data and render a template into the page.
//		alterContent( this.attr("href") );
	});
}


function route(hash, direction)
{
	var hash_split = hash.split("/");
	var reverse = false;
	if(typeof direction != "undefined")
		reverse = (direction == "reverse");

	switch (hash_split[0]) {
		case "#exercisetypes":
			if(load_exercisetypes_list())
			{
				$.mobile.changePage('#exercisetypes', {'reverse' : reverse, 'transition': 'slide'});
			}
			break;
		case "#exercises":
			if(typeof hash_split[1] != "undefined" && isNumber(hash_split[1]))
			{
				if(load_exercises_list(hash_split[1]))
				{
					$.mobile.changePage('#exercises', {'reverse' : reverse, 'transition': 'slide'});
				}
			} else {
				route('#exercisetypes');
			}
			break;
		case "#exercise-now-what":
			if(typeof hash_split[1] != "undefined" && isNumber(hash_split[1]))
			{
				load_exercise_modal(hash_split[1], function(){
					//$.mobile.changePage('#exercise-now-what', {role: "dialog"});
				});
//				if()
//				{
//				}
			} else {
				route('#exercisetypes');
			}
			break;
	}
}


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}