var page_template_html;
var page_template;

$(document).ready(function(){
	page_template_html = $('#page-template').html();
	page_template = Handlebars.compile(page_template_html);
	load_exercisetypes_list();
});


function load_exercises_list(exercisetype_id)
{
	remove_click_handler();
	return $.get('/api/exercises/' + exercisetype_id, function(data){
		var content = '<ul data-role="listview">';
		for(i in data)
		{
			content += '<li><a href="#exercises/' + data[i].id + '">' + data[i].name + '</a></li>';
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
	$.get('/api/exercisetypes', function(data){
		var content = '<ul data-role="listview" data-inset="true">';
		for(i in data)
		{
			content += '<li><a href="#exercises" data-exercisetype="' + data[i].id + '">' + data[i].name + '</a></li>';
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
		if(load_exercises_list($(this).attr("data-exercisetype")))
		{
			$.mobile.navigate('#exercises', {
	//			foo: this.attr("data-foo")
			});
		}

		// Hypothetical content alteration based on the url. E.g, make
		// an AJAX request for JSON data and render a template into the page.
//		alterContent( this.attr("href") );
	});

	
}