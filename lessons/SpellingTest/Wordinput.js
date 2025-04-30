var current_lessons = []

//Set to keep track of used words
var usedWords = new Set();
var totalWords;
var correctAnswers = 0;

//Initially set the first word prompt
var correctWord;

//The lesson data object
var current_lesson_word_data = {};

function onload() {
    current_lessons = JSON.parse(sessionStorage.getItem("current_lessons")) //get the current lessons

    var title = "Spelling test for lesson "
    for (num in current_lessons) {
        if (title == "Spelling test for lesson ") {
            title += current_lessons[num]
        } else {
            title += ", " + current_lessons[num]
        }
        
        Object.assign(current_lesson_word_data, lesson_data[current_lessons[num]].words)
    }

    document.getElementById("title").innerHTML = title //show the lesson names in the title

    correctWord = getNewPrompt()
    totalWords = Object.keys(current_lesson_word_data).length;
    document.getElementById('score').textContent = `Correct answers: 0 out of ${totalWords}`;
}

//Function to get a new random word and display its definition
function getNewPrompt() {
    //Select a random word from the lesson
    var words = current_lesson_word_data;
    var wordKeys = Object.keys(words);

    //Remove words that have already been used
    var unusedWords = wordKeys.filter(word => !usedWords.has(word));

    if (unusedWords.length === 0) {
        document.getElementById('feedback').textContent = 'You have completed the quiz!';
        document.getElementById('feedback').style.color = 'blue';
        return null; //No more words to ask
    }

    var randomWordKey = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    var randomWord = words[randomWordKey];

    //Mark the word as used
    usedWords.add(randomWordKey);

    //Set the prompt text to show the definition
    document.getElementById('prompt').textContent = "Definition: " + randomWord.def;
    return randomWordKey;  //Return the correct word key to compare against
}

//Handle form submission
document.getElementById('testForm').addEventListener('submit', function(event) {
    event.preventDefault();

    //Get the user input and compare it to the correct word
    var userAnswer = document.getElementById('userInput').value.trim().toLowerCase();

    //Check if the user input matches the correct word (ignoring case)
    if (userAnswer === correctWord) {
        document.getElementById('feedback').textContent = 'Correct! Well done!';
        document.getElementById('feedback').style.color = 'green';

        //Clear the input field for the next try
        document.getElementById('userInput').value = '';

        //Update correct answers
        correctAnswers++;

        //Update score display
        document.getElementById('score').textContent = `Correct answers: ${correctAnswers} out of ${totalWords}`;

        //Get a new word and prompt
        correctWord = getNewPrompt(); //Set a new correct word
    } else {
        document.getElementById('feedback').textContent = 'Oops! That’s not correct. Try again.';
        document.getElementById('feedback').style.color = 'red';
    }
});