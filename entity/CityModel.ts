import mongoose from "mongoose";
import {Daily} from "../types/daily";
import {Hourly} from "../types/hourly";
import {Current} from "../types/current";

const CitySchema = new mongoose.Schema({
    name: String,
    lat: Number,
    long: Number,
    timezone: String,
    country: String,
    weatherCurrent: Array<Current>,
    weatherHourly: Array<Hourly>,
    weatherDaily: Array<Daily>
});

export const CityModel = mongoose.model('City', CitySchema);
