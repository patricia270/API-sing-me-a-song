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

async function selectRecommendation({ id }) {
    const result = await connection.query(`
        SELECT * FROM recommendations
        WHERE id = $1
    ;`, [id]);

    return result.rows[0].score;
}

async function decreaseScore({ id }) {
    await connection.query(`
        UPDATE recommendations 
        SET score = recommendations.score - 1
        WHERE id = $1
    ;`, [id]);

    const result = await selectRecommendation({ id });
    return result;
}

async function deleteRecommendation({ id }) {
    await connection.query(`
        DELETE FROM recommendations WHERE id = $1
    ;`, [id]);
}

async function selectTopRecommendations({ amount }) {
    const result = await connection.query(`
        SELECT id, name, youtube_link AS "youtubeLink", 
        score FROM recommendations
        ORDER BY recommendations.score DESC LIMIT $1
    ;`, [amount]);

    return result.rows;
}

export {
    createRecomendation,
    increaseScore,
    decreaseScore,
    deleteRecommendation,
    selectTopRecommendations,
};
