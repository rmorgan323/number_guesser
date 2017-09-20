
/*******  ON LOAD  ********/

var topText = document.querySelector('#topText');
var displayGuess = document.querySelector('#displayGuess');
var guessButton = document.querySelector('#guessButton');
var clearButton = document.querySelector('#clearButton');
var resetButton = document.querySelector('#resetButton');

var minValue = parseInt(document.querySelector('#inputMin').value);
var maxValue = parseInt(document.querySelector('#inputMax').value);

document.querySelector('#guessButton').classList.remove('dark_bg');
document.querySelector('#clearButton').classList.remove('dark_bg');

function numGen() {
	return (Math.floor(Math.random() * (maxValue - minValue + 1))  + minValue);	
}

randomNum = numGen();
function slowReset() {
	topText.innerHTML = "Let's make this a little tougher."
	window.setTimeout(slowReset2, 3000);
}

function slowReset2() {
	maxValue = maxValue + 10;
	minValue = minValue - 10;
	randomNum = numGen();
	document.querySelector('#inputMax').value = maxValue;
	document.querySelector('#inputMin').value = minValue;
	topText.innerHTML = "Guess my number between " + minValue + " and " + maxValue + "!";
}

/*******  GUESS BUTTON  ********/

guessButton.addEventListener('click', function(event) {
	event.preventDefault();

	var userGuess = parseInt(document.querySelector('#userGuess').value);
	var bottomText = document.querySelector('#bottomText');

	displayGuess.innerText = userGuess;
	topText.innerText = "Your last guess was";

	var numberCheck = isNaN(userGuess);
	if (numberCheck == true) {
		displayGuess.innerText = "";
		topText.innerHTML = "Since when was <b>" + document.querySelector('#userGuess').value.bold() + "</b> a number?";
	}

	if (numberCheck == false) {
		topText.innerText = "Your last guess was";
	}

	if (userGuess < randomNum) {
		bottomText.innerText = "That is too low.";
	} else if (userGuess > randomNum) {
		bottomText.innerText = "That is too high.";
	} else if (userGuess === randomNum) {
		bottomText.innerText = "BOOM!";
	
		window.setTimeout(slowReset, 3000);
			
	} else
		bottomText.innerText = "";

	if ((userGuess > maxValue) || (userGuess < minValue)) {
		topText.innerText = "Hey, I said between " + minValue + " and " + maxValue + "!";
		bottomText.innerText = "";
		displayGuess.innerText = "";
	}

});

/*******  KEYBOARD (ENTER)  *******/

document.querySelector('#userGuess').addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode == 13) {
		guessButton.click();
	}
});

/*******  CLEAR BUTTON  ********/

clearButton.addEventListener('click', function(event) {
	event.preventDefault();

	var numberCheck = isNaN(parseInt(document.querySelector('#userGuess').value));

	document.querySelector('#guessButton').classList.remove('dark_bg');
	document.querySelector('#clearButton').classList.remove('dark_bg');

	if (numberCheck === true) {
		document.querySelector('#userGuess').value = "";
		topText.innerText = "Guess my number between " + minValue + " and " + maxValue + "!";
	}

	if (numberCheck === false) {
		document.querySelector('#userGuess').value = "";
		topText.innerText = "Your last guess was";
	}

	if (displayGuess.innerText === "") {
		topText.innerText = "Guess my number between " + minValue + " and " + maxValue + "!";
	}

	if (document.querySelector('#userGuess').value == '') {
		document.querySelector('#clearButton').setAttribute('disabled','');
	} else {
		document.querySelector('#clearButton').removeAttribute('disabled');
	}

});

/*******  RESET BUTTON  ********/

resetButton.addEventListener('click', function(event) {
	event.preventDefault();
	
	minValue = 0;
	maxValue = 100;
	document.querySelector('#inputMin').value = 0;
	document.querySelector('#inputMax').value = 100;

	document.querySelector('#userGuess').value = "";

	topText.innerText = "Guess my number between " + minValue + " and " + maxValue + "!";

	displayGuess.innerText = "";

	bottomText.innerText = "";

	document.querySelector('#guessButton').classList.remove('dark_bg');
	document.querySelector('#clearButton').classList.remove('dark_bg');

	randomNum = numGen();
});

/*******  KEYBOARD RESET (R) and CLEAR (C) *******/

document.querySelector('body').addEventListener("keydown", function(event) {
	if (event.keyCode == 82) {
		event.preventDefault();
		resetButton.click();
	} else if (event.keyCode == 67) {
		event.preventDefault();
		clearButton.click();
	}
});

/*******  COLORS and BUTTON STATES  ********/

document.querySelector('#userGuess').addEventListener('keyup', function(event) {

	if (document.querySelector('#userGuess').value == '') {
		document.querySelector('#guessButton').setAttribute('disabled','');
		document.querySelector('#clearButton').setAttribute('disabled','');
		document.querySelector('#guessButton').classList.remove('dark_bg');
		document.querySelector('#clearButton').classList.remove('dark_bg');

	} else {
		document.querySelector('#guessButton').removeAttribute('disabled');
		document.querySelector('#clearButton').removeAttribute('disabled');
		document.querySelector('#guessButton').classList.add('dark_bg');
		document.querySelector('#clearButton').classList.add('dark_bg');
	}
});

/*******  MIN & MAX  *******/

document.querySelector('#inputMin').addEventListener('keyup', function(event) {
	minValue = parseInt(document.querySelector('#inputMin').value);
	topText.innerText = "Guess my number between " + minValue + " and " + maxValue + "!";
	randomNum = numGen();
});

document.querySelector('#inputMax').addEventListener('keyup', function(event) {
	maxValue = parseInt(document.querySelector('#inputMax').value);
	topText.innerText = "Guess my number between " + minValue + " and " + maxValue + "!";
	randomNum = numGen();
});








