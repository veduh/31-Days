// import img from "./Image.jpeg"

function story(container) {
    // so this actually creates stuff. thats why its packaged in here.
    const para = document.createElement("p")
    para.textContent = "It is mid-January, 1945. You have been imprisoned in Dachau, one of the smaller concentration camps currently being used to exploit Jews like you for forced labor. Survive thirty-one days."
    para.id = "storyText"
    container.appendChild(para)
}

export default story