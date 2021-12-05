import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function createRecomendation({ name, youtubeLink }) {
    await recommendationRepository.createRecomendation({ name, youtubeLink });
}

export {
    createRecomendation,
};
