import placeholderQuestions from "./placeholder-questions.js";

//html selectors
let turn = document.querySelector(".player_turn");
let guessPass = document.querySelector(".guess_pass");
let entry = document.querySelector(".entry");
let button = document.querySelector(".play_button");
let button_msg = document.querySelector(".button_msg");
let nextRound = document.querySelector(".next_round");
let playerOneScore = document.querySelector(".player_one_score");
let playerTwoScore = document.querySelector(".player_two_score");
let display = document.querySelector(".question_display");
let finalCategory = document.querySelector(".final_column_header");
let finalQuestion = document.querySelector(".final");




//bring values in from url
let searchScore1 = new URLSearchParams(window.location.search).get("player1score");
searchScore1 = parseInt(searchScore1);
let searchScore2 = new URLSearchParams(window.location.search).get("player2score");
searchScore2 = parseInt(searchScore2);
let round = new URLSearchParams(window.location.search).get("round");
if(round == "2"){
round =  parseInt(round);
}

let player = new URLSearchParams(window.location.search).get("player");



let  score1 = searchScore1;
let  score2 = searchScore2;
let  whosTurn = player;
let wager1 = 0;
let wager2 = 0;
let wager1Entered = false;
let wager2Entered = false;
let player1Answer = "";
let player2Answer = "";


playerOneScore.textContent = `Player One Score: ${score1}`;
playerTwoScore.textContent = `Player Two Score: ${score2}`;
turn.textContent = whosTurn;
finalCategory.textContent = `The final category is: ${placeholderQuestions[60].category}`;

function prompt() {
    if(wager1Entered == false || wager2Entered == false){
        if (whosTurn == "Player 1"){
         finalQuestion.textContent = `${whosTurn} can wager up to ${score1}`;
         button.onclick = ()=> {
            let input = entry.value;
            if(input <= 0 && score1 > 0){
                alert("Please enter a positive wager");
            } else if (input > score1) {
                alert(`That wager is too high, you can only wager up to ${score1}`)
            } else {
                wager1 = Number(input);
                wager1Entered = true;
                whosTurn = "Player 2"
                entry.value = "";
                // return;
                prompt();
            }
        }
    }
    else {
        finalQuestion.textContent = `${whosTurn} can wager up to ${score2}`;
        button.onclick = ()=> {
        let input = entry.value;
        if(input <= 0 && score2 > 0){
            alert("Please enter a positive wager");
        } else if (input > score2) {
            alert(`That wager is too high, you can only wager up to ${score2}`)
        } else {
            wager2 = Number(input);
            whosTurn = "Player 1";
            wager2Entered = true;
            entry.value = "";
            // return;
            prompt();
        }
     }
    }
} else {
    askFinalQuestion();
    
}
}


function askFinalQuestion() {
    document.body.style = "white-space: pre";
    finalQuestion.textContent = placeholderQuestions[60].question  + "\n" + `${whosTurn} enter your answer.`;
    button.textContent = "Enter Answer";
    entry.setAttribute("placeholder", `${whosTurn} enter your answer.`);
    button.onclick = () => {
        let input = entry.value;
        if (input.length == 0){
            alert("Please enter an answer.")
        } else {
            if (whosTurn == "Player 1" && player1Answer.length == 0) {
            whosTurn = "Player 2";
            player1Answer = input;
            entry.value = "";
            askFinalQuestion();
            
            } else if (whosTurn =="Player 2" && player2Answer.length == 0){
            whosTurn = "Player 1";
            player2Answer = input;
            entry.value="";
            askFinalQuestion();
            
             }
            }
            if(player1Answer.length > 0 && player2Answer.length >0 )
            {
            finalQuestion.textContent = placeholderQuestions[60].answer;
            if(player1Answer == placeholderQuestions[60].answer){
                score1 += wager1;
            } else {
                score1 -= wager1;
            }
            if(player2Answer == placeholderQuestions[60].answer){
                score2 += wager2;
            } else {
                score2 -= wager2;
            }
            if(score1 > score2){
                finalQuestion.textContent = "Player 1 wins!"
            } else if (score2 > score1) {
                finalQuestion.textContent = "Player 2 wins!"
            } else {
                finalQuestion.textContent = "We have a tie."                
            }
            entry.setAttribute("placeholder", "The End");
        }
            
playerOneScore.textContent = `Player One Score: ${score1}`;
playerTwoScore.textContent = `Player Two Score: ${score2}`;

        }
    }



prompt();





