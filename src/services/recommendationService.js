import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function createRecomendation({ name, youtubeLink }) {
    const result = await recommendationRepository.createRecomendation({ name, youtubeLink });
    return result;
}

async function increaseScore({ id }) {
    if (id) {
        const result = await recommendationRepository.increaseScore({ id });
        return result;
    }
    return false;
}

async function decreaseScore({ id }) {
    const score = await recommendationRepository.decreaseScore({ id });

    if (score < -5) {
        await recommendationRepository.deleteRecommendation({ id });
        return false;
    }
    return true;
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
    if (perc <= 0.7) {
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
