const requestUrl = "https://www.gamer.no/api/paradise/club/101211/matches/results"

fetch(requestUrl)
    .then(response => response.json())
    .then(data => { 
        const matchesEl = document.getElementById("matches")
        matches = data.data
        console.log(matches)
        Object.values(matches).forEach(match => {
            var matchDiv = document.createElement("a")
            matchDiv.setAttribute("href", match.url)
            matchDiv.setAttribute("target", "_blank")
            matchDiv.classList.add("match")

            var titleDiv = document.createElement("div")
            titleDiv.classList.add("match-title")
            titleDiv.innerHTML = match.competition.name + " " + match.round_identifier_text

            var resultDiv = document.createElement("div")
            resultDiv.classList.add("match-result")

            var clubSignup
            var awaySignup
            if(match.club_side == "home") {
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

            var clubSpan = document.createElement("span")
            clubSpan.classList.add("match-result-club")
            clubSpan.innerHTML = clubSignup.team.name + " "
            
            var scoreSpan = document.createElement("span")
            scoreSpan.innerHTML = clubSignup.score + " - " + awaySignup.score

            if(clubSignup.score > awaySignup.score)
                scoreSpan.classList.add("match-result-win")
            else if(clubSignup.score == awaySignup.score)
                scoreSpan.classList.add("match-result-tie")
            else
                scoreSpan.classList.add("match-result-loss")

            var awaySpan = document.createElement("span")
            awaySpan.classList.add("match-result-away")
            awaySpan.innerHTML = " " + awaySignup.team.name

            resultDiv.appendChild(clubSpan)
            resultDiv.appendChild(scoreSpan)
            resultDiv.appendChild(awaySpan)

            matchDiv.appendChild(titleDiv)
            matchDiv.appendChild(resultDiv)
            matchesEl.appendChild(matchDiv)
        })
    })
