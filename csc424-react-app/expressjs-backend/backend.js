const express = require('express');
const sanitizeHtml = require('sanitize-html');
const app = express();
const port = 8000;
const cors = require('cors');

const userServices = require('./models/user-services');
const jwtToken = require('./models/jwt-token');

const https = require('https');
const fs = require('fs');

const { body, validationResult } = require('express-validator');

app.use(cors());
app.use(express.json());

app.get('/account/users', async (req, res) => {

	console.log("made it to the get in backend");
    var allInfo = await userServices.getAllUsers();
    var result = allInfo.map(user => {
        return {name: user.username, phoneNumber: user.phoneNumber}
    })
	console.log("sending users");
    res.status(201).send(result);
});

app.get('account/users/:username', [
    body('username').isAlphanumeric().isLength({ min: 1, max: 20 })
], async (req, res) => {

    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }

    let Username = req.params['username'];

    const result = await userServices.findUserByUsername(Username);
    
    if(result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
    }
    else{

        let encodedResult = encodeURI(result);
        res.status(201).send(encodedResult);


    }
});

app.post('/account/login', async (req, res) => {


    try{
        const username = sanitizeHtml(req.body.value.username);
        const password = sanitizeHtml(req.body.value.password);
        if (typeof username !== 'string' || typeof password !== 'string') {
            return res.status(400).send("Invalid data types");
        }

        const user = await userServices.loginCheck(username, password);
        if(user){
            const token = jwtToken.generateAccessToken({ username: username });
            res.status(201).send({username, password, token});


        }
        else{
            res.status(400).end();
        }
    }
    catch{
        res.status(404).send('Internal server error');
    }
});

app.post('/account/register', async (req, res) => {
    const User = sanitizeHtml(req.body.user);

    const Username = sanitizeHtml(req.body.user.username);

    const Password = sanitizeHtml(req.body.user.password);
    if (typeof Username !== 'string' || typeof Password !== 'string') {
        return res.status(400).send("Invalid data types");
    }

    if(!containsUppercase(Password)){
        res.status(400).json({message: 'Passwords require an uppercase letter'});
    }
    else if(!containsNumbers(Password)){
        res.status(400).json({message: 'Passwords require a number'});
    }
    else if(!containsSpecialChar(Password)){
        res.status(400).json({message: 'Passwords require a special character'});
    }
    else {
        const user = await userServices.userExistsCheck(Username);
        if(user === true){
            res.status(400).json({message: 'Username already exists.'});
        }
        else{
            let Token = jwtToken.generateAccessToken({ Username });
            const newUser = await userServices.addUser(User);
            res.status(201).send(sanitizeHtml(Token));
        }
    }
});




function containsUppercase(str) {
    return /[A-Z]/.test(str);
}
function containsNumbers(str) {
    return /\d/.test(str);
}
function containsSpecialChar(str) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(str);
}

    

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
  });
