var current_lessons = []
var current_lesson_word_data = {}

var all_options = []
var antonym_options = []
var current_antonym = "" 
var anwser_idx = -1

var score = 0
var num_of_ants = 0

var active = false
var got_wrong = false

var buttons = document.querySelectorAll("#anwsers button")

function onload() {
    current_lessons = JSON.parse(sessionStorage.getItem("current_lessons")) //get the current lessons

    var title = "Antonym quiz for lesson "
    for (num in current_lessons) {
        if (title == "Antonym quiz for lesson ") {
            title += current_lessons[num]
        } else {
            title += ", " + current_lessons[num]
        }
        
        Object.assign(current_lesson_word_data, lesson_data[current_lessons[num]].words)
    }

    document.getElementById("title").innerHTML = title //show the lesson names in the title

    for (word in current_lesson_word_data) { //iterates through all the words
        for (i in current_lesson_word_data[word].ant) {
            var data = {
                "ant" : current_lesson_word_data[word].ant[i],
                "word" : word
            }

            antonym_options.push(data)
            all_options.push(data)
        }
    }

    num_of_ants = antonym_options.length //set the number of antonyms to how many options there are
    document.getElementById("score").innerHTML = score + "/" + num_of_ants //display the starting score
    document.getElementById("done").style.display = "none" //hide the completed text thingy

    setQuestion() //sets the first question
}

function setQuestion() { //this sets the data for the questions
    current_antonym = antonym_options[Math.floor(Math.random() * antonym_options.length)] //the current antonym that's being questioned
    document.getElementById("question").innerHTML = current_antonym.ant //the question is set to the antonym for the user to see

    var correct_word = current_antonym.word //store the correct word for the current word
    var other_words = [] //initiate an array for all the other words
    
    for (data in all_options) {
        if (all_options[data].word != correct_word && !other_words.includes(all_options[data].word)) {
            other_words.push(all_options[data].word)
        }
    }

    anwser_idx = Math.floor(Math.random() * 4)

    buttons.forEach((button, i) => { //iterate through all the buttons
        document.getElementById("anwsers").children[i].style.background = "#000000" //resets the color for all the buttons
        if (i == anwser_idx) { //if this button is the one selected to be the correct one
            button.textContent = correct_word //set the text to the correct button
        } else { //if not the correct button
            var word = other_words[Math.floor(Math.random() * other_words.length)] //pick a word from the other word options
            other_words.splice(other_words.indexOf(word), 1) //remove it so it cannot be used again
            button.textContent = word //set the button's text to the selected word
        }
    })

    active = true //allows you to click on buttons
    got_wrong = false //reset the got wrong value
}

function buttonClicked(idx) { //runs when a button is clicked, idx is the number of the button
    if (active) { //if the user is allowed to click on buttons
        if (idx == anwser_idx) { //if it's the correct word
            document.getElementById("anwsers").children[idx].style.background = 'green' //make the button greeen
            active = false //you cannot click on buttons anymore

            if (!got_wrong) { //if the user got it right the first time
                score += 1 //increase the score by 1
                document.getElementById("score").innerHTML = score + "/" + num_of_ants //update the score
                antonym_options.splice(antonym_options.indexOf(current_antonym), 1) //that antonym is removed from the options left to use
            }
            
            if (antonym_options.length != 0) { //if there are still words left
                setTimeout(setQuestion, 1000) //update the question after 1 second
            } else { //if there are no more words left
                setTimeout(() => { //run everything in this inline function after 1 second
                    document.getElementById("done").style.display = "block" //show the finish text and restart button
                    document.getElementById("question").style.display = "none" //hide the questions and anwsers
                    document.getElementById("anwsers").style.display = "none"
                }, 1000)
            }
        } else { //if it's the wrong word
            document.getElementById("anwsers").children[idx].style.background = 'red' //make the button red
            got_wrong = true //the user got a question wrong
        }
    }
}