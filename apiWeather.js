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
exports.apiWeather = void 0;
const axios_1 = __importDefault(require("axios"));
class apiWeather {
    constructor() {
        this.getCurrent = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: result } = yield axios_1.default.get(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation`);
                //console.log(result+"-------------------------------");
                return result;
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getHourly = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: result } = yield axios_1.default.get(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain`);
                //console.log(result+"-------------------------------");
                return result;
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getDaily = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: result } = yield axios_1.default.get(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max`);
                //console.log(result+"-------------------------------");
                return result;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.apiWeather = apiWeather;
// const api = new apiWeather()
// api.getValues()
