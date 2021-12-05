import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function createRecomendation({ name, youtubeLink }) {
    await recommendationRepository.createRecomendation({ name, youtubeLink });
}

async function increaseScore({ id }) {
    await recommendationRepository.increaseScore({ id });
}

async function decreaseScore({ id }) {
    await recommendationRepository.decreaseScore({ id });
}

export {
    createRecomendation,
    increaseScore,
    decreaseScore,
};
