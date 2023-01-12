(function () {
    let id = localStorage.getItem('id');
    fetch('/restaurant/' + id, {
        method: 'GET'
    })
    .then((res) => {
        return res.json();
    }).then((res) => {
        localStorage.setItem("type_business", res.type_business);
        document.getElementById('name').innerHTML = res.name;
        document.getElementById('surname').innerHTML = res.surname;
        document.getElementById('rest').innerHTML = res.business_name;
        new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            return getUsers();
        }).then(() => {
            return getPosts();
        })
    })
}());

async function getUsers(){
    await fetch('/restaurant/users', {
        method: 'GET'
    }).then((res) => {
        return res.json();
    }).then((res) => {
        for(let i = 0; i < res.length; i++) {
            if(res[i].business_name == document.getElementById('rest').innerHTML
            &&
            res[i].bonus >= 0) {
                let user = 
                `<div class='get_bonus'>
                    <p class='bonus__text'>
                        ${res[i].name} ${res[i].surname}
                    </p>
                    <div class='count_container'>
                        Current bonus: 
                        ${res[i].bonus}
                    </div>
                </div>`;
                document.getElementById('users').innerHTML += user;
            }
        }
        function resort(selector) {
            const nodeList = document.querySelectorAll(selector);
            const dict = {};
            const parent = nodeList[0].parentNode;
            nodeList.forEach(node => {
                const key = node.querySelector('.count_container').innerText;
                dict[key] = node;
                node.parentNode.removeChild(node);
            });
            const keys = Object.keys(dict);
            keys.sort()
            .reverse()
            .forEach(k => parent.appendChild(dict[k]));
        }
        // resort('.get_bonus');
        if(document.querySelectorAll('.get_bonus').length > 2) {
            document.body.style.height = "fit-content";
        }
    })
};
document.getElementById('offer').addEventListener('click', function(){
    document.querySelector('.post__container').classList.toggle('post__container-active');
});
document.getElementById('sendPost').addEventListener('click', function() {
    fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "business_name": document.getElementById('rest').innerHTML,
            "type_business": localStorage.getItem("type_business"),
            "condition": document.getElementById('condition').value,
            "required_bonuses": document.getElementById('required_bonuses').value,
            "gift": document.getElementById('gift').value
        })
    }).then((data) => {
        if (data.status == 201) {
            alert("Successfuly added");
            location.reload();
        } else {
            alert("Something went wrong, please try again")
        }
    })
})
async function getPosts() {
    await fetch('/posts/' + document.getElementById('rest').innerHTML + "/" + localStorage.getItem("type_business"), {
        method: 'GET'
    }).then((data) => {
        return data.json();
    }).then((data) => {
        for(let i = 0; i < data.length; i++) {
            if (data[i].business_name == document.getElementById('rest').innerHTML
            &&
            data[i].type_business == localStorage.getItem("type_business")) {
                let posts = 
                `
                <div class="post__curdescr">
                    Condition is:
                    <div id="curcondition">${data[i].condition}</div>
                </div>
                <div class="post__curdescr">
                    Required bonuses:
                    <div id="curReqBon">${data[i].required_bonuses}</div>
                </div>
                <div class="post__curdescr">
                    Gift is:
                    <div id="curGift">${data[i].gift}</div>
                </div>
                <div class="post__delete">
                    <button type="submit" class="delete" id="${data[i].condition}">DELETE POST <iconify-icon icon="flat-color-icons:delete-database"></iconify-icon></button>
                </div>
                <hr>`;
                document.getElementById('getPosts').innerHTML += posts;
            }
        }
    })
}
let selectedButton;
document.getElementById("getPosts").onclick = function (event) {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  new Promise((resolve, reject) => {
    resolve();
  }).then(() => {
    return deletePost(target);
  }).then(() => {
    location.reload();
  })
};
async function deletePost(button) {
    selectedButton = button;
    await fetch('/post/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "condition": selectedButton.id,
            "business_name": document.getElementById('rest').innerHTML,
            "type_business": localStorage.getItem("type_business")
        })
    }).then((data) => {
        if (data.status == 201) {
            alert("Successfuly deleted")
        } else {
            alert("Something went wrong, please try again")
        }
    })
}
document.getElementById('checkMore').addEventListener('click', () => {
    document.querySelector('.for_offers').classList.toggle('hiddenTag');
    document.querySelector('.for_clients').classList.toggle('hiddenTag');
})