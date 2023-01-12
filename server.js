console.log("Getting start with server");
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        app         = express(),
        MongoClient = require('mongodb').MongoClient,
        url         = require('./config');
MongoClient.connect(url)
.then(client => {
    console.log('Connected seccessfully to database');
    const   db                  = client.db('rest-users'),
            usersCollection     = db.collection('users');

    app.set('view engine', 'ejs');

    app.use(express.static('public'));
    app.use(express.static('styles'));
    app.use(express.static('img'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());



    // DRAWING ALL PAGES START

    // DRAWING HOME PAGE START
    app.get('/home', (req, res) => {
        db.collection('users').find().toArray()
        .then(result => {
            res.render('home.ejs', {users: result});
        })
        .catch(error => console.log(error));
    });
    // DRAWING HOME PAGE FINISH

    // DRAWING REGISTRATION PAGE START
    app.get('/', (req, res) => {
        db.collection('users').find().toArray()
        .then(result => {
            res.render('registration.ejs', {users: result});
        })
        .catch(error => console.log(error));
    });
    // DRAWING REGISTRATION PAGE FINISH

    // DRAWING LOGIN PAGE START
    app.get('/login', (req, res)=> {
        db.collection('users').find().toArray()
        .then(result => {
            res.render('login.ejs', {users: result});
        })
        .catch(error => console.log(error));
    })
    // DRAWING LOGIN PAGE FINISH

    // DRAWING OWNER PERSONAL PAGE START
    app.get('/business', (req, res) => {
        db.collection('users').find().toArray()
        .then(result => {
            res.render('restpage.ejs', {users: result});
        })
        .catch(error => console.log(error));
    });
    // DRAWING OWNER PERSONAL PAGE FINISH

    // DRAWING VISITOR PERSONAL PAGE START
    app.get('/users', (req, res) => {
        db.collection('users').find().toArray()
        .then(result => {
            res.render('personal.ejs', {users: result});
        })
        .catch(error => console.log(error));
    });
    // DRAWING VISITOR PERSONAL PAGE FINISH

    // DRAWING PAGE FOR ADDING BONUS START
    app.get('/bonus', (req, res) => {
        db.collection('users').find().toArray()
        .then(result => {
            res.render('sendBonus.ejs', {users: result});
        })
        .catch(error => console.log(error));
    });
    // DRAWING PAGE FOR ADDING BONUS FINISH

    // DRAWING PAGE FOR WITHDRAWING BONUSES START
    app.get('/spend', (req, res) => {
        db.collection('users').find().toArray()
        .then(result => {
            res.render('spendBonus.ejs', {users: result});
        })
        .catch(error => console.log(error));
    });
    // DRAWING PAGE FOR WITHDRAWING BONUSES FINISH

    // DRAWING ALL PAGES FINISH



    // REGISTRATION REQUESTS START

    // OWNER REGISTRATION START
    app.post('/business', (req, res) => {
        const _name = req.body.name;
        const _surname = req.body.surname;
        const _password = req.body.password;
        const _business_name = req.body.business_name;
        const _type_name = req.body.type_name;
        const _who = req.body.who;
        db.collection('users').find().toArray()
        .then(result => {
            let user;
           for (let i = 0; i < result.length; i++) {
            if(result[i].name == _name
                &&
                result[i].surname == _surname
                &&
                result[i].password == _password
                &&
                result[i].business_name == _business_name
                &&
                result[i].type_name == _type_name
                &&
                result[i].who == _who) {

                user = result[i];
            } 
        }
        if(user) {
            res.sendStatus(401);
        } else {
            usersCollection.insertOne(req.body)
            .then(result => {
            console.log(result);
            res.send(JSON.stringify(result));
        })
            return;
        }
        })
        .catch(error => console.log(error));
    });
    // OWNER REGISTRATION FINISH

    // VISITOR REGISTRATION START
    app.post('/users', (req, res) => {
        const _name = req.body.name;
        const _surname = req.body.surname;
        const _password = req.body.password;
        const _business_name = req.body.business_name;
        const _type_name = req.body.type_name;
        const _who = req.body.who;
        db.collection('users').find().toArray()
        .then(result => {
            let user;
           for (let i = 0; i < result.length; i++) {
            if(result[i].name == _name
                &&
                result[i].surname == _surname
                &&
                result[i].password == _password
                &&
                result[i].business_name == _business_name
                &&
                result[i].type_name == _type_name
                &&
                result[i].who == _who) {

                user = result[i];
            } 
        }
        if(user) {
            res.sendStatus(401);
        } else {
            usersCollection.insertOne(req.body)
            .then(result => {
            console.log(result);
            res.send(JSON.stringify(result));
        })
            return;
        }
        })
        .catch(error => console.log(error));
    });
    // VISITOR REGISTRATION FINISH

    // GET NAMES OF BUSINESSES START
    app.get('/get/:business', (req, res) => {
        const business = req.params.business;
        db.collection('users').find().toArray()
        .then(result => {
            let businesses = [];
            for (let i = 0; i < result.length; i++) {
                if(result[i].business_name != undefined && result[i].type_business == business) {
                    businesses += result[i].business_name + ";";
                }
            }
            let spr = ';';
            let arr = businesses.split(spr);
            let final = [...new Set(arr)];
            res.send(JSON.stringify(final));
        })
        .catch(error => console.log(error));
    })
    // GET NAMES OF BUSINESSES FINISH

    // REGISTRATION REQUESTS FINISH



    // LOGIN REQUESTS START

    // OWNER LOGIN START
    app.post('/ownerlogin', (req, res)=> {
        const _name = req.body.name;
        const _password = req.body.password;
        const _business_name = req.body.business_name;
        const _type_name = req.body.type_name;
        const _who = req.body.who;
        db.collection('users').find().toArray()
        .then(result => {
            let user;
           for (let i = 0; i < result.length; i++) {
            if(result[i].name == _name
                &&
                result[i].password == _password
                &&
                result[i].business_name == _business_name
                &&
                result[i].type_name == _type_name
                &&
                result[i].who == _who) {

                user = result[i];
            } 
        }
        if(user) {
            res.send(JSON.stringify(user));
        } else {
            res.sendStatus(403);;
            return;
        }
        })
    });
    // OWNER LOGIN FINISH

    // VISITOR LOGIN START
    app.post('/login', (req, res)=> {
        const _name = req.body.name;
        const _password = req.body.password;
        const _business_name = req.body.business_name;
        const _type_name = req.body.type_name;
        const _who = req.body.who;
        db.collection('users').find().toArray()
        .then(result => {
            let user;
           for (let i = 0; i < result.length; i++) {
            if(result[i].name == _name
                &&
                result[i].password == _password
                &&
                result[i].business_name == _business_name
                &&
                result[i].type_name == _type_name
                &&
                result[i].who == _who) {

                user = result[i];
            } 
        }
        if(user) {
            res.send(JSON.stringify(user));
        } else {
            res.sendStatus(403);;
            return;
        }
        })
    })
    //VISITOR LOGIN FINISH

    // LOGIN REQUESTS FINISH



    // OWNER && VISITOR REQUESTS FOR PERSONAL PAGE START

    // GET ALL VISITORS OF BUSINESS START
    app.get('/restaurant/users', (req, res) => {
        db.collection('users').find().toArray()
        .then(result => {
            res.send(JSON.stringify(result));
        })
        .catch(error => console.log(error));
    });
    // GET ALL VISITORS OF BUSINESS FINISH

    // GET INFO ABOUT BUSINESS START
    app.get('/restaurant/:id', (req, res) => {
        const id = req.params.id;
        db.collection('users').find().toArray()
        .then(result => {
            let user;
           for (let i = 0; i < result.length; i++) {
            if(JSON.stringify(result[i]._id) == JSON.stringify(id)) {
                user = result[i];
            }
        }
        if(user) {
            res.send(JSON.stringify(user));
        } else {
            res.send(JSON.stringify("User not found"));
            return;
        }
        })
    });
    // GET INFO ABOUT BUSINESS FINISH

    // GET INFO ABOUT OFFERS FROM BUSINESS START
    app.get('/posts/:business/:type', (req, res) => {
        const _business = req.params.business;
        const _type = req.params.type;
        db.collection('rest_posts').find().toArray()
        .then(result => {
            let rest;
            for (let i = 0; i < result.length; i++) {
                if(result[i].business_name == _business && result[i].type_business == _type) {
                    rest = result[i];
                }
            }
            if(rest) {
                res.send(JSON.stringify(result));
            } else {
                res.sendStatus(404);
                return;
            }
        })
    });
    // GET INFO ABOUT OFFERS FROM BUSINESS FINISH

    // POST NEW OFFER FROM BUSINESS START
    app.post('/posts', (req, res) => {
        db.collection('rest_posts').insertOne(req.body)
        .then(result => {
            if (result.acknowledged == true) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
                return;
            }
        })
        .catch(error => console.log(error));
    });
    // POST NEW OFFER FROM BUSINESS FINISH

    // DELETE OFFER FROM BUSINESS START
    app.delete('/post/delete', (req, res) => {
        db.collection('rest_posts').deleteOne(
            {   
                condition: req.body.condition,
                business_name: req.body.business_name,
                type_business: req.body.type_business
            }
        ).then(result => {
            if(result.deletedCount == 1) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
                return;
            }
        })
    });
    // DELETE OFFER FROM BUSINESS FINISH

    // GET INFO ABOUT VISITOR START
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        db.collection('users').find().toArray()
        .then(result => {
            let user;
           for (let i = 0; i < result.length; i++) {
            if(JSON.stringify(result[i]._id) == JSON.stringify(id)) {
                user = result[i];
            }
        }
        if(user) {
            res.send(JSON.stringify(user));
        } else {
            res.send(JSON.stringify("User not found"));
            return;
        }
        })
    });
    // GET INFO ABOUT VISITOR FINISH

    // OWNER && VISITOR REQUESTS FOR PERSONAL PAGE FINISH

    

    // BONUSES START

    // UPDATE VISITOR BONUSES BY ADDING START
    app.put('/bonus', (req, res) => {
        if (req.body.name != 'undefined' && req.body.surname != 'undefined') {
            db.collection('users').findOneAndUpdate(
                { 
                    business_name: req.body.business_name,
                    type_business: req.body.type_business,
                    name: req.body.name,
                    surname: req.body.surname
                },
                {
                    $set: {
                        "bonus": req.body.bonus
                    }
                },
                {}
            )
            .then(result => {
                res.send(JSON.stringify(result));           
            })
        } else {
            res.sendStatus(403);
            return;
        }
    });
    // UPDATE VISITOR BONUSES BY ADDING FINISH

    // UPDATE VISITOR BONUSES BY WITHDROWING START
    app.put('/spend', (req, res) => {
        if (req.body.name != 'undefined' && req.body.surname != 'undefined') {
            db.collection('users').findOneAndUpdate(
                { 
                    business_name: req.body.business_name,
                    type_business: req.body.type_business,
                    name: req.body.name,
                    surname: req.body.surname
                },
                {
                    $set: {
                        "bonus": req.body.bonus
                    }
                },
                {}
            )
            .then(result => {
                res.send(JSON.stringify(result));           
            })
        } else {
            res.sendStatus(403);
            return;
        }
    });
    // UPDATE VISITOR BONUSES BY WITHDROWING FINISH

    // BONUSES FINISH



    app.listen(3001, function(){
        console.log('listening on port 3001');
    });
})
.catch(error => console.log(error));