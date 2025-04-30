// The lesson data object
var lesson_data = { 
    "12": { 
        "words": { 
            "deluge": {
                "def": "a flood; an overwhelming rush",
            },
            "catholic": {
                "def": "universal; wide-ranging",
            },
            "eerie": {
                "def": "weird; mysterious; strange and frightening",
            },
            "martial": {
                "def": "warlike; relating to the military",
            },
            "anthropomorphic": {
                "def": "attributing human characteristics or qualities to objects, animals, or gods",
            },
            "beneficiary": {
                "def": "one who receives benefits",
            },
            "careen": {
                "def": "to swerve or lurch from side to side while in motion",
            },
            "aplomb": {
                "def": "self-confidence",
            },
            "guile": {
                "def": "slyness and cunning in dealing with others",
            },
            "modicum": {
                "def": "a small amount",
            },
            "rancid": {
                "def": "having a bad taste or smell",
            },
            "havoc": {
                "def": "great destruction; chaos",
            },
            "pall": {
                "def": "something that covers or conceals",
            },
            "languish": {
                "def": "to become weak or feeble; to lose strength",
            },
            "fester": {
                "def": "to grow embittered over time; to rot",
            }
        }
    }
};

// Function to get a new random word and display its definition
function getNewPrompt() {
    // Select a random word from the lesson
    var lesson = lesson_data["12"];
    var words = lesson.words;
    var wordKeys = Object.keys(words);

    // Remove words that have already been used
    var unusedWords = wordKeys.filter(word => !usedWords.has(word));

    if (unusedWords.length === 0) {
        document.getElementById('feedback').textContent = 'You have completed the quiz!';
        document.getElementById('feedback').style.color = 'blue';
        return null; // No more words to ask
    }

    var randomWordKey = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    var randomWord = words[randomWordKey];

    // Mark the word as used
    usedWords.add(randomWordKey);

    // Set the prompt text to show the definition
    document.getElementById('prompt').textContent = "Definition: " + randomWord.def;
    return randomWordKey;  // Return the correct word key to compare against
}

// Set to keep track of used words
var usedWords = new Set();
var totalWords = Object.keys(lesson_data["12"].words).length;
var correctAnswers = 0;

// Initially set the first word prompt
var correctWord = getNewPrompt();

// Handle form submission
document.getElementById('testForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the user input and compare it to the correct word
    var userAnswer = document.getElementById('userInput').value.trim().toLowerCase();

    // Check if the user input matches the correct word (ignoring case)
    if (userAnswer === correctWord) {
        document.getElementById('feedback').textContent = 'Correct! Well done!';
        document.getElementById('feedback').style.color = 'green';

        // Clear the input field for the next try
        document.getElementById('userInput').value = '';

        // Update correct answers
        correctAnswers++;

        // Update score display
        document.getElementById('score').textContent = `Correct answers: ${correctAnswers} out of ${totalWords}`;

        // Get a new word and prompt
        correctWord = getNewPrompt(); // Set a new correct word
    } else {
        document.getElementById('feedback').textContent = 'Oops! That’s not correct. Try again.';
        document.getElementById('feedback').style.color = 'red';
    }
});