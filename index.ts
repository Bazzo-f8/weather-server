import express from 'express';
import {apiWeather} from "./apiWeather";
const app = express();
const port = 3000;
const weather = new apiWeather();


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

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


