import express from 'express'
import { logIn, addUsers, signUp, loginUser } from '../controler/usersController.js'
const router=express.Router()
router.get("/",logIn).get("/signup", signUp)
router.post("/signup", addUsers).post("/login", loginUser)
export default router