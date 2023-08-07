let userId = localStorage.getItem('id');
let login = localStorage.getItem('login');
console.log(userId, login);
let files = localStorage.getItem('files');
files = files.split('@');
// files = Array.from(files)
let arr = []
files.forEach(elem => {
    elem = elem.split('');
    elem.pop();
    elem.shift();
    elem = elem.join('')
    elem = elem.split(',');
    let arr1 = [];
    elem.forEach(elem => {
        elem = elem.split(':');
        arr1.push(elem[1]);
    });
    arr.push(arr1);
});
let fileDatas = [];
arr.forEach(elem => {
    let obj ={};
    obj.file_id = elem[0];
    obj.user_id = elem[1];
    elem[2] = elem[2].split('');
    elem[2].pop();
    elem[2].shift();
    elem[2] = elem[2].join('')
    obj.name = elem[2];
    elem[3] = elem[3].split('');
    elem[3].pop();
    elem[3].shift();
    elem[3] = elem[3].join('')
    obj.path = elem[3];
    fileDatas.push(obj);    
});
console.log(arr);
console.log(fileDatas);

async function allFiles(url, body){
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
        showFiles(commits)
    } catch (err) {
        console.log(err);
    }
}
function getFiles1(){
    let url = "http://127.0.1.1:7000/api/files/getfiles";
    let body = {
        userId: localStorage.getItem('id')
    }
    allFiles(url, body);
}
getFiles1();

async function postFile(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    return response
}

let sideBar = document.querySelector('#sideBar');
function showFiles(arr) {
    arr.forEach(elem => {
        let p = document.createElement('p');
        p.textContent = elem.name;
        p.dataset.path = elem.path;
        // console.log(elem.name);
        sideBar.append(p)
    });
}
// showFiles(fileDatas);


document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    let titel = e.target.titel.value;
    let text = e.target.area.value;
    console.log(titel, text);
    url = "http://127.0.1.1:7000/api/files/postfile";
    postFile(url, {userId, titel, text})
    .then(data => data.json())
    .then(data => {
        console.log(data);
        // if(data.rowCount !== 0) {
            //     localStorage.setItem("id", data.rows[0].user_id);
            //     localStorage.setItem("login", log);
            //     setTimeout(redirect, 1000);
            // } else alert('NO SUCH USER!');
        console.log('YES!');
        let p = document.createElement('p');
        p.textContent = titel+'.txt';
        p.dataset.path = `../src/files/${p.textContent}`;
        sideBar.append(p);

    });

    // let files = getFiles();
    
});
async function getFileText(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let text = await response.json();
    console.log(text);
    return text
}
sideBar.addEventListener('click', (e) => {
    if(e.target.id !== 'sideBar') {
        let path = e.target.dataset.path;
        let titel = e.target.textContent.split('.')
        console.log(path);
        let url = "http://127.0.1.1:7000/api/files/getfiletext";
        getFileText(url, {path})
            .then(data => {
                document.querySelector('#area').value = data;
            });
        document.querySelector('#titel').value = titel[0];
        document.querySelector('#titel-btn').style.display = 'none'
        document.querySelector('#updBtn').style.display = 'block'
            // .then(data => console.log(data))
    }
});

async function updateFile(url, data){
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    return response
}
document.querySelector('#updBtn').addEventListener('click', (e) =>{
    e.preventDefault();
    let name = document.querySelector('#titel').value;
    let text = document.querySelector('#area').value;
    let url = "http://127.0.1.1:7000/api/files/updatefile";
    updateFile(url, {userId, name, text});
    document.querySelector('#titel').value = '';
    document.querySelector('#area').value = '';
    document.querySelector('#titel-btn').style.display = 'block';
    getFiles1();
    hide();
});

function hide() {
    document.querySelector('#updBtn').style.display = 'none'
}