var startbtn = document.querySelector("#start-quiz ");
var timerElement = document.querySelector("#timer-count");
var answer = document.querySelector("#answer");
var questionContainer = document.getElementById("questionContainer");
var quizStartPage = document.getElementById("startPage");
var initialSubmitContainer = document.getElementById("initialSubmit");
var displayHighScores = document.getElementById("highScoreContainer");
var currentQuestionIndex = 0;
var highScoresContainers = document.getElementById("highScoresContainers");
var setHighScores = JSON.parse(localStorage.getItem("setHighScores")) || [];
var ViewHighScoreEl = document.getElementById("view-high-scores");

var btn;
var score = 0;
var secondsLeft = 50;
//set of questions in array
var questions = [
  {
    q: "Inside which HTML do we put the javascript?",
    choices: ["<h1>", "<js>", "<head>", "<javascript>"],
    a: "<javascript>",
  },

  {
    q: "JavaScript is the programming language of the _____",
    choices: ["Desktop", "Mobile", "Web", "Server"],
    a: "Web",
  },

  {
    q: "Which JavaScript method is used to access an HTML element by id?",
    choices: [
      "getElementById()",
      "getElement(id)",
      "getElementById(id)",
      "elementById(id)",
    ],
    a: "getElementById(id)",
  },

  {
    q: "Which JavaScript method is used to write HTML output?",
    choices: [
      "document.write()",
      "document.output()",
      "console.log()",
      "document.writeHTML()",
    ],
    a: "document.write()",
  },

  {
    q: "Which JavaScript method is used to write on browsers console?",
    choices: [
      "console.write()",
      "console.output()",
      "console.log()",
      "console.writeHTML()",
    ],
    a: "console.log()",
  },
];

startbtn.addEventListener("click", startQuiz);

// function to start Quiz when startQuiz button is clicked
function startQuiz() {
  quizStartPage.style.display = "none";
  renderQuestions();
  console.log("start quiz function");
  setTime();
}

//  function to check answer whether it is correct or wrong!
function checkAnswer(event) {
  console.log(event.target);
  if (event.target.value === questions[currentQuestionIndex].a) {
    answer.innerHTML = "Correct!";
  } else {
    answer.innerHTML = "Wrong!";
    if (secondsLeft >= 10) {
      secondsLeft -= 10;
    }
  }

  // Add a delay to display the message
  setTimeout(function () {
    answer.innerHTML = "";
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderQuestions();
    } else {
      endQuiz();
    }
  }, 1000);
}

// function to display the questions on the page
function renderQuestions() {
  questionContainer.innerHTML = "";

  var currentQuestion = questions[currentQuestionIndex];
  var qst = document.createElement("h2");
  qst.innerText = currentQuestion.q;
  questionContainer.append(qst);

  for (j = 0; j < currentQuestion.choices.length; j++) {
    var currentChoice = currentQuestion.choices[j];
    btn = document.createElement("button");
    btn.setAttribute("value", currentChoice);
    btn.textContent = currentChoice;
    questionContainer.appendChild(btn);
    btn.addEventListener("click", checkAnswer);
  }
}

//function to set time to questions
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    score = secondsLeft;
    timerElement.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
//function to submit initials and highsores once quiz ends
function endQuiz() {
  questionContainer.innerHTML = "";

  var initials = document.getElementById("initialSubmit");
  var endMessage = document.createElement("h2");
  endMessage.innerHTML = "ALL DONE!";
  initials.append(endMessage);

  var scoreMessage = document.createElement("h2");
  scoreMessage.innerHTML = "Your final score is : " + score;
  initials.append(scoreMessage);

  var elemForm = document.createElement("form");
  var enterinitials = document.createElement("h3");
  enterinitials.innerHTML = "Enter Initials:";
  initials.append(enterinitials);

  var initialText = document.createElement("textarea");
  elemForm.appendChild(initialText);
  var submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  elemForm.append(submitButton);
  initials.append(elemForm);
  //submit the initials form
  elemForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(initialText.value);
    initialSubmitContainer.innerHTML = "";
    displayHighScores.classList.remove("hide");
    // eventlistener when goback button clicked
    var goBackbtn = document.createElement("button");
    goBackbtn.setAttribute("value", "GoBack");
    goBackbtn.textContent = "GoBack";
    displayHighScores.append(goBackbtn);

    goBackbtn.addEventListener("click", function () {
      displayHighScores.innerHTML = "";
      quizStartPage.style.display = "block";
      secondsLeft = 50;
      currentQuestionIndex = 0;
    });

    var clearScores = document.createElement("button");
    clearScores.setAttribute("value", "clear high scores");
    clearScores.textContent = "clear high scores";
    displayHighScores.append(clearScores);
    // function to clear scores
    clearScores.addEventListener("click", function () {
      localStorage.removeItem("setHighScores");
      highScoresContainers.innerHTML = "";
    });

    var playScore = {
      initials: initialText.value,
      score: score,
    };
    setHighScores.push(playScore);
    localStorage.setItem("setHighScores", JSON.stringify(setHighScores));
    renderHighscores();
  });
}
//render scores to the screen after retriving from local storage
function renderHighscores() {
  displayHighScores.classList.remove("hide");
  quizStartPage.classList.add("hide");
  highScoresContainers.innerHTML = "";
  for (let i = 0; i < setHighScores.length; i++) {
    var h4El = document.createElement("h4");
    h4El.innerHTML = setHighScores[i].initials + ": " + setHighScores[i].score;
    highScoresContainers.appendChild(h4El);
    console.log(setHighScores[i]);
  }
}

ViewHighScoreEl.addEventListener("click", renderHighscores);
