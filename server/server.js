const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors")
const User = require('./Models/UserModel')
const cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const mentoringRoutes = require('./Routes/mentoringRoutes');
const authRoute = require("./Routes/AuthRoute");

require("dotenv").config()
const { MONGO_URL, PORT } = process.env

const app = express();

mongoose.connect(MONGO_URL).then(
    () => console.log('MongoDB connected')
).catch(
    err => console.log('MongoDB NOT connected', err)
)
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('<h1> Welcome to OVaidya </h1>')
// })

app.post('/addUser', async (req, res)=>{
    const { username, fullname, email, mobile, role, password, createdAt } = req.body;
    try {
        const newUser = new User({ username, fullname, email, mobile, role, password, createdAt })
        await newUser.save()
        return res.json(await User.find())
    } catch(err){
        console.log(err.message)
    }
})

app.get('/getUsers', async (req,res)=>{
    try {
     const allUsers = await User.find()
     return res.json(allUsers)
    }
    catch(err){
     console.log(err.message)
    }
 })

 app.get('/getUserById/:id', async (req,res)=>{
    try {
     const user = await User.findById(req.params.id)
     return res.json(user)
    }
    catch(err){
     console.log(err.message)
    }
 })

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})

app.use(
    cors({
      origin: 'https://app-oshishya.onrender.com',  //frontend URI
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(
    cookieSession({
        secret: 'mySecret',
        sameSite: 'none',
        secure: true,
        httpOnly: true,
    })
  )
    
app.use("/", authRoute);
app.use('/api', mentoringRoutes);
