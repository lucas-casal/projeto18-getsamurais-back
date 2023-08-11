import { db } from "../database.js";
import bcrypt from 'bcrypt'


export async function searchUserByToken(token) {
    return db.query(`SELECT * FROM tokens WHERE token=$1`, [token])
}

export async function searchUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email])
}

export async function insertNewUser(name, email, password, phone, cep, address, complement, picture='') {
    const hash = bcrypt.hashSync(password, 10);
    const arraySent = picture ? [name, email, hash, phone, cep, address, complement, picture] : [name, email, hash, phone, cep, address, complement]
    console.log(arraySent)
    console.log(`INSERT INTO users (name, email, password, phone, cep, address, complement${picture ? ', picture' : ''}) VALUES ($1, $2, $3, $4, $5, $6, $7${picture ? ', $8' : ''});`)
    return await db.query(`INSERT INTO users (name, email, password, phone, cep, address, "addressComplement"${picture ? ', picture' : ''}) VALUES ($1, $2, $3, $4, $5, $6, $7${picture ? ', $8' : ''});`, arraySent)
}

export async function insertNewToken(userId, token) {
    return await db.query(`INSERT INTO tokens (user_id, token) VALUES ($1, $2);`, [userId, token])
}

export async function getUserByToken(token){
    return (await db.query(`
        SELECT users.id, users.name, SUM(links.views) as "visitCount",
        json_agg(json_build_object('id', links.id, 'shortUrl', links."shortUrl", 'url', links.url, 'visitCount', links.views, 'nickname', links.nickname) ORDER BY links.id DESC) as "shortenedUrls"
        FROM tokens 
        inner JOIN users ON users.id = tokens.user_id
        left JOIN links ON links.user_id = tokens.user_id
        WHERE token=$1
        GROUP BY users.id;
        `, [token]))
}