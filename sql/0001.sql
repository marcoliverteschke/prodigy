CREATE TABLE exercisetypes (
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(64) NOT NULL DEFAULT ''
);

INSERT INTO exercisetypes VALUES(DEFAULT, 'lifts');
INSERT INTO exercisetypes VALUES(DEFAULT, 'girls');

CREATE TABLE exerciseunits (
	it INT PRIMARY KEY auto_increment,
	name VARCHAR(64) NOT NULL DEFAULT ''
);

INSERT INTO exerciseunits VALUES(DEFAULT, 'reps');
INSERT INTO exerciseunits VALUES(DEFAULT, 'time');

CREATE TABLE exercises (
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(64) NOT NULL DEFAULT '',
	description VARCHAR(256) NOT NULL DEFAULT '',
	unit_id INT REFERENCES exerciseunits(id),
	rounds_measured INT NOT NULL DEFAULT 1
);

CREATE TABLE workouts (
	id INT PRIMARY KEY auto_increment,
	date_time INT NOT NULL DEFAULT 0,
	exercise_id INT REFERENCES exercises(id),
	notes TEXT NOT NULL DEFAULT ''
);

CREATE TABLE workoutrounds (
	id INT PRIMARY KEY auto_increment,
	workout_id INT REFERENCES workouts(id),
	round_number INT NOT NULL DEFAULT 1,
	value INT NOT NULL DEFAULT 0
);