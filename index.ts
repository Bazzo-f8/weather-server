import express from 'express';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const port = 3000;


app.use('/', require('./src/routes'));


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


