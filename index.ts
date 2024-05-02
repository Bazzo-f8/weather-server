import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:9000', // Allow requests from Quasar app origin
}));

const port = 3000;

// routing delle api
app.use('/', require('./src/routes'));




app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


