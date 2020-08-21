class User {
    constructor() {
        this.adapter = new UsersAdapter()
        this.createUserEventListenser()
        // this.createUserSearchListener()
    }

    createUserEventListenser() {
        this.userInputContainer = document.getElementById('user-container')
        this.userInput = document.getElementById('new-user-nickname')
        this.userForm = document.getElementById('new-user-form')
        this.userForm.addEventListener('submit', this.createNewUser.bind(this))
    }

    createNewUser(e) {
        e.preventDefault()
        const inputValue = this.userInput.value
        this.adapter.createUser(inputValue).then(user => {
            this.userInputContainer.style.display = "none";
            this.nickname = user.nickname
            this.welcomeMsg = `Welcome ${this.nickname}! Your mission should you choose to accept it, is to prevent enemy ships to reach the end line. So Hold Steady and Fight! Use your keyboard's "left" and "right" arrow to move your ship and "spacebar" for shooting. Good Luck!`
            this.welcomeText(this.welcomeMsg)
            setTimeout(startGame, 20000)
        })
    }



    welcomeText(text) {
       (function iterator(i) {
            if (i < text.length) {
                let container = document.getElementById('nickname-container')
                container.style.marginTop = "200px"
                container.innerHTML += text.charAt(i)
                setTimeout(() => {
                    iterator(++i);
                }, 50);
            }
        })(0)
    }

    // createUserSearchListener() {
    //     this.searchForm = document.getElementById('search-user-form')
    //     this.searchInput = document.getElementById('search')
    //     this.searchForm.addEventListener("submit", this.fetchUser.bind(this))
    // }

    // fetchUser(e){
    //     e.preventDefault()
    //     mainPlayArea.innerHTML = ''
    //     this.adapter.getUser(this.searchInput.value.toLowerCase())
    //     .then(userData => this.renderUserInfo(userData))
    // }

    // renderUserInfo(data) {
    //     let container = document.createElement('table')
    //     container.style.marginLeft = '400px'
    //     container.innerHTML = `<caption id="caption"> ${data.nickname} </caption><tr style="color: blue"><th>Game ID</th><th>Score</th>`
    //     container.innerHTML += data.games.map(game => `<tr style="color: red"><td> ${game.id}</td> <td>${game.score}</td></tr>`)
    //     mainPlayArea.append(container)
    // }
 
}