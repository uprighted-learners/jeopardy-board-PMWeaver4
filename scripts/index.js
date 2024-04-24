// Do not change the import statement, this gets us access to the pre-existing questions for this project
import placeholderQuestions from "./placeholder-questions.js";

//html selectors
let turn = document.querySelector(".player_turn");
let entry = document.querySelector(".entry");
let guess = document.querySelector(".guess");
let pass = document.querySelector(".pass");
let nextRound = document.querySelector(".next_round");
let playerOneScore = document.querySelector(".player_one_score");
let playerTwoScore = document.querySelector(".player_two_score");
let display = document.querySelector(".question_display");

//bring values in from url, this is how we pass the score from one round to the next
let searchScore1 = new URLSearchParams(window.location.search).get(
  "player1score"
);
searchScore1 = parseInt(searchScore1);
let searchScore2 = new URLSearchParams(window.location.search).get(
  "player2score"
);
searchScore2 = parseInt(searchScore2);
let round = new URLSearchParams(window.location.search).get("round");
if (round == "2") {
  round = parseInt(round);
} else {
  round = Number(1);
}
//this is how we know who's turn it is going from one url to the next
let player = new URLSearchParams(window.location.search).get("player");

//initialize the scores, populate with searched parameters if we're not on the first round
let score1 = 0;
let score2 = 0;
let roundMultiplier = 0;
let whosTurn = "Player 1";
if (round == 2 || round == "final") {
  score1 = searchScore1;
  score2 = searchScore2;
  roundMultiplier = 5;
  whosTurn = player;
}
playerOneScore.textContent = `Player One Score: ${score1}`;
playerTwoScore.textContent = `Player Two Score: ${score2}`;

//states
let lock = false;
let playCount = 0;

//create a table
function addTable() {
  let myTableDiv = document.getElementById("myDynamicTable");
  let table = document.createElement("TABLE");
  table.border = "1";
  let tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);
  // we declare how many rows and columns there are via the following "for" statements
  for (let i = 0; i < 6; i++) {
    let tr = document.createElement("TR");
    tableBody.appendChild(tr);

    // populate the cells based on how those cells correspond to the table of questions
    for (let j = 0; j < 6; j++) {
      let td = document.createElement("TD");
      let th = document.createElement("TH");
      if (i == 0) {
        //i == 0 is the first row, it gets the categories
        th.appendChild(
          document.createTextNode(placeholderQuestions[i + j * 10].category)
        );
        tr.appendChild(th);
        th.style.backgroundColor = "rgb(152, 37, 156)";
      } else {
        //points based on row placement
        let points = i * 100;
        //for each cell with points in it created, determine how many "plays" in the game
        playCount++;
        //populate the questions
        td.appendChild(
          document.createTextNode(
            placeholderQuestions[i - 1 + roundMultiplier + j * 10].category +
              "\n" +
              points
          )
        );
        //set the attributes to kick off the game
        td.setAttribute("class", "playable");
        td.setAttribute("id", `cell${i}${j}`);
        //the whitespaces will be kept as is and the text only wraps when line breaks are in the content
        document.body.style = "white-space: pre";
        tr.appendChild(td);
        //the event listener handles when the player clicks in the cell:
        //with a series of if statements that search for conditions of the game
        td.addEventListener("click", () => {
          if (
            td.className == "playable" &&
            lock == false &&
            playCount > 0 &&
            score1 < 15000 * round &&
            score2 < 15000 * round
          ) {
            //calls upon cellclick function defined below
            cellClick(
              points,
              td,
              placeholderQuestions[i - 1 + roundMultiplier + j * 10].question,
              placeholderQuestions[i - 1 + roundMultiplier + j * 10].answer
            );
          } else if (lock == true) {
            alert(
              "You must finish the current question. Take a guess, or pass to the next player."
            );
          } else {
            nextRound.disabled = false;
            alert("Click Next Round for Round 2.");
          }
        });
      }
    }
  }
  myTableDiv.appendChild(table);
}
//takes in necessary info to affect relevant game variables and states
function cellClick(points, cell, question, answer) {
  //as long as the cell is good to go, display the question and stylize the cell differently
  if (lock == false) {
    display.textContent = question;
    cell.style.backgroundColor = "blue";
    lock = true;
  }
  //sets buttons to be clickable
  guess.disabled = false;
  pass.disabled = false;

  let numberofguesses = 2;
  //player passes, who's turn changes, and number of guesses is deducted, cell closes if out of guesses
  pass.onclick = () => {
    if (whosTurn == "Player 1" && numberofguesses > 0) {
      whosTurn = "Player 2";
      turn.textContent = `${whosTurn}, it's your turn.`;
      numberofguesses -= 1;
      if (numberofguesses == 0) {
        cell.setAttribute("class", "not_playable");
        cell.textContent = "";
        //reset to 2
        numberofguesses = 2;
        lock = false;
        display.textContent = "";
      }
    } else if (whosTurn == "Player 2" && numberofguesses > 0) {
      whosTurn = "Player 1";
      turn.textContent = `${whosTurn}, it's your turn.`;
      numberofguesses -= 1;
      if (numberofguesses == 0) {
        cell.setAttribute("class", "not_playable");
        cell.textContent = "";
        //reset to 2
        numberofguesses = 2;
        lock = false;
        display.textContent = "";
      }
    }
  };
  //player guesses
  guess.onclick = () => {
    //have to enter something to move on
    let input = entry.value;
    if (input.length == 0) {
      alert("you need to enter a guess");
      return;
    } // player given points, cell no longer playable
    if (input == answer) {
      if (whosTurn == "Player 1") {
        score1 += points;
        playerOneScore.textContent = `Player One Score: ${score1}`;
        cell.textContent = "";
        entry.value = "";
        cell.setAttribute("class", "not_playable");
        lock = false;
        display.textContent = "";
      } else {
        score2 += points;
        playerTwoScore.textContent = `Player Two Score: ${score2}`;
        cell.textContent = "";
        entry.value = "";
        cell.setAttribute("class", "not_playable");
        lock = false;
        display.textContent = "";
      }
    }
    //wrong answer
    else if (input != answer) {
      //deducts points, switches turns and prompts it, deducts a guess
      if (whosTurn == "Player 1" && numberofguesses > 0) {
        score1 -= points;
        playerOneScore.textContent = `Player One Score: ${score1}`;
        whosTurn = "Player 2";
        turn.textContent = `${whosTurn}, it's your turn.`;
        entry.value = "";
        numberofguesses -= 1;
      } else if (whosTurn == "Player 2" && numberofguesses > 0) {
        score2 -= points;
        playerTwoScore.textContent = `Player Two Score: ${score2}`;
        whosTurn = "Player 1";
        turn.textContent = `${whosTurn}, it's your turn.`;
        entry.value = "";
        numberofguesses -= 1;
      } //out of guesses, time to shut down that cell and move on
      if (numberofguesses == 0) {
        cell.setAttribute("class", "not_playable");
        cell.textContent = "";
        //reset to 2
        numberofguesses = 2;
        lock = false;
        display.textContent = "";
      }
    }
  };

  playCount--;
  //unlock next round button
  if (playCount == 0) {
    nextRound.disabled = false;
  }
}

//Very specific to this program, next round is either round 2, or final jeopardy
nextRound.onclick = () => {
  let A = `./round-2.html?round=2&player1score=${score1}&player2score=${score2}&player=${whosTurn}`;

  if (round == 2) {
    A = `./final-jeopardy.html?round=2&player1score=${score1}&player2score=${score2}&player=${whosTurn}`;
  }
  window.location.href = A;
};

//Change heading to indicate which player's turn it is
function playerTurn() {
  turn.textContent = `${whosTurn}, it's your turn.`;
  guess.disabled = true;
  pass.disabled = true;
  nextRound.disabled = true;
}

//make sure it's not the final round, run the functions
if (round == "final") {
  turn.textContent = whosTurn;
} else {
  playerTurn();
  addTable();
}
