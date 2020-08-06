class User {
    constructor() {
        this.adapter = new UsersAdapter()
        this.createUserEventListenser()
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
            this.renderUser(user)
        })
    }

    renderUser(user) {
        const userDiv = document.getElementById('nickname-container')
        userDiv.innerHTML = `<h1> ${user.nickname} </h1>`
    }
}