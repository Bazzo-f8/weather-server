import axios from "axios";
import {City} from "../types/city";

export class apiGeoLoc {

    public getLatLon = async (city : string): Promise<City | undefined> => {
        try {
            const { data: result } = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
            );
            if (result) {
                const value: City = {
                    name: result.results[0].name,
                    lat: result.results[0].latitude,
                    long: result.results[0].longitude,
                    timezone: result.results[0].timezone,
                    country: result.results[0].country,
                };
                return value;
            } else {
                console.log("City not found");
                return undefined;
            }
        } catch (e) {
            console.log(e);
        }
    };



}

