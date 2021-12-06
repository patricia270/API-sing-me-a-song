import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as recommendationService from '../../src/services/recommendationService.js';

describe('POST/recommendations', () => {
    it('Recommendation creation success', async () => {
        jest.spyOn(recommendationRepository, 'createRecomendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'nome',
                youtubeLink: 'youtube.com/link',
                score: 0,
            },
        ]));
        const result = await recommendationService.createRecomendation({
            name: 'nome',
            youtubeLink: 'youtube.com/link',
        });
        expect(result).toEqual([
            {
                id: 1,
                name: 'nome',
                youtubeLink: 'youtube.com/link',
                score: 0,
            },
        ]);
    });

    it('Recommendation creation failed', async () => {
        jest.spyOn(recommendationRepository, 'createRecomendation').mockImplementationOnce(() => undefined);
        const result = await recommendationService.createRecomendation({ });
        expect(result).toBeUndefined();
    });
});
