import { db } from "../database.js";

export async function searchLinkByURL(x) {
    return db.query(`SELECT * FROM links WHERE url=$1`, [x])
}

export async function insertNewService(userId, title, mainPhoto, description, price, phone, photo, available=true) {
    return db.query(`INSERT INTO services (user_id, title, "mainPhoto", description, price, phone, photo, available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [userId, title, mainPhoto, description, price, phone, photo, available]);
}

export async function searchServiceById (x) { 
    return (db.query(`
    SELECT services.*, users.name, users.picture, users.email FROM services 
    JOIN users ON users.id = services.user_id
    WHERE services.id=$1
    ;`, [x]))
}

export async function deleteLinkById(x) {
    return (db.query(`
    DELETE FROM links 
    WHERE id=$1
    `, [x]))
}

export async function updateServiceAvailable(available, id){
    db.query(`UPDATE services SET available=$1 WHERE id=$2`, [available, id])
}
