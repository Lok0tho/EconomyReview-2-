const questions = [
  {
    question: "What is the basic problem of economics?",
    choices: ["Inflation", "Scarcity", "Supply", "Debt"],
    answer: "Scarcity"
  },
  {
    question: "What does GDP stand for?",
    choices: ["Global Development Plan", "Gross Domestic Product", "General Debt Profile", "Gross Deposit Percentage"],
    answer: "Gross Domestic Product"
  },
  {
    question: "Which is an example of opportunity cost?",
    choices: ["Money saved in a bank", "The job you didn't take", "Paying taxes", "A sale discount"],
    answer: "The job you didn't take"
  },
  {
    question: "What causes inflation?",
    choices: ["High taxes", "Too much money in circulation", "Scarcity of jobs", "Trade deficits"],
    answer: "Too much money in circulation"
  },
  {
    question: "What type of economy does the U.S. have?",
    choices: ["Command", "Traditional", "Mixed", "Market-only"],
    answer: "Mixed"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let playerAnswers = [];

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  currentQuestion = 0;
  score = 0;
  playerAnswers = [];

  document.getElementById("current-score").innerText = score;
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").innerText = q.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => selectAnswer(choice);
    choicesDiv.appendChild(btn);
  });
}

function selectAnswer(choice) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  playerAnswers.push({
    question: questions[currentQuestion].question,
    selected: choice,
    correct
  });

  if (choice === correct) {
    score += 10;
    document.getElementById("current-score").innerText = score;
  }

  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    startTimer();
  } else {
    endGame();
  }
}

function startTimer() {
  timeLeft = 15;
  document.getElementById("time-left").innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(""); // Treat as no answer
    }
  }, 1000);
}

function endGame() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");
  document.getElementById("final-score").innerText = score;
  const reviewDiv = document.getElementById("review");
  reviewDiv.innerHTML = "<h3>Review:</h3>";
  playerAnswers.forEach(entry => {
    reviewDiv.innerHTML += `
      <p><strong>Q:</strong> ${entry.question}<br>
      <strong>Your Answer:</strong> ${entry.selected || "No Answer"}<br>
      <strong>Correct:</strong> ${entry.correct}</p>
    `;
  });
}

//
window.startGame = startGame;
