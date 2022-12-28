let computerScore;
let playerScore;

function playRound(playerSelection, computerSelection) {
    if(playerSelection === computerSelection) return `You Tie!`;
    else if ((computerSelection === "Rock" && playerSelection === "Scissors")
    || (computerSelection === "Paper" && playerSelection === "Rock")
    || (computerSelection === "Scissors" && playerSelection === "Paper")){
        computerScore++;
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    } else {
        playerScore++;
        return `You Win! ${playerSelection} beats ${computerSelection}`;
    }
}

function getComputerChoice() {
    let ran = Math.floor(Math.random()*3);
    if(ran == 0) return "Rock";
    else if (ran == 1) return "Paper";
    else return "Scissors";
}

function game() {
    computerScore = 0;
    playerScore = 0;
    for(let i = 0; i < 5; i++){
        let playerSelection = prompt("Select Rock, Paper or Scissors");
        let computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection) + ` Current Score: ${playerScore} - ${computerScore}`);
    }
}

game();

