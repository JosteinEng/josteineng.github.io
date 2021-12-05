const requestUrl = "https://www.gamer.no/api/paradise/club/101211/matches/results"

fetch(requestUrl)
    .then(response => response.json())
    .then(data => { 
        const matchesEl = document.getElementById("matches")
        matches = data.data
        console.log(matches)
        Object.values(matches).forEach(match => {
            var matchDiv = document.createElement("div")
            matchDiv.innerHTML = match.competition.name + " " + match.round_identifier_text

            var resultDiv = document.createElement("div")
            resultDiv.setAttribute("class", "matchDiv")
            resultDiv.setAttribute("id", match.id)
            resultDiv.innerHTML = match.club_side == "home" ?
                //Hvis hjemme, BRGN først
                match.home_signup.team.name +
                " " + match.home_score + " - " + match.away_score + " " +
                match.away_signup.team.name
                
                //Hvis borte, BRGN først
                : match.away_signup.team.name +
                " " + match.away_score + " - " + match.home_score + " " +
                match.home_signup.team.name
            matchDiv.appendChild(resultDiv)

            matchesEl.appendChild(matchDiv)
        })
    })
