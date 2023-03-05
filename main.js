(function () {
    let containerEL = document.querySelector(".container")
let form = document.querySelector("#quiz_form")
let queEl = document.querySelector(".qus")
let optionEL = document.querySelector(".all_options")
let buttonEL = document.querySelector(".buttons")
let scoreEL = document.querySelector(".score-num")
let answeredEL = document.querySelector(".answered-num")

let question, answer;
let options = []
let score = 0
let answeredQUS = 0

window.addEventListener("DOMContentLoaded", quizApp)


function quizApp() {
    addplaceHolder()
    updateScore()
    fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => {
            response = response.json()
            return response
        })
        .then((data) => {


            data = data.results

            question = data[0].question
            options = []
            answer = data[0].correct_answer
            data[0].incorrect_answers.map(option => options.push(option))
            // options.splice(Math.floor(Math.random()* options.length +1),0 , answer)
            options.push(answer)

            generateTemplate(question, options)


        }).catch((err)=>{
            console.log("ERROR",err.message);
        })
}


form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (e.target.quiz.value) {
        checkQuiz(e.target.quiz.value)
        e.target.querySelector("button").style.display = "none"
        generateButtons()
    } else {
        return
    }

})




function generateTemplate(question, options) {
removePlaceholder()
    queEl.innerHTML = question
    optionEL.innerHTML = options
    optionEL.innerHTML = ""
    options.map((option, index) => {
        const item = document.createElement("div")
        item.classList.add("option")
        item.innerHTML = `
    <input type="radio" id="option${index + 1}" value="${option}" name="quiz">
<label for="option${index + 1}">${option}</label>`

        optionEL.appendChild(item)

    })

}

function checkQuiz(selected) {
    answeredQUS++
    if (selected === answer) {
        score++

    }

updateScore()
form.quiz.forEach(input => {
    if (input.value === answer) {
        input.parentElement.classList.add("correct")
    }
});
}

function updateScore(){

    scoreEL.innerHTML = score
    answeredEL.innerHTML = answeredQUS
    

}


function generateButtons(){
    let finishBtn = document.createElement("button")
    finishBtn.innerHTML = "finish" 
    finishBtn.setAttribute("type","button")
    finishBtn.classList.add("finish-btn")
    buttonEL.appendChild(finishBtn)
    let nextBtn = document.createElement("button")
    nextBtn.innerHTML = "Next Quiz" 
    nextBtn.setAttribute("type","button")
    nextBtn.classList.add("next-btn")
    buttonEL.appendChild(nextBtn)


    finishBtn.addEventListener("click",finishQuiz)
    nextBtn.addEventListener("click",NextQuiz)

}
function NextQuiz(){
    const nextBtn = document.querySelector(".next-btn")
    const finishBtn = document.querySelector(".finish-btn")

    buttonEL.removeChild(nextBtn)
    buttonEL.removeChild(finishBtn)


    buttonEL.querySelector(`button[type="submit"]`).style.display = "block"
    quizApp()
}



function finishQuiz(){
    const nextBtn = document.querySelector(".next-btn")
    const finishBtn = document.querySelector(".finish-btn")

    buttonEL.removeChild(nextBtn)
    buttonEL.removeChild(finishBtn)


    buttonEL.querySelector(`button[type="submit"]`).style.display = "block"

    const overlay = document.createElement("div")
    overlay.classList.add("result-overlay")


    overlay.innerHTML = `
    <div class="final-result">${score}/${answeredQUS}</div>
<button>Play Again</button>`
containerEL.appendChild(overlay)

document.querySelector(".result-overlay button").addEventListener("click",()=>{
    containerEL.removeChild(overlay)
    playAgain()
})


}


function playAgain() {
    score = 0
    answeredQUS = 0
    quizApp()
}

function addplaceHolder(){    
const placeholder = document.createElement("div")
placeholder.classList.add("placeholder")
containerEL.appendChild(placeholder)
}



function removePlaceholder(){
    const placeholder = document.querySelector(".placeholder")
    containerEL.removeChild(placeholder)
}

})()