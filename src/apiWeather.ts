import axios from "axios";

export class apiWeather {

    public getCurrent = async (lat : number | undefined, lon : number | undefined) => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}
&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation`
            );
            //console.log(result+"-------------------------------");
            return result;
        } catch (e) {
            console.log(e);
        }
    };

    public getHourly = async (lat : number | undefined, lon : number | undefined) => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}
&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain`
            );
            //console.log(result+"-------------------------------");
            return result;
        } catch (e) {
            console.log(e);
        }
    };

    public getDaily = async (lat : number | undefined, lon : number | undefined) => {
        try {
            const { data: result } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}
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
