let timerDuration = 5 * 60; // 5 minutes
//let interval = setInterval(updateTimer, 1000);
let interval;
let timerStarted = false;

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

const sectionTitles = [
  "Variables, Mutability & Shadowing (Q1–5)",
  "Data Types, Logic & If (Q6–10)",
  "Control Flow – Clever Twists(Q11–15)",
  "Functions – Reasoning & Recursion (Q16–20)",
  "GUI with eframe + egui (Q21–25)"
];


function renderQuiz(offset = 0) {
  const form = document.getElementById("quiz-form");
  questions.forEach((q, index) => {
    // Add a section header before every 5 questions
    if (index % 5 === 0) {
      const sectionLabel = offset + Math.floor(index / 5); // A, B, C...
      const sectionHeader = document.createElement("h2");
      sectionHeader.textContent = `Section ${String.fromCharCode(65 + sectionLabel)} – ${sectionTitles[sectionLabel]}`;
      sectionHeader.style.marginTop = "30px";
      sectionHeader.style.color = "#1a73e8"; // Optional style
      form.appendChild(sectionHeader);
    }

    const field = document.createElement("div");
    field.style.marginBottom = "20px";

    let optionsHTML = "";

    if (q.type === "mcq") {
      optionsHTML = q.options.map((opt, i) => `
        <label style="display:block; margin-left: 10px;">
          <input type="radio" name="q${index}" value="${opt}"> ${opt}
        </label>
      `).join('');
    } else if (q.type === "short") {
      optionsHTML = `
        <input type="text" name="q${index}" style="margin-left: 10px; width: 300px;" placeholder="Type your answer here">
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

function showResults() {
  const form = document.getElementById("quiz-form");
  const results = document.getElementById("results");
  let score = 0;
  results.innerHTML = "<h3>📝 Quiz Results</h3>";

  questions.forEach((q, index) => {
    let userInput = "";

    if (q.type === "mcq") {
      const selectedOption = form.querySelector(`input[name="q${index}"]:checked`);
      userInput = selectedOption ? selectedOption.value : "No Answer";
    } else if (q.type === "short") {
      const textInput = form.querySelector(`input[name="q${index}"]`);
      userInput = textInput ? textInput.value.trim() : "No Answer";
    }

    const correct = userInput.toLowerCase() === q.answer.toLowerCase();

    if (correct) score++;

    results.innerHTML += `
      <div style="margin-bottom: 15px;">
        <p><strong>Q${index + 1}: ${q.question}</strong></p>
        <p>Your Answer: <mark>${userInput}</mark></p>
        <p>Correct Answer: ✅ <strong>${q.answer}</strong></p>
        <p><em>${q.explanation}</em></p>
        <hr>
      </div>
    `;
  });

  results.innerHTML = `<h2>🎯 Score: ${score} / ${questions.length}</h2>` + results.innerHTML;
}

document.getElementById("submit-btn").addEventListener("click", () => {
  clearInterval(interval);
  showResults();
  document.getElementById("submit-btn").disabled = true;
});

