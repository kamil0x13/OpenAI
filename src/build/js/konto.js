let url = ""

//Logout
$logoutBtn = document.getElementById('logout-btn')
$logoutBtn.addEventListener('click', () => {
    fetch('http://localhost:3001/user/logout', {
        method: "post",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
    }).then(() => {
        localStorage.removeItem('jwt')
        window.location.replace('index.html')
    }).catch(() => {
        localStorage.removeItem('jwt')
        window.location.replace('index.html')
    })
})

document.getElementById("userName").innerHTML = localStorage.getItem("userName")

$loginForm = document.getElementById('openai-form')
        $loginForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const prompt = document.getElementById('openai-message').value

            fetch('http://localhost:3001/openai', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            }).then((res) => {
                return res.json()
            }).then((text) => {
                console.log(text)
                document.getElementById('odpowiedz').innerHTML = text.data
            }).catch((e) => {
                document.getElementById('Errors').innerHTML = e
            })
        })

        $loginForm = document.getElementById('openaiImg-form')
        $loginForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const prompt = document.getElementById('openaiImg-description').value

            fetch('http://localhost:3001/openaiImg', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            }).then((res) => {
                return res.json()
            }).then((text) => {
                console.log(text)
                url = text.data
                document.getElementById('imgThere').innerHTML = `<img src="${text.data}">`
            }).catch((e) => {
                document.getElementById('ErrorsImg').innerHTML = e
            })
        })

        $loginForm = document.getElementById('openaiImgDescription-form')
        $loginForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const prompt = {text: document.getElementById('openaiImgDescription-description').value,
            url
        }

            fetch('http://localhost:3001/openaiImgDescription', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            }).then((res) => {
                return res.json()
            }).then((text) => {
                console.log(text)
                document.getElementById('odpowiedzImgDesc').innerHTML = text.data
            }).catch((e) => {
                document.getElementById('ErrorsImgDesc').innerHTML = e
            })
        })