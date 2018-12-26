/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, lastRoll, newRoll, userInput;
	
function startGame() {
  // setting scores to 0
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  //winningScore = 20;
  //lastRoll = [];
  
  // setting dice and scoreboard to 0
  noDice();
  clearScore();
  clearGlobal();
  
  submitScore();
  
  document.querySelector('.user-input').style.visibility = 'visible';
  
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  
  // removing winner and active classes from previous game
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  
  // adding active class back to player 1 for new game
  document.querySelector('.player-0-panel').classList.add('active');
  
  // enabling roll and hold buttons
  document.querySelector('.btn-roll').disabled = true;
  document.querySelector('.btn-hold').disabled = true;

}

function noDice() {
	document.querySelector('.dice').style.display = 'none';
}

function clearScore() {
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
}

function clearGlobal() {
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
}

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	clearScore();
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	noDice();
}

// submit user score
function submitScore() {
	document.querySelector('.submit-score').addEventListener('click', function() {
		userInput = document.querySelector('#user-score').value;
		document.querySelector('.user-input').style.visibility = 'hidden';
		document.querySelector('.btn-roll').disabled = false;
		document.querySelector('.btn-hold').disabled = false;
		document.querySelector('.final-score').classList.add('hide-placeholder');
	});
}


//Game Begins
startGame();

// toggle input placeholder on click
document.querySelector('#user-score').addEventListener('click', function() {
	document.querySelector('.final-score').classList.toggle('hide-placeholder');
});

document.querySelector('.player-0-panel').addEventListener('click', function() {
	document.querySelector('.final-score').classList.toggle('hide-placeholder');
});

document.querySelector('.player-1-panel').addEventListener('click', function() {
	document.querySelector('.final-score').classList.toggle('hide-placeholder');
});


document.querySelector('.btn-roll').addEventListener('click', function() {
	// hide input field
	document.querySelector('.user-input').style.visibility = 'hidden';
	
	// generate a random number
	var dice = Math.floor(Math.random() * 6) + 1;
	
	//lastRoll.unshift(dice);
	// display result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';
	// If the score is not a 1, update round score
	if (dice === 6 && lastRoll === 6) {
		document.getElementById('score-' + activePlayer).textContent = '0';
		scores[activePlayer] = 0;
		nextPlayer();
	} else if (dice !== 1) {
		//add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		//change player
		nextPlayer();
	}
	lastRoll = dice;
	console.log(lastRoll);
	/*
	if (lastRoll[0] === 6 && lastRoll[1] === 6) {
		document.getElementById('score-' + activePlayer).textContent = '0';
		scores[activePlayer] = 0
		nextPlayer();
	}
	*/
});


document.querySelector('.btn-hold').addEventListener("click", function() {
	// add current score to global score.
	scores[activePlayer] += roundScore;
	
	// update the UI
	document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	
	
	//check for user generated winning score
	//var userInput = document.querySelector('#user-score').value;
	var winningScore;
	
	if (userInput) {
		winningScore = userInput;
	} else {
		winningScore = 20;
	}

	
    // determine the winner
	if (scores[activePlayer] >= winningScore) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		// disabling hold and roll buttons... end of game
		document.querySelector('.btn-roll').disabled = true;
		document.querySelector('.btn-hold').disabled = true;
		noDice();
	} else {
		nextPlayer();
	}
});

// new game 
document.querySelector('.btn-new').addEventListener('click', startGame);











