const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
const triviaService = {
    getTriviaQuestions: async function () {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.log("Error fetching questions:", error);
            throw error;
        }
    },
};
export default triviaService;