
import express from 'express'
import connectToDatabase from './db-connection.js'
import router from './router/useRouter.js'
//import collection from '../modals/usersSchema.js'
import pasth from 'path'

//import bcrypt from 'bcrypt'



const app=express()
const port=5000
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs")
connectToDatabase()
app.use("/", router)
/*
app.get("/", (req, res)=>{
    res.render("login.ejs")
})

app.get("/signup", (req, res)=>{
    res.render("signup.ejs")
})

app.post("/signup", async (req, res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }
    const existingUser =await collection.findOne({name:data.name})
    if(existingUser){
        res.send("user already exist. Please chosse a different username")
    }else{
        //hash password
        const saltRounds=10 //num of salt round for bcrypt
        const hashPassword= await bcrypt.hash(data.password, saltRounds )

        data.password=hashPassword //to replace the hash password with orignal password     
        const userdata= await collection.insertMany(data)
    console.log(userdata)
    }
    
})

app.post("/login", async (req, res)=>{
    try{
        const check= await collection.findOne({name:req.body.username})
        if(!check){
            res.send("user name cannot found")
        }
        //compare the hash password from the database with the plain text
        const isPasswordMatch= await bcrypt.compare(req.body.password, check.password)
        if(isPasswordMatch){
            res.render("home")
        }else{
            res.send("wrong password or Email")
        }
    }catch{
        res.send("wrong details")
    }
})

*/


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

