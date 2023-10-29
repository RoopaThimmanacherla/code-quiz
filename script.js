var startbtn = document.querySelector("#start-quiz ");
var timerElement = document.querySelector("#timer-count");
var answer = document.querySelector("#answer");
var questionContainer = document.getElementById("questionContainer");
var quizStartPage = document.getElementById("startPage");
var initialSubmitContainer = document.getElementById("initialSubmit");
var displayHighScores = document.getElementById("highScoreContainer");
var currentQuestionIndex = 0;
var setHighScores = JSON.parse(localStorage.getItem("setHighScores")) || [];

var btn;
var score = 0;
var secondsLeft = 50;
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

function startQuiz() {
  quizStartPage.innerHTML = "";
  renderQuestions();
  console.log("start quiz function");
  setTime();
}

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
  var initialText = document.createElement("textarea");
  elemForm.appendChild(initialText);
  var submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  elemForm.append(submitButton);
  initials.append(elemForm);

  elemForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(initialText.value);
    initialSubmitContainer.innerHTML = "";
    displayHighScores.classList.remove("hide");
    // var highScoreMsg = document.createElement("h2");
    // highScoreMsg.innerHTML = "High Scores:";
    // displayHighScores.append(highScoreMsg);
    var goBackbtn = document.createElement("button");
    goBackbtn.setAttribute("value", "GoBack");

    goBackbtn.textContent = "GoBack";
    displayHighScores.append(goBackbtn);

    var playScore = {
      initials: initialText.value,
      score: score,
    };
    // var setHighScores = localStorage.getItem(JSON.parse("setHighScores")) || [];
    setHighScores.push(playScore);
    // setHighScores.push(score);
    localStorage.setItem("setHighScores", JSON.stringify(setHighScores));
    // var getHighScores = localStorage.getItem(JSON.parse("setHighScores"));
    // console.log(getHighScores);
  });
}
for (let i = 0; i < setHighScores.length; i++) {
  var h2El = document.createElement("h2");
  h2El.innerHTML = `${setHighScores[i].initials} : ${setHighScores[i].score}`;
  displayHighScores.appendChild(h2El);
  console.log(setHighScores[i]);
}

//setHighScores[i].initials + ": " + setHighScores[i].score
