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

export {
    createRecomendation,
    increaseScore,
    decreaseScore,
    selectTopRecommendations,
};
