class UsersAdapter {
    constructor() {
        this.baseUrl = 'https://limitless-shelf-98001.herokuapp.com/api/v1/users'
    }

    getUsers() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createUser(value){
        const user = {
            nickname: value
        }
        return fetch(this.baseUrl, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ user })
        })
        .then(res => res.json())
    }

    getUser(nickname){
        return fetch(`${this.baseUrl}/${nickname}`).then(res => res.json())
    }
}