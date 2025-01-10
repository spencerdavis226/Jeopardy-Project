Jeopardy Game

Welcome to the Jeopardy Game project! This web application allows users to play a fun game of Jeopardy, where they can click on different categories and clues to view the corresponding questions and answers.

Description

This is a JavaScript-based game built with HTML, CSS, and JavaScript. The application fetches data from an external API, which provides various categories and questions for the game. The game dynamically loads categories and displays them on a grid. When a player clicks on a clue, the question is revealed, and after clicking again, the answer is shown.

Key Features:
• Dynamic Category Loading: Categories are randomly selected from an external API.
• Interactive Game Board: Click on clues to reveal the corresponding questions and answers.
• Restart Game: Reloads new categories and questions with the restart button.
• Responsive Design: Fully responsive design to work across various devices.

Technologies Used:
• HTML for the game structure and layout.
• CSS for styling and making the game visually appealing.
• JavaScript for logic and interaction.
• Axios for fetching data from the external API.
• Lodash for utility functions like shuffling the categories.

The API

In order to fetch the correct data, we use an external API hosted by rithmschool’s Jeopardy API.

Endpoints:
• GET https://rithm-jeopardy.herokuapp.com/api/categories?count=[integer]: Retrieves a list of categories.
• GET https://rithm-jeopardy.herokuapp.com/api/category?id=[integer]: Retrieves questions for a specific category.

Example API Response:

For fetching categories:

let res = await axios.get('https://rithm-jeopardy.herokuapp.com/api/categories?count=100');
console.log(res.data); // Example output:
[
{
"id": 2,
"title": "baseball",
"clues_count": 5
},
{
"id": 3,
"title": "odd jobs",
"clues_count": 5
},
{
"id": 4,
"title": "movies",
"clues_count": 5
},
// ... More categories
]

For retrieving questions in a specific category:

let res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=[integer]`);

Data structure:

The API returns data with each category containing an array of clues. Each clue has a question and an answer, which will be shown as the player clicks on the clue.

Setup

To run the Jeopardy game locally: 1. Clone the repository:

git clone https://github.com/yourusername/jeopardy-project.git

    2.	Navigate to the project directory:

cd jeopardy-project

    3.	Open index.html in your browser to start playing.

How It Works: 1. Fetch Categories: The application makes an API request to fetch random categories. 2. Populate the Game Board: Once categories are fetched, the game board is populated with category titles. 3. Clicking on a Clue: When the user clicks on a clue, the corresponding question is revealed. Upon clicking again, the answer appears. 4. Restart the Game: The “Restart” button reloads new categories and questions, giving players a fresh start.

Future Enhancements:
• Add a timer for each question.
• Implement a scoring system.
• Customize the visual theme and animations.

Let me know if you’d like to adjust any parts of this!
