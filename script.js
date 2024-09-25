const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "J.K. Rowling", "F. Scott Fitzgerald", "Mark Twain"],
        correct: 0
    },
    {
        question: "Largest mammal in the world?",
        answers: ["Elephant", "Shark", "Giraffe", "Blue Whale"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 10; // Time limit per question

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('an-buttons').children;
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('time-left');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    scoreElement.style.display = 'none'; // Hide score initially
    startTimer();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    Array.from(answerButtons).forEach((button, index) => {
        button.innerText = question.answers[index];
        button.onclick = () => selectAnswer(index);
        button.classList.remove('correct', 'incorrect'); // Reset classes
    });
}

function selectAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    Array.from(answerButtons).forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add('correct'); // Mark correct answer
        } else {
            button.classList.add('incorrect'); // Mark incorrect answer
        }
        button.onclick = null; // Disable further clicks
    });
    
    if (selectedIndex === correctIndex) {
        score++;
    }
    nextButton.style.display = 'block'; // Show next button
    clearInterval(timer); // Stop the timer
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        startTimer();
        showQuestion(questions[currentQuestionIndex]);
        nextButton.style.display = 'none'; // Hide button again
    } else {
        endQuiz(); // Call the endQuiz function
    }
});

function endQuiz() {
    alert("Quiz finished! Your final score is: " + score);
    scoreElement.innerText = `Score: ${score}`;
    scoreElement.style.display = 'block'; // Show score at the end
    nextButton.style.display = 'none'; // Hide button
    startQuiz(); // Restart the quiz
}

function startTimer() {
    let timeLeft = timeLimit;
    timeLeftElement.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(-1); // Auto-select incorrect answer
        }
    }, 1000);
}

// Start the quiz when the page loads
startQuiz();
