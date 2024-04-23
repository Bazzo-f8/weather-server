import axios from "axios";

export class apiWeather {

    public getCurrent = async () => {
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

    public getHourly = async () => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain`
            );
            //console.log(result+"-------------------------------");
            return result;
        } catch (e) {
            console.log(e);
        }
    };

    public getDaily = async () => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max`
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
