import axios from "axios";

export class apiWeather {
    private values : {}

    constructor() {
        this.values = {};
    }

    private getData = async () => {
        try {
            const { data: result } = await axios.get(
                `https://jsonplaceholder.typicode.com/posts`
            );
            console.log(result+"-------------------------------");
            this.values = result;
        } catch (e) {
            console.log(e);
        }
    };

    public getValues = async () => {
        return await this.getData().then(() => {return this.values;})
    }

}

// const api = new apiWeather()
// api.getValues()
