$(document).ready(function(){

	// Define a click binding for all anchors in the page
	$("a").on("click", function(event){
		// Prevent the usual navigation behavior
		event.preventDefault();

		// Alter the url according to the anchor's href attribute, and
		// store the data-foo attribute information with the url
//		$.mobile.navigate( this.attr( "href" ), {
//			foo: this.attr("data-foo")
//		});

		// Hypothetical content alteration based on the url. E.g, make
		// an AJAX request for JSON data and render a template into the page.
//		alterContent( this.attr("href") );
	});

	var page_template_html = $('#page-template').html();
	var page_template = Handlebars.compile(page_template_html);
	$.get('/api/exercisetypes', function(data){
		var content = '<ul data-role="listview" data-inset="true">';
		for(i in data)
		{
			content += '<li><a href="#exercises/' + data[i].id + '">' + data[i].name + '</a></li>';
		}
		content += '</ul>';
		var context = {'title' : 'PRodigy', 'content' : content}
		$('#exercisetypes').prepend(page_template(context)).trigger('pagecreate');
	}, 'json');
});