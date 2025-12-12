// import idle from "./idle.js"
import createActions from "./actions.js"
import { variables } from "./clock.js";

function handleSpacebar(e) {
    if (e.code !== "Space" || variables.days >= 31) return;
    e.preventDefault()
    const idleImgContainer = document.querySelector("#idleImgContainer")
    const idleImgSubContainer = document.querySelector("#idleImgSubContainer")
    let actionsContainer = document.querySelector("#actionsContainer")
    
    let state = getComputedStyle(idleImgContainer).animationPlayState

    if (state == "paused" && actionsContainer) {
        // const container = document.querySelector("#container")
        actionsContainer.style.display = "none";
        idleImgContainer.style.animationPlayState = "running";
        idleImgSubContainer.style.display = "flex"
    } else if (state == "running") {
        idleImgContainer.style.animationPlayState = "paused";
        idleImgSubContainer.style.display = "none"
        if (!actionsContainer) {
            createActions()
            actionsContainer = document.querySelector("#actionsContainer");
        }
        actionsContainer.style.display = "flex"
        idleImgContainer.style.display = "flex"
        idleImgContainer.style.alignItems = "center"
        idleImgContainer.style.justifyContent = "center"
    } else {
        console.log("Spacebar Pressed, but animationPlayState is neither running nor paused. | " + idleImgContainer.style.animationPlayState)
    }
}
function addSpacebarListener() {
    document.addEventListener("keydown", handleSpacebar)
}

export default addSpacebarListener
export { handleSpacebar }