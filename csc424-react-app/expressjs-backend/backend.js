const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const users = new Map();

const userServices = require("./models/user-services");
 


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/users', async (req, res) => {
    const { name } = req.query;
    try {
        const usersList = await userServices.getUsersByName(name);
        res.send({ users: usersList });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching users");
    }
});



app.post('/account/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userServices.login(username, password);
        res.send({ token });
    } catch (error) {
        console.log(error);

        res.status(401).send("Failed Login");
    }
});


app.post('/account/register', async (req, res) => {
    const { username, password, validatePassword } = req.body;
	console.log(username, password, validatePassword);
    try {
		
        const newUser = await userServices.register(username, password, validatePassword);
        res.status(201).send(`User registered successfully! ID: ${newUser._id}`);
    } catch (error) {
        console.log(error);
        res.status(403).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

