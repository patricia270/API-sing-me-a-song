import express from 'express';
import cors from 'cors';
import * as recommendationController from './controllers/recommendationController.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/recommendations', recommendationController.postRecommedation);
app.post('/recommendations/:id/upvote', recommendationController.AddEscore);
app.post('/recommendations/:id/downvote', recommendationController.subtractScore);

app.get('/recommendations/top/:amount', recommendationController.getTopRecommendations);

export default app;
