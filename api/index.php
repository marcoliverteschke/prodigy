<?php
	
	include_once("lib/flight/Flight.php");
	include_once("lib/rb.php");
	
	
	Flight::before('start', function(&$params, &$output){
	    R::setup('mysql:host=localhost;dbname=prodigy', 'prodigy', 'ohzawiejuiTa');
	});
	
	
	Flight::route('GET /exercisetypes', function(){
	    $exercisetypes = R::findAll('exercisetypes');
		$exercisetypes_output = array();
		foreach($exercisetypes as $key => $exercisetype)
		{
			$exercisetypes_output[$key]['id'] = $exercisetype->id;
			$exercisetypes_output[$key]['name'] = $exercisetype->name;
		}
		Flight::json($exercisetypes_output);
	});

	Flight::start();