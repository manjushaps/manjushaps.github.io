let timerDuration = 5 * 60; // 5 minutes
//let interval = setInterval(updateTimer, 1000);
let interval;
let timerStarted = false;
let currentQuestions = [];
let currentSectionTitles = [];

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    interval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  const timerEl = document.getElementById("timer");
  const mins = Math.floor(timerDuration / 60);
  const secs = timerDuration % 60;
  timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  if (timerDuration === 0) {
    clearInterval(interval);
    document.getElementById("submit-btn").disabled = true;
    showResults();
  }
  timerDuration--;
}

const quiz1sectionTitles = [
  "Variables, Mutability & Shadowing",
  "Data Types, Logic & If ",
];

const quiz2sectionTitles = [
  "Control Flow",
  "Functions and Recurrsion",
  "GUI with eframe + egui"
];

const quiz3sectionTitles = [
  "Ownership & Borrowing",
  "References & Lifetimes"
];

const quiz4sectionTitles = [
  "Quick Code Challenges",
  "Rust in Real-World & Future Tech"
];


function renderQuiz(questions, sectionTitles = [], sectionSizes = [5]) {
  const form = document.getElementById("quiz-form");
  form.innerHTML = ""; // clear previous quiz

  currentQuestions = questions;
  currentSectionTitles = sectionTitles;

  let questionCounter = 0;
  let sectionIndex = 0;


  questions.forEach((q, index) => {

  if (index === questionCounter) {

    const title =
      sectionTitles[sectionIndex] || `Section ${sectionIndex + 1}`;

    const sectionHeader = document.createElement("h2");
    sectionHeader.textContent =
      `Section ${String.fromCharCode(65 + sectionIndex)} – ${title}`;

    sectionHeader.style.marginTop = "30px";
    sectionHeader.style.color = "#1a73e8";

    form.appendChild(sectionHeader);

    questionCounter += sectionSizes[sectionIndex] || sectionSizes[0];
    sectionIndex++;
  }


    const field = document.createElement("div");
    field.style.marginBottom = "20px";

    let optionsHTML = "";

    if (q.type === "mcq") {
      optionsHTML = q.options.map((opt, i) => `
        <label style="display:flex; align-items:flex-start; gap:8px; margin:8px 0;">
          <input type="radio" name="q${index}" value="${i}">
          <div style="flex:1;">
            ${opt}
          </div>
        </label>
      `).join('');
    }
    else if (q.type === "short") {
      optionsHTML = `
        <input type="text" name="q${index}"
          style="margin-left:10px; width:300px;"
          placeholder="Type your answer here">
      `;
    }

    field.innerHTML = `
      <p><strong>Q${index + 1}. ${q.question}</strong></p>
      ${optionsHTML}
    `;

    form.appendChild(field);
  });
}


function setupStartOnInteraction() {
  const form = document.getElementById("quiz-form");
  form.addEventListener("click", startTimer, { once: true });
  form.addEventListener("input", startTimer, { once: true });
}


function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}

function retryQuiz() {
  clearInterval(interval);

  timerDuration = 5 * 60;
  timerStarted = false;

  document.getElementById("results").innerHTML = "";
  document.getElementById("submit-btn").disabled = false;

  renderQuiz(currentQuestions, currentSectionTitles);
  setupStartOnInteraction();
}

function showResults() {
  const form = document.getElementById("quiz-form");
  const results = document.getElementById("results");
  let score = 0;
  results.innerHTML = "<h3>📝 Quiz Results</h3>";

  currentQuestions.forEach((q, index) => {
    let userInput = "";
    let correct = false;

    if (q.type === "mcq") {
      const selectedOption = form.querySelector(`input[name="q${index}"]:checked`);
      userInput = selectedOption ? selectedOption.value : "No Answer";
      correct = Number(userInput) === q.answer;
    } else if (q.type === "short") {
      const textInput = form.querySelector(`input[name="q${index}"]`);
      userInput = textInput ? textInput.value.trim() : "No Answer";
      correct = userInput.toLowerCase() === q.answer.toLowerCase();
    }
    console.log(currentQuestions.length);

    if (correct) score++;

    results.innerHTML += `
      <div style="margin-bottom: 15px;">
        <p><strong>Q${index + 1}: ${q.question}</strong></p>
        <p>Your Answer: <mark>${userInput}</mark></p>
        <p>Correct Answer: ✅ <strong>${q.options[q.answer]}</strong></p>
        <p><em>${q.explanation}</em></p>
        <hr>
      </div>
    `;
  });

  const total = currentQuestions.length;
  const percent = (score / total) * 100;

  let message = "";
  let color = "";

  if (percent === 100) {
    message = "🏆 Excellent! Perfect score! Keep it up!";
    color = "#2e7d32"; // green
  }
  else if (percent >= 80) {
    message = "🌟 Great work! You're getting really strong with Rust!";
    color = "#1a73e8"; // blue
  }
  else if (percent >= 50) {
    message = "👍 Good job! A little more practice and you'll master it!";
    color = "#ff9800"; // orange
  }
  else if (score > 0) {
    message = "🙂 Nice try! Review once and try again!";
    color = "#fb8c00"; // light orange
  }
  else {
    message = "💪 Oops! Don’t worry — mistakes help us learn. Try again!";
    color = "#e53935"; // red
  }

  
let extraButtons = "";

if (percent === 100) {
  launchConfetti(); // 🎉 trigger confetti
}

extraButtons = `
  <button onclick="retryQuiz()"
    style="
      margin-top:15px;
      padding:8px 18px;
      border:none;
      border-radius:6px;
      background:#1a73e8;
      color:white;
      cursor:pointer;">
    🔁 Retry Quiz
  </button>`;

  results.innerHTML =
    `
    <h2 style="margin-bottom:8px;">🎯 Score: ${score} / ${total}</h2>
    <h3 style="color:${color}; margin-bottom:25px;">${message}</h3>
    ${extraButtons}
    `
    + results.innerHTML;

}

document.getElementById("submit-btn").addEventListener("click", () => {
  clearInterval(interval);
  showResults();
  document.getElementById("submit-btn").disabled = true;
});

