var startTime = 120;
var score = 0;
var timer = document.getElementById('timer');
timer.textContent = startTime;
var highScores = document.getElementById("scores");
var startQuiz = document.getElementById("start");
var displaySection = document.getElementById('displayBox');
var headerEl = document.getElementById("header");
var buttonElArray = [];
var paraElArray = [];
var questionRandomizer = [];
var counter = 0;
var keepPlaying = false;
var rightORwrong = 0;


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
document.addEventListener('click', function(event){
    if((event.target.tagName=='BUTTON') && (event.target.textContent != "Start")){
        answerCheck(event.target);
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
        counter++;
        score += 10;
        if (counter < questions.length ){   
            displayQuestion();
        }
    } else if (keepPlaying){
        counter++
        startTime -= 10;
        if (counter < questions.length ){   
            displayQuestion();
        }
    }

}

function reset(){
    counter = 0
    startTime = 120;
    keepPlaying = false;
    timer.textContent = startTime;
}

function endGame(){
    if ((counter==questions.length) && (startTime > 0)) {
        console.log("you win");
        reset();
    } if (startTime == 0) {
        console.log("loser");
        reset();
    }
}
