
// Struttura del ritorno della chiamata Daily
export type Daily = {
    time: string[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    apparent_temperature_max: number[],
    apparent_temperature_min: number[],
    sunrise: string[],
    sunset: string[],
    precipitation_sum: number[],
    precipitation_probability_max: number[],
    wind_speed_10m_max: number[],
    wind_gusts_10m_max: number[],
    wind_direction_10m_dominant: number[]
};
