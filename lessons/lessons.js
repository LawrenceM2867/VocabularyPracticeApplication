var current_lessons = []

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