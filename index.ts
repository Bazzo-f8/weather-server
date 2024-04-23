import express from 'express';
import {apiWeather} from "./src/apiWeather";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
const port = 3000;
const weather = new apiWeather();



// GET
app.get('/current', async (req, res) => {
    try {
        const data = await weather.getCurrent(); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/hourly', async (req, res) => {
    try {
        const data = await weather.getHourly(); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/daily', async (req, res) => {
    try {
        const data = await weather.getDaily(); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// POST
app.post('/search-city', (req, res) => {
    const { city } = req.body;
    // Process the city data (e.g., query weather API)
    console.log('Searching city:', city);
    // Respond with data (e.g., weather information)
    res.json({ message: `Searching for ${city}...` });
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


