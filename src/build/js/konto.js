let url = ""

const navChat = document.getElementById('navChat');
const navImg = document.getElementById('navImg');

const chat = document.getElementById('chat');
const sectionImg = document.getElementById('sectionImg');
const imgInfo = document.getElementById('imgInfo');
const imgGen = document.getElementById('imgGen');
navChat.addEventListener('click', (e) => {
    navImg.classList.remove("activ");
    navChat.classList.add("activ");
    chat.classList.remove("hidden");
    sectionImg.classList.add("hidden");
})
navImg.addEventListener('click', () => {
    navChat.classList.remove("activ");
    navImg.classList.add("activ");
    sectionImg.classList.remove("hidden");
    chat.classList.add("hidden");
})

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
let odp = document.getElementById('odpowiedz')



$loginForm = document.getElementById('openai-form')
$loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const prompt = document.getElementById('openai-message').value
    document.getElementById('openai-message').value = ''

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
        odp = document.getElementById('odpowiedz')
        let div = document.createElement("div")
        let p = document.createElement("p")
        let p2 = document.createElement("p")
        p.append(`Ty: ${prompt}`)
        p2.append(`Bot: ${text.data}`)
        div.append(p);
        div.append(p2);
        div.classList.add("response")
        // odp.insertBefore(div, odp.firstChild)
        odp.append(div)
        // document.getElementById('odpowiedz').innerHTML = text.data
    }).catch((e) => {
        document.getElementById('Errors').innerHTML = e
    })
})

$loginForm = document.getElementById('openaiImg-form')
$loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const prompt = document.getElementById('openaiImg-description').value
    document.getElementById('openaiImg-description').value = ''

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
        imgInfo.classList.remove("hidden");
        url = text.data
        document.getElementById('imgThere').innerHTML = `<a target="_blank" href="${text.data}"><img src="${text.data}"></a>`
    }).catch((e) => {
        document.getElementById('ErrorsImg').innerHTML = e
    })
})

$loginForm = document.getElementById('openaiImgDescription-form')
$loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const prompt = {
        text: document.getElementById('openaiImgDescription-description').value,
        url
    }
    document.getElementById('openaiImgDescription-description').value = ''

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

