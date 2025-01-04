import express from "express";
import { handleUserRegister, handleUserLogin } from "../controllers/user.js";

const router = express.Router()

router.post('/', (req,res)=>{
    handleUserRegister(req,res)
})

router.post('/login', (req,res)=>{
    handleUserLogin(req,res)
})

export default router