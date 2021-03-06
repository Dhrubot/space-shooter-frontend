class GamesAdapter {
    constructor() {
        this.baseUrl = 'https://space-shooter-js.herokuapp.com/api/v1/games'
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