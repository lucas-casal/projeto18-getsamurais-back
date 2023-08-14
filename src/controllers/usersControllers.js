import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid";
import { getUserByToken, insertNewToken, insertNewUser, searchUserByEmail } from "../repositories/user.repository.js";

export const addUser = async (req, res) => {
    const {email, name, password, phone, cep, address, complement, picture} = req.body;
    
    try{
        const userRegistered = (await searchUserByEmail(email)).rows[0]
        if (userRegistered) return res.status(409).send(`email ${email} já está em uso`)
        await insertNewUser(name, email, password, phone, cep, address, complement, picture) 
        console.log(email)

        res.sendStatus(201)
    }
    catch{
        res.sendStatus(400)
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const token = uuid();
    try{

        const userRegistered = (await searchUserByEmail(email)).rows[0]
        console.log(userRegistered)
        if (!userRegistered) return res.sendStatus(401);
        if (!bcrypt.compareSync(password, userRegistered.password)) return res.sendStatus(401);
        
        await insertNewToken(userRegistered.id, token)
        res.status(200).send({token})
    }
    catch{
        res.sendStatus(400)
    }
}

export const getUser = async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization.slice(7)
    try{
        
        const userRegistered = (await getUserByToken(token)).rows[0]
        if(!userRegistered) return res.sendStatus(401)
        console.log(userRegistered)
        
        res.send(userRegistered)
    }
    catch{
        res.sendStatus(400)
    }
}
