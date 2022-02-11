var StartButtonEl = document.querySelector("#start");
var timerDesc = document.querySelector("#timer-desc");
var timerEl = document.querySelector("#timer");
var questionContainerEl = document.querySelector("#question-container");
var quizWrapperEl = document.querySelector("#quiz-wrapper");
//question text variable
var questionElement = document.querySelector("#question");
var asnwerButtons = document.querySelector("#answer-buttons")
//next question button variable
var nextBtn = document.querySelector("#nxt-btn");
//endquiz button
var endQuiz = document.querySelector("#end-quiz");
//shuffle questions order
let shuffledQuestions, currentQuestionIndex;

// score variable
var scoreEl = document.querySelector("#score");
let score = 0;
var seconds = 120;

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

var questions = [
    {
        question: "what is 2 + 2",
        answers: [
            { text: "4", correct: true },
            {text: "22", correct: false}
        ]
    },
    {
        question: "Best Food?",
        answers: [
            { text: "Steak", correct: true },
            {text: "candy", correct: false},
            {text: "salad", correct: false},
            {text: "hotdogs", correct: false}
        ]
    },
    {
        question: "Best Vacation Spot?",
        answers: [
            { text: "Hawaii", correct: true },
            {text: "Alaska", correct: false},
            {text: "Key West", correct: false}
        ]
    }
];

var start = function() {
    //call time function once every second
    time();
    //change text of timer-desc
    timerDesc.textContent = "Time Remaining: ";
    //hide start button & opening description
    StartButtonEl.className = "hide";
    var description = document.querySelector("#description");
    description.className = "hide";
    //add random question
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    // reveal question container
    questionContainerEl.classList.remove("hide");
    //call quiz funtion
    setNextQuestion();
}

var time = function() {
    var interval = setInterval(function(){
        if (seconds >=0){
            timerEl.textContent = seconds;
            seconds--;
        }
        else {
            clearInterval(interval);
            alert("your time is up!");
        }
    }, 1000);
}

//show next question function
var setNextQuestion = function() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        button.addEventListener("click", timeScoreEditor);
        asnwerButtons.appendChild(button);
    })
}

function timeScoreEditor(correct) {
    const isTrue = correct.target.getAttribute("data-correct");
    if (isTrue) {
        seconds = seconds + 5;
        score = score + 5;
        scoreEl.textContent = score;
        console.log(score);
    } else {
        seconds = seconds - 10;
        score--;
        scoreEl.textContent = score;
        console.log("remove score");
    }
}

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add("hide");
    while (asnwerButtons.firstChild) {
        asnwerButtons.removeChild(asnwerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(asnwerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove("hide");
    }else {
        endQuiz.classList.remove("hide");
        StartButtonEl.classList.remove;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

var highScore = [];
//function for saving high score & initials
var endGame = function() {
    asnwerButtons.classList.add("hide");
    nextBtn.className = "hide";
    endQuiz.classList.add("hide");
    questionElement.textContent = "Enter your name or initials to save your score:";
    var initialsInput = document.createElement("input");
    initialsInput.type = 'text';
    initialsInput.placeholder = "Enter Your Initials";
    initialsInput.setAttribute("id", "initials");
    questionContainerEl.appendChild(initialsInput);
    var submitInitials = document.createElement("button");
    submitInitials.textContent = "submit";
    questionContainerEl.appendChild(submitInitials);

    submitInitials.addEventListener("click", storeScore);
}

function storeScore() {
    scoreEl.textContent = score;  //make screen show your actual score
    questionContainerEl.classList.add("hide");
    var initials = document.getElementById("initials").value;
    initials = initials.toUpperCase();
    highScore.push(initials);
    var finalScore = score;
    highScore.push(finalScore);
    console.log(highScore);

    localStorage.setItem("highScore", JSON.stringify(highScore));
    score = 0;
}

//function for pulling saved score & initials
var loadTasks = function() {
    var savedScore = localStorage.getItem("highScore");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedScore) {
      return false;
    }
    var currentHigh = document.createElement("div");
    currentHigh.textContent = "Current High Score:" ;
    currentHigh.classList.add("question-container");
    quizWrapperEl.appendChild(currentHigh);

    var displayScore = document.createElement("div");
    displayScore.textContent = savedScore;
    currentHigh.appendChild(displayScore);
    // else, load up saved tasks
  
    // parse into array of objects
    savedScore = JSON.parse(savedScore);
    // loop through savedTasks array
  };

loadTasks()
//event listeners
StartButtonEl.addEventListener("click", start);



endQuiz.addEventListener("click", endGame);





