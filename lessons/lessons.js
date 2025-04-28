var current_lessons = []

function index_addLesson(lessonNum) { //sets the lesson # to use
    current_lessons.push(lessonNum) // add a lesson to the current lessons
    sessionStorage.setItem("current_lessons", JSON.stringify(current_lessons))
}

function lessons_onload() { //runs when the lessons page opens up
    current_lessons = JSON.parse(sessionStorage.getItem("current_lessons"))
    var title = "Lesson "
    for (num in current_lessons) {
        if (title == "Lesson ") {
            title += current_lessons[num]
        } else {
            title += ", " + current_lessons[num]
        }
    }

    document.getElementById("title").innerHTML = title //set the title to the lesson
}