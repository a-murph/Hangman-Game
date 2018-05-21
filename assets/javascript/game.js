var hangman = {
	//list of artists that will be the words to be guessed by the player
	artists: ["The Mars Volta", "Leprous", "Dream Theater", "Cynic", "Three", "The Dear Hunter", "Tool", "Thank You Scientist", "Coheed and Cambria", "The Kyteman Orchestra"],
	//list of songs corresponding to the artists, to display when player guesses correctly
	songs: ["Goliath", "Foe", "Panic Attack", "Adam's Murmur", "The End is Begun", "The Tank", "Vicarious", "Feed The Horses", "No World For Tomorrow", "7/8"],
	//empty array to fill with letters the player guesses
	guesses: [],
	//empty array to fill with words the player guessed correctly
	completedWords: [],
	//empty string to fill with the current word the player is guessing
	currentWord: "",
	//empty string to fill with hidden word (e.g. "--- ---- -----")
	currentWordHidden: "",
	//index number of current word
	currentNumber: 0,
	//number of times word was guessed successfully
	wins: 0,
	//number of times word was not guessed successfully
	losses: 0,
	//number of allowed mistakes remaining
	mistakes: 7,
	//is song playing
	songPlaying: false,

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
		//setup random index number
		var randomIndex = Math.floor(Math.random()*10);
		while (this.completedWords.indexOf(randomIndex) != -1) { //run this until index is new word
			randomIndex = Math.floor(Math.random()*10); //randomize index number
		}
		this.currentNumber = randomIndex; //set current number to randomized index
		this.currentWord = this.artists[this.currentNumber]; //set current word to value at randomized index

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
			else { //if game was won
				this.wins++; //increase win counter by 1
				this.setSong(); //set song name, image, and audio
				this.completedWords.push(this.currentNumber); //add completed index number to completedWords array
				if (this.completedWords.length == this.artists.length) //if all words are in completedWords array
					this.completedWords = []; //reset completedWords array
			}
			this.guesses = []; //reset guesses array
			this.mistakes = 7; //reset mistake counter
			if (this.currentNumber == this.artists.length-1) //if at end of artists array
				this.currentNumber = 0; //reset index number
			else
				this.currentNumber++; //otherwise increase index number by 1
			this.setWord(); //set new word
		}
	},

	setSong: function() { //change song name, image, and audio
		var image = document.getElementById("album-image");
		var title = document.getElementById("song-name");
		var audio;
		if (!this.songPlaying){ //if nothing is playing
			//unhide audio element
			audio = document.getElementById("hidden-audio");
			audio.setAttribute("id", "playing-audio");
			this.songPlaying = true;
		} else
			audio = document.getElementById("playing-audio");

		audio.volume = 0.5; //1.0 volume is very loud
			
		if (this.currentWord == "The Mars Volta") {
			title.textContent = 
				"The Mars Volta - Goliath";
			image.setAttribute(
				"src", "assets/images/BedlamInGoliath.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/Goliath.mp3"
			);
		} else if (this.currentWord == "Leprous") {
			title.textContent = 
				"Leprous - Foe";
			image.setAttribute(
				"src", "assets/images/Coal.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/Foe.mp3"
			);
		} else if (this.currentWord == "Dream Theater") {
			title.textContent = 
				"Dream Theater - Panic Attack";
			image.setAttribute(
				"src", "assets/images/Octavarium.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/PanicAttack.mp3"
			);
		} else if (this.currentWord == "Cynic") {
			title.textContent = 
				"Cynic - Adam's Murmur";
			image.setAttribute(
				"src", "assets/images/TracedInAir.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/AdamsMurmur.mp3"
			);
		} else if (this.currentWord == "Three") {
			title.textContent = 
				"Three - The End is Begun";
			image.setAttribute(
				"src", "assets/images/EndIsBegun.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/EndIsBegun.mp3"
			);
		} else if (this.currentWord == "The Dear Hunter") {
			title.textContent = 
				"The Dear Hunter - The Tank";
			image.setAttribute(
				"src", "assets/images/Act3.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/Tank.mp3"
			);
		} else if (this.currentWord == "Tool") {
			title.textContent = 
				"Tool - Vicarious";
			image.setAttribute(
				"src", "assets/images/10000Days.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/Vicarious.mp3"
			);
		} else if (this.currentWord == "Thank You Scientist") {
			title.textContent = 
				"Thank You Scientist - Feed The Horses";
			image.setAttribute(
				"src", "assets/images/MapsOfNonExistentPlaces.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/FeedTheHorses.mp3"
			);
		} else if (this.currentWord == "Coheed and Cambria") {
			title.textContent = 
				"Coheed and Cambria - No World For Tomorrow";
			image.setAttribute("src", "assets/images/NoWorldForTomorrow.jpg");
			audio.setAttribute(
				"src", "assets/audio/NoWorldForTomorrow.mp3"
			);
		} else if (this.currentWord == "The Kyteman Orchestra") {
			title.textContent = "The Kyteman Orchesta - 7/8";
			image.setAttribute(
				"src", "assets/images/KytemanOrchestra.jpg"
			);
			audio.setAttribute(
				"src", "assets/audio/78.mp3"
			);
		}
		audio.play();
	},
};

hangman.setWord(); //set up game when page loads

document.onkeyup = function(event) { //when the player presses a key
	hangman.guessLetter(event.key); //run game logic
}