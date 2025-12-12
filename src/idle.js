
import progressStats from "./actionsLogic.js"
import image from "./Images/vladek-prison.svg"
import updateClock from "./clock"
import handleSpaceBar from "./handleSpacebar.js"

function idle(container) {
    // so this actually creates stuff. thats why its packaged in here.
    const imgContainer = document.createElement("div")
    imgContainer.id = "idleImgContainer"

    const imgSubContainer = document.createElement("div")
    imgSubContainer.id = "idleImgSubContainer"

    const img = document.createElement("img")
    img.id = "idleImg"
    img.src = image

    const clock = document.createElement("p")
    clock.id = "clock"
    clock.textContent = `Day 0`
    
    const spacebarInfo = document.createElement("p")
    spacebarInfo.id = "spacebarInfo"
    spacebarInfo.textContent = "Tap spacebar to size up the situation."

    container.appendChild(imgContainer)
    imgContainer.appendChild(imgSubContainer)
    imgSubContainer.appendChild(img)
    
    imgSubContainer.appendChild(clock)
    updateClock()
    
    imgSubContainer.appendChild(spacebarInfo)
    handleSpaceBar()

    idleImgContainer.addEventListener('animationiteration', progressStats)
}

export default idle