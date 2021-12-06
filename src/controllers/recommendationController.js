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
        const result = await recommendationService.increaseScore({ id });
        if (!result) {
            return res.sendStatus(404);
        }
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

async function getTopRecommendations(req, res) {
    const { amount } = req.params;

    try {
        const topRecommendations = await recommendationService.selectTopRecommendations({ amount });

        res.send(topRecommendations);
    } catch (error) {
        res.sendStatus(500);
    }
}

async function getRandomRecommendation(req, res) {
    try {
        const randomRecommendation = await recommendationService.selectRandomRecommendation();
        if (randomRecommendation === null) {
            return res.sendStatus(404);
        }
        res.send(randomRecommendation);
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    postRecommedation,
    AddEscore,
    subtractScore,
    getTopRecommendations,
    getRandomRecommendation,
};
