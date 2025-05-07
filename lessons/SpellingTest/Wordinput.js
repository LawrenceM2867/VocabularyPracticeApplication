var current_lessons = []

var usedWords = new Set();
var totalWords;
var correctAnswers = 0;

var correctWord;

var current_lesson_word_data = {};

function onload() {
    current_lessons = JSON.parse(sessionStorage.getItem("current_lessons"))
    if (current_lessons.length == 0) {window.location.href = "../../index.html";}

    var title = "Spelling test for lesson "
    for (num in current_lessons) {
        if (title == "Spelling test for lesson ") {
            title += current_lessons[num]
        } else {
            title += ", " + current_lessons[num]
        }
        
        Object.assign(current_lesson_word_data, lesson_data[current_lessons[num]].words)
    }

    document.getElementById("title").innerHTML = title

    correctWord = getNewPrompt()
    totalWords = Object.keys(current_lesson_word_data).length;
    document.getElementById('score').textContent = `Correct answers: 0 out of ${totalWords}`;
}

function getNewPrompt() {
    var words = current_lesson_word_data;
    var wordKeys = Object.keys(words);

    var unusedWords = wordKeys.filter(word => !usedWords.has(word));

    if (unusedWords.length === 0) {
        document.getElementById('feedback').textContent = 'You have completed the quiz!';
        document.getElementById('feedback').style.color = 'blue';
        return null;
    }

    var randomWordKey = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    var randomWord = words[randomWordKey];

    usedWords.add(randomWordKey);

    document.getElementById('prompt').textContent = "Definition: " + randomWord.def;
    return randomWordKey;
}

document.getElementById('testForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userAnswer = document.getElementById('userInput').value.trim().toLowerCase();

    if (userAnswer === correctWord) {
        document.getElementById('feedback').textContent = 'Correct! Well done!';
        document.getElementById('feedback').style.color = 'green';

        document.getElementById('userInput').value = '';
        correctAnswers++;
        document.getElementById('score').textContent = `Correct answers: ${correctAnswers} out of ${totalWords}`;

        correctWord = getNewPrompt();
    } else {
        document.getElementById('feedback').textContent = 'Oops! That’s not correct. Try again.';
        document.getElementById('feedback').style.color = 'red';
    }
});