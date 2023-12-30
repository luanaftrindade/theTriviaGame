import playingView from '../views/playing-view.mjs';
import triviaService from '../services/trivia-service.mjs';

const externals = {};
const internals = {};

// Flag to track whether questions have been fetched
let questionsFetched = false;

externals.start = function () {
    internals.buttonHandler();
};

internals.buttonHandler = async function () {
    try {
        // Only fetch questions if not already fetched
        if (!questionsFetched) {
            const questions = await triviaService.getTriviaQuestions();
            console.log('Questions:', questions);
            playingView.render(questions);

            // Set the flag to true to indicate questions have been fetched
            questionsFetched = true;
        } else {
            console.log('Questions already fetched. Skipping additional requests.');
        }
    } catch (error) {
        console.error("Error handling button click:", error);
    }
};

export default externals;