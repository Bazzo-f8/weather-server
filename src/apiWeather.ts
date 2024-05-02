import axios from "axios";
import {Current} from "../types/current";
import {Hourly} from "../types/hourly";
import {Daily} from "../types/daily";

export class apiWeather {

    public getCurrent = async (lat : number | undefined, lon : number | undefined): Promise<Current | undefined> => {
        try {
            //console.log("ciaoooooooooooooooooooooooooooo");
            //console.log(lat+"-"+ lon)

            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m`
            );
            //console.log(result+"-------------------------------");
            //console.log(result.current);
            const cur : Current = {
                time: result.current.time,
                temperature_2m: result.current.temperature_2m,
                relative_humidity_2m: result.current.relative_humidity_2m,
                apparent_temperature: result.current.apparent_temperature,
                is_day: result.current.is_day,
                precipitation: result.current.precipitation,
                cloud_cover: result.current.cloud_cover,
                pressure_msl: result.current.pressure_msl,
                surface_pressure: result.current.surface_pressure,
                wind_speed_10m: result.current.wind_speed_10m,
                wind_direction_10m: result.current.wind_direction_10m,
                wind_gusts_10m: result.current.wind_gusts_10m
            }
            console.log("Current: " + cur);
            return cur;
        } catch (e) {
            console.log(e);
            return undefined
        }
    };

    public getHourly = async (lat : number | undefined, lon : number | undefined, nDay : number | undefined) => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&forecast_days=${nDay}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_80m,wind_direction_80m,wind_gusts_10m,temperature_80m,soil_temperature_6cm,soil_moisture_3_to_9cm`
            );

            const hour : Hourly = {
                time: result.hourly.time,
                temperature_2m: result.hourly.temperature_2m,
                relative_humidity_2m: result.hourly.relative_humidity_2m,
                apparent_temperature: result.hourly.apparent_temperature,
                precipitation_probability: result.hourly.precipitation_probability,
                precipitation: result.hourly.precipitation,
                pressure_msl: result.hourly.pressure_msl,
                surface_pressure: result.hourly.surface_pressure,
                cloud_cover: result.hourly.cloud_cover,
                visibility: result.hourly.visibility,
                wind_speed_80m: result.hourly.wind_speed_80m,
                wind_direction_80m: result.hourly.wind_direction_80m,
                wind_gusts_10m: result.hourly.wind_gusts_10m,
                temperature_80m: result.hourly.temperature_80m,
                soil_temperature_6cm: result.hourly.soil_temperature_6cm,
                soil_moisture_3_to_9cm: result.hourly.soil_moisture_3_to_9cm
            }
            console.log("Hourly: " + hour);
            return hour;
        } catch (e) {
            console.log(e);
        }
    };

    public getDaily = async (lat : number | undefined, lon : number | undefined, nDay : number | undefined) => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}
&forecast_days=${nDay}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant`
            );
            //console.log(result);
            const day : Daily = {
                time: result.daily.time,
                temperature_2m_max: result.daily.temperature_2m_max,
                temperature_2m_min: result.daily.temperature_2m_min,
                apparent_temperature_max: result.daily.apparent_temperature_max,
                apparent_temperature_min: result.daily.apparent_temperature_min,
                sunrise: result.daily.sunrise,
                sunset: result.daily.sunset,
                precipitation_sum: result.daily.precipitation_sum,
                precipitation_probability_max: result.daily.precipitation_probability_max,
                wind_speed_10m_max: result.daily.wind_speed_10m_max,
                wind_gusts_10m_max: result.daily.wind_gusts_10m_max,
                wind_direction_10m_dominant: result.daily.wind_direction_10m_dominant
            }
            console.log("Daily: "+ day);
            return day;
        } catch (e) {
            console.log(e);
        }
    };


}

// const api = new apiWeather()
// api.getValues()
