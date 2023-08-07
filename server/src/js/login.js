// const { getinfo } = require("../../controllers/userControllers");

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response
}

async function getAllFiles(url, body) {
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        let commits = await response.json();
        console.log(commits);
        let regexp = /{.+?}/g
        let arr = JSON.stringify(commits).match(regexp)
        arr = arr.join('@')
        console.log(arr);
        localStorage.setItem('files', arr)
    } catch (err) {
        console.log(err);
    }
}

function getFiles(){
    let url = "http://127.0.1.1:7000/api/files/getfiles";
    let body = {
        userId: localStorage.getItem('id')
    }
    getAllFiles(url, body);
}

async function getData(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

document.forms.form1.addEventListener("submit", (event) => {
    let log = event.target.login1.value
    let pass = event.target.pass1.value
    url = "http://127.0.1.1:7000/api/user/login"
    event.preventDefault();
    postData(url, {password: pass, login: log })
    .then(data => data.json())
    .then(data => {
        if(data.rowCount !== 0) {
            console.log(data.rows[0]);
            localStorage.setItem("id", data.rows[0].user_id);
            localStorage.setItem("login", log);
            
            getFiles();
            // console.log(files);
            // localStorage.setItem('files', files);
            
            setTimeout(redirect, 1000);

        } else alert('NO SUCH USER!');
        });
    function redirect() {
        window.location.href = '../server/index.html'
    }
    console.log(localStorage.getItem('Aydos'));
    console.log("enter");
});
document.forms.form2.addEventListener("submit", (event) => {
    let log = event.target.login2.value
    let pass = event.target.pass2.value
    let email = event.target.email.value
    url = "http://127.0.1.1:7000/api/user/registration"
    event.preventDefault()
    console.log("enter");
    postData(url, { password: pass, login: log, email:email })
        .then(data => data.json())
        .then(data=>console.log(data))
})

document.querySelector('#link').addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();

    // console.log(document.querySelector('.container2'));
    document.querySelector('.container').style.display = 'none';
    document.querySelector('#aab').style.display = 'flex';
});

document.querySelector('#link2').addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();

    // console.log(document.querySelector('.container2'));
    document.querySelector('#aab').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
});
