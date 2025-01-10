# It's Jeopardy!

## The API

In order to fetch the correct data you will be using an external API. The "endpoint" is https://rithm-jeopardy.herokuapp.com/api.

We will need two following subsequent endpoints:

1. GET "https://rithm-jeopardy.herokuapp.com/api/categories?count=[integer]"
2. GET "https://rithm-jeopardy.herokuapp.com/api/category?id=[integer]"

## Retrieving Category Data

Firstly, we will need to retrieve **Category** data for our questions. The format for the URL is the following:

GET "https://rithm-jeopardy.herokuapp.com/api/categories?count=[integer]"

To review our concepts. The **API** documentation is telling us that we can plug in a number in the **count=[integer]** part of the URL and the API will fetch us the data which we need.

The GET request will fetch us the following data:

```
let res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories?count=100`)
// NOTICE WE HAVE PROVIDED THE VALUE 100 FOR THE <count> query, what happens if the value is changed? //
// what is in our res variable? //
// checking out res.data will produce the following result //
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
    {
        "id": 6,
        "title": "\"cat\" egory",
        "clues_count": 5
    },
    // and so on until 100 objects in an array
]
```

**Retrieving Questions in a Specific Category**

Now that you know how to retrieve all available categories, think about how you can retrieve questions in a specific category:

To review, the format for the URL is the following:

GET "https://rithm-jeopardy.herokuapp.com/api/category?id=[**integer**]"

Just like in the previous example the **API** is telling us that if we plug in a number in the **id=integer** part of the **URL** we will receive an appropriate response.

For example:

```
let res = await axios.get(`"https://rithm-jeopardy.herokuapp.com/api.... What should our URL look like here ... ?`)
// HINT: Look at the example above //
// what is in our res variable? //
// what will our result be? //
// Good luck! //
};
```

**Working Further with the API**

Before you begin the project, explore the **API**. What happens when you limit the responses in the first **URL**? (i.e 'count=5') or if you try to GET a Category which does NOT exist (i.e "id=0").

**Note**: This is not the original Jeopardy API from the JService.io platform. The original one had a lot more categories and some 200K questions. However, that portal went down. We worked around it using an alternate API hosted by rithmschool. So, unlike the original API, this API has only a limited number of categories and questions in each category. However, it's more than sufficient to use it and build a front end application.

View the rubric for this assessment [here](https://storage.googleapis.com/hatchways.appspot.com/employers/springboard/student_rubrics/Jeopardy!%20-%20Student%20Guide.pdf)
