
// Logic of main buttons start
document.getElementById('logIn').addEventListener('click', () => {
    location.href = 'login'
});


document.getElementById('owner').addEventListener('click', () => {
    document.querySelector('.wrapper__owner').classList.toggle('wrapper-active');
});

document.getElementById('visitor').addEventListener('click', () => {
    document.querySelector('.wrapper__visitor').classList.toggle('wrapper-active');
});
// Logic of main buttons finish

// Registration of owner start
document.getElementById('Regisrt_owner').addEventListener('click', function() {
    try {
        if(document.getElementById('business_name') != "") {
            new Promise((resolve, reject) => {
                resolve();
            }).then(()=> {
                return registr_business();
            }).then(()=> {
                location.href = '/business'
            })
        } else {
            return error;
        }
    } catch (error) {
        alert("Something went wrong, try again");
    }
});

async function registr_business() {
    await fetch('/business', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "business_name": document.getElementById('business_name').value,
            "type_business": document.getElementById('type_business').value,
            "name": document.getElementById('owners_name').value,
            "surname": document.getElementById('owners_surname').value,
            "password": document.getElementById('owners_password').value,
            "who": "owner"
        })
    }).then((res) => {
        if (res.status == 401) {
            alert ("Owner existing, try to login")
        } else {
            return res.json();
        }
    }).then((res) => {
        localStorage.setItem("id", res.insertedId);
    })
}
// Registration of owner finish

// Registration of visitor start
document.getElementById('sign_up').addEventListener('click', function() {
    try {
        if(document.getElementById('visitors_name') != "") {
            new Promise((resolve, reject) => {
                resolve();
            }).then(()=> {
                return signUp();
            }).then(()=> {
                location.href = '/users'
            })
        } else {
            return error;
        }
    } catch (error) {
        alert("Something went wrong, try again");
    }
});
async function signUp() {
    await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "business_name": document.getElementById('select_name').value,
            "type_business": document.getElementById('select_type').value,
            "name": document.getElementById('visitors_name').value,
            "surname": document.getElementById('visitors_surname').value,
            "password": document.getElementById('visitors_password').value,
            "bonus": 2,
            "who": "visitor"
        })
    }).then((res) => {
        if (res.status == 401) {
            alert ("Visitor existing, try to login")
        } else {
            return res.json();
        }
    }).then((res) => {
        localStorage.setItem("id", res.insertedId)
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
})()
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
// Registration of visitor finish