export interface WeatherDetail {
    time: string;         // e.g. "2025-03-07T09:15"
    interval: number;     // e.g. 900
    temperature: number;  // e.g. 29.1
    windspeed: number;    // e.g. 9.1
    winddirection: number;// e.g. 277
    is_day: number;       // e.g. 1
    weathercode: number;  // e.g. 1
  }
  