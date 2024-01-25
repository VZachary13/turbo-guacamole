var startTime = 120;
var score = 0;
var timer = document.getElementById('timer');
timer.textContent = startTime;
var highScores = document.getElementById("scores");
var startQuiz = document.getElementById("start");
var displaySection = document.getElementById('displayBox');
var headerEl = document.getElementById("header");
var submitEl = document.createElement('input');
var labelEl = document.createElement("label");
var inputVar = document.createElement("input");
var buttonElArray = [];
var paraElArray = [];
var questionRandomizer = [];
var counter = 0;
var keepPlaying = false;
var rightORwrong = 0;
var localstorage = [];


var question1 = {
    question: 'What is the correct JavaScript syntax to display "Hello World"?',
    wronganswer1: 'response.write("Hello World")',
    wronganswer2: '"Hello World"',
    wronganswer3: '("Hello World")',
    rightanswer: 'console.log("Hello World");'
}

var question2 = {
    question: 'What is the square root of a flex nard?',
    wronganswer1: '75',
    wronganswer2: '6.28',
    wronganswer3: 'jibberish',
    rightanswer: 'a cup of boogers'
}
var questions = [question1, question2];


startQuiz.addEventListener('click', playQuiz);
highScores.addEventListener('click', displayScores);
//also stolen from stack overflow
document.addEventListener('click', function(event){
    if((event.target.tagName=='BUTTON') && (event.target.textContent != "Start")){
        answerCheck(event.target);
    }
    if(event.target.tagName=='INPUT' && event.target.getAttribute("id") == "Submit") {
        localstorage.push(localStorage.getItem("highscores"));
        localstorage.push({Name: document.getElementById('name').value, Score: score})
        localStorage.setItem("highscores", localstorage);
    }
})

myInterval = setInterval(function(){
    if (keepPlaying) {
        timer.textContent = startTime;
        startTime--
    }
    endGame()
    //still needs post quiz input line and local storage values think about storing name and score as object
    //then recall that object and separate into keys and values to neatly display 'Name: bob Score:30' or 
    // experiment with using a table (if time allows also generating)

}, 1000)

function playQuiz(){
    reset();
    keepPlaying = true;
    displayQuestion();
}

function displayScores(){
    headerEl.style.display = 'none';
    displaySection.innerHTML = '';
    localstorage = localStorage.getItem("highscores");
    for (let i = 0; i < localstorage.length; i++) {
        paraElArray[i] = document.createElement('p');
        displaySection.appendChild(paraElArray[i]);
        paraElArray[i].textContent = localstorage[i];
    }
}

function displayQuestion(){
    displaySection.innerHTML = '';
    paraElArray[0] = document.createElement("p");
    displaySection.appendChild(paraElArray[0]);

    var testArr = Object.values(questions[counter]);
    paraElArray[0].textContent = testArr.shift();
    shuffleArray(testArr);
    
    for (let i = 0; i < testArr.length; i++) {
        buttonElArray[i] = document.createElement("button");
        displaySection.appendChild(buttonElArray[i]);
        buttonElArray[i].textContent = testArr[i];
    }

}

//modern Durstenfeld Shuffle courtesy of ashleedawg via stackoverflow
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function answerCheck(button){
    if ((button.textContent==questions[counter].rightanswer)  && (keepPlaying)) {
        displayCorrect()
        counter++;
        score += 10;
        if (counter < questions.length ){   
           setTimeout(displayQuestion, 2000);
        }
    } else if (keepPlaying){
        displayIncorrect()
        counter++
        startTime -= 10;
        if (counter < questions.length ){   
            setTimeout(displayQuestion, 2000);
        }
    }

}

function reset(){
    counter = 0
    score = 0
    startTime = 120;
    keepPlaying = false;
    timer.textContent = startTime;
}

function endGame(){
    if (((counter==questions.length) && (startTime > 0)) || (startTime == 0)) {
        keepPlaying = false;
        displaySection.innerHTML = '';
        addScore();
        paraElArray[0] = document.createElement("p");
        displaySection.appendChild(paraElArray[0]);
        paraElArray[0].textContent = "Your Score: "+score;
    }
}

function displayCorrect() {
    var correct = document.createElement("p");
    displaySection.appendChild(correct);
    correct.textContent = "Correct!";
}

function displayIncorrect() {
    var correct = document.createElement("p");
    displaySection.appendChild(correct);
    correct.textContent = "Incorrect!";
}
// ----------------------------Question display section end--------------------------------

function addScore(){
    displaySection.appendChild(labelEl);
    displaySection.appendChild(inputVar);
    displaySection.appendChild(submitEl);
    submitEl.setAttribute('type','submit');
    submitEl.setAttribute('value','Submit');
    submitEl.setAttribute('id','Submit');
    submitEl.textContent = 'Submit';
    labelEl.textContent = 'Enter your name to save it to High Scores';
    inputVar.style.maxWidth = "200px";
    inputVar.setAttribute('id', 'name');
}


