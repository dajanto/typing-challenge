	
	// Makes an initial challenge appear
	window.onload = function() {
		gettingReadyToPlay();
	}

	// Field declarations and initializations.
    var _wordsAllArray = new Array();
    var _counter = 61;
    var _t;
    var _isTimerOn = false;
    var _rightWords = [];
	var _wrongWords = [];
	var _rightKeystrokes = 0;
   	var _wrongKeystrokes = 0;
   	var _spaceCount = 0;

   	/*
   		Fills the Word Array with all words that are involved to the challenge.
   	*/
 	function fillWordArrayWithWords() {
 		_wordsAllArray = ["allein","alles","also","am","auch",
							"auf","aus","bald","dann","darauf",
							"dass","dem","den","denn","deren",
							"die","diese","dieser","doch","einem",
							"eines","einen","einmal","einer","er",
							"sie","es", "wir", "ihr", "sie",
							"ganz", "ganze", "gar", "gut", "Hand",
							"gemacht", "hätte", "hätten", "trotzdem",
							"hier", "ihn", "ihr", "ihrem", "im",
							"ist", "ja", "nein", "Jahre", "jetzt",
							"keine", "können", "lange", "Leben", "Liebe",
							"mehr", "meiner", "Menschen", "nur", "oder",
							"recht", "schon", "sehen", "sehr", "sein",
							"seiner", "sind", "sollte", "um", "vielleicht",
							"vom", "waren", "weiter", "welche", "welcher",
							"welches", "werde", "werden", "worden", "wohl",
							"zwar", "zwischen", "hatte", "war", "ersten",
							"Herr", "Welt", "damit", "sagen", "unter", 
							"diesen", "dieses", "heute", "gegeben", "Seite",
							"Weise", "gewesen", "einzelnen", "nun", "ihm",
							"mir", "kommen", "während", "seinen", "seinem",
							"deinen", "schlecht"];				
    }

	/*
		A simple countdown. If the countdown hits 0 seconds timer is stopped, 
		typing field disabled and score will be showing up.
	*/
    function countdown() {
		
		_counter--;
		_t = setTimeout("countdown()", 1000);
		getTimerTextfield().value = _counter;

		if(_counter == 0) {
			isTimerOn = false;
  			clearTimeout(_t);
  			getTypingTextfield().disabled=true;
  			getTypingTextfield().value = ""
  			calculateScores();
		}
	}

	/*
		Starts the countdown if there is no timer running at the moment.
	*/
	function startCountdown() {
		if(!_isTimerOn) {
			_isTimerOn = true;
			countdown();
		}
	}

	/*
		Calculates the scores and displays it after the timer hits 0 seconds.
	*/
	function calculateScores() {

		var WPM = _rightWords.length;
		var rightWords = _rightWords.length;
		var wrongWords = _wrongWords.length;
		var rightKeystrokes = _rightKeystrokes;
		var wrongKeystrokes = _wrongKeystrokes;
		var officialWPM = Math.floor(rightKeystrokes/5);

		getTimerTextfield().style.height="150px";
		getTimerTextfield().style.width="300px";

		getTimerTextfield().value = "\n" + 
			"*** S C O R E ***" + "\n"
			+ "WPM: " + officialWPM + " (" + (rightKeystrokes + wrongKeystrokes) + " keystrokes)" + "\n"
			+ "Right words: " + rightWords + " (" + rightKeystrokes + " keystrokes)" + "\n"
			+ "Wrong words: " + wrongWords + " (" + wrongKeystrokes + " keystrokes)" + "\n"
	}

	/*
		Deletes viewable content of the Typing Textfield as well as the Problem Textfield.
	*/
	function cleanUpFrontend() {
		document.getElementById("typingTextfield").value = "";
		document.getElementById("problemTextfield").value = "";
	}

	/*
		Deletes unviewable content of the Typing Textfield as well as the Problem Textfield.
	*/
    function cleanUpBackend() {
    	_wordsAllArray = [];
    }

    /*
    	Shuffles an given Array.
    */
    function shuffle(array) {
	    
	    var j, x, i;
	    
	    for (i = array.length; i; i -= 1) {
	        j = Math.floor(Math.random() * i);
	        x = array[i - 1];
	        array[i - 1] = array[j];
	        array[j] = x;
	    }
}
	/*
		Shuffles the Word Array and generating a string with words that can be displayed. 
	*/
    function generateProblem() {
    	
    	cleanUpBackend();
 		fillWordArrayWithWords();
 		fillWordArrayWithWords();
 		fillWordArrayWithWords();
 		shuffle(_wordsAllArray);
 	}

	/*
		Uses the array to display the problem.
 	*/
 	function displayProblem() {
 		
 		cleanUpFrontend();

 		// Working
 		getProblemTextfield().value = _wordsAllArray.join(" ");
 	}

	/*
		Returns the Typing Textfield.
 	*/
 	function getTypingTextfield() {
 		return document.getElementById("typingTextfield");
 	}

	/*
		Returns the Problem Textfield.
 	*/
 	function getProblemTextfield() {
 		return document.getElementById("problemTextfield");
 	}

	/*
		Returns the body of the HTML document.	
 	*/
 	function getBody() {
 		return document.getElementsByTagName("BODY")[0];
 	}

	/*
		Returns the Timer Textfield.
 	*/
 	function getTimerTextfield() {
 		return document.getElementById("timerTextfield");
 	}

	/*
		Returns the Refresh Button.
 	*/
 	function getRefreshWordsButton() {
 		return document.getElementById("refreshButton");
 	}

	// This happens if a keyboard key has been pressed.
	getTypingTextfield().addEventListener("keypress", function checkKeyPress(e) {
		
		if(getProblemTextfield().value !== "") {
			startCountdown();
			getTypingTextfield().placeholder= "";
		}

		var currentWordOfString = _wordsAllArray[_rightWords.length + _wrongWords.length];

			var SPACE = 32;

			if (e.keyCode == SPACE) {
				e.preventDefault();
				
				if(getTypingTextfield().value !== "") {
					if(getTypingTextfield().value === currentWordOfString) {
 						_rightWords.push(currentWordOfString);
 						_rightKeystrokes += currentWordOfString.length;
 					} 
 					else if(getTypingTextfield().value !== currentWordOfString) {
 						_wrongWords.push(currentWordOfString);
 						_wrongKeystrokes += currentWordOfString.length;
 					}
				}

				getTypingTextfield().value = "";
				getBody().style.backgroundColor = "white";

				// TODO Deleting two rows
			}
		});

	// This happens if a keyboard key goes up.
	getTypingTextfield().addEventListener("keyup", function checkKeyUp(e) {
		
		var currentWordOfString = _wordsAllArray[_rightWords.length + _wrongWords.length];

		if(getTypingTextfield().value === currentWordOfString.substring(0,getTypingTextfield().value.length)) {
				// TODO GREEN
			}
			else {
				// TODO RED
				
			}	
	});

	/*
  		This is the method that is called everytime the Refresh button has been pressed.
  		It's mostly about cleaning up stuff that another challenge can be launched. 
  	*/
  	function gettingReadyToPlay() {
		
		document.body.style.zoom = "250%";

  		getBody().style.backgroundRepeat = "repeat";

		getTypingTextfield().disabled = false;
  		_counter = 61;
		_isTimerOn = false;
  		clearTimeout(_t);
  		getTimerTextfield().value = "";
  		getTypingTextfield().placeholder="Start typing to begin a challenge.";

  		getTimerTextfield().style.textAlign = "center";
  		getTypingTextfield().style.textAlign = "center";
  		getTimerTextfield().style.height = "30px";
  		getTimerTextfield().style.width = "45px";

  		_rightWords = [];
  		_wrongWords = [];
  		_rightKeystrokes = 0;
  		_wrongKeystrokes = 0;
  		_spaceCount = 0;

  		cleanUpFrontend();
  		generateProblem();
  		displayProblem();

  }
