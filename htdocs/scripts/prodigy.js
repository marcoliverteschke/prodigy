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
			load_exercisetypes_list(function(){
				changePage('#exercisetypes');
			});
			break;
		case "#exercises":
			if(typeof hash_split[1] != "undefined" && isNumber(hash_split[1]))
			{
				load_exercises_list(hash_split[1], function(){
					changePage('#exercises');
				});
			} else {
				route('#exercisetypes');
			}
			break;
		case "#exercise-now-what":
			if(typeof hash_split[1] != "undefined" && isNumber(hash_split[1]))
			{
				load_exercise_modal(hash_split[1], function(){
					changePage('#exercise-now-what');
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


function changePage(target)
{
	$('[data-role="page"]').hide();
	$(target).show();
}