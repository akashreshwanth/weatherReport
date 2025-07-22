// src/lib/fetchWeather.ts
export async function fetchWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
  );
  const data = await res.json();
  return data;
}
