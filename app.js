/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game.

*/
var win_flag, six_flag;
var scores, roundScore, activePlayer;
var goal;

startGame();

//////////STARTGAME///////////
function startGame(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    win_flag = false;
    six_flag = false;

    goal = document.querySelector('.final-score').value;
    if(!goal){
        goal = 100;
    }

    document.querySelector('.dice').style.display = 'none';
    console.log('winning score = ' + goal);
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//////////ENDTURN///////////
function endTurn(){
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    six_flag = false;
}

//roll dice button listener
document.querySelector('.btn-roll').addEventListener('click', function(){

    //if no player has won
    if(!win_flag){
        //random number from 1 to 6
        var dice = Math.floor(Math.random() * 6) + 1;

        //draw dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        //logic dependent on dice roll
        if(dice === 1){
            endTurn();
        }else if(dice === 6){
            if(six_flag){
                scores[activePlayer] = 0;
                endTurn();
            }else{
                six_flag = true;
                roundScore += dice;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            }
        }else{
            six_flag = false;
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;      
        }
    }
});

//hold button listener
document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += roundScore;
    if(scores[activePlayer] >= goal){
        win_flag = true;
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }else{
        endTurn();
    }
});

//new game button listener
document.querySelector('.btn-new').addEventListener('click', startGame);