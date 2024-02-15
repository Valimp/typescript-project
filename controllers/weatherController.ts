import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import { MinimalWeatherData } from '../interfaces/MinimalWeatherData';

export class WeatherController {

    private API_KEY: string;

    constructor(apiKey: string) {
        this.API_KEY = apiKey;
    }

    public async getWeatherByLocation(req: Request, res: Response, next: NextFunction): Promise<void> {

        const city : string  = req.params.city

        try {
            // Call the OpenWeatherMap API
            const response : AxiosResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}`
            );

            // Extract the temperature from the response
            const temperature : string = (response.data.main.temp - 273.15).toFixed(2);

            // Create the minimal data object
            const minimalData : MinimalWeatherData = {
                city: response.data.name,
                country: response.data.sys.country,
                temperature: temperature,
            }
            
            // Send the minimal data object as a JSON response
            res.json(minimalData)
        } catch (err) {
            next(new ApiError("Erreur de l'api meteo"));
        }
    }
}