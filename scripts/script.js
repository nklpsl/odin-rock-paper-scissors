let computerScore;
let playerScore;
let playerSelection;

let roundNumber = 0;
let emojis = [];
emojis["Rock"] = '0x270A';
emojis["Paper"] = '0x1F590';
emojis["Scissors"] = '0x270C';

const rockBtn = document.getElementById('Rock');
const paperBtn = document.getElementById('Paper');
const scissorsBtn = document.getElementById('Scissors');

const ownMove = document.getElementById('ownMove');
const botMove = document.getElementById('botMove');
const score = document.getElementById('score');
const roundResult = document.getElementById('roundResult');
const resultCause = document.getElementById('resultCause');
const restart = document.getElementById('restart');
const playAgain = document.getElementById('playAgain');
const endGameMsg = document.getElementById('endGameMsg');
playAgain.addEventListener('click', newGame);

const historyRounds = document.getElementById('historyRounds');
const history = document.getElementById('history');

function playRock() {
    playRound("Rock", getComputerChoice());
}

function playPaper() {
    playRound("Paper", getComputerChoice());
}

function playScissors() {
    playRound("Scissors", getComputerChoice());
}

function enableOptionsListeners (){
    rockBtn.addEventListener('click', playRock);
    paperBtn.addEventListener('click', playPaper);
    scissorsBtn.addEventListener('click', playScissors);
}

function disableOptionsListeners() {
    rockBtn.removeEventListener('click', playRock);
    paperBtn.removeEventListener('click', playPaper);
    scissorsBtn.removeEventListener('click', playScissors);
}

function resetElements() {
    score.innerText = "0 - 0";
    ownMove.innerText = String.fromCodePoint(0x2753);
    botMove.innerText = String.fromCodePoint(0x2753);
    historyRounds.innerHTML = "";
}

function displayRestartButton() {
    restart.classList.toggle('hidden');
    score.classList.toggle('hidden');
    roundResult.classList.toggle('hidden');
    resultCause.classList.toggle('hidden');
}

function restoreNewGameVisibility() {
    if(score.classList.contains('hidden')){
        score.classList.remove('hidden');
    }
    if(!roundResult.classList.contains('hidden')){
        roundResult.classList.add('hidden');
    }
    if(!resultCause.classList.contains('hidden')){
        resultCause.classList.add('hidden');
    }
    if(!history.classList.contains('hidden')){
        history.classList.add('hidden');
    }
    if(!restart.classList.contains('hidden')){
        restart.classList.add('hidden');
    }
}

function firstRound() {
    roundResult.classList.toggle('hidden');
    resultCause.classList.toggle('hidden');
    history.classList.toggle('hidden');
}

function newRoundHistory(className, playerSelection, computerSelection) {
    let newIn = document.createElement('div');
    newIn.classList.add('historyRound', className);

    let title = document.createElement('h3');
    title.innerText = `Round #${roundNumber}`;
    newIn.appendChild(title);

    let roundInfo = document.createElement('div');
    roundInfo.classList.add('roundInfo');

    let ownPrevMove = document.createElement('div');
    let ownInfo = document.createElement('h6');
    ownInfo.innerText = 'Your Move';
    let ownSpan = document.createElement('span');
    ownSpan.classList.add('move');
    ownSpan.innerText = String.fromCodePoint(emojis[playerSelection]);
    ownPrevMove.appendChild(ownInfo);
    ownPrevMove.appendChild(ownSpan);

    let scoreBoard = document.createElement('div');
    scoreBoard.classList.add('roundScore');
    scoreBoard.innerText = `${playerScore} - ${computerScore}`;

    let botPrevMove = document.createElement('div');
    let botInfo = document.createElement('h6');
    botInfo.innerText = 'Bot\'s Move';
    let botSpan = document.createElement('span');
    botSpan.classList.add('move');
    botSpan.innerText = String.fromCodePoint(emojis[computerSelection]);
    botPrevMove.appendChild(botInfo);
    botPrevMove.appendChild(botSpan);

    roundInfo.appendChild(ownPrevMove);
    roundInfo.appendChild(scoreBoard);
    roundInfo.appendChild(botPrevMove);

    newIn.appendChild(roundInfo);
    
    historyRounds.insertBefore(newIn, historyRounds.firstChild);
}

function updateScoreboard(result, playerSelection, computerSelection){
    score.innerText = `${playerScore} - ${computerScore}`;
    ownMove.innerText = String.fromCodePoint(emojis[playerSelection]);
    botMove.innerText = String.fromCodePoint(emojis[computerSelection]);
    newRoundHistory(result, playerSelection, computerSelection);
}

function playRound(playerSelection, computerSelection) {
    if(roundNumber == 0) firstRound();
    roundNumber++;
    if(playerSelection === computerSelection) {
        updateScoreboard("tiedRound", playerSelection, computerSelection);
        roundResult.innerText = 'You Draw!';
        resultCause.innerText = `${playerSelection} equals ${computerSelection}`;
    }
    else if ((computerSelection === "Rock" && playerSelection === "Scissors")
    || (computerSelection === "Paper" && playerSelection === "Rock")
    || (computerSelection === "Scissors" && playerSelection === "Paper")){
        computerScore++;
        updateScoreboard("lostRound", playerSelection, computerSelection);
        roundResult.innerText = 'You Lose!';
        resultCause.innerText = `${computerSelection} beat` + (computerSelection == "Scissors"? `` : `s`) + ` ${playerSelection}`;
    } else {
        playerScore++;
        updateScoreboard("wonRound", playerSelection, computerSelection);
        roundResult.innerText = 'You Win!';
        resultCause.innerText = `${computerSelection} beat` + (computerSelection == "Scissors"? `` : `s`) + ` ${playerSelection}`;
    }
    if(playerScore == 5 || computerScore == 5) {
        endGame();
    }
}

function getComputerChoice() {
    let ran = Math.floor(Math.random()*3);
    if(ran == 0) return "Rock";
    else if (ran == 1) return "Paper";
    else return "Scissors";
}

function newGame() {
    computerScore = 0;
    playerScore = 0;
    resetElements();
    restoreNewGameVisibility();
    enableOptionsListeners();
}


function endGame() {
    disableOptionsListeners();
    roundNumber = 0;
    if(computerScore == 5) endGameMsg.innerText = 'You Lost!';
    else endGameMsg.innerHTML = 'You Won!';
    displayRestartButton();
}

newGame();