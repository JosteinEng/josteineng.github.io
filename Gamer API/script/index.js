var today = new Date()
var dayOne = new Date("12.04.2021") //🎂

var daysSince = Math.ceil((today - dayOne) / (1000 * 3600 * 24))

window.onload = () => {
    document.getElementById("days").innerHTML = daysSince
}