import * as recommendationService from '../services/recommendationService.js';

async function postRecommedation(req, res) {
    const { name, youtubeLink } = req.body;

    try {
        await recommendationService.createRecomendation({ name, youtubeLink });
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    postRecommedation,
};
