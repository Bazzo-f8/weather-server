import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


const axios = require('axios');


let values = {}
const getData = async () => {
    try {
        const { data: result } = await axios.get(
            `http://sender:12000/data`
        );
        console.log(result+"-------------------------------");
        values = result;
    } catch (e) {
        console.log(e);
    }
};
