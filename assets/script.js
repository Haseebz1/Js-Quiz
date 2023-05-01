
var startQuiz = document.getElementById('startQuiz'); 
var playAgain = document.getElementById('playAgain');
var appTimer = document.getElementById('appTimer');

var viewResult = document.getElementById('viewScores');
var welcome = document.getElementById('welcome');
var result = document.getElementById('result');
var saveScore = document.getElementById('saveScore');

var quiz = document.getElementById('quiz');
var options = document.getElementById('options');
var message = document.getElementById('message');

var summary = document.getElementById('summary');


var countdownTimer;
var score = 0;
var secondsLeft = 0;
var currentQuestion = 0;


function onSaveScore(e) {
    var initials = document.getElementById('initials').value;
    if (initials !== "") {
        localStorage.setItem(initials, score);
        document.getElementById('initials').value = '';
    }
}

function onViewResult() {
    window.location.href = 'scores.html';
}

function onSelectAnswer(e) {
    var correctAnswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;
    if (correctAnswer == userAnswer) {
        score++;
        displayMessage('Correct!');
    } else {
        secondsLeft = secondsLeft - 10;
        displayMessage('Wrong!');
    }
    displayQuestion();
}
function stopGame() {

  clearInterval(countdownTimer);

  appTimer.textContent = '';

  quiz.style.display = 'none';
  result.style.display = 'flex';

  summary.textContent = 'your score is: ' + score;
}

function displayMessage(msg) {
    message.textContent = msg;
    setTimeout(function () {
        message.textContent = '';
    }, 3000)
}



function onStartGame(){
    secondsLeft = 75;
    currentQuestion = 0;
    score = 0;
    countdownTimer = setInterval(function (){
        if(secondsLeft > 0){
          appTimer.textContent = secondsLeft;
        }else{
            stopGame();
        }
        secondsLeft--;
    }, 1000);
    welcome.style.display = 'none';
    result.style.display = 'none';
    quiz.style.display = 'block';

    displayQuestion();
}

function displayQuestion() {
  currentQuestion++;
  console.log('current question is ' + currentQuestion);
  if (currentQuestion >= questions.length) {
      stopGame();
      return;
  }

  var question = questions[currentQuestion];
  document.getElementById('question').textContent = question.title;


  options.innerHTML = '';

  for(var i = 0; i<question.choices.length; i++)
  {
      var option = document.createElement('div');
      option.textContent = question.choices[i];
      option.onclick = onSelectAnswer;
      option.classList.add('option');
      options.appendChild(option);
  }
}

startQuiz.addEventListener('click', onStartGame);
saveScore.addEventListener('click', onSaveScore);
viewResult.addEventListener('click',onViewResult);
playAgain.addEventListener('click', onStartGame);