const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const users = new Map();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send(Array.from(users.keys()));
});


app.post('/account/login', (req, res) => {
    const fakeAuth = "2342f2f1d131rf12"
    var username = req.body.username
    var password = req.body.password
	console.log(users.get(username))
    if (users.get(username) != undefined && users.get(username) == password) {
        res.send(fakeAuth)
    }
    else {
        res.status(401).send("Failed Login");
    }
});

app.post('/account/register', (req, res) => {
    const { username, password, validatePassword } = req.body;

    if (username == "" || password == "" || validatePassword == "") {
        res.status(403).send("Field has been left empty.");
    }
	
	if (password != validatePassword) {
        res.status(403).send("Your passwords must match.");
    }
	
	if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        res.status(403).send("Password not strong enough. Your password must meet these requirements:\n At least 8 characters\n At least one capital letter\n At least one number\n At least one special character");
    }

    if (users.get(username) != undefined) {
        res.status(403).send("This username already exsits. Please enter a different username.");
    }


    else {
        users.set(username, password);
        res.status(201).send("User registered succesfully!");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   
