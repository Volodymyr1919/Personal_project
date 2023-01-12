(function () {
    fetch('/users/' + localStorage.getItem("id"), {
        method: 'GET'
        })
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            } else {
                alert("User not found");
            }
        }).then((res) => {
            sessionStorage.setItem("curvisitbon", res.bonus);
            sessionStorage.setItem("mycurname", res.name);
            sessionStorage.setItem("mycursur", res.surname);
            sessionStorage.setItem("curbusname", res.business_name);
            sessionStorage.setItem("curtypbus", res.type_business);
        })
}())
document.getElementById('confirm').addEventListener('click', function() {
new Promise((resolve, reject) => {
    resolve();
}).then(() => {
    return sendNewBonuses();
})
})
async function sendNewBonuses() {
await fetch('/spend', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "business_name" :sessionStorage.getItem("curbusname"),
        "type_business" :sessionStorage.getItem("curtypbus"),
        "name"          :sessionStorage.getItem("mycurname"),
        "surname"       :sessionStorage.getItem("mycursur"),
        "bonus"         :sessionStorage.getItem("curvisitbon") - document.getElementById('payment').value
    })
}).then((res)=> {
    console.log(res)
    if (res.status == 200) {
        alert("Success")
    } else {
        alert("Something went wrong")
    }
})
}