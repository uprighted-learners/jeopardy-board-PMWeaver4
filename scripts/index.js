// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });


let turn = document.querySelector(".player_turn");
let guessPass = document.querySelector(".guess_pass");
let guess = document.querySelector(".guess");
let pass = document.querySelector(".pass");
let nextRound = document.querySelector(".next_round");

function addTable() {
    var myTableDiv = document.getElementById("myDynamicTable");
  
    var table = document.createElement('TABLE');
    table.border = '1';
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
  
    for (var i = 0; i < 6; i++) {
      var tr = document.createElement('TR');
      tableBody.appendChild(tr);
  
      for (var j = 0; j < 6; j++) {
        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(placeholderQuestions[i+j].category));
        tr.appendChild(td);
      }
    }
    myTableDiv.appendChild(table);
  }
  

//Change heading to indicate which player's turn it is
const whosTurn = "Player 1";
function playerTurn() {
    turn.textContent = whosTurn;
    guess.disabled = true;
    pass.disabled = true;
    nextRound.disabled = true;

}

playerTurn();
addTable();