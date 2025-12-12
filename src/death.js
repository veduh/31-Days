import { variables as daysObj} from "./clock.js"
import { handleSpacebar } from "./handleSpacebar.js"

const container = document.querySelector("#container")
function createDeathScreen(deathCause) {
    document.removeEventListener("keydown", handleSpacebar)

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    container.innerHTML = "";
    // container.style.backgroundColor = "black";
    setTimeout(() => {
        const deathText = document.createElement("p");
        deathText.classList.add("death");
        deathText.id = "deathText";
        deathText.textContent = "You didn't make it to the thirty-one day mark.";
        container.appendChild(deathText);

        const deathCauseText = document.createElement("p");
        deathCauseText.classList.add("death");
        deathCauseText.id = "deathCauseText";
        deathCauseText.textContent = `Cause of death: ${deathCause}`;
        container.appendChild(deathCauseText);

        const daysMade = document.createElement("p");
        daysMade.classList.add("death");
        daysMade.id = "daysMade";
        daysMade.textContent = `Days survived: ${daysObj.days}`;
        container.appendChild(daysMade);
        
        setTimeout(() => {
            container.innerHTML = ""
            setTimeout(() => {
                const tagline = document.createElement("p")
                tagline.id = "tagline";
                tagline.innerHTML = "\"To die, it's easy, but you have to struggle for life.\"<br>    -Vladek Spiegelman"
                container.appendChild(tagline)
    
                setTimeout(() => {
                    tagline.remove();
                }, 4000);
            }, 750);
        }, 8000);
    }, 1000);
}

export default createDeathScreen