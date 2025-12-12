import { handleSpacebar } from "./handleSpacebar.js"

function win() {
    document.removeEventListener("keydown", handleSpacebar)

    const container = document.querySelector("#container")

    container.innerHTML = ""

    setTimeout(() => {
        const para = document.createElement("p")
        para.textContent = "After much blood, sweat, and hardship, you made it out of the camp. The war is over."
        para.id = "storyText"
        container.appendChild(para)
        
        setTimeout(() => {
            container.innerHTML = ""
            setTimeout(() => {
                const tagline = document.createElement("p")
                tagline.id = "winTagline";
                tagline.innerHTML = "\"Yes, life always takes the side of life, and somehow the victims are blamed. But it wasn’t the best people who survived, nor did the best ones die. It was random!\"<br>    -Art Spiegelman"
                container.appendChild(tagline)
    
                setTimeout(() => {
                    tagline.remove();
                }, 8000);
            }, 750);
        }, 4000);
    }, 1000);
}

export default win