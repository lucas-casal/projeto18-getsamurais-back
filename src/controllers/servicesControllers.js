import {db} from '../database/database.js'
import { searchUserByToken } from '../repositories/user.repository.js';
import { deleteLinkById, insertNewService, searchServiceById, updateServiceAvailable } from '../repositories/service.repository.js';

export const addService = async (req, res) =>{
    const {title, mainPhoto, imagesArray, description, price, phone, available } = req.body;
    const {authorization} = req.headers;
    
    const token = authorization.slice(7)

    try{
        const userRegistered = (await searchUserByToken(token)).rows[0]
        
        if (!userRegistered) return res.sendStatus(401)

        await insertNewService(userRegistered.user_id, title, mainPhoto, description, price, phone, available)
        
        res.sendStatus(201)
    }
    catch{
        res.sendStatus(400)
    }
}

export const getService = async (req, res) =>{
    const {id} = req.params;

    try{
        const shorted = (await searchServiceById(id)).rows[0]
        
        if (!shorted) return res.sendStatus(404)
        

        res.status(200).send(shorted)
    }
    catch{
        res.sendStatus(400)
    }
}

export const deleteURL = async (req, res) => {
    const {authorization} = req.headers
    const {id} = req.params
    const token = authorization.slice(7) 

    try{
        const urlRegistered = (await searchLinkById(id)).rows[0]
       
        if (!urlRegistered) return res.sendStatus(404)

        const matching = (await searchUserByToken(token)).rows[0]

        if (!matching) return res.sendStatus(401)

        if (matching.user_id !== urlRegistered.user_id) return res.sendStatus(401)
        
        await deleteLinkById(id)

        res.sendStatus(204)
    }
    catch{
        res.sendStatus(400)
    }
}

export const getAvailableServices = async (req, res) => {
    try{
        const arrayServices = (await db.query(`SELECT * FROM services WHERE available is true`)).rows
        res.send(arrayServices)
    }
    catch{
        res.sendStatus(400)
    }
}

export const patchService = async (req, res) =>{
    const {id} = req.params;
    const {checkbox} = req.body;
    const {authorization} = req.headers
    const token = authorization.slice(7) 
    console.log(checkbox)
    try{
        const service = (await searchServiceById(id)).rows[0]    
        if (!service) return res.sendStatus(404)
        
        const userRegistered = (await searchUserByToken(token)).rows[0]
        if(service.user_id !== userRegistered.user_id) return res.sendStatus(401)

        await updateServiceAvailable(checkbox, id);

        res.status(200)
    }
    catch{
        res.sendStatus(400)
    }
}