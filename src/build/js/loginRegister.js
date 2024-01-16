const formLogin = document.getElementById('form-login')
formLogin.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name-login').value
    const password = document.getElementById('password-login').value

    fetch('http://localhost:3001/user/login', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, password: password })
    }).then((res) => {
        console.log(res)
        if (res.status !== 200) {
            throw new Error("")
        }
        return res.json()
    }).then((text) => {
        localStorage.setItem('jwt', text.token)
        window.location.replace('konto.html')
    }).catch((e) => {
        document.getElementById('errors-login').innerHTML = "Błędne dane logowania"
        console.log(e)
    })
})

const formRegister = document.getElementById('form-signup')
formRegister.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name-signup').value
    const password = document.getElementById('password-signup').value

    let fail = false;

    fetch('http://localhost:3001/user', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, password: password })
    }).then((res) => {
        if (res.status !== 201) {
            fail = true;
        }
        return res.json()
    }).then((text) => {
        if (fail) {
            fail = false;
            throw new Error(text.message)
        }
        localStorage.setItem('jwt', text.token)
        localStorage.setItem('userName', text.user.name)
        window.location.replace('konto.html')
    }).catch((e) => {
        document.getElementById('Errors').innerHTML = e
    })
})