class GamesData {
    constructor() {
        this.adapter = new GamesAdapter()
        this.games = []
    }

    fetchAndLoadGames() {
        this.adapter.getGames()
        .then(games => {
            games.forEach(game => this.games.push(new GameData(game)))
            this.sortByHighScore()
        })
        .then(() => this.renderHighScore())
    }

    sortByHighScore(){
        return this.games.sort((a, b) => parseInt(b.score) - parseInt(a.score)) 
    }

    renderHighScore () {
        const highScoreContainer = document.getElementById('high-score-container')
        highScoreContainer.style.marginTop = '150px'
        const highScoreTable = document.getElementById('high-score')
        highScoreTable.innerHTML = `<caption id="caption"> Top Scorer </caption><tr><th>Username</th><th>Score</th>`
        highScoreTable.innerHTML += this.games.map(game => `<tr><td> ${game.userNickname}</td> <td>${game.score}</td></tr>`).join('')
    }

    createNewGame(score, nickname){
        this.adapter.createGame(score, nickname)
    }

}