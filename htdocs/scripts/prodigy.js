var page_template_html;
var page_template;
var exercise_listitem_template_html;
var exercise_listitem_template;

$(document).ready(function(){
	page_template_html = $('#page-template').html();
	page_template = Handlebars.compile(page_template_html);
	load_exercisetypes_list();
	exercise_listitem_template_html = $('#exercise-listitem-template').html();
	exercise_listitem_template = Handlebars.compile(exercise_listitem_template_html);
});


function load_exercises_list(exercisetype_id)
{
	remove_click_handler();
	$('#exercises').empty();
	return $.get('/api/exercises/' + exercisetype_id, function(data){
		var content = '<ul data-role="listview">';
		for(i in data)
		{
			var listitem_context = {'id' : data[i].id, 'name' : data[i].name, 'description' : data[i].description}
			content += exercise_listitem_template(listitem_context);
		}
		content += '</ul>';
		var context = {'title' : 'EXercises', 'content' : content}
		$('#exercises').prepend(page_template(context)).trigger('pagecreate');
		add_click_handler();
		return true;
	}, 'json');
}


function load_exercisetypes_list()
{
	remove_click_handler();
	$('#exercisetypes').empty();
	$.get('/api/exercisetypes', function(data){
		var content = '<ul data-role="listview" data-inset="true">';
		for(i in data)
		{
			content += '<li><a href="#exercises/' + data[i].id + '">' + data[i].name + '</a></li>';
		}
		content += '</ul>';
		var context = {'title' : 'PRodigy', 'content' : content}
		$('#exercisetypes').prepend(page_template(context)).trigger('pagecreate');
		add_click_handler();
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
		route($(this).attr('href'))
		// Hypothetical content alteration based on the url. E.g, make
		// an AJAX request for JSON data and render a template into the page.
//		alterContent( this.attr("href") );
	});
}


function route(hash)
{
	var hash_split = hash.split("/");
	console.log(hash_split);
	
	switch (hash_split[0]) {
		case "#exercisetypes":
			$.mobile.navigate('#exercisetypes', {
//						foo: this.attr("data-foo")
			});
			break;
		case "#exercises":
			if(typeof hash_split[1] != "undefined" && isNumber(hash_split[1]))
			{
				if(load_exercises_list(hash_split[1]))
				{
					$.mobile.navigate('#exercises', {
//						foo: this.attr("data-foo")
					});
				}
			}
			break;
	}
}


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}