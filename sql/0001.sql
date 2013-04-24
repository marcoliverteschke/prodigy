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

INSERT INTO exercises VALUES(DEFAULT, 'Back squat', '', 1, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Angie', '100 Pull-ups\n100 Push-ups\n100 Sit-ups\n100 Squats\nComplete all reps of each exercise before moving to the next.', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Barbara', '20 Pull-ups\n30 Push-ups\n40 Sit-ups\n50 Squats\nRest precisely three minutes between each round.', 2, 5);
INSERT INTO exercises VALUES(DEFAULT, 'Chelsea', '5 Pull-ups\n10 Push-ups\n15 Squats\nEach min on the min for 30 min', 1, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Cindy', '5 Pull-ups\n10 Push-ups\n15 Squats\nAs many rounds as possible in 20 min', 1, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Diane', 'Deadlift 225 lbs\nHandstand push-ups\n21-15-9 reps, for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Elizabeth', 'Clean 135 lbs\nRing Dips\n21-15-9 reps, for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Fran', 'Thruster 95 lbs\nPull-ups\n21-15-9 reps, for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Grace', 'Clean and Jerk 135 lbs\n30 reps for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Helen', '400 meter run\n1.5 pood Kettlebell swing x 21\nPull-ups 12 reps\n3 rounds for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Isabel', 'Snatch 135 pounds\n30 reps for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Jackie', '1000 meter row\nThruster 45 lbs (50 reps)\nPull-ups (30 reps)\nFor time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Karen', 'Wall-ball 150 shots\nFor time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Linda (aka "3 bars of death")', 'Deadlift 1 1/2 BW\nBench BW\nClean 3/4 BW\n10/9/8/7/6/5/4/3/2/1 rep\nrounds for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Mary', '5 Handstand push-ups\n10 1-legged squats\n15 Pull-ups\nAs many rounds as possible in 20 min', 1, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Nancy', '400 meter run\nOverhead squat 95 lbs x 15\n5 rounds for time\n', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Annie', 'Double-unders\nSit-ups\n50-40-30-20 and 10 rep rounds; for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Eva', 'Run 800 meters\n2 pood KB swing, 30 reps\n30 pullups\n5 rounds for time.', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Kelly', 'Run 400 meters\n30 box jump, 24 inch box\n30 Wall ball shots, 20 pound ball\nFive rounds for time', 2, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Lynne', 'Bodyweight bench press (e.g., same amount on bar as you weigh)\npullups\n5 rounds for max reps. There is NO time component to this WOD, although some versions Rx the movements as a couplet.', 1, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Nicole', 'Run 400 meters\nMax rep Pull-ups\nAs many rounds as possible in 20 minutes.\nNote number of pull-ups completed for each round.\n', 1, 1);
INSERT INTO exercises VALUES(DEFAULT, 'Amanda', '9, 7 and 5 reps of:\nMuscle-ups\nSnatches (135/95 lb.)\nFor Time', 2, 1);

ALTER TABLE exercises ADD COLUMN exercisetype_id INT REFERENCES exercisetypes(id);

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