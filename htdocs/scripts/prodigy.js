$(document).ready(function(){
	var page_template_html = $('#page-template').html();
	var page_template = Handlebars.compile(page_template_html);
	var context = {'title' : 'PRodigy', 'content' : '<ul data-role="listview" data-inset="true"><li>lifts</li><li>girls</li></ul>'}
	$('[data-role="page"]').prepend(page_template(context)).trigger('pagecreate');
//	$("#page-exercisetypes").trigger('create');
});