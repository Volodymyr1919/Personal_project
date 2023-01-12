(function () {
    new Promise((resolve, reject) => {
        resolve();
    }).then(() => {
        return getMe();
    }).then(() => {
        return getInfo(); 
    })
}());
async function getMe() {
    let id = localStorage.getItem('id');
    await   fetch('/users/' + id, {
            method: 'GET'
            })
            .then((res) => {
                return res.json();
            }).then((res) => {
                localStorage.setItem("type_business", res.type_business);
                document.getElementById('name').innerHTML = res.name;
                document.getElementById('surname').innerHTML = res.surname;
                document.getElementById('currentbusiness').innerHTML = res.business_name;
                if (res.bonus < 10) {
                    document.getElementById('bonus').innerHTML = "00" + res.bonus;
                } else if (res.bonus < 100) {
                    document.getElementById('bonus').innerHTML = "0" + res.bonus;
                } else if (res.bonus == 0 || "undefind") {
                    document.getElementById('bonus').innerHTML = "000";
                } else {
                    document.getElementById('bonus').innerHTML = res.bonus;
                }
            })
};
async function getInfo() {
    await   fetch('/posts/' + document.getElementById('currentbusiness').innerHTML + "/" + localStorage.getItem("type_business"), {
            method: 'GET'
            }).then((data) => {
                if(data.status == 404) {
                    let offers = `
                        <div class='get_bonus'>
                            <p class='bonus__descr'>No. 1</p>
                            <p class='bonus__text'>Sorry, any offers found</p>
                        </div>
                        `
                    document.getElementById('offer_container').innerHTML = offers;
                } else {
                    return data.json();
                }
            }).then((data) => {
                for(let i = 0; i < data.length; i++) {
                    if (data[i].business_name == document.getElementById('currentbusiness').innerHTML
                        &&
                        data[i].type_business == localStorage.getItem("type_business")) {
                            let offers = `
                            <div class='get_bonus'>
                                <p class='bonus__text'>Condition: ${data[i].condition}</p>
                                <p class='bonus__text'>Gift: ${data[i].gift}</p>
                                <div class='count_container' id='countBonus'>
                                    Required bonus: <span class='req_Bonus' id='req_Bonus_${[i]}'>${data[i].required_bonuses}</span>
                                </div>
                            </div>
                            `
                            document.getElementById('offer_container').innerHTML += offers;
                    }
                }
                if(document.querySelectorAll('.get_bonus').length > 2) {
                    document.body.style.height = "fit-content";
                }
            })
};