import connection from '../database/database.js';

async function createRecomendation({ name, youtubeLink }) {
    await connection.query(`
        INSERT INTO recommendations 
        (name, youtube_link) 
        VALUES ($1, $2);
    `, [name, youtubeLink]);
}

async function increaseScore({ id }) {
    await connection.query(`
        UPDATE recommendations 
        SET score = recommendations.score + 1
        WHERE id = $1
    ;`, [id]);
}

export {
    createRecomendation,
    increaseScore,
};
