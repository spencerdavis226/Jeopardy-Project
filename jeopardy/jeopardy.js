// categories is the main data structure for the app; it looks like this:
// [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
let categories = []; // The array holding all the categories and their clues
const NUM_CATEGORIES = 6; // Number of categories to show
const NUM_QUESTIONS_PER_CAT = 5; // Number of questions per category

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
async function getCategoryIds() {
  const response = await axios.get(
    'https://rithm-jeopardy.herokuapp.com/api/categories?count=100' // Fetch 100 categories
  );

  // Shuffle the categories and pick NUM_CATEGORIES random ones
  const shuffled = _.shuffle(response.data);
  return shuffled.slice(0, NUM_CATEGORIES).map((category) => category.id); // Return just the category IDs
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
  // Make the API request to get category data
  const response = await axios.get(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}` // Fetch data for a specific category
  );

  // Extract the clues from the response
  const rawClues = response.data.clues;

  // Create an array to hold the formatted clues
  const formattedClues = rawClues
    .slice(0, NUM_QUESTIONS_PER_CAT) // Get the first NUM_QUESTIONS_PER_CAT clues
    .map(function (clue) {
      return {
        question: clue.question, // Store the question
        answer: clue.answer, // Store the answer
        showing: null, // Indicates whether the clue is hidden, showing the question, or showing the answer
      };
    });

  // Return a full object with title and clues
  return {
    title: response.data.title, // The category title
    clues: formattedClues, // The array of formatted clues
  };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */
async function fillTable() {
  // Create the table if it doesn't exist
  let table = document.querySelector('#jeopardy');
  if (!table) {
    table = document.createElement('table'); // Create the table element
    table.id = 'jeopardy'; // Set the table's id
    document.body.prepend(table); // Add it to the top of the body
  }

  // Clear any existing table content
  table.innerHTML = '';

  // Create <thead> and add a row for category titles
  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (let category of categories) {
    const th = document.createElement('th'); // Create a <th> for each category title
    th.textContent = category.title; // Set the title as the text of the <th>
    headerRow.appendChild(th); // Append the <th> to the header row
  }
  tableHead.appendChild(headerRow); // Append the row to the <thead>
  table.appendChild(tableHead); // Append the <thead> to the table

  // Create <tbody> and add rows for the clues
  const tableBody = document.createElement('tbody');
  for (let rowIdx = 0; rowIdx < NUM_QUESTIONS_PER_CAT; rowIdx++) {
    const tableRow = document.createElement('tr');
    for (let colIdx = 0; colIdx < NUM_CATEGORIES; colIdx++) {
      const cell = document.createElement('td');
      cell.textContent = '?'; // Initially, show a "?" in each cell
      cell.dataset.category = colIdx; // Store the category index in the cell's data
      cell.dataset.clue = rowIdx; // Store the clue index in the cell's data
      cell.addEventListener('click', handleClick); // Attach the click event handler
      tableRow.appendChild(cell); // Add the cell to the row
    }
    tableBody.appendChild(tableRow); // Add the row to the table body
  }
  table.appendChild(tableBody); // Append the table body to the table
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 */
function handleClick(evt) {
  const cell = evt.target; // Get the clicked cell
  const categoryIdx = +cell.dataset.category; // Category index from data-category
  const clueIdx = +cell.dataset.clue; // Clue index from data-clue

  // Get the clue object from the categories array
  const clue = categories[categoryIdx].clues[clueIdx];

  // Determine what to display based on the current `showing` state
  if (!clue.showing) {
    // If nothing is showing, display the question
    cell.textContent = clue.question;
    clue.showing = 'question'; // Set showing to "question"
  } else if (clue.showing === 'question') {
    // If the question is showing, display the answer
    cell.textContent = clue.answer;
    clue.showing = 'answer'; // Set showing to "answer"
  } else if (clue.showing === 'answer') {
    // If the answer is already showing, ignore the click
    return;
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
function showLoadingView() {
  // Find or create a loading element
  let loadingElement = document.querySelector('#loading');
  if (!loadingElement) {
    loadingElement = document.createElement('div');
    loadingElement.id = 'loading'; // Set the ID for the loading spinner

    // Add a spinner element (no text here)
    document.body.prepend(loadingElement); // Add it to the top of the body
  }

  // Disable the Restart button while loading
  const restartButton = document.querySelector('#restart');
  if (restartButton) {
    restartButton.disabled = true; // Disable the button
    restartButton.style.backgroundColor = '#ccc'; // Change button color to indicate it’s disabled
    restartButton.style.cursor = 'not-allowed'; // Change the cursor to indicate it’s disabled
  }
}

function hideLoadingView() {
  // Remove the loading element
  const loadingElement = document.querySelector('#loading');
  if (loadingElement) {
    loadingElement.remove();
  }

  // Re-enable the Restart button
  const restartButton = document.querySelector('#restart');
  if (restartButton) {
    restartButton.disabled = false; // Re-enable the button
    restartButton.style.backgroundColor = '#115ff4'; // Reset the button’s background color
    restartButton.style.cursor = 'pointer'; // Reset the cursor
  }
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 */
async function setupAndStart() {
  try {
    // Show loading spinner while the game is being set up
    showLoadingView();

    // Get 6 random category IDs
    const categoryIds = await getCategoryIds();

    // Fetch data for each category and populate the `categories` array
    categories = [];
    for (let catId of categoryIds) {
      const category = await getCategory(catId);
      categories.push(category);
    }

    // Fill the game board with categories and placeholders
    fillTable();

    // Hide the loading spinner once the game is set up
    hideLoadingView();
  } catch (err) {
    // If there's an error, log it and alert the user
    console.error('Error setting up the game:', err);
    alert('Something went wrong while setting up the game. Please try again.');
    hideLoadingView(); // Ensure the spinner is hidden even if there's an error
  }
}

/** On click of start / restart button, set up game. */

/** On page load, add event handler for clicking clues */
document.addEventListener('DOMContentLoaded', function () {
  // Check if #restart button exists
  let restartButton = document.querySelector('#restart');

  // If it doesn't exist, create it dynamically
  if (!restartButton) {
    restartButton = document.createElement('button'); // Create a button element
    restartButton.id = 'restart'; // Add id="restart"
    restartButton.textContent = 'Restart'; // Set button text
    document.body.prepend(restartButton); // Add it to the top of the body
  }

  // Safely add the event listener to the restart button
  restartButton.addEventListener('click', setupAndStart); // Trigger game setup on click
});

// This is a small change to trigger the pull request
