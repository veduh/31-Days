import * as actionsLogic from "./actionsLogic.js"
import { variables as daysObj } from "./clock.js"
import createDeathScreen from "./death.js"

function displayStats() {
    let statsToRemove = document.querySelector("#stats")
    if (statsToRemove != undefined) {
        statsToRemove.remove()
    };
    // const idleImgSubContainer = document.querySelector("#idleImgSubContainer")
    const actionsContainer = document.querySelector("#actionsContainer")
    if (!actionsContainer) return;

    const stats = document.createElement("div");
    const food = document.createElement("p");
    const fatigue = document.createElement("p");
    const rations = document.createElement("p");
    stats.id = "stats";
    food.id = "food";
    fatigue.id = "fatigue";
    rations.id = "rations";
    food.textContent = `food: ${actionsLogic.variables.food}`
    fatigue.textContent = `fatigue: ${actionsLogic.variables.fatigue}`
    rations.textContent = `rations: ${actionsLogic.variables.rations}`
    actionsContainer.appendChild(stats);
    stats.appendChild(food);
    stats.appendChild(fatigue);
    stats.appendChild(rations);
    // console.log(`stat displays enabled. food: ${actionsLogic.variables.food}`)
}

function createAlert(text) {
    console.log("alert running")
    const container = document.querySelector("#container");
    const alert = document.createElement('div');
    alert.classList.add("alert");
    alert.textContent = text;
    container.appendChild(alert);

    const removeAlert = () => {
        alert.remove();
        container.removeEventListener("click", clickHandler);
        container.removeEventListener("keyup", keyHandler);
    };

    const clickHandler = (e) => removeAlert();

    const keyHandler = (e) => removeAlert();

    setTimeout(() => {
        container.addEventListener("click", clickHandler);
        container.addEventListener("keyup", keyHandler);
    }, 750);
};
// UPDATE STUFF TO SUPPORT THIS


function displayActions() {
    const idleImgContainer = document.querySelector("#idleImgContainer")
    
    const actionsContainer = document.createElement("div")
    actionsContainer.id = "actionsContainer"
    idleImgContainer.appendChild(actionsContainer)

    idleImgContainer.addEventListener("animationiteration", () => {
        const workBtn = document.querySelector("#work");
        const restBtn = document.querySelector("#rest");
        if (workBtn) {
            workBtn.dataset.cooldown = false;
            workBtn.style.color = "rgb(82, 180, 51)";
        }
        if (restBtn && actionsLogic.variables.days < 31) {
            restBtn.dataset.cooldown = false;
            restBtn.style.color = "rgb(82, 180, 51)";
        }
    });


    // const actions = ["ChangeRations", "attack", "work", "rest"]
    const actions = {
        changeRations: "Change Rations",
        attack: "Attack",
        work: "Work",
        rest: "Rest"
    }

    for (const actionName in actions) {
        const action = actions[actionName]
        const elem = document.createElement("p")
        elem.classList.add("action")
        elem.id = actionName
        elem.textContent = action
        actionsContainer.appendChild(elem)
    }

    displayStats()

    // let attackCooldown = false;
    // let workCooldown = false; 
    // let restCooldown = false;
    actionsContainer.addEventListener("click", (e) => {
        // const targetID = e.target.id
        if (e.target.dataset.cooldown == "true") {
            e.target.style.color = "rgb(255, 170, 41)"
            return;
        }
        switch (e.target.id) {
            case "changeRations":
                actionsLogic.variables.rations = (() => {
                    let userRations = Number(prompt("Enter Rations (1-5)", actionsLogic.variables.rations));
                    return (userRations >= 1 && userRations <= 5) ? userRations : actionsLogic.variables.rations;
                })()
                console.log(actionsLogic.variables.rations)
                break;
            case "attack":
                if (e.target.dataset.cooldown == "true") return;

                let roll = Math.random()
                let rollValues = {
                    ".2": [-1, "You attemped to snatch food from a stranger. They saw you and taught you a lesson.", 2],
                    ".4": [0, "You couldn't bring yourself to steal from someone.", 0],
                    ".6": [1, "You threatened to kill someone if they didnt give you some soup. They complied.", 0],
                    ".8": [2, "You managed to distract someone by telling them to look the other way, and then sprinted until you were sure they wouldn't find you.", 1],
                    "1": [3, "You knocked someone clean out and robbed them of the little they had left.", 1],
                }
                // maybe give more but give fatigue too
                // add + for positive numbers


                for (const number in rollValues) {
                    const n = Number(number);
                    if (roll <= n && roll > n - .2) {
                        
                        if (actionsLogic.variables.food >= actionsLogic.variables.rations) {
                            actionsLogic.variables.food += rollValues[number][0];
                        } else {
                            console.log("starved")
                            createDeathScreen("starved")
                        }

                        let plusFatigueValue = rollValues[number][2];
                        let expectedFatigueValue = plusFatigueValue + actionsLogic.variables.fatigue;

                        if (expectedFatigueValue < 0) {
                            actionsLogic.variables.fatigue = 0;
                        } else if (expectedFatigueValue >= 10) {
                            console.log("overworked")
                            createDeathScreen("overworked")
                        } else {
                            actionsLogic.variables.fatigue = expectedFatigueValue
                        }

                        createAlert(`${rollValues[number][1]} (${rollValues[number][0]} food, ${rollValues[number][2]} fatigue)`);
                    }     
                }
                // attackCooldown = true;
                e.target.dataset.cooldown = "true";
                e.target.style.color = "rgb(255, 170, 41)"
                setTimeout(() => {
                    // attackCooldown = false;
                    e.target.dataset.cooldown = false;
                    e.target.style.color = "rgb(82, 180, 51)"
                }, 2000); // 2-second cooldown

                break;
            case "work":
                const jobs = {
                    "cobbler": [1, 1],
                    "cook": [5, 2],
                    "quarry worker":  [1, 3],
                    "plumber": [2, 1],
                    "teacher": [3, 1]
                }
                const jobNames = Object.keys(jobs)
                const randomJobIndex = Math.floor(Math.random() * Object.keys(jobs).length)
                const randomJobName = jobNames[randomJobIndex]

                actionsLogic.variables.food += jobs[randomJobName][0]
                


                actionsLogic.variables.fatigue += jobs[randomJobName][1]
                createAlert(`You worked as a ${randomJobName}. You made ${jobs[randomJobName][0]} food and lost ${jobs[randomJobName][1]} hours of sleep.`)
                
                // workCooldown = true
                e.target.dataset.cooldown = true
                e.target.style.color = "rgb(255, 170, 41)"
                // once a day
                break;
            case "rest":
                if (daysObj.days >= 31) {
                    return;
                }

                // restCooldown = true
                e.target.dataset.cooldown = true
                document.querySelector("#work").dataset.cooldown = false
                e.target.style.color = "rgb(255, 170, 41)"
                
                actionsLogic.variables.fatigue -= 2
                
                const clock = document.querySelector("#clock")
                const idleImgSubContainer = document.querySelector("#idleImgSubContainer")
                actionsContainer.style.display = "none";
                idleImgSubContainer.style.display = "flex"
                
                const boxOverlay = document.createElement("div")
                boxOverlay.style.backgroundColor = "#000"
                // boxOverlay.style.opacity = "0"
                boxOverlay.style.width = "100%"
                boxOverlay.style.height = "100%"
                boxOverlay.style.position = "absolute"
                boxOverlay.id = "boxOverlay"
                boxOverlay.style.zIndex = "5"
                boxOverlay.style.animation = `
                fadeIn 2s linear 0s,
                fadeOut 2s linear 2s
                `
                idleImgContainer.appendChild(boxOverlay)
                
                setTimeout(() => {
                    daysObj.days += 1;
                    clock.textContent = `Day ${daysObj.days}`
                    idleImgContainer.style.animationPlayState = 'running';
                }, 2000)
                setTimeout(() => {
                    boxOverlay.remove()
                    let robbed = Math.floor(Math.random() + .5)
                    if (robbed) {
                        createAlert("While asleep, you were stolen from. you lost 4 food.");
                        actionsLogic.variables.food -= 4;
                    }
                }, 3900);

                break;
                
                default:
                    console.log("none | id: " + e.target.id)
                    break;
                }
                
                displayStats()
            })
        }
        
        export default displayActions