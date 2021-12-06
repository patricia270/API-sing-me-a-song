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

describe('POST/recommendations/:id/upvote', () => {
    it('Score increase', async () => {
        jest.spyOn(recommendationRepository, 'increaseScore').mockImplementationOnce(() => true);
        const result = await recommendationService.increaseScore({ id: 1 });
        expect(result).toBe(true);
    });

    it('Score increase without id', async () => {
        jest.spyOn(recommendationRepository, 'increaseScore').mockImplementationOnce(() => true);
        const result = await recommendationService.increaseScore({ });
        expect(result).toBe(false);
    });
});

describe('POST/recommendations/:id/downvote', () => {
    it('Score decrease when greater than -5', async () => {
        jest.spyOn(recommendationRepository, 'decreaseScore').mockImplementationOnce(() => -4);
        const result = await recommendationService.decreaseScore({ id: 1 });
        expect(result).toBe(true);
    });

    it('Score decrease when equal to -5', async () => {
        jest.spyOn(recommendationRepository, 'decreaseScore').mockImplementationOnce(() => -5);
        const result = await recommendationService.decreaseScore({ id: 1 });
        expect(result).toBe(true);
    });

    it('Recommendation exclusion when score less than -5', async () => {
        jest.spyOn(recommendationRepository, 'decreaseScore').mockImplementationOnce(() => -6);
        jest.spyOn(recommendationRepository, 'deleteRecommendation').mockImplementationOnce(() => true);
        const result = await recommendationService.decreaseScore({ id: 1 });
        expect(result).toBe(false);
    });
});
