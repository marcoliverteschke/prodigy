<?php
	
	include_once("lib/flight/Flight.php");
	include_once("lib/rb.php");
	
	
	Flight::before('start', function(&$params, &$output){
	    R::setup('mysql:host=localhost;dbname=prodigy', 'prodigy', 'ohzawiejuiTa');
	});
	
	
	Flight::route('GET /exercises/@exercisetype_id', function($exercisetype_id){
	    $exercises = R::findAll('exercises', ' exercisetype_id = :exercisetype_id ', array(':exercisetype_id' => $exercisetype_id));
		$exercises_output = array();
		foreach($exercises as $key => $exercise)
		{
			$exercises_output[$key]['id'] = $exercise->id;
			$exercises_output[$key]['name'] = $exercise->name;
			$exercises_output[$key]['description'] = $exercise->description;
//			$exercises_output[$key]['name'] = $exercise->name;
//			$exercises_output[$key]['name'] = $exercise->name;
//			$exercises_output[$key]['name'] = $exercise->name;
		}
		Flight::json($exercises_output);
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