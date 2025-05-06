var current_lessons = []
var current_lesson_word_data = {}

var synonym_options = []

function onload() {
    current_lessons = JSON.parse(sessionStorage.getItem("current_lessons")) //get the current lessons

    var title = "Synonym quiz for lesson "
    for (num in current_lessons) {
        if (title == "Synonym quiz for lesson ") {
            title += current_lessons[num]
        } else {
            title += ", " + current_lessons[num]
        }
        
        Object.assign(current_lesson_word_data, lesson_data[current_lessons[num]].words)
    }

    document.getElementById("title").innerHTML = title //show the lesson names in the title

    for (word in current_lesson_word_data) { //iterates through all the words
        synonym_options.push(current_lesson_word_data[word].def) //adds the definitions to the options
    }
}
