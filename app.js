/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var global = document.querySelector('#score-0').textContent;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
		
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
		
	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function() {
	// generate a random number
	var dice = Math.floor(Math.random() * 6) + 1;
	
	// display result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';
	// If the score is not a 1, update round score
	if (dice !== 1) {
		//add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		//change player
		nextPlayer();
	}
});


document.querySelector('.btn-hold').addEventListener("click", function() {
	// add current score to global score.
	scores[activePlayer] += roundScore;
	
	// update the UI
	document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	
	// check if the player won the game
	
	/* This is the way i did it
	
	var playerOneScore = document.getElementById('score-0').textContent;
    var playerTwoScore = document.getElementById('score-1').textContent;
	
	if (playerOneScore >= 20) {
		document.getElementById('name-0').innerHTML = "Winner!";
	} else if (playerTwoScore >= 20) {
		document.getElementById('name-1').innerHTML = "Winner!";
	}
	*/
	
	//This is the way the course did it
	if (scores[activePlayer] >= 20) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	} else {
		nextPlayer();
	}
});












