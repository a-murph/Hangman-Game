var hangman = {
	//list of artists that will be the words to be guessed by the player
	artists: ["The Mars Volta", "Leprous", "Dream Theater", "Cynic", "Three", "The Dear Hunter", "Tool", "Thank You Scientist", "Coheed and Cambria", "The Kyteman Orchestra"],
	//list of songs corresponding to the artists, to display when player guesses correctly
	songs: ["Goliath", "Foe", "Panic Attack", "Adam's Murmur", "The End is Begun", "The Tank", "Vicarious", "Feed The Horses", "No World For Tomorrow", "7/8"],
	//empty array to fill with letters the player guesses
	guesses: [],
	//empty string to fill with the current word the player is guessing
	currentWord: "",
	//empty string to fill with hidden word (e.g. "--- ---- -----")
	currentWordHidden: "",
	//index of artists array to become guessed word
	currentNumber: 0,
	//number of times word was guessed successfully
	wins: 0,
	//number of times word was not guessed successfully
	losses: 0,
	//number of allowed mistakes remaining
	mistakes: 5,

	updateDisplay: function() { //update page to show results
		//update Current Word display
		document.getElementById("current-word").textContent = this.currentWordHidden;
		//create string with all guessed letters
		var lettersGuessed = "";
		for (var i = 0; i < this.guesses.length; i++) {
			lettersGuessed += this.guesses[i] +" ";
		}
		//update Letters Guessed display with newly made string
		document.getElementById("letters-guessed").textContent = lettersGuessed;
		//update mistake counter
		document.getElementById("mistake-count").textContent = this.mistakes;
		//update win and loss counters
		document.getElementById("win-count").textContent = this.wins;
		document.getElementById("loss-count").textContent = this.losses;
	},

	setWord: function() { //set up the word to guess
		//make currentWord equal to next artist name
		this.currentWord = this.artists[this.currentNumber];
		//create hidden version of currentWord
		this.currentWordHidden = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			if (this.currentWord.charAt(i) === " ")
				this.currentWordHidden += " ";
			else
				this.currentWordHidden += "-";
		}
		//display hidden word on page
		this.updateDisplay();
	},

	guessLetter: function(letter) { //logic for player guessing a letter
		if (this.guesses.indexOf(letter) == -1) { //if letter has not yet been guessed
			var isCorrect = false;
			for (var i = 0; i < this.currentWord.length; i++) {
				//find any matches in the current word
				if (letter === this.currentWord.toLowerCase().charAt(i)) {
					this.currentWordHidden = //change any matching indexes to display the letter
						this.currentWordHidden.substr(0, i) +letter +this.currentWordHidden.substr(i+1);
					isCorrect = true;
				}
			}
			if (!isCorrect) //if guessed letter was not in word
				this.mistakes--; //reduce remaining mistakes by 1
			
			this.guesses.push(letter);
			this.updateDisplay();
			this.progressGame();
		}
		//if letter has already been guessed, do nothing
	},

	progressGame: function() {
		if (this.mistakes == 0 || this.currentWordHidden == this.currentWord.toLowerCase()) { //if game was won or lost
			if (this.mistakes == 0) //if game was lost
				this.losses++; //increase loss counter by 1
			else //if game was won
				this.wins++; //increase win counter by 1
			this.guesses = []; //reset guesses array
			this.mistakes = 5; //reset mistake counter
			if (this.currentNumber == this.artists.length-1) //if at end of artists array
				this.currentNumber = 0; //reset index number
			else
				this.currentNumber++; //otherwise increase index number by 1
			this.setWord(); //set new word
		}
	},
};

hangman.setWord(); //set up game when page loads

document.onkeyup = function(event) { //when the layer presses a key
	hangman.guessLetter(event.key); //run game logic
}