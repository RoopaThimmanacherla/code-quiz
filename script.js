var startbtn = document.querySelector("#start-quiz ");
var timerElement = document.querySelector("#timer-count");
var answer = document.querySelector(".answer");

var timerCount;
var i = 0;
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
  startTimer();
  renderQuestions();
}

function renderQuestions() {
  while (i < questions.length) {
    var qst = document.createElement("h1");
    document.body.append(qst);
    qst.textcontent = questions[i].q;
    for (j = 0; j < questions[i].choices.length; j++) {
      btn = document.createElement("button");
      btn.innerHTML = questions[i].choices[j];
      qst.appendChild(btn);
    }
    btn.addEventListener("click", checkAnswer);

    function checkAnswer() {
      if (btn.innerHTML === questions[i].a) {
        score += 10;
        answer.innerHTML = "correct";
      } else {
        answer.innerHTML = "incorrect";
      }
      i++;
    }
  }
}
