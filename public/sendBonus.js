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
document.getElementById('logIn').addEventListener('click', function() {
    new Promise((resolve, reject) => {
        resolve();
    }).then(() => {
        return sendNewBonuses();
    }).then(() => {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    })
})
async function sendNewBonuses() {
    await fetch('/bonus', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
            "business_name" :sessionStorage.getItem("curbusname"),
            "type_business" :sessionStorage.getItem("curtypbus"),
            "name"          :sessionStorage.getItem("mycurname"),
            "surname"       :sessionStorage.getItem("mycursur"),
            "bonus"         :sessionStorage.getItem("curvisitbon") * 1 + 1
            
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