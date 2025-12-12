import createDeathScreen from "./death.js"

const variables = {
    food: 15,
    fatigue: 2,
    rations: 3,
}

const fatigueValues = [ null, 3, 2, 1, 0, -1 ]

// setInterval(myTimer, 1000);
function progressStats() {
        // ("Progressing Stats.")
        if (variables.food > 20) {
            createDeathScreen("murdered (for your food)")
        } else if (variables.food >= variables.rations) {
            variables.food -= variables.rations;

            // console.log(`food: ${variables.food} | ${ typeof variables.food } | rations: ${variables.rations} | ${ typeof variables.rations} | ${variables.food <= variables.rations}`)
        } else {
            console.log("starved")
            createDeathScreen("starved")
            
            // console.log(`food: ${variables.food} | ${ typeof variables.food } | rations: ${variables.rations} | ${ typeof variables.rations} | ${variables.food <= variables.rations}`)
        }
        
        let plusFatigueValue = fatigueValues[variables.rations]
        let expectedFatigueValue = variables.fatigue + plusFatigueValue
        if (expectedFatigueValue < 0) {
            variables.fatigue = 0;
        } else if (expectedFatigueValue >= 10) {
            console.log("overworked")
            createDeathScreen("overworked")
            // OR just sleep for a long time
        } else {
            variables.fatigue = expectedFatigueValue
        }
}

// idleImgContainer.addEventListener('animationiteration', progressStats)

export { variables };
export default progressStats