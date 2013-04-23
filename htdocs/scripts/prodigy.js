$(document).ready(function(){
	var page_template_html = $('#page-template').html();
	var page_template = Handlebars.compile(page_template_html);
	$('[data-role="page"]').prepend(page_template()).trigger('pagecreate');
//	$("#page-exercisetypes").trigger('create');
});