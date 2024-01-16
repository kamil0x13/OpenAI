$loginForm = document.getElementById('register-form')
        $loginForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const name = document.getElementById('register-name').value
            const password = document.getElementById('register-password').value

            let fail = false;

            fetch('http://localhost:3001/user', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, password: password })
            }).then((res) => {
                if(res.status !== 201){
                    fail = true;
                }
                return res.json()
            }).then((text) => {
                if(fail){
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