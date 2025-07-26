const baseQuestions = [
  { question: "Capital of France?", options: { a: "Paris", b: "London", c: "Berlin", d: "Madrid" }, answer: "a" },
  { question: "2 + 2 = ?", options: { a: "3", b: "4", c: "5", d: "2" }, answer: "b" },
  { question: "Largest ocean?", options: { a: "Atlantic", b: "Indian", c: "Pacific", d: "Arctic" }, answer: "c" },
  { question: "Who wrote Hamlet?", options: { a: "Wordsworth", b: "Shakespeare", c: "Tagore", d: "Tolkien" }, answer: "b" },
  { question: "H2O is?", options: { a: "Salt", b: "Acid", c: "Water", d: "Hydrogen" }, answer: "c" },
  { question: "Square root of 16?", options: { a: "2", b: "8", c: "4", d: "6" }, answer: "c" },
  { question: "Speed unit?", options: { a: "m/s", b: "kg", c: "sec", d: "litre" }, answer: "a" },
  { question: "Sun rises in?", options: { a: "West", b: "North", c: "East", d: "South" }, answer: "c" },
  { question: "RGB stands for?", options: { a: "Red Green Blue", b: "Red Gray Black", c: "Ring Giant Box", d: "Right Good Base" }, answer: "a" },
  { question: "Which is a planet?", options: { a: "Sun", b: "Moon", c: "Earth", d: "Polaris" }, answer: "c" },
  { question: "HTML full form?", options: { a: "HyperText Markup Language", b: "HighText Main Language", c: "HyperTool Main Language", d: "None" }, answer: "a" },
  { question: "CPU means?", options: { a: "Central Program Unit", b: "Central Processing Unit", c: "Control Process Unit", d: "Compute Unit" }, answer: "b" },
  { question: "India's capital?", options: { a: "Mumbai", b: "Delhi", c: "Bangalore", d: "Kolkata" }, answer: "b" },
  { question: "Google CEO?", options: { a: "Sundar Pichai", b: "Elon Musk", c: "Jeff Bezos", d: "Tim Cook" }, answer: "a" },
  { question: "NOT a programming language?", options: { a: "HTML", b: "Python", c: "Java", d: "C++" }, answer: "a" },
  { question: "COVID-19 found in?", options: { a: "India", b: "USA", c: "China", d: "Brazil" }, answer: "c" },
  { question: "Oxygen symbol?", options: { a: "O2", b: "Ox", c: "O", d: "Og" }, answer: "c" },
  { question: "Mitochondria is?", options: { a: "Brain of cell", b: "Powerhouse", c: "Lungs of cell", d: "Wall of cell" }, answer: "b" },
  { question: "1 byte = ?", options: { a: "8 bits", b: "4 bits", c: "16 bits", d: "2 bits" }, answer: "a" },
  { question: "Which is a search engine?", options: { a: "Chrome", b: "Gmail", c: "Google", d: "Windows" }, answer: "c" }
];

let shuffledQuestions = [];
let questionsChosen = 0;

const gridContainer = document.getElementById("questionGrid");
const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");
const resultBox = document.getElementById("result");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  shuffledQuestions = shuffle(baseQuestions);
  gridContainer.innerHTML = "";
  quizForm.innerHTML = "";
  resultBox.style.display = "none";
  submitBtn.style.display = "none";
  questionsChosen = 0;

  for (let i = 0; i < 20; i++) {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.onclick = () => revealQuestion(i, btn);
    gridContainer.appendChild(btn);
  }
}

function revealQuestion(index, btn) {
  if (btn.disabled || questionsChosen >= 5) return;

  btn.disabled = true;
  const q = shuffledQuestions[index];
  const box = document.createElement("div");
  box.className = "question-box";
  box.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  for (let key in q.options) {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="q${index}" value="${key}" required />
      ${key.toUpperCase()}. ${q.options[key]}
    `;
    optionsDiv.appendChild(label);
  }

  box.appendChild(optionsDiv);
  quizForm.appendChild(box);

  questionsChosen++;

  if (questionsChosen === 5) {
    submitBtn.style.display = "block";
  }
}

submitBtn.onclick = function () {
  const name = document.getElementById("playerName").value.trim();