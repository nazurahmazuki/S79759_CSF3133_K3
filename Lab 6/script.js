// 1. Questions Array
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["font-color", "text-color", "color"],
    correctAnswer: "color",
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["var x = 5;", "variable x = 5;", "v x = 5;"],
    correctAnswer: "var x = 5;",
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<head>"],
    correctAnswer: "<h1>",
  },
];


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let shuffledQuestions = [];

// 2. shuffleQuestions()
function shuffleQuestions() {
  // Creates a copy of the array and sorts it randomly
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

// 3. startTimer()
function startTimer() {
  clearInterval(timerInterval); // clear any existing timer
  timeLeft = 10;
  document.getElementById("time").innerText = timeLeft;

  timerInterval = setInterval(function () {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      checkAnswer(); 
    }
  }, 1000); 
}

// 4. displayQuestion()
function displayQuestion() {
  // Get the current question object
  let currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Show the question text
  document.getElementById("question-text").innerText = currentQuestion.question;

  // Clear previous options
  let optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  // Create radio buttons for each option
  for (let i = 0; i < currentQuestion.options.length; i++) {
    let option = currentQuestion.options[i];

    let label = document.createElement("label");
    label.className = "option-label";

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = option;

    // Add text next to the radio button
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + option));

    optionsContainer.appendChild(label);
  }

  // Reset UI states for the new question
  document.getElementById("feedback-text").innerText = "";
  document.getElementById("submit-btn").style.display = "inline-block";
  document.getElementById("submit-btn").disabled = false;
  document.getElementById("next-btn").style.display = "none";

  // Start the timer for this question
  startTimer();
}

// 5. checkAnswer()
function checkAnswer() {
  clearInterval(timerInterval); // Stop timer

  let currentQuestion = shuffledQuestions[currentQuestionIndex];
  let selectedOption = document.querySelector('input[name="answer"]:checked');
  let feedbackText = document.getElementById("feedback-text");

  // Disable the submit button so they can't click twice
  document.getElementById("submit-btn").disabled = true;

  if (selectedOption) {
    if (selectedOption.value === currentQuestion.correctAnswer) {
      feedbackText.innerText = "Correct!";
      feedbackText.className = "correct";
      score++; // Increase score
      document.getElementById("score").innerText = score; // Update footer
    } else {
      feedbackText.innerText =
        "Incorrect! The correct answer was: " + currentQuestion.correctAnswer;
      feedbackText.className = "incorrect";
    }
  } else {
    // If time runs out and no option is selected
    feedbackText.innerText =
      "Time's up! The correct answer was: " + currentQuestion.correctAnswer;
    feedbackText.className = "incorrect";
  }

  // Show the Next button
  document.getElementById("next-btn").style.display = "inline-block";
}

// 6. nextQuestion()
function nextQuestion() {
  currentQuestionIndex++; // Move to next question

  // Check if there are more questions left
  if (currentQuestionIndex < shuffledQuestions.length) {
    displayQuestion();
  } else {
    // Quiz is over
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("controls").style.display = "none";
    document.getElementById("feedback-text").innerText =
      "Quiz Complete! Final Score: " +
      score +
      " out of " +
      shuffledQuestions.length;
  }
}

// 7. startQuiz()
function startQuiz() {
  shuffleQuestions(); // Shuffle first
  currentQuestionIndex = 0; // Reset index
  score = 0; // Reset score
  document.getElementById("score").innerText = score;
  displayQuestion(); // Show the first question
}

// Start the quiz as soon as the page loads
window.onload = function () {
  startQuiz();
};
