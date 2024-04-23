import axios from "axios";

export class apiGeoLoc {

    public getLatLon = async (city : string) => {
        try {
            const { data: result } = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=Brescia&count=1&language=en&format=json`
            );
            //console.log(result+"-------------------------------");
            return result;
        } catch (e) {
            console.log(e);
        }
    };



}

// const api = new apiWeather()
// api.getValues()
