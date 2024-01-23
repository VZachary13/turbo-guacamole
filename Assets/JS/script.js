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
    question: 'What is the correct JavaScript syntax to write "Hello World"?',
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

setInterval(function(){
    if (keepPlaying) {
        timer.textContent = startTime;
        startTime--
        
        
    }
}, 1000)

function playQuiz(){
    rightORwrong = 0;
    keepPlaying = true;
    displayQuestion();
    //counter++; need to be on success or fail reset function
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

    // paraElArray[0].textContent = questions[counter].question;
    // buttonElArray[0].textContent = questions[counter].wronganswer1
    // buttonElArray[1].textContent = questions[counter].wronganswer2
    // buttonElArray[2].textContent = questions[counter].wronganswer3
    // buttonElArray[3].textContent = questions[counter].rightanswer

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function answerCheck(button){
    if (button.textContent==questions[counter].rightanswer) {
        rightORwrong = true
    } else {
        rightORwrong = false
    }
    // must figure out way to check without it automatically running as true or false
    // if (rightORwrong == true) {
    //     score += 10;
    //     counter++;
    //     playQuiz();
    // } if (rightORwrong == false) {
    //     counter++
    //     timer -= 10;
    //     playQuiz();
    // }
}
