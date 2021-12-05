import connection from '../database/database.js';

async function createRecomendation({ name, youtubeLink }) {
    await connection.query(`
        INSERT INTO recommendations 
        (name, youtube_link) 
        VALUES ($1, $2);
    `, [name, youtubeLink]);
}

export {
    createRecomendation,
};
