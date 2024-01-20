// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

//html selectors
let turn = document.querySelector(".player_turn");
let guessPass = document.querySelector(".guess_pass");
let entry = document.querySelector(".entry");
let guess = document.querySelector(".guess");
let pass = document.querySelector(".pass");
let nextRound = document.querySelector(".next_round");
let playerOneScore = document.querySelector(".player_one_score");
let playerTwoScore = document.querySelector(".player_two_score");

//states
let  whosTurn = "Player 1";
let score1 = 0;
let score2 = 0;
let lock = false;
let playCount = 0;



//create a table
function addTable() {
    let myTableDiv = document.getElementById("myDynamicTable");
  
    let table = document.createElement('TABLE');
    table.border = '1';
  
    let tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    console.log(window.location.pathname);

    for (let i = 0; i < 6; i++) {
      let tr = document.createElement('TR');
      tableBody.appendChild(tr);
      
      for (let j = 0; j < 6; j++) {
        let td = document.createElement('TD');
        let th = document.createElement('TH');
        if (i==0){
          th.appendChild(document.createTextNode(placeholderQuestions[i+j*10].category));
          tr.appendChild(th);
            th.style.backgroundColor = "grey";
          }else{
            let points = i*100;
            playCount++;
        td.appendChild(document.createTextNode(placeholderQuestions[i-1+j*10].category + '\n'+ points));
        td.setAttribute("class", "playable");
        td.setAttribute("id", `cell${i}${j}`);

        document.body.style = "white-space: pre";
        tr.appendChild(td);
        td.addEventListener("click", ()=>{
          if(td.className == "playable" && lock==false  && playCount > 29 && score1 < 15000 && score2 < 15000){
          cellClick(points, td, placeholderQuestions[i-1+j*10].question, placeholderQuestions[i-1+j*10].answer);
          console.log(`play count is ${playCount}`);
          } else if (lock ==true) {
            alert("You must finish the current question. Take a guess, or pass to the next player.");

          } else {
            nextRound.disabled = false;
            alert("Click Next Round for Round 2.");
            localStorage.setItem("Round","2");
          }
        })
      }
    }
  }
  myTableDiv.appendChild(table);
}

  function cellClick(points, cell, question, answer) {
      console.log("insideCellClick", points, cell, question, answer);
      if (lock == false){
      cell.textContent = question;
      cell.backgroundColor = "blue";
      lock = true;
       }
      //  else{
      //   alert("You must finish the current question. Take a guess, or pass to the next player.");
      // }
      guess.disabled = false;
      pass.disabled = false;
      
      
      let numberofguesses = 2;
      //player passes
      pass.onclick = () => {
        
        if(whosTurn == "Player 1"  && numberofguesses>0){
          whosTurn = "Player 2";
          turn.textContent = whosTurn;
          numberofguesses -= 1;
          if (numberofguesses == 0){
            console.log("GUESS ARE DONE!!!!");
            cell.setAttribute("class", "not_playable"); 
            cell.textContent = "";
            console.log(cell);
            //reset to 2
            numberofguesses = 2;
            lock = false;
            playCount--;
            if(playCount == 0){
              nextRound.disabled = false;
              alert("Click Next Round for Round 2.");
            };
            
          }
          
        }
        else if(whosTurn == "Player 2"  && numberofguesses>0){
          whosTurn = "Player 1";
          turn.textContent = whosTurn;
          numberofguesses -= 1;
          if (numberofguesses == 0){
            console.log("GUESS ARE DONE!!!!");
            cell.setAttribute("class", "not_playable"); 
            cell.textContent = "";
            console.log(cell);
            //reset to 2
            numberofguesses = 2;
            lock = false;
            playCount--;
            if(playCount == 0){
              nextRound.disabled = false;
              alert("Click Next Round for Round 2.");
            };
            
          }
        }
      };
      //player guesses
      guess.onclick =  ()=>
      {//correct answer
        let input = entry.value;
        console.log(input.length);
        if (input.length == 0){
          alert("you need to enter a guess");
          return;
        }
        if(input == answer) {
          console.log("line89?", answer, input);
          if(whosTurn == "Player 1"){
            score1 += points;
            playerOneScore.textContent = `Player One Score: ${score1}`;
            cell.textContent = "";
            entry.value="";
            cell.setAttribute("class", "not_playable");
            console.log(answer);
            lock = false;
            playCount--;
            if(playCount == 0){
              nextRound.disabled = false;
              alert("Click Next Round for Round 2.");
            };
          } 
          else {
            score2 += points;
            playerTwoScore.textContent = `Player Two Score: ${score2}`;
            cell.textContent = "";
            entry.value="";
            cell.setAttribute("class", "not_playable"); 
            console.log(answer);
            lock = false;
            playCount--;
            if(playCount == 0){
              nextRound.disabled = false;
              alert("Click Next Round for Round 2.");
            };
          }
        }  
        //wrong answer
        else if (input != answer)
        { 
          if(whosTurn == "Player 1" && numberofguesses>0){
            score1 -= points;
            playerOneScore.textContent = `Player One Score: ${score1}`;
            whosTurn = "Player 2";
            entry.value="";
            numberofguesses -= 1;
            console.log(numberofguesses);
            console.log(answer);
            
          } else if (whosTurn == "Player 2" && numberofguesses>0) {
            score2 -= points;
            playerTwoScore.textContent = `Player Two Score: ${score2}`;
            whosTurn = "Player 1";
            entry.value="";
            numberofguesses -= 1;
            console.log(numberofguesses);
            console.log("player 2 wrong answer");
            console.log(answer);
            
          }
          if (numberofguesses == 0){
            console.log("GUESS ARE DONE!!!!");
            cell.setAttribute("class", "not_playable"); 
            cell.textContent = "";
            console.log(cell);
            //reset to 2
            numberofguesses = 2;
            lock = false;
            playCount--;
            if(playCount == 0){
              nextRound.disabled = false;
              alert("Click Next Round for Round 2.");
            };
            
          }
        }            
        
      }
      
      
  }

  //questionActive state=true
  
  //Change heading to indicate which player's turn it is
function playerTurn() {
    turn.textContent = whosTurn;
    guess.disabled = true;
    pass.disabled = true;
    nextRound.disabled = true;

}

playerTurn();
addTable();