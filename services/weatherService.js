// src/weatherService.js
import axios from "axios";

/**
 * Configuration de base pour OpenWeather (API "Current Weather" : https://openweathermap.org/current)
 * 1. Obtenir une clé (API_KEY) depuis https://home.openweathermap.org/users/sign_up
 * 2. Indiquer l'unité (ex. metric) pour avoir °C
 */
const API_KEY = "7b12eb63103f7613f2f03147034efaff";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(cityName) {
  try {
    // Exemple d’appel : GET /weather?q={city name}&appid={API key}&units=metric
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric&lang=fr`;
    // lang=fr si tu veux la description en français
    // ou lang=en

    const response = await axios.get(url);

    // On récupère quelques infos utiles :
    const { temp, humidity } = response.data.main;
    const description = response.data.weather?.[0]?.description;
    // openWeather renvoie un tableau weather[]

    return {
      temperature: temp,
      humidity: humidity,
      description: description,
      city: response.data.name,
      // Tout ce dont tu as besoin
    };
  } catch (error) {
    console.log("Erreur lors de la récupération de la météo :", error);
    throw error;
  }
}
