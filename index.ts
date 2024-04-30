import express from 'express';
import {apiWeather} from "./src/apiWeather";
import {apiGeoLoc} from "./src/apiGeoLoc";
import bodyParser from "body-parser";
import {City} from "./types/city";
import UserModel from "./entity/UserModel";
import {Database} from "./src/database"
import {Hourly} from "./types/hourly";

const db = new Database();
db.connectToMongoDB()


const app = express();
app.use(bodyParser.json());


const port = 3000;
const weather = new apiWeather();
const geoLoc = new apiGeoLoc();
let city: City | undefined = undefined;




//region getWeather
app.get('/current', async (req, res) => {
    try {
        //console.log(city?.lat + "------------------");
        const data = await weather.getCurrent(city?.lat, city?.long); // Fetch data using the Axios client
        await db.addCurrentToCity(city, data)
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/hourly', async (req, res) => {
    try {
        const data : Hourly | undefined = await weather.getHourly(city?.lat, city?.long); // Fetch data using the Axios client
        await db.addHourlyToCity(city, data)
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/daily', async (req, res) => {
    try {
        const data = await weather.getDaily(city?.lat, city?.long); // Fetch data using the Axios client
        await db.addDailyToCity(city, data)
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//endregion

//region searchCity
app.post('/search-city',async (req, res) => {
    const { value } = req.body;
    // Process the city data (e.g., query weather API)
    console.log('Searching city:', value);

    city = await geoLoc.getLatLon(value);
    console.log(city);
    await db.addCityToDB(city)

    res.json("post city");
});
//endregion

app.get('/db-city',async (req, res) => {
    const { value } = req.body;
    // Process the city data (e.g., query weather API)
    console.log('Searching city:', value);
    const temp = await geoLoc.getLatLon(value);
    // @ts-ignore
    let cityDb = await db.getCityFromDb(temp.name);
    console.log(cityDb);

    res.json(cityDb);
});


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


