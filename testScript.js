const axios = require('axios');

async function fetchCategoryQuestions(categoryId) {
  const res = await axios.get(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=${categoryId}`
  );
  console.log(res.data); // Log the questions for the category
}

// Call the function with a category ID
fetchCategoryQuestions(2); // Replace 2 with the actual ID you want to test
