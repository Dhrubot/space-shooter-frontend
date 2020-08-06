class GamesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/games'
    }

    getGames() {
        return fetch(this.baseUrl).then(res => res.json())
    }
    
}