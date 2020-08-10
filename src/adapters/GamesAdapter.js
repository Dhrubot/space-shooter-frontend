class GamesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/games'
    }

    getGames() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createGame(score, nickname) {
        const gameData = {
            score: score,
            user: { nickname: nickname }
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ gameData })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
}