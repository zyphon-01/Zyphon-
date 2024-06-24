//korat 7amrin safrin 
const allCells = document.querySelectorAll('.kgtuvxd:not(.row-top)');
const topCells = document.querySelectorAll('.kgtuvxd.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.statuus');

// columns
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];


// variables
let gameIsLive = true;
let blueIsNext = true;


// Functions
const getClassListArray = (kgtuvxd) => {
  const classList = kgtuvxd.classList;
  return [...classList];
};

const getCellLocation = (kgtuvxd) => {
  const classList = getClassListArray(kgtuvxd);

  const rowClass = classList.find(className => className.includes('row'));
  const colClass = classList.find(className => className.includes('col'));
  const rowIndex = rowClass[4];
  const colIndex = colClass[4];
  const rowNumber = parseInt(rowIndex, 10);
  const colNumber = parseInt(colIndex, 10);

  return [rowNumber, colNumber];
};

const getFirstOpenCellForColumn = (colIndex) => {
  const column = columns[colIndex];
  const columnWithoutTop = column.slice(0, 6);

  for (const kgtuvxd of columnWithoutTop) {
    const classList = getClassListArray(kgtuvxd);
    if (!classList.includes('blue') && !classList.includes('red')) {
      return kgtuvxd;
    }
  }

  return null;
};

const clearColorFromTop = (colIndex) => {
  const topCell = topCells[colIndex];
  topCell.classList.remove('blue');
  topCell.classList.remove('red');
};

const getColorOfCell = (kgtuvxd) => {
  const classList = getClassListArray(kgtuvxd);
  if (classList.includes('blue')) return 'blue';
  if (classList.includes('red')) return 'red';
  return null;
};

const checkWinningCells = (cells) => {
  if (cells.length < 4) return false;

  gameIsLive = false;
  for (const kgtuvxd of cells) {
    kgtuvxd.classList.add('win');
  }
  statusSpan.textContent = `${blueIsNext ? 'yellow' : 'Red'} has won!`
  return true;
};

const checkStatusOfGame = (kgtuvxd) => {
  const color = getColorOfCell(kgtuvxd);
  if (!color) return;
  const [rowIndex, colIndex] = getCellLocation(kgtuvxd);

  // Check horizontally
  let winningCells = [kgtuvxd];
  let rowToCheck = rowIndex;
  let colToCheck = colIndex - 1;
  while (colToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      colToCheck--;
    } else {
      break;
    }
  }
  colToCheck = colIndex + 1;
  while (colToCheck <= 6) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      colToCheck++;
    } else {
      break;
    }
  }
  let isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;


  // Check vertically
  winningCells = [kgtuvxd];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex;
  while (rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex + 1;
  while (rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;


  // Check diagonally /
  winningCells = [kgtuvxd];
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
      colToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 6 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
      colToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;


  // Check diagonally \
  winningCells = [kgtuvxd];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck--;
      colToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 6 && rowToCheck <= 5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck);
      rowToCheck++;
      colToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;

  // Check to see if we have a tie
  const rowsWithoutTop = rows.slice(0, 6);
  for (const row of rowsWithoutTop) {
    for (const kgtuvxd of row) {
      const classList = getClassListArray(kgtuvxd);
      if (!classList.includes('blue') && !classList.includes('red')) {
        return;
      }
    }
  }

  gameIsLive = false;
  statusSpan.textContent = "Game is a tie!";
};



// Event Handlers
const handleCellMouseOver = (e) => {
  if (!gameIsLive) return;
  const kgtuvxd = e.target;
  const [rowIndex, colIndex] = getCellLocation(kgtuvxd);

  const topCell = topCells[colIndex];
  topCell.classList.add(blueIsNext ? 'blue' : 'red');
};

const handleCellMouseOut = (e) => {
  const kgtuvxd = e.target;
  const [rowIndex, colIndex] = getCellLocation(kgtuvxd);
  clearColorFromTop(colIndex);
};

const handleCellClick = (e) => {
  if (!gameIsLive) return;
  const kgtuvxd = e.target;
  const [rowIndex, colIndex] = getCellLocation(kgtuvxd);

  const openCell = getFirstOpenCellForColumn(colIndex);

  if (!openCell) return;

  openCell.classList.add(blueIsNext ? 'blue' : 'red');
  checkStatusOfGame(openCell);

  blueIsNext = !blueIsNext;
  clearColorFromTop(colIndex);
  if (gameIsLive) {
    const topCell = topCells[colIndex];
    topCell.classList.add(blueIsNext ? 'blue' : 'red');
  }
};




// Adding Event Listeners
for (const row of rows) {
  for (const kgtuvxd of row) {
    kgtuvxd.addEventListener('mouseover', handleCellMouseOver);
    kgtuvxd.addEventListener('mouseout', handleCellMouseOut);
    kgtuvxd.addEventListener('click', handleCellClick);
  }
}

resetButton.addEventListener('click', () => {
  for (const row of rows) {
    for (const kgtuvxd of row) {
      kgtuvxd.classList.remove('red');
      kgtuvxd.classList.remove('blue');
      kgtuvxd.classList.remove('win');
    }
  }
  gameIsLive = true;
  blueIsNext = true;
  statusSpan.textContent = '';
});
//game dice
// Player name 
var playerr1 = "Playerr 1"; 
var playerr2 = "Playerr 2"; 
  
// Function to change the player name 
function editNames() { 
player1 = prompt("Change Playerr1 name"); 
player2 = prompt("Change playerr2 name"); 
  
document.getElementById("name1").innerHTML = player1; 
document.getElementById("name2").innerHTML = player2; 
} 
  
var myimages=new Array()
//specify random images below. You can have as many as you wish
myimages[1]="https://media.geeksforgeeks.org/wp-content/uploads/20200508141000/dice1.png"
myimages[2]="https://media.geeksforgeeks.org/wp-content/uploads/20200508141001/dice2.png"
myimages[3]="https://media.geeksforgeeks.org/wp-content/uploads/20200508141003/dice3.png"
myimages[4]="https://media.geeksforgeeks.org/wp-content/uploads/20200508141004/dice4.png"
myimages[5]="https://media.geeksforgeeks.org/wp-content/uploads/20200508141005/dice5.png"
myimages[6]="https://media.geeksforgeeks.org/wp-content/uploads/20200508141006/dice6.png"

// Function to roll the dice 
function rollTheDice() { 
setTimeout(function () { 
var randomNumber1 = Math.floor(Math.random() * 6) + 1; 
var randomNumber2 = Math.floor(Math.random() * 6) + 1; 
  
var img1 = myimages[randomNumber1]
var img2 = myimages[randomNumber2]
  
document.querySelector(".img1").setAttribute("src", img1); 
  
document.querySelector(".img2").setAttribute("src", img2); 

  
if (randomNumber1 === randomNumber2) { 
document.querySelector("h1").innerHTML = "Draw!"; 
} 
  
else if (randomNumber1 < randomNumber2) { 
document.querySelector("h1").innerHTML 
= (player2 + " WINS!"); 
} 
  
else { 
document.querySelector("h1").innerHTML 
= (player1 + " WINS!"); 
} 
}, 2500); 
} 

//game kora hmra sfra











//game taype speed
      const quoteSection = document.getElementById("quote");
      const userInput = document.getElementById("quote-input");
      const startTestButton = document.getElementById("start-test");
      const stopTestButton = document.getElementById("stop-test");
      const shownooooooooButton = document.getElementById("show-noooooooo");
      const restartTestButton = document.getElementById("restart-test");
      const pppppppppElement = document.getElementById("ppppppppp");
      const vkElement = document.getElementById("vk");
      const nooooooooElement = document.querySelector(".noooooooo");

      let quote = "";
      let time = 60;
      let ppppppppp;

      const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";

      const renderNewQuote = async () => {
        const response = await fetch(quoteApiUrl);
        const data = await response.json();
        quote = data.content;
        const quoteChars = quote.split("").map(value => `<span class="quote-chars">${value}</span>`).join("");
        quoteSection.innerHTML = quoteChars;
      };

      const updateppppppppp = () => {
        if (time == 0) {
          displaynoooooooo();
        } else {
          pppppppppElement.innerText = --time + "s";
        }
      };

      const pppppppppeduce = () => {
        time = 60;
        ppppppppp = setInterval(updateppppppppp, 1000);
      };

      const displaynoooooooo = () => {
        clearInterval(ppppppppp);
        nooooooooElement.style.display = "block";
        stopTestButton.style.display = "none";
        restartTestButton.style.display = "block";
        userInput.disabled = true;
        let timeTaken = 1;
        if (time != 0) {
          timeTaken = (60 - time) / 100;
        }
        document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
        document.getElementById("loooooo").innerText = Math.round(((userInput.value.length - vk) / userInput.value.length) * 100) + " %";
      };

      const startTest = () => {
        vk = 0;
        ppppppppp = "";
        userInput.disabled = false;
        pppppppppeduce();
        startTestButton.style.display = "none";
        stopTestButton.style.display = "block";
        restartTestButton.style.display = "none";
        nooooooooElement.style.display = "none";
        renderNewQuote();
        };
        
        userInput.addEventListener("input", () => {
          let quoteChars = document.querySelectorAll(".quote-chars");
          quoteChars = Array.from(quoteChars);
          let userInputChars = userInput.value.split("");
          quoteChars.forEach((char, index) => {
            if (char.innerText == userInputChars[index]) {
              char.classList.add("success");
            } else if (userInputChars[index] == null) {
              if (char.classList.contains("success")) {
                char.classList.remove("success");
              } else {
                char.classList.remove("fail");
              }
            } else {
              if (!char.classList.contains("fail")) {
                vk += 1;
                char.classList.add("fail");
              }
              vkElement.innerText = vk;
            }
            let check = quoteChars.every((element) => {
              return element.classList.contains("success");
            });
            if (check) {
              displaynoooooooo();
            }
          });
        });
        
        startTestButton.addEventListener("click", startTest);
        stopTestButton.addEventListener("click", displaynoooooooo);
        shownooooooooButton.addEventListener("click", () => {
          nooooooooElement.style.display = "block";
          shownooooooooButton.style.display = "none";
        });
        restartTestButton.addEventListener("click", () => {
          time = 60;
          pppppppppElement.innerText = "0s";
          vk = 0;
          vkElement.innerText = "0";
          userInput.value = "";
          userInput.disabled = false;
          startTestButton.style.display = "block";
          stopTestButton.style.display = "none";
          shownooooooooButton.style.display = "none";
          restartTestButton.style.display = "none";
          nooooooooElement.style.display = "none";
          renderNewQuote();
        });
//game6
const playBoard = document.querySelector(".vonvo");
const vovovoElement = document.querySelector(".vovovo");
const scorElement = document.querySelector(".high-vovovo");
const voivo = document.querySelectorAll(".voivo i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let vovovo = 0;

// Getting high vovovo from the local storage
let scor = localStorage.getItem("high-vovovo") || 0;
scorElement.innerText = `High : ${scor}`;

const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const kk = () => {
    // Resetting game variables
    gameOver = false;
    snakeX = 5;
    snakeY = 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    vovovo = 0;
    updateFoodPosition();
    vovovoElement.innerText = `score: ${vovovo}`;
}

const handleGameOver = () => {
    // Clearing the timer and displaying a message on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");

    // Resetting the game instead of reloading the page
    kk();

    // Resuming the timer
    setIntervalId = setInterval(initGame, 150);
}

const changeDirection = e => {
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Calling changeDirection on each key click and passing key dataset value as an object
voivo.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
        vovovo++; // increment vovovo by 1
        scor = vovovo >= scor ? vovovo : scor;
        localStorage.setItem("high-vovovo", scor);
        vovovoElement.innerText = `scoore: ${vovovo}`;
        scorElement.innerText = `High : ${scor}`;
    }
    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keyup", changeDirection);







//game5
  let btnRef = document.querySelectorAll(".butonn");
let nonyRef = document.querySelector(".nony");
let newgameBtn = document.getElementById("nejjj");
let retrBtn = document.getElementById("retr");
let msgRef = document.getElementById("megg");
//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable nony
  nonyRef.classList.remove("hdee");
};

//Enable all buttons (For New Game and retr)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable nony
  nonyRef.classList.add("hdee");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> X Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> O Wins";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
retrBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});
//Enable Buttons and disable nony on page load
window.onload = enableButtons;

    //game3
    
   
   
   
   
   
   
    //game 2
 
 
 
 function getDistance(obj1, obj2) {
  return Math.floor(
    Math.sqrt(Math.pow(obj1.cx - obj2.cx, 2) + Math.pow(obj1.cy - obj2.cy, 2))
  );
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function comparator(a, b) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
}

function difference(source, toRemove) {
  return source.filter(function(value) {
    return toRemove.indexOf(value) == -1;
  });
}

////////////////
// global vars
////////////////

var svg = document.getElementById("svg");
var dotMatrix = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
var lineMatrix = document.createElementNS("http://www.w3.org/2000/svg", "line");
var screenW = window.innerWidth;
var screenH = window.innerHeight;
var totalDist = document.getElementById("distance");

////////////////
// line constructor
////////////////

function Line(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.el = document.createElementNS("http://www.w3.org/2000/svg", "line");
  this.class = "line";
  this.update = function(x1, y1, x2, y2) {
    this.el.setAttribute("x1", x1 || this.x1);
    this.el.setAttribute("y1", y1 || this.y1);
    this.el.setAttribute("x2", x2 || this.x2);
    this.el.setAttribute("y2", y2 || this.y2);
    this.setAttr("class", this.class);
  };
  this.setAttr = function(attr, value) {
    this.el.setAttribute(attr, value);
  };
  this.append = function() {
    svg.insertBefore(this.el, svg.firstChild);
  };
}

////////////////
// dot constructor
////////////////

function Dot(r, cx, cy) {
  this.r = r;
  this.cx = cx;
  this.cy = cy;
  this.el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  this.class = "dot";
  this.update = function() {
    this.el.setAttribute("r", this.r);
    this.el.setAttribute("cx", this.cx);
    this.el.setAttribute("cy", this.cy);
    this.setAttr("class", this.class);
  };

  // activates a dot
  this.activate = function() {
    for (i = 0; i < dots.num; i++) {
      dots.list[i].setAttr("data-selected", "false");
    }
    this.setAttr("data-selected", "true");
  };

  this.visited = function() {
    this.setAttr("data-visited", "true");
  };

  // sets attribute to element
  this.setAttr = function(attr, value) {
    this.el.setAttribute(attr, value);
  };

  // gets attribute to element
  this.getAttr = function(attr) {
    return this.el.getAttribute(attr);
  };

  // appends element to svg and attaches event listeners
  this.append = function() {
    svg.appendChild(this.el);
    this.el.addEventListener("click", this.onClick);
  };

  // on click on element
  this.onClick = function(event) {
    //gets the id and the coords of the dot
    var thisId = Number(event.target.getAttribute("data-id").substr(3, 2));
    var thisCx = dots.list[thisId].cx;
    var thisCy = dots.list[thisId].cy;

    // calculates the distance between dots
    var distances = [];
    for (i = 0; i < dots.num; i++) {
      distances[i] = [i, getDistance(dots.selected, dots.list[i])];
    }
    distances.sort(comparator);
    distances.splice(0, 1);
    var distancesLeft = [];
    for (i = 0; i < distances.length; i++) {
      if (dots.left.includes(distances[i][0])) {
        distancesLeft.push(distances[i][0]);
      }
    }

    //if the element is the nearest
    if (thisId == distancesLeft[0] && dots.left.includes(thisId)) {
      // calculates distances
      var newDistance = getDistance(dots.list[thisId], dots.selected);

      app.score.update(1); // punteggio x numero di poi
      // app.score.update(newDistance); punteggio x distanza

      //sets the active class to the selected dot
      dots.list[thisId].activate();
      dots.list[thisId].visited();

      // creates the line
      lines.list.push(
        new Line(
          dots.selected.cx,
          dots.selected.cy,
          dots.list[thisId].cx,
          dots.list[thisId].cy
        )
      );
      lines.list[lines.list.length - 1].update();
      lines.list[lines.list.length - 1].append();

      // creates the preview line
      //TODO: eliminare le vecchie preline che rimangono vive

      svg.addEventListener("mousemove", function prelineMove(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        app.preline.update(thisCx, thisCy, mouseX, mouseY);
      });

      //saves the selected dots coordinates
      dots.selected.id = thisId;
      dots.selected.cx = thisCx;
      dots.selected.cy = thisCy;

      //removes the dot from the list of remaining dots
      for (i = 0; i < dots.left.length; i++) {
        if (dots.left[i] === thisId) {
          dots.left.splice(i, 1);
        }
      }

      if (dots.left.length == 0) {
        app.end(true);
      }
    } else {
      app.end(false);
    }
  };
}

////////////////
// lines group
////////////////

var lines = {
  list: []
};

////////////////
// dots group
////////////////

var dots = {};
dots.num = 20;
dots.list = [];
dots.start = 0;
dots.selected = {};
dots.selected.id = dots.start;
dots.left = [];
dots.preline;

////////////////
// app
////////////////

var app = {};

app.level = 4;

app.score = {};
app.score.number = 0;
app.score.el = document.getElementById("score");
app.score.update = function(score) {
  app.score.number += score;
  app.score.el.textContent = app.score.number;
};

app.score.reset = function() {
  app.score.number = 0;
  app.score.update(0);
};

app.results = function(points) {
  if (points == "reset") {
    sessionStorage.setItem("results", 0);
  } else {
    if (!sessionStorage.getItem("results")) {
      sessionStorage.setItem("results", points);
    } else {
      var newscore = parseInt(sessionStorage.getItem("results")) + points;
      sessionStorage.setItem("results", newscore);
    }
  }
};

app.launchScreen = function(lastScore, title, description, btnText) {
  app.launchScreen.el = document.getElementById("launch-screen");
  app.launchScreen.el.setAttribute("class", "is-visible");

  var launchScreenTitle = document.getElementById("launch-screen__title");
  launchScreenTitle.textContent = title;

  var launchScreenDescription = document.getElementById(
    "launch-screen__description"
  );
  launchScreenDescription.textContent = description;

  app.launchScreen.btn = document.getElementById("start-btn");
  app.launchScreen.btn.textContent = btnText;

  app.launchScreen.btn.addEventListener("click", function lauch() {
    app.launchScreen.el.setAttribute("class", "");
    app.start(app.level);
    app.launchScreen.btn.removeEventListener("click", lauch);
  });
};

app.preline = new Line(0, 0, 200, 200);
app.preline.setAttr("id", "preline");

app.start = function(dotsNum) {
  dots.num = dotsNum;

  for (i = 0; i < dots.num; i++) {
    var cx = getRandomArbitrary(10, screenW - 10);
    var cy = getRandomArbitrary(10, screenH - 10);

    dots.list[i] = new Dot(8, cx, cy);
    dots.list[i].setAttr("data-id", "id-" + i);
    dots.list[i].setAttr(
      "style", 
      "animation-delay:" + i / 10 + "s; transform-origin: " + cx + 'px ' + cy + 'px;');
    dots.list[i].update();
    dots.list[i].append();
    dots.left.push(i);

    if (i == dots.start) {
      dots.selected.cx = dots.list[dots.start].cx;
      dots.selected.cy = dots.list[dots.start].cy;
      dots.list[dots.start].setAttr("class", "dot dot--starting");
      dots.left.splice(i, 1);
    }

    // adds the preline

    app.preline.update(
      dots.selected.cx,
      dots.selected.cy,
      dots.selected.cx,
      dots.selected.cy
    );
    app.preline.append();

    svg.addEventListener("mousemove", function prelineMove(e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
      app.preline.update(dots.selected.cx, dots.selected.cy, mouseX, mouseY);
    });
  }

  // sets starting point
  dots.list[dots.start].setAttr("data-selected", "true");
};

app.end = function(win) {
  if (win) {
    app.level += 4;
    app.results(app.score.number);
  } else {
    app.level = 4;
  }

  dots.list = [];
  dots.selected = {};
  dots.left.length = 0;
  svg.innerHTML = "";

  if (win) {
    app.launchScreen(
      app.score.number,
      "Well done!",
      "Your score is: " + sessionStorage.getItem("results") + ' The next level will be harder.',
      "PLAY NEXT LEVEL"
    );
  } else {
    app.launchScreen(
      0,
      "Game over!",
      "Your final score is: " + sessionStorage.getItem("results"),
      "PLAY AGAIN"
    );
    app.results("reset");
    app.score.reset();
  }
};

app.launchScreen(
  0,
  "Path finder",
  "Find the nearest yellow dot.",
  "PLAY"
);
////// GAMEBOARD SETUP CODE ///////







 
 
 
 
 
 
 //game1

// initial card image
var initCard = "https://i.imgur.com/IiwRxCo.jpg";

//add class to table datas: "gameCard"
$('#gameBoard').find('td').addClass("gameCard");

//add flip div html to table datas
$('.gameCard').html('<div class="flip-container"><div class="flipper"><div class="card-front"></div><div class="card-back"></div></div></div>');

//save audio location
var composerAudio = document.getElementById("composerAudio");

// declare variables
var turn = 1;
var playerTotalTurns = 0;
var firstCardLoc = 0;
var secondCardLoc = 0;
var firstCardName = "";
var secondCardName = "";
var firstCardObj = {};
var secondCardObj = {};
var cardsFound = 0;
var win = false;

function initializeGameVariables() {
  turn = 1;
  playerTotalTurns = 0;
  firstCardLoc = 0;
  secondCardLoc = 0;
  firstCardName = "";
  secondCardName = "";
  firstCardObj = {};
  secondCardObj = {};
  cardsFound = 0;
  win = false;
}

// for card hide timing and force user to wait
var timeoutID;
var waitForGame = false;

function waitForGameFalse() {
  waitForGame = false;
}

// 18 pairs of cards to be used on the board
var memoryCardDeck= [
  {
    cardImg: 'https://i.imgur.com/QCrrHXrs.jpg',
    cardName: 'Pyotr Ilyich Tchaikovsky',
    cardWiki: 'http://en.wikipedia.org/wiki/Pyotr_Ilyich_Tchaikovsky',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/2/2d/Tchaikovsky%2C_Pyotr_Ilyich_-_Twelve_Pieces_for_piano%2C_Opus_40_%28extract%29.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/QCrrHXrs.jpg',
    cardName: 'Pyotr Ilyich Tchaikovsky',
    cardWiki: 'http://en.wikipedia.org/wiki/Pyotr_Ilyich_Tchaikovsky',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/2/2d/Tchaikovsky%2C_Pyotr_Ilyich_-_Twelve_Pieces_for_piano%2C_Opus_40_%28extract%29.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/exw1xths.jpg',
    cardName: 'Edward Elgar',
    cardWiki: 'http://en.wikipedia.org/wiki/Edward_Elgar',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/e4/Pomp_and_circumstances_No._1.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/exw1xths.jpg',
    cardName: 'Edward Elgar',
    cardWiki: 'http://en.wikipedia.org/wiki/Edward_Elgar',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/e4/Pomp_and_circumstances_No._1.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/WIuaMjjs.jpg',
    cardName: 'Johannes Brahms',
    cardWiki: 'http://en.wikipedia.org/wiki/Johannes_Brahms',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/75/Brahms-waltz01.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/WIuaMjjs.jpg',
    cardName: 'Johannes Brahms',
    cardWiki: 'http://en.wikipedia.org/wiki/Johannes_Brahms',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/75/Brahms-waltz01.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/URAu3s3s.jpg',
    cardName: 'Richard Wagner',
    cardWiki: 'http://en.wikipedia.org/wiki/Richard_Wagner',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/73/Richard_Wagner_-_Tristan_und_Isolde_-_Vorspiel.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/URAu3s3s.jpg',
    cardName: 'Richard Wagner',
    cardWiki: 'http://en.wikipedia.org/wiki/Richard_Wagner',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/73/Richard_Wagner_-_Tristan_und_Isolde_-_Vorspiel.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/Fj971cJs.jpg',
    cardName: 'Giuseppe Verdi',
    cardWiki: 'http://en.wikipedia.org/wiki/Giuseppe_Verdi',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/5/5a/La_Donna_E_Mobile_Rigoletto.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/Fj971cJs.jpg',
    cardName: 'Giuseppe Verdi',
    cardWiki: 'http://en.wikipedia.org/wiki/Giuseppe_Verdi',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/5/5a/La_Donna_E_Mobile_Rigoletto.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/HqAl3Tos.jpg',
    cardName: 'Wolfgang Amadeus Mozart',
    cardWiki: 'http://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/9/99/Wolfgang_Amadeus_Mozart_-_Symphony_40_g-moll_-_1._Molto_allegro.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/HqAl3Tos.jpg',
    cardName: 'Wolfgang Amadeus Mozart',
    cardWiki: 'http://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/9/99/Wolfgang_Amadeus_Mozart_-_Symphony_40_g-moll_-_1._Molto_allegro.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/mqC1jxJs.jpg',
    cardName: 'Frédéric Chopin',
    cardWiki: 'http://en.wikipedia.org/wiki/Fr%C3%A9d%C3%A9ric_Chopin',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Chopin_Prelude_Op_28_N_15_Giorgi_Latsabidze_performs.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/mqC1jxJs.jpg',
    cardName: 'Frédéric Chopin',
    cardWiki: 'http://en.wikipedia.org/wiki/Fr%C3%A9d%C3%A9ric_Chopin',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Chopin_Prelude_Op_28_N_15_Giorgi_Latsabidze_performs.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/HJ5CD92s.jpg',
    cardName: 'Ludwig van Beethoven',
    cardWiki: 'http://en.wikipedia.org/wiki/Ludwig_van_Beethoven',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/HJ5CD92s.jpg',
    cardName: 'Ludwig van Beethoven',
    cardWiki: 'http://en.wikipedia.org/wiki/Ludwig_van_Beethoven',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/CPGPMK6s.jpg',
    cardName: 'Claudio Monteverdi',
    cardWiki: 'http://en.wikipedia.org/wiki/Claudio_Monteverdi',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/3/3d/Orfeo_-_Toccata.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/CPGPMK6s.jpg',
    cardName: 'Claudio Monteverdi',
    cardWiki: 'http://en.wikipedia.org/wiki/Claudio_Monteverdi',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/3/3d/Orfeo_-_Toccata.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/iKNMyf2s.jpg',
    cardName: 'Joseph Haydn',
    cardWiki: 'http://en.wikipedia.org/wiki/Joseph_Haydn',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/1/12/The_Clock.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/iKNMyf2s.jpg',
    cardName: 'Joseph Haydn',
    cardWiki: 'http://en.wikipedia.org/wiki/Joseph_Haydn',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/1/12/The_Clock.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/UjcGnLMs.jpg',
    cardName: 'George Frideric Handel',
    cardWiki: 'http://en.wikipedia.org/wiki/George_Frideric_Handel',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/c/ce/Handel_-_messiah_-_44_hallelujah.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/UjcGnLMs.jpg',
    cardName: 'George Frideric Handel',
    cardWiki: 'http://en.wikipedia.org/wiki/George_Frideric_Handel',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/c/ce/Handel_-_messiah_-_44_hallelujah.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/ZLzrqGes.jpg',
    cardName: 'Antonín Dvořák',
    cardWiki: 'http://en.wikipedia.org/wiki/Anton%C3%ADn_Dvo%C5%99%C3%A1k',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/0/01/Dvo%C5%99%C3%A1k_-_Romance_Op._75_No._2.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/ZLzrqGes.jpg',
    cardName: 'Antonín Dvořák',
    cardWiki: 'http://en.wikipedia.org/wiki/Anton%C3%ADn_Dvo%C5%99%C3%A1k',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/0/01/Dvo%C5%99%C3%A1k_-_Romance_Op._75_No._2.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/J5qT07vs.jpg',
    cardName: 'Johann Sebastian Bach',
    cardWiki: 'http://en.wikipedia.org/wiki/Johann_Sebastian_Bach',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d6/Brandenburg_No4-1_BWV1049.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/J5qT07vs.jpg',
    cardName: 'Johann Sebastian Bach',
    cardWiki: 'http://en.wikipedia.org/wiki/Johann_Sebastian_Bach',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d6/Brandenburg_No4-1_BWV1049.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/5IXhtyes.jpg',
    cardName: 'Sergei Rachmaninoff',
    cardWiki: 'http://en.wikipedia.org/wiki/Sergei_Rachmaninoff',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/en/2/2c/Rachmaninoff_-_Vocalise_transcribed_for_Violin_and_Piano.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/5IXhtyes.jpg',
    cardName: 'Sergei Rachmaninoff',
    cardWiki: 'http://en.wikipedia.org/wiki/Sergei_Rachmaninoff',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/en/2/2c/Rachmaninoff_-_Vocalise_transcribed_for_Violin_and_Piano.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/NBQHe2ws.jpg',
    cardName: 'Gustav Mahler',
    cardWiki: 'http://en.wikipedia.org/wiki/Gustav_Mahler',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Mahler_Symphony_No_6_Andante_Moderato.ogg'
  },
  {
    cardImg: 'https://i.imgur.com/NBQHe2ws.jpg',
    cardName: 'Gustav Mahler',
    cardWiki: 'http://en.wikipedia.org/wiki/Gustav_Mahler',
    cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Mahler_Symphony_No_6_Andante_Moderato.ogg'
  }
];

var cardsInDeck = memoryCardDeck.length; //length for loops

function addMemDeckParams () {
  var cardTypeCounter = 1;
  for (i = 0; i < cardsInDeck; i++) {
    memoryCardDeck[i].cardWiki += "?printable=yes";
    memoryCardDeck[i].cardLoc = 0;
    memoryCardDeck[i].cardType = cardTypeCounter;
    if ( (i + 2) % 2 !== 0 ) {
      cardTypeCounter++;
    }
  }
}
addMemDeckParams();

//console.log(memoryCardDeck);

//set param cardFound to false
function setCardFoundFalse () {
  for (i = 0; i < cardsInDeck; i++) {
    memoryCardDeck[i].cardFound = false;
  }
}

/////// GAME START CODE ///////

//shuffle array method added to Array prototype
//shuffle with myArrayHere.shuffle();
Array.prototype.shuffle = function (){
    var i = this.length, j, temp;
    if ( i === 0 ) return;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
};

// set card locations in object array, set data-card in html, set IDs of flipping divs
function setCardData() {
  var cardID = "";
  for(i = 0; i < cardsInDeck; i++) { //setting card locations here..
    cardID = "#card" + (i + 1);
    memoryCardDeck[i].cardLoc = (i + 1); //setting card location
    $(cardID).data("card", (i + 1)); //setting html "data-card" here..
    $(cardID).find('.card-front').attr('id', "cardFront" + (i + 1)); //setting flipping div IDs here..
    $(cardID).find('.card-back').attr('id', "cardBack" + (i + 1));
  }
}

//set question mark image card fronts
function setCardImagesFront() {
  $('.card-front').css("background-image", "url(" + initCard + ")");
}
setCardImagesFront();

function setCardImagesBack() {
  var cardFrontID = "";
  var cardImage = "";
  for(i = 0; i < cardsInDeck; i++) {
    cardFrontID = "#cardBack" + (i + 1);
    cardImage = memoryCardDeck[i].cardImg;
    $(cardFrontID).css("background-image", "url(" + cardImage + ")");
  }
}

function showAllCards () {
  $('.flip-container').addClass('flip');
}

function hideAllCards() {
  $('.flip-container').removeClass('flip');
}

function initHeaderInfo () {
  $('#gameEndOverlay').addClass('hide');
  $('#restartWrapper').removeClass('hide');
  $('#composerHeaderHider').removeClass("hide");
  $('#gameStartOverlay').addClass('hide');
  $('#composerHeaderSubhead').html("&nbsp;");
  $('#composerName').html("Find the Composers!");
  $('#learnMoreWrapper').addClass("hide");
  $('#turnCounterWrapper').removeClass("hide");
  $('#turnCounter').html("turn: " + (playerTotalTurns + 1) );
}

///////////// main game start function ///////////////
function newGame() {
  waitForGame = true;
  
  memoryCardDeck.shuffle(); //shuffle deck
  
  initializeGameVariables(); //initialize variables
  
  initHeaderInfo(); // set header info
  
  setCardData(); //set card data
  
  setCardFoundFalse(); //initialize "cardFound" boolean parameter
  
  hideAllCards(); //hide cards
  
  timeoutID = window.setTimeout(setCardImagesBack, 200); //initialize card images (wait till cards hidden)
  setCardImagesFront();
  
  timeoutID = window.setTimeout(showAllCards, 500); //show all cards, then hide
  timeoutID = window.setTimeout(hideAllCards, 1500);
  timeoutID = window.setTimeout(waitForGameFalse, 1510);
}


////// GAME PLAY CODE ///////

// turn function
function nextTurn() {
  if (turn === 1) {
    turn = 2;
  }
  else if (turn === 2) {
    turn = 1;
  }
}

//display card image
function showHideCardImage (cardObj, showOrHide) {
  var cardID = "#card" + cardObj.cardLoc;
  var cardImage = cardObj.cardImg;
  if (showOrHide === "show"){
    $(cardID).find('.flip-container').addClass('flip');
  }
  else if (showOrHide === "hide") {
    $(cardID).find('.flip-container').removeClass('flip');
  }
}

//hide cards after wrong guess
function hideWrongCards(firstCardObject, secondCardObject) {
  showHideCardImage (firstCardObject, "hide");
  showHideCardImage (secondCardObject, "hide");
}

function hideCards () {
  hideWrongCards(firstCardObj, secondCardObj);
}

//show composer info after correct guess
function showComposerHeaderInfo () {
  $('#composerHeaderHider').removeClass("hide");
  $('#composerHeaderSubhead').html("you found...");
  $('#composerName').html(memoryCardDeck[secondCardLoc - 1].cardName);
  $('#learnMoreWrapper').removeClass("hide");
}

//preload "learn more" info
function preloadComposerInfo () {
  $('#composerNameInfo').html(secondCardObj.cardName);
  $('#composerAudio').attr('src', secondCardObj.cardAudio);
  $('#composerIframe').attr('src', secondCardObj.cardWiki);
}

//learn more button function
function showComposerOverlayInfo () {
  $('#composerHeaderHider').addClass("hide");
  $('#composerInfoOverlay').removeClass("hide");
  $('#restartWrapper').addClass('hide');
  composerAudio.play(); //autoplay audio
}

//close composer info
function closeComposerInfo () {
  $('#composerInfoOverlay').addClass('hide');
  $('#composerHeaderHider').removeClass("hide");
  $('#restartWrapper').removeClass('hide');
  composerAudio.pause(); //stop audio
  composerAudio.currentTime = 0;
}

//check match
function checkCardMatch (cardObj) {
  if (turn === 1) {
    firstCardLoc = $(cardObj).data('card');
    firstCardName = memoryCardDeck[firstCardLoc - 1].cardName;
    
    //save first card as object
    firstCardObj = memoryCardDeck[firstCardLoc - 1];
    
    //show first card...
    showHideCardImage(firstCardObj, "show");
    console.log("First Card Selection: " + firstCardName + "(" + firstCardLoc + ")");
    
    nextTurn();
    console.log("Turn: " + turn);
  }
  
  else if (turn === 2) {
    secondCardLoc = $(cardObj).data('card');
    secondCardName = memoryCardDeck[secondCardLoc - 1].cardName;
    
    //save second card as object
    secondCardObj = memoryCardDeck[secondCardLoc - 1];
    
    //show second card...
    showHideCardImage(secondCardObj, "show");
    console.log("Second Card Selection: " + secondCardName + "(" + secondCardLoc + ")");
    
    //probably don't need this "cardFound" check...
    if (memoryCardDeck[firstCardLoc - 1].cardFound === true || 
       memoryCardDeck[secondCardLoc - 1].cardFound === true ) {
       console.log("One or both of these cards has already been found..");
    }
    
    else if (firstCardLoc === secondCardLoc) {
      console.log("You picked the same card, dork!");
    }
    
    else if (firstCardName === secondCardName && firstCardLoc != secondCardLoc) {
      console.log("You Found a Match!");
      
      //show composer info
      showComposerHeaderInfo();
      
      //loads composer info for when "learn more" button is clicked
      preloadComposerInfo();
      
      //set "cardFound" booleans to true
      memoryCardDeck[firstCardLoc - 1].cardFound = true;
      memoryCardDeck[secondCardLoc - 1].cardFound = true;
      
      //add to variable "cardsFound"
      cardsFound += 1;
      console.log("Cards Found: " + cardsFound);
      
      nextTurn();
      //console.log("Turn: " + turn);
    }
    else {
      console.log("Not a Match... Try Again.");
      waitForGame = true;
      timeoutID = window.setTimeout(hideCards, 1000); // hide card images after delay
      timeoutID = window.setTimeout(waitForGameFalse, 1000);
      nextTurn();
      //console.log("Turn: " + turn);
    }
    playerTotalTurns++;
    $('#turnCounter').html("turn: " + (playerTotalTurns + 1) );
  }
}

function checkWin() {
  if((cardsFound * 2) != cardsInDeck){
    return;
  }
  else {
    for (i=0;i<10;i++){
      console.log("You've cleared the game!!!");
    }
    $('#gameEndOverlay').removeClass("hide");
    $('#composerHeaderHider').addClass("hide");
    //tell how many turns to complete game..
    $('#endGameTurnMessage').html("Completed in " + playerTotalTurns + " turns!");
    $('#turnCounterWrapper').addClass("hide");
  }
}

//evaluate the turn on card click
$('.gameCard').click(function () {
  if (waitForGame === true) {
    console.log("You need to WAIT!");
  }
  else {
    var cardObj = this;
    var cardLocation = $(cardObj).data('card');
    var currentCardObj = memoryCardDeck[cardLocation -1];

    if (currentCardObj.cardFound === true) {
      console.log("Card already found!");
      console.log("Turn: " + turn);
    }
    else {
      checkCardMatch(cardObj);
    }
  }
  checkWin();
});
//card doubel
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    
//game4
((document) => {
  // parts of the game bond
  let moves = document.querySelector('.moves')
  // ?
  let bond = document.querySelector('#bond')
  let coloo = document.querySelector('#coloo')
  let gameover = document.querySelector('#overg')

  // control variables 
  let colorArray = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj']

  let running = false

  let cell = '-x'
  let skill = 6
  let tally = 0
  let cap = 20
  let color

  //  game play methods
  // ----------------------------
  let shuffle = (collection) => {
    for (let i = collection.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [collection[i - 1], collection[j]] = [collection[j], collection[i - 1]]
    }
    return collection
  }

  let setcoloo = (collection, n) => {
    return n < 10 ? shuffle(collection).slice(0, n) : collection
  }

  let checkWin = (moves) => {
    let n = 0
    let msg = ''
    if (moves <= cap) {
      if (bond.childNodes[99].className.indexOf(cell) > -1) {
        for (var i = 0; i < 100; i++) {
          if (bond.childNodes[i].className.indexOf(cell) > -1) {
            n++
          }
        }
      }

      if (n === 100) {
        msg = '<span class="newf">You Win!</span>'
        running = false
      } else if (n < 100 && moves >= cap) {
        msg = '<span class="newf">Oops! Try Again...</span>'
        running = false
      }
    }
    if(!running) {
      gameover.innerHTML = msg
    }
  }

  let checkColor = (color) => {
    let tiles = bond.childNodes
    for(var x = 0; x < 100; x++) {
      if(tiles[x].className.indexOf(cell) > -1) {
        tiles[x].className = color + cell
        if (x + 1 < 100 && tiles[x + 1].className === color) {
          tiles[x + 1].className += cell
        }
        if (x + 10 < 100 && tiles[x + 10].className === color) {
          tiles[x + 10].className += cell
        }
        if (x - 1 >= 0 && x % 10 > 0 && tiles[x - 1].className === color) {
          tiles[x - 1].className += cell
        }
        if (x - 10 >= 0 && x % 10 > 0 && tiles[x - 10].className === color) {
          tiles[x - 10].className += cell
        }
      }
    }
  }

  let builder = (container, element, collection, count, randomize) => {
    container.innerHTML = ''
    count = count || collection.length
    randomize = randomize || false
    for (let i = 0; i < count; i++) {
      let child = document.createElement(element)
      child.className = randomize ? collection[Math.floor((Math.random() * collection.length))] : collection[i]
      container.appendChild(child)
    }
  }

  let newGame = () => {
    let options = setcoloo(colorArray.slice(), skill)
    tally = 0
    moves.innerText = tally
    //?
    gameover.innerHTML = ''
    running = true
    builder(coloo, 'chip', options)
    builder(bond, 'tile', options, 100, true)
    color = bond.childNodes[0].className
    bond.className = ''
    bond.childNodes[0].className = color + cell
    checkColor(color)
  }

  let play = (chip) => {
    if (running && color !== chip){
      color = chip
      if(bond.className !== 'started') {
        bond.className = 'started'
      }
      tally++
      //?
      checkColor(chip)
      checkWin(tally)
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    newGame()
  }, false)

  document.addEventListener('click', (event) => {
    let css = Array.from(event.target.classList)
    if(event.target.tagName === 'CHIP') {
      play(event.target.className)
    }
    else if(css.includes('newf')) {
      newGame()
    }
  })
})(document)
//game4




















