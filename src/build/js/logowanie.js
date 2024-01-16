$loginForm = document.getElementById('login-form')
        $loginForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const name = document.getElementById('login-name').value
            const password = document.getElementById('login-password').value

            let fail = false;

            fetch('http://localhost:3001/user/login', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, password: password })
            }).then((res) => {
                console.log(res)
                if(res.status !== 200){
                    throw new Error("")
                }
                return res.json()
            }).then((text) => {
                localStorage.setItem('jwt', text.token)
                window.location.replace('konto.html')
            }).catch((e) => {
                document.getElementById('Errors').innerHTML = "Błędne dane logowania"
                console.log(e)
            })
        })