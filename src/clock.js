import win from "./win";

let variables = {
    // days: 0,
    days: 29,
};
window.variables = variables
// for debugging/testing

function updateClock() {
    const idleImgContainer = document.querySelector('#idleImgContainer');
    const clock = document.getElementById("clock");
    
    idleImgContainer.addEventListener('animationiteration', () => {
        if (variables.days === 30) {
            const restBtn = document.querySelector("#rest");
            restBtn.style.color = "rgb(255, 170, 41)";
        } else if (variables.days >= 31) {
            win()
        }
        variables.days++;
        clock.textContent = `Day ${variables.days}`;
    })
}

export default updateClock
export { variables }