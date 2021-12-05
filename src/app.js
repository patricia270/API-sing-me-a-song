import express from 'express';
import cors from 'cors';
import * as recommendationController from './controllers/recommendationController.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/recommendations', recommendationController.postRecommedation);

export default app;
