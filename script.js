var startbtn = document.querySelector("#start-quiz ");
var timerElement = document.querySelector("#timer-count");
var answer = document.querySelector(".answer");
var questionContainer = document.getElementById("questionContainer");
var quizStartPage = document.getElementById("startPage");
var currentQuestionIndex = 0;
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
    answer.innerHTML = "correct!";
  } else {
    answer.innerHTML = "Wrong!";
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestions();
  } else {
    endQuiz();
  }
}

function renderQuestions() {
  questionContainer.innerHTML = "";
  var currentQuestion = questions[currentQuestionIndex];
  var qst = document.createElement("h3");
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
  endMessage.innerHTML = "ALL DONE";
  initials.append(endMessage);
  var elemForm = document.createElement("form");
  elemForm.appendChild(document.createElement("textarea"));
  initials.append(elemForm);
  var submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  initials.append(submitButton);
}
