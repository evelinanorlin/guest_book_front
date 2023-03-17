require('dotenv').config()
var express = require('express');
var router = express.Router();
const UserModel = require('../models/users-model');
const CryptoJS = require('crypto-js');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json(users)
});

router.post('/add', async (req, res) => {
  let incomingUser = req.body;
  let username = incomingUser.username;

  try{
    let cryptPass = CryptoJS.AES.encrypt(incomingUser.password, process.env.SALT_KEY).toString();
    let user = {"username": username, "password": cryptPass};
    const newUser = await UserModel.create(user);
    await newUser.save()
    res.send({message: 'created user'})

  } catch{
    res.send({message: 'username taken'})
  }
})

router.post('/login', async (req,res) => {
  let newUser = req.body;
  let username = newUser.username;
  let password = newUser.password;

  const currentUsers = await UserModel.find();

  const foundUser = currentUsers.find((u) => u.username === username);

  if(foundUser){
    let decrypted = CryptoJS.AES.decrypt(foundUser.password, process.env.SALT_KEY).toString(CryptoJS.enc.Utf8);
    if(decrypted === password){
      res.send({message: "Logged in"})
      foundUser.loggedIn = true;
      foundUser.save()
      return
    } else{
      res.send({message: "Wrong password"})
      return
    }
  } else{
    res.send({message: "User not found"})
  }
})

router.post('/logout', async (req,res) => {
console.log(req.body);
let username = req.body.username;

let currentUsers = await UserModel.find()

const foundUser = currentUsers.find((u) => u.username === username);

if(foundUser){
  foundUser.loggedIn = false;
  foundUser.save()
  console.log(foundUser)
  res.send({message: "logged out"})
  return
} else{
  res.send({message: "failed to log out"})
}

})

module.exports = router;
