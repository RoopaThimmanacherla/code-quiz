var startbtn = document.querySelector("#start-quiz ");
var timerElement = document.querySelector("#timer-count");
var answer = document.querySelector(".answer");
var questionContainer = document.getElementById("questionContainer");
var timerCount;
var currentQuestionIndex = 0;
var btn;
var score = 0;

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
    a: "elementById(id)",
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
  renderQuestions();
  console.log("start quiz function");
}

function renderQuestions() {
  for (
    currentQuestionIndex = 0;
    currentQuestionIndex < questions.length;
    currentQuestionIndex++
  ) {
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
    function checkAnswer(event) {
      console.log(event.target);
      if (btn.value === questions[currentQuestionIndex].a) {
        score += 10;
        answer.innerText = "correct!";
      } else {
        answer.innerText = "Wrong!";
      }
    }
  }
}
