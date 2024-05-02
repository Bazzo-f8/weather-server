import mongoose from 'mongoose';
import {City} from "../types/city";
import {CityModel} from "../entity/CityModel";
import passportLocalMongoose from 'passport-local-mongoose';
import {User} from "../types/user";
import bcrypt from "bcryptjs";
import passport from "passport";
import UserModel from "../entity/UserModel";
import {Hourly} from "../types/hourly";
import {Daily} from "../types/daily";
import {Current} from "../types/current";

export class Database {

    //region Start and Connect to db
    private uri : string = 'mongodb://admin:admin@mongodb:27017';
    //private uri : string = 'mongodb://admin:admin@localhost:27017';


    // Metodo di connessione al DB
    public connectToMongoDB = async () => {
        try {
            await mongoose.connect(this.uri);
            console.log('Connected to the MongoDB api-weather-frontend');
        } catch (error) {
            console.error('Error connecting to the MongoDB data-sender-docker:', error);
        }
    }

    // Metodo per chiudere la connessione al DB
    public closeConnection = async () => {
        mongoose.connection.close()
            .then(() => {
                console.log('Mongoose connection closed successfully');
            })
            .catch((error) => {
                console.error('Error closing Mongoose connection:', error);
            });
    }

    //endregion

    ////////////////////////////

    //region add City / Weather to db
    // Metodo per aggiungere una città al db
    public async addCityToDB(city: City | undefined): Promise<void> {
        try {
            if(typeof city === 'undefined') { return }
            const cityExists = await CityModel.exists({ name: city.name });

            if (!cityExists) {
                const newCity = new CityModel({
                    name: city.name,
                    lat: city.lat,
                    long: city.long,
                    timezone: city.timezone,
                    country: city.country,
                });
                await newCity.save();
                console.log(`City "${city.name}" added successfully!`);
            } else {
                console.log(`City "${city.name}" already exists. Skipping addition.`);
            }
        } catch (error) {
            console.error('Error adding city:', error);
        }
    }

    // Metodo per aggiungere il meteo attuale ad una determinata città
    public async addCurrentToCity(city: City | undefined, weather : Current | undefined): Promise<void> {
        if (typeof city === 'undefined') {
            return; // If city is undefined, return early
        }

        try {
            // Use Mongoose's findOneAndUpdate method to find the city by name
            // and update the current array field by pushing the weather-frontend object
            await CityModel.findOneAndUpdate(
                { name: city.name }, // Find the city by name
                { $push: { weatherCurrent: weather } }, // Push the weather-frontend object to the current array
                { new: true } // Return the updated document
            );

            console.log('Current weather-frontend added to city successfully.');
        } catch (error) {
            console.error('Error adding current weather-frontend to city:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per aggiungere il meteo ad ore ad una determinata città
    public async addHourlyToCity(city: City | undefined, weather : Hourly | undefined): Promise<void> {
        if (typeof city === 'undefined') {
            return;
        }
        try {
            await CityModel.findOneAndUpdate(
                { name: city.name },
                { $push: { weatherHourly: weather } },
                { new: true }
            );
            console.log('Hourly weather-frontend added to city successfully.');
        } catch (error) {
            console.error('Error adding hourly weather-frontend to city:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per aggiungere il meteo di N giorni ad una determinata città
    public async addDailyToCity(city: City | undefined, weather : Daily | undefined): Promise<void> {
        if (typeof city === 'undefined') {
            return;
        }

        try {
            await CityModel.findOneAndUpdate(
                { name: city.name },
                { $push: { weatherDaily: weather } },
                { new: true }
            );

            console.log('Daily weather-frontend added to city successfully.');
        } catch (error) {
            console.error('Error adding daily weather-frontend to city:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    //endregion

    ////////////////////////////

    //region searchCity

    // Metodo per recuperare una determinata citta tramite il nome
    public async getCityFromDb(name: string | undefined) {
        try {
            // Use Mongoose's findOne method to search for a city by name
            const city = await CityModel.findOne({ name: name }).exec();

            if (city) {
                console.log('City found in the database');
                return city; // Return the found city
            } else {
                console.log('City not found in the database.');
                return null; // Return null if city is not found
            }
        } catch (error) {
            console.error('Error fetching city from the database:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per recuperare una determinata citta tramite l'id
    public async getCityFromDbByID(id: string | undefined) {
        try {
            // Use Mongoose's findOne method to search for a city by name
            const city = await CityModel.findOne({ _id: id }).exec();

            if (city) {
                console.log('City found in the database');
                return city; // Return the found city
            } else {
                console.log('City not found in the database.');
                return null; // Return null if city is not found
            }
        } catch (error) {
            console.error('Error fetching city from the database:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    //endregion

    ////////////////////////////

    //region User Auth

    //endregion

}
