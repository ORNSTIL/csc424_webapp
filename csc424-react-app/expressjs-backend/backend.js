const express = require('express');
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



app.post('/account/login', async (req, res) => {
// app.post('/account/login', jwtToken.authenticateToken, async (req, res) => {

    try{
        const username = req.body.value.username;
        const password = req.body.value.password;

        const user = await userServices.loginCheck(username, password);
        if(user){
            const token = jwtToken.generateAccessToken({ username: username });
            res.status(201).send({username, password, token});
            // res.status(201).send(token);

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
    const User = req.body.user;

    const Username = req.body.user.username;
    //const PhoneNumber = req.body.user.phoneNumber
    const Password = req.body.user.password;
    //const confirmPassword = req.body.user.confirmPassword;

    // if(Password != confirmPassword){
    //     res.status(400).json({message: 'Passwords do not match'});
    // }
    //else if(!containsUppercase(Password)){
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
            res.status(201).send(Token);
        }
    }
});

app.get('/account/users', async (req, res) => {
    ////res.send(account);
    // const result = await userServices.getAllUsers();
	
	// console.log('Received GET request for users');
   // res.status(200).send('Hello from the backend!');
	
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
    ////let result = findUserByUsername(username);
    const result = await userServices.findUserByUsername(Username);
    
    if(result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
    }
    else{
        ////result = {account_list: result};
        ////res.send(result);
        let encodedResult = encodeURI(result);
        res.status(201).send(encodedResult);

        // res.status(201).send(result);
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

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });      

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
