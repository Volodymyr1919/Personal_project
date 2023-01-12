document.getElementById('logIn').addEventListener('click', () => {
    let _name = document.getElementById("name").value;
    let _password = document.getElementById("password").value;
    let _who = document.querySelector('input[name="who"]:checked').value;
    try {
        if(_name != "" && _password != "") {
            new Promise((resolve, reject) => {
                resolve();
            }).then(()=> {
                if(_who == "visitor") {
                    return loginVisitor();
                }
                if(_who == "owner") {
                    return loginOwner();
                }
            }).then(()=> {
                if(_who == "visitor") {
                    return location.href = '/users';
                }
                if(_who == "owner") {
                    return location.href = '/business';
                }
            })
        } else {
            return error;
        }
    } catch (error) {
        alert("Something went wrong try again");
    }
    
})
async function loginOwner() {
    await fetch('/ownerlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "business_name": document.getElementById("select_name").value,
            "type_business": document.getElementById('select_type').value,
            "name": document.getElementById("name").value,
            "password": document.getElementById("password").value,
            "who": document.querySelector('input[name="who"]:checked').value
        })
    }).then((res)=> {
        if (res.status == 200) {
            return res.json();
        } else {
            alert("User not found")
        }
    }).then((res) => {
        localStorage.setItem("id", res._id);
    })
}
async function loginVisitor() {
    await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "business_name": document.getElementById("select_name").value,
            "type_business": document.getElementById('select_type').value,
            "name": document.getElementById("name").value,
            "password": document.getElementById("password").value,
            "who": document.querySelector('input[name="who"]:checked').value
        })
    }).then((res)=> {
        console.log(res);
        if (res.status == 200) {
            return res.json();
        } else {
            alert("User not found,try to registry or re-login")
            return error;
        }
    }).then((res) => {
        localStorage.setItem("id", res._id);
    })
}
(function() {
    fetch('/get/' + document.getElementById('select_type').value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        for(let i = 0; i < res.length-1; i++) {
            let rests = `<option class='inner' value='${res[i]}'>${res[i]}</option>`
            document.getElementById('select_name').innerHTML += rests;
        }
    })
})();
document.getElementById('select_type').addEventListener('change', () => {
    new Promise((resolve, reject) => {
        resolve();
    })
    .then(() => {
        return clearDefaultName();
    })
    .then(() => {
        return getBusName();
    })
})
async function clearDefaultName() {
    let _length = document.getElementsByClassName('inner').length;
    for(let i = 0; i < _length; i++) {
        document.querySelector('.inner').remove();
    }
}
async function getBusName() {
    await fetch('/get/' + document.getElementById('select_type').value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        for(let i = 0; i < res.length-1; i++) {
            let rests = `<option class='inner' value='${res[i]}'>${res[i]}</option>`
            document.getElementById('select_name').innerHTML += rests;
        }
    })
}