const internals = {
    elements: {},
    currentQuestionIndex: null,
    answers: [],
};

const externals = {};

internals.elements.app = document.getElementById("app");
const playButton = document.getElementById("buttonToPlay");
const mainTitle = document.getElementById("mainTitle");

internals.showQuestions = function (questions) {
    let correctAnswer = questions[internals.currentQuestionIndex].correct_answer;
    let incorrectAnswers = questions[internals.currentQuestionIndex].incorrect_answers;
    let optionsList = incorrectAnswers.slice();
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer);
    console.log("Correct Answer:", correctAnswer);
    console.log("Incorrect Answers:", incorrectAnswers);
    console.log("Options List:", optionsList);
    return optionsList;
};

internals.createFilmQuestionsHTML = function (questions) {
    const optionsList = internals.showQuestions(questions);

    let html = `
        <div class="playMenu">
            <p id="numberOfAnswers"> Progress: ${internals.currentQuestionIndex + 1}/10 </p>
            <progress id="answersBar" max="100" value="${internals.answers.length * 10}"></progress>
            <div class="informationAboutQuestion">
                <p id="category"><strong>Category: </strong>${questions[internals.currentQuestionIndex].category}</p>
                <p id="difficulty"><strong>Difficulty: </strong>${questions[internals.currentQuestionIndex].difficulty}</p>
            </div>                
            
            <p id="question"><strong>Question: </strong>${questions[internals.currentQuestionIndex].question}</p>
            <p id="answerMessage"></p>
            <div class="answerButtons">
                <p><button id="answerOne">${optionsList[0]}</button></p>
                <p><button id="answerTwo">${optionsList[1]}</button></p>
                <p><button id="answerThree">${optionsList[2]}</button></p>
                <p><button id="answerFour">${optionsList[3]}</button></p> 
            </div>
            <div class="checkAndNextButtons">
                <p><button id="restartGame">Restart Game</button></p>
            </div>
        </div>
    `;
    return html;
};


internals.createEndGameHTML = function () {
    return `<div class = "gameOverDiv">
    <p id="gameOverText">The Game is Over</p>
    <p id="gameOvertDetailsText"> Number of correct answers: </p>
    <p><button id="restartGame">Restart Game</button></p>
    </div>`;
};

internals.renderQuestions = function (questions) {
    playButton.addEventListener("click", function () {
        playButton.remove();
        mainTitle.remove();
        window.location.hash = "#playingMenu";
        internals.currentQuestionIndex = 0; // Initialize index to 0
        internals.elements.app.innerHTML = internals.createFilmQuestionsHTML(questions);
        internals.checkAnswer(questions);

    });
};

internals.increaseNumberOfAnswersBar = function (answersBar) {
    const valueToIncrease = 10;

    console.log('Before Increase:', answersBar.value);

    if (answersBar.value < answersBar.max) {
        answersBar.value += valueToIncrease;
    }

    console.log('After Increase:', answersBar.value);
};

// I want to print the correct answer when the incorrect answer is selected
internals.checkIfAnswerIsCorrect = function (questions, button) {
    const correctAnswer = questions[internals.currentQuestionIndex].correct_answer;
    const isCorrect = button.textContent === correctAnswer;
    answerMessage.textContent = isCorrect ? "Correct!" : "Incorrect!";
}


internals.checkAnswer = function (questions) {
    const answerButtons = document.querySelectorAll('.answerButtons button');
    const answersBar = document.getElementById("answersBar");

    if (answerButtons.length === 4) {
        answerButtons.forEach(button => {
            button.addEventListener("click", function () {
                console.log("Click button: ", button.textContent);
                internals.increaseNumberOfAnswersBar(answersBar);
                internals.answers.push(button.textContent);
                console.log(internals.answers);

                // disabled buttons
                answerButtons.forEach(btn => btn.setAttribute('disabled', 'true'));
                internals.checkIfAnswerIsCorrect(questions, button);

                // Move to the next question after a delay (you can customize the delay)
                setTimeout(() => {
                    internals.currentQuestionIndex++;
                    if (internals.currentQuestionIndex < questions.length) {

                        //NEED TO: repetead code - lines 67 an 68 - create a function

                        internals.elements.app.innerHTML = internals.createFilmQuestionsHTML(questions);
                        internals.checkAnswer(questions);
                    } else {
                        // PRINT THE NUMBER OF CORRECT ANSWERS
                        internals.renderEndGame();
                    }
                }, 2000);
            });
        });
    } else {
        console.error("Four answer buttons not found.");
    }
};

//not being used YET
internals.restartGame = function (questions) {
    // reset variables to their initial values
    internals.currentQuestionIndex = 0;
    internals.answers = [];

    // remove any correctness messages
    const correctnessMessage = document.getElementById("answerMessage");
    correctnessMessage.textContent = "";

    // re-enable answer buttons
    const answerButtons = document.querySelectorAll('.answerButtons button');
    answerButtons.forEach(btn => btn.removeAttribute('disabled'));

    // render the first question again
    internals.elements.app.innerHTML = internals.createFilmQuestionsHTML(questions);
    internals.checkAnswer(questions);
};


internals.renderEndGame = function () {
    internals.elements.app.innerHTML = internals.createEndGameHTML();
};

externals.render = function (questions) {
    if (questions) {
        internals.renderQuestions(questions);

    }
};

export default externals;
