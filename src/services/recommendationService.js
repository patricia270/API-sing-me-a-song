/* eslint-disable max-len */
import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function createRecomendation({ name, youtubeLink }) {
    await recommendationRepository.createRecomendation({ name, youtubeLink });
}

async function increaseScore({ id }) {
    await recommendationRepository.increaseScore({ id });
}

async function decreaseScore({ id }) {
    const score = await recommendationRepository.decreaseScore({ id });

    if (score < -5) {
        recommendationRepository.deleteRecommendation({ id });
    }
}

async function selectTopRecommendations({ amount }) {
    const topRecommendations = await recommendationRepository.selectTopRecommendations({ amount });

    return topRecommendations;
}

async function selectRandomRecommendation() {
    const perc = Math.random();
    const highScoreRecommendation = await recommendationRepository.selectHigthScoreRecommendation();
    const lowScoreRecommendation = await recommendationRepository.selectLowScoreRecommendation();
    const randomRecommendationList = await recommendationRepository.selectRandomRecommendation();

    if (!randomRecommendationList.length) {
        return null;
    }
    if (!highScoreRecommendation.length || !lowScoreRecommendation.length) {
        return randomRecommendationList;
    }
    if (perc < 0.7) {
        return highScoreRecommendation;
    }
    return lowScoreRecommendation;
}

export {
    createRecomendation,
    increaseScore,
    decreaseScore,
    selectTopRecommendations,
    selectRandomRecommendation,
};
