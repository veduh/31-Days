import story from "./story.js"
import idle from "./idle.js"
// import x from actionsLogic.js
import "./styles.css";

const container = document.getElementById("container")
const beginBtn = document.getElementById("beginBtn")

function clearContainer() {
    container.innerHTML = ""
}

function setIdle() {
    document.removeEventListener("click", setIdle)
    document.removeEventListener("keydown", setIdle)
    clearContainer()
    idle(container)
}

function startGame() {
    clearContainer()
    story(container)
    setTimeout(() => {
        document.addEventListener("click", setIdle)
        document.addEventListener("keydown", setIdle)
    }, 500);
}

beginBtn.addEventListener("click", startGame)


// x()