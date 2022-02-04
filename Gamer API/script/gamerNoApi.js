const requestUrl = "https://www.gamer.no/api/paradise/team/101212/results/matchups"

var wins = 0
var ties = 0
var loss = 0
var onStreak = true
var isStreak = false
var currentStreak = 0
var longestStreak = 0
var streakCounter = 0

const winTieLossCount = document.getElementById("win-tie-loss-count")
const currentWinCount = document.getElementById("current-win-count")
const longestWinCount = document.getElementById("longest-win-count")
const matchesEl = document.getElementById("matches")

//Spør gamer.no/api om data og kjør funksjon "handleData" når data er mottatt
fetch(requestUrl)
    .then(response => response.json())
    .then(data => handleData(data))

//Funksjon som kjører etter mottatt data
var handleData = (data) => {
    var matches = data.data
    console.log(matches)

    //For hver match i matches, kjør funksjon "handleMatch"
    Object.values(matches).forEach(match => handleMatch(match))

    //Skriv kalkulert data til html-dokument
    winTieLossCount.innerHTML = wins + "-" + ties + "-" + loss
    currentWinCount.innerHTML = currentStreak
    if(currentStreak > 3)
        currentWinCount.innerHTML += " 🔥"
    longestWinCount.innerHTML = longestStreak
}


var handleMatch = (match) => {
    //html-element for match
    var matchDiv = document.createElement("div")
    matchDiv.classList.add("match")

    //html-element for link til match
    var titleDiv = document.createElement("a")
    titleDiv.setAttribute("href", match.url)
    titleDiv.setAttribute("target", "_blank")
    titleDiv.classList.add("match-title")
    titleDiv.innerHTML = match.competition.name + " " + match.round_identifier_text

    //html-element for resultat
    var resultDiv = document.createElement("div")
    resultDiv.classList.add("match-result")

    //test for å sortere BRGN til clubSignup og motstander til awaySignup
    var clubSignup
    var awaySignup
    if(match.home_signup.team.id == 101212) {
        clubSignup = match.home_signup
        clubSignup.score = match.home_score
        awaySignup = match.away_signup
        awaySignup.score = match.away_score
    }
    else {
        clubSignup = match.away_signup
        clubSignup.score = match.away_score
        awaySignup = match.home_signup
        awaySignup.score = match.home_score
    }

    //html-element for link til motstander
    var awayLink = document.createElement("a")
    awayLink.setAttribute("href", awaySignup.team.url)
    awayLink.setAttribute("target", "_blank")
    var awayIcon = document.createElement("img")
    awayIcon.classList.add("match-result-icon")
    awayIcon.src = awaySignup.team.logo.url + "?c=1&h=30&w=30"
    awayLink.appendChild(awayIcon)

    //html-element for lagnavn BRGN
    var clubSpan = document.createElement("span")
    clubSpan.classList.add("match-result-club")
    clubSpan.innerHTML = clubSignup.team.name + " "
    
    //html-element for resultat
    var scoreSpan = document.createElement("span")
    scoreSpan.innerHTML = clubSignup.score + " - " + awaySignup.score

    //html-element for resultat
    var resultSpan = document.createElement("span")
    resultSpan.classList.add("match-result-text")
    if(clubSignup.score > awaySignup.score) {
        scoreSpan.classList.add("match-result-win")
        resultSpan.innerHTML = " (Vinn)"
        wins++
        isStreak = true
    }
    else {
        onStreak = false
        isStreak = false
        streakCounter = 0

        if(clubSignup.score == awaySignup.score) {
            scoreSpan.classList.add("match-result-tie")
            resultSpan.innerHTML = " (Uavgjort)"
            ties++
        }
        else {
            scoreSpan.classList.add("match-result-loss")
            resultSpan.innerHTML = " (Tap)"
            loss++
        }
    }

    // H E LP  THE HOOMA N  IS ABOT TO E SC APE
    if(isStreak)
        streakCounter++
    if(onStreak)
        currentStreak = streakCounter
    if(streakCounter > longestStreak)
        longestStreak = streakCounter

    //html-element for lagnavn motstander
    var awaySpan = document.createElement("span")
    awaySpan.classList.add("match-result-away")
    awaySpan.innerHTML = " " + awaySignup.team.name

    //legg til elementer i html-dokumnent
    resultDiv.appendChild(clubSpan)
    resultDiv.appendChild(scoreSpan)
    resultDiv.appendChild(awaySpan)
    resultDiv.appendChild(resultSpan)
    resultDiv.appendChild(awayLink)

    matchDiv.appendChild(titleDiv)
    matchDiv.appendChild(resultDiv)
    matchesEl.appendChild(matchDiv)
}