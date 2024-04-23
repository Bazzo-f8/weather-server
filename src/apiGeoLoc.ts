import axios from "axios";

export class apiGeoLoc {

    public getLatLon = async (city : string) => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation`
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
