"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiWeather_1 = require("./apiWeather");
const app = (0, express_1.default)();
const port = 3000;
const weather = new apiWeather_1.apiWeather();
app.get('/current', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield weather.getCurrent(); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    }
    catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/hourly', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield weather.getHourly(); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    }
    catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/daily', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield weather.getDaily(); // Fetch data using the Axios client
        res.json(data); // Send the data as JSON response
    }
    catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
