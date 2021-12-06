import connection from '../database/database.js';

async function createRecomendation({ name, youtubeLink }) {
    const result = await connection.query(`
        INSERT INTO recommendations 
        (name, youtube_link) 
        VALUES ($1, $2);
    `, [name, youtubeLink]);

    return result.rows;
}

async function increaseScore({ id }) {
    const result = await connection.query(`
        UPDATE recommendations 
        SET score = recommendations.score + 1
        WHERE id = $1 RETURNING id
    ;`, [id]);
    return result.rowCount;
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
    return true;
}

async function selectTopRecommendations({ amount }) {
    const result = await connection.query(`
        SELECT id, name, youtube_link AS "youtubeLink", 
        score FROM recommendations
        ORDER BY recommendations.score DESC LIMIT $1
    ;`, [amount]);

    return result.rows;
}

async function selectHigthScoreRecommendation() {
    const result = await connection.query(`
        SELECT id, name, youtube_link AS "youtubeLink", 
        score FROM recommendations 
        WHERE recommendations.score > 10 
        ORDER BY random() LIMIT $1
    ;`, [1]);

    return result.rows;
}

async function selectLowScoreRecommendation() {
    const result = await connection.query(`
        SELECT id, name, youtube_link AS "youtubeLink", 
        score FROM recommendations 
        WHERE recommendations.score >= -5 
        AND recommendations.score <= 10
        ORDER BY random() LIMIT $1
    ;`, [1]);

    return result.rows;
}

async function selectRandomRecommendation() {
    const result = await connection.query(`
        SELECT id, name, youtube_link AS "youtubeLink", 
        score FROM recommendations 
        ORDER BY random() LIMIT $1
    ;`, [1]);

    return result.rows;
}

export {
    createRecomendation,
    increaseScore,
    decreaseScore,
    deleteRecommendation,
    selectTopRecommendations,
    selectHigthScoreRecommendation,
    selectLowScoreRecommendation,
    selectRandomRecommendation,
};
