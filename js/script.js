var StartButtonEl = document.querySelector("#start");
var timerDesc = document.querySelector("#timer-desc");
var timerEl = document.querySelector("#timer");
var questionContainerEl = document.querySelector("#question-container");
var questionContainerEl2 = document.querySelector("#question2");
//question text variable
var questionText = document.querySelector("#question");
//answer button variables
//individual button variables
var btn1 = document.querySelector("#first-ans");
var btn2 = document.querySelector("#second-ans");
var btn3 = document.querySelector("#third-ans");
var btn4 = document.querySelector("#fourth-ans");
//all answer buttons variable
var ansBtns = {btn1, btn2, btn3, btn4};
//next question button variable
var nextBtn = document.querySelector("#nxt-btn");

//variable for logged answer
var answer;
// score variable
var scoreEl = document.querySelector("#score");
var score = 0;


var seconds = 120;
var questions = [];

var start = function() {
    //call time function once every second
//time();
    //call quiz funtion
    Quiz();
    //hide start button & opening description
    StartButtonEl.className = "hide";
    var description = document.querySelector("#description");
    description.className = "hide";
    // reveal question container
    questionContainerEl.className = "question-container";
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

//quiz function
var Quiz = function() {
    //change text of timer-desc
    timerDesc.textContent = "Time Remaining: ";
    //Call create Question function
    createQuestion();
    
    //loop through questions unitl every question has been answered
    for (var i = 0; i <= questions.length; i++) {

    }
    //ask for user's initials and display player's score
}

//create question function
var createQuestion = function() {

}

//answer button click funtions
var btn1Function = function() {
    answer = 1;
    checkAns();
}
var btn2Function = function() {
    answer = 2;
    checkAns();
}
var btn3Function = function() {
    answer = 3;
    checkAns();
}
var btn4Function = function() {
    answer = 4;
    checkAns();
}

// check answer function
var checkAns = function() {
    switch(answer) {
        case answer = 1:
            score = score + 2;
            scoreEl.textContent = score;
            questionText.textContent = "Correct! press the button to see next question";
             //hide asnwer buttons
            btn1.className = "hide";
            btn2.className = "hide";
            btn3.className = "hide";
            btn4.className = "hide";
            //display button for next question
            nextBtn.className = "nxt-btn";
            return;
        default:
            seconds = seconds - 5;
            score--;
            scoreEl.textContent = score;
            questionText.textContent = "Wrong! press the button to see next question";
            //hide asnwer buttons
            btn1.className = "hide";
            btn2.className = "hide";
            btn3.className = "hide";
            btn4.className = "hide";
            //display button for next question
            nextBtn.className = "nxt-btn";
            return;
    }
}

var nextQuest = function() {
    console.log("nextQuest");
    answer = 0;
    btn1.className = "answer-buttons";
    btn2.className = "answer-buttons";
    btn3.className = "answer-buttons";
    btn4.className = "answer-buttons";
    nextBtn.className = "hide";
    //hide first question and reveal second question
    questionContainerEl.className = "hide";
    questionContainerEl2.className = "question-container";
}

//function for saving high score & initials
//function for pulling saved score & initials

//event listeners
StartButtonEl.addEventListener("click", start);

btn1.addEventListener("click", btn1Function);
btn2.addEventListener("click", btn2Function);
btn3.addEventListener("click", btn3Function);
btn4.addEventListener("click", btn4Function);

nextBtn.addEventListener("click", nextQuest);





