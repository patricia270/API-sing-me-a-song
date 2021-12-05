import { recommendationSchema } from '../schemas/schemas.js';
import * as recommendationService from '../services/recommendationService.js';

async function postRecommedation(req, res) {
    const { name, youtubeLink } = req.body;
    const invalidBody = recommendationSchema.validate({ name, youtubeLink }).error;

    if (invalidBody) {
        return res.sendStatus(400);
    }

    try {
        await recommendationService.createRecomendation({ name, youtubeLink });
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

async function AddEscore(req, res) {
    const { id } = req.params;

    try {
        await recommendationService.increaseScore({ id });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}

async function subtractScore(req, res) {
    const { id } = req.params;

    try {
        await recommendationService.decreaseScore({ id });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    postRecommedation,
    AddEscore,
    subtractScore,
};
