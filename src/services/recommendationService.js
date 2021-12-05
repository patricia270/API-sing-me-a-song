import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function createRecomendation({ name, youtubeLink }) {
    await recommendationRepository.createRecomendation({ name, youtubeLink });
}

async function increaseScore({ id }) {
    await recommendationRepository.increaseScore({ id });
}

export {
    createRecomendation,
    increaseScore,
};
