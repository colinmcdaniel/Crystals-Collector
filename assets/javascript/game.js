var randomNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
var wins = 0;
var losses = 0;
var score = 0;
var crystalValue;
var timerStarted = false;
var counter;

// Timer object for game
var timer = {
	time:20,
	reset: function(){
		timer.time = 20;
		$('#timer').html('Time remaining: ' + timer.time);
		clearInterval(counter);
		timer.start();
	},
	start: function(){
		counter = setInterval(timer.count,1000);
	},
	stop: function(){
		clearInterval(counter);
	},
	count: function(){
		timer.time--;
		$('#timer').html('Time remaining: ' + timer.time);

		if(timer.time == 0){
			timer.stop();
			outOfTime();
		}
	}
};

// Changes crystal values to 4 new different random numbers
function changeCrystalValues(){
	crystalValue = [];
	for(var i = 0; i < 4; i++){
		var randInt = Math.floor(Math.random() * 12) + 1;
		while(crystalValue.indexOf(randInt) > -1)
			randInt = Math.floor(Math.random() * 12) + 1;
		crystalValue[i] = randInt;
	}
}

changeCrystalValues();

// Initial display
$("#random-number").html(randomNumber);
$("#wins").html("Wins<br>" + wins);
$("#losses").html("Losses<br>" + losses);
$("#score").html(score);

$(".crystal").on("click",function(){

	if(!timerStarted){
		timer.reset();
		timerStarted = true;
	}

	// Update score depending on crystal pressed
	if(this.value == "0"){
		score += crystalValue[0];
		$("#score").html(score);
	}
	else if(this.value == "1"){
		score += crystalValue[1];
		$("#score").html(score);
	}
	else if(this.value == "2"){
		score += crystalValue[2];
		$("#score").html(score);
	}
	else{
		score += crystalValue[3];
		$("#score").html(score);
	}

	// If user loses...
	if(score > randomNumber){
		userLoses();
		timer.stop();
		timerStarted = false;
	}

	// If user wins...
	else if(score == randomNumber){
		wins++;

		// Reset variables	
		randomNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
		score = 0;
		changeCrystalValues();

		// Update display
		$("#random-number").html(randomNumber);
		$("#wins").html("Wins<br>" + wins + "<br><br>You won!");
		$("#losses").html("Losses<br>" + losses);
		$("#score").html(score);

		timer.stop();
		timerStarted = false;
	}
});

// Function is called when the timer hits zero
function outOfTime(){
	userLoses();
	timer.stop();
	timerStarted = false;
}

function userLoses(){
	losses++;

	// Reset variables	
	randomNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
	score = 0;
	changeCrystalValues();

	// Update display
	$("#random-number").html(randomNumber);
	$("#wins").html("Wins<br>" + wins);
	$("#losses").html("Losses<br>" + losses + "<br><br>You lost!");
	$("#score").html(score);
}
