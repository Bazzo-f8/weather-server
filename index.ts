import express from 'express';
import {apiWeather} from "./src/apiWeather";
import {apiGeoLoc} from "./src/apiGeoLoc";
import bodyParser from "body-parser";
import {City} from "./types/city";
const app = express();
app.use(bodyParser.json());
const port = 3000;
const weather = new apiWeather();
const geoLoc = new apiGeoLoc();
let city: City | undefined = undefined;



// GET
app.get('/current', async (req, res) => {
    try {
        console.log(city?.lat + "------------------");
        const data = await weather.getCurrent(city?.lat, city?.long); // Fetch data using the Axios client
        console.log(data);
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/hourly', async (req, res) => {
    try {
        const data = await weather.getHourly(city?.lat, city?.long); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/daily', async (req, res) => {
    try {
        const data = await weather.getDaily(city?.lat, city?.long); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// POST
app.post('/search-city',async (req, res) => {
    const { value } = req.body;
    // Process the city data (e.g., query weather API)
    console.log('Searching city:', value);

    city = await geoLoc.getLatLon(value);
    console.log(city);
    res.json("post city");
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


