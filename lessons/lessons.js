var current_lessons = []

var wordContainer = document.getElementById("word-container");

function index_onload() {
    sessionStorage.setItem("current_lessons", JSON.stringify([]))
    document.getElementById("gotoall").style.display = "none"
}

function index_addLesson(lessonNum, box) { //sets the lesson # to use
    if (!current_lessons.includes(lessonNum)) {
        current_lessons.push(lessonNum) // add a lesson to the current lessons
    } else {
        current_lessons.splice(current_lessons.indexOf(lessonNum), 1)
    }

    sessionStorage.setItem("current_lessons", JSON.stringify(current_lessons))

    if (current_lessons.length != 0) {
        document.getElementById("gotoall").style.display = "block"
    } else {
        document.getElementById("gotoall").style.display = "none"
    }
}

function index_setLesson(lessonNum) {
    sessionStorage.setItem("current_lessons", JSON.stringify([lessonNum]))
}


function lessons_onload() { 
    // Get current lessons from sessionStorage
    current_lessons = JSON.parse(sessionStorage.getItem("current_lessons"));
    
    // Set the title dynamically based on the current lessons
    var title = "Lesson ";
    for (num in current_lessons) {
        if (title == "Lesson ") {
            title += current_lessons[num];
        } else {
            title += ", " + current_lessons[num];
        }
    }
    document.getElementById("title").innerHTML = title; // Set the title to the lesson

    // Get the container element where we will display the word boxes
    wordContainer.innerHTML = ""; // Clear the container first in case there's any leftover content

    for (lesson in current_lessons) {addKards(current_lessons[lesson]);}
}

function addKards(lessonId) {
    console.log(lessonId)
    var lesson = lesson_data[lessonId]; // Retrieve the lesson object based on lessonId
    console.log(lesson)
    // Loop through each word in the lesson
    for (var word in lesson.words) {
        var wordDetails = lesson.words[word]; // Get details for each word

        // Create a div for the word box
        var wordBox = document.createElement("div");
        wordBox.classList.add("word-box"); // Add a class for styling

        // Create and append the word title (e.g., "deluge")
        var wordTitle = document.createElement("h3");
        wordTitle.textContent = word; // The word name
        wordBox.appendChild(wordTitle);

        // Create and append the part of speech (e.g., "n" for noun)
        var partOfSpeech = document.createElement("p");
        partOfSpeech.textContent = "(" + wordDetails.ps + ") " + wordDetails.def; // e.g., "n" or "adj"
        wordBox.appendChild(partOfSpeech);

        // Append the word box to the word container
        wordContainer.appendChild(wordBox);
    }
}
