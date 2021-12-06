import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as recommendationService from '../../src/services/recommendationService.js';

describe('POST/recommendations', () => {
    it('Recommendation creation success', async () => {
        jest.spyOn(recommendationRepository, 'createRecomendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 0,
            },
        ]));
        const result = await recommendationService.createRecomendation({
            name: 'título',
            youtubeLink: 'youtube.com/link',
        });
        expect(result).toEqual([
            {
                id: 1,
                name: 'título',
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

describe('GET /recommendations/top/:amount', () => {
    it('List top recommendations by limit', async () => {
        jest.spyOn(recommendationRepository, 'selectTopRecommendations').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 0,
            },
        ]));
        const result = await recommendationService.selectTopRecommendations({ amount: 1 });
        expect(result).toEqual([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 0,
            },
        ]);
    });
});

describe('GET /recommendations/random', () => {
    it('No registered recommendations', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.6);
        jest.spyOn(recommendationRepository, 'selectRandomRecommendation').mockImplementationOnce(() => false);
        jest.spyOn(recommendationRepository, 'selectHigthScoreRecommendation').mockImplementationOnce(() => false);
        jest.spyOn(recommendationRepository, 'selectLowScoreRecommendation').mockImplementationOnce(() => false);

        const result = await recommendationService.selectRandomRecommendation();
        expect(result).toBe(null);
    });

    it('List random recommendation by perc <= 70', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.7);
        jest.spyOn(recommendationRepository, 'selectRandomRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
            {
                id: 2,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectHigthScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectLowScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 2,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));

        const result = await recommendationService.selectRandomRecommendation();
        expect(result).toEqual([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]);
    });

    it('List random recommendation by perc <= 0.69', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.69);
        jest.spyOn(recommendationRepository, 'selectRandomRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
            {
                id: 2,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectHigthScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectLowScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 2,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));
        const result = await recommendationService.selectRandomRecommendation();
        expect(result).toEqual([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]);
    });

    it('List random recommendation by perc <= 0.71', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.71);
        jest.spyOn(recommendationRepository, 'selectRandomRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
            {
                id: 2,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectHigthScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectLowScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 2,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));
        const result = await recommendationService.selectRandomRecommendation();
        expect(result).toEqual([
            {
                id: 2,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]);
    });

    it('List random recommendation without low score recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.70);
        jest.spyOn(recommendationRepository, 'selectRandomRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectHigthScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectLowScoreRecommendation').mockImplementationOnce(() => false);
        const result = await recommendationService.selectRandomRecommendation();
        expect(result).toEqual([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: 11,
            },
        ]);
    });

    it('List random recommendation without low score recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.70);
        jest.spyOn(recommendationRepository, 'selectRandomRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));
        jest.spyOn(recommendationRepository, 'selectHigthScoreRecommendation').mockImplementationOnce(() => false);
        jest.spyOn(recommendationRepository, 'selectLowScoreRecommendation').mockImplementationOnce(() => ([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]));
        const result = await recommendationService.selectRandomRecommendation();
        expect(result).toEqual([
            {
                id: 1,
                name: 'título',
                youtubeLink: 'youtube.com/link',
                score: -4,
            },
        ]);
    });
});
