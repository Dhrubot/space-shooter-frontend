class GamesData {
    constructor() {
        this.adapter = new GamesAdapter()
        this.games = []
        this.fetchAndLoadGames()
    }

    fetchAndLoadGames() {
        this.adapter.getGames()
        .then(games => {
            games.forEach(game => this.games.push(new GameData(game)))
            this.sortByHighScore()
        })
        .then(() => this.render())
    }

    sortByHighScore(){
        return this.games.sort((a, b) => parseInt(b.score) - parseInt(a.score)) 
    }

    render () {
        const highScoreContainer = document.getElementById('high-score')
        highScoreContainer.innerHTML = this.games.map(game => `<li> ${game.userNickname} - ${game.score}</li>`).join('')
    }

}