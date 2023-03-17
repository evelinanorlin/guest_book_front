require('dotenv').config()
var express = require('express');
var cors = require('cors');
var app = express();


var BlogsRoute = require('./routes/blogs-route');
var UsersRoute = require('./routes/users-route');

const mongoose = require('mongoose')


app.use(express.json());
app.use(cors());


app.use('/api/blogs', BlogsRoute);
app.use('/api/users', UsersRoute);


async function init() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to database')

  } catch(error){
    console.error(error)
  }
  app.listen(4000, () => console.log(`server is up and running`))
}

init()