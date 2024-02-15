import express, { NextFunction, Request, Response } from 'express';
import { WeatherController } from './controllers/weatherController';
import { errorHandler } from './middlewares/errorHandler';
import { logHandler } from './middlewares/logHandler';
const cors = require('cors');

const app = express();
const API_KEY : string = process.env.API_KEY ? process.env.API_KEY : "e2027b84ab02bca1952f9a0a6a640ee5";
const PORT : number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const weatherController = new WeatherController(API_KEY)

app.use(cors());

app.use(logHandler);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
    try {
        res.send('Hello World');
    } catch (error) {
        res.send(error);
    }
});

app.get('/weather/:city', async(req: Request, res: Response, next : NextFunction) => {
    weatherController.getWeatherByLocation(req, res, next)
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});