class GamesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/games'
    }

    getGames() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createGame(score, nickname) {
        const game = {
            score: score,
            nickname: nickname
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ game })
        })
        .then(res => res.json())
    }
    
}