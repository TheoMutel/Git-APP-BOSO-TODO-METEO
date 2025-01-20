// WeatherComponent.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getWeatherByCity } from "../services/weatherService"; // Ajuste le chemin si nécessaire

export default function WeatherComponent() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleGetWeather = async () => {
    setError("");
    setWeather(null);
    if (!cityName.trim()) {
      setError("Veuillez saisir le nom d'une ville.");
      return;
    }
    try {
      const data = await getWeatherByCity(cityName);
      setWeather(data);
    } catch (err) {
      console.log(err);
      setError(
        "Impossible de récupérer la météo. Vérifiez la ville ou votre connexion."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bulletin Météo</Text>

      <TextInput
        value={cityName}
        onChangeText={setCityName}
        placeholder="Entrez une ville (ex: Paris)"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleGetWeather}>
        <Text style={styles.buttonText}>Obtenir la météo</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {weather && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Ville : {weather.city}</Text>
          <Text style={styles.resultText}>
            Température : {weather.temperature} °C
          </Text>
          <Text style={styles.resultText}>Humidité : {weather.humidity} %</Text>
          <Text style={styles.resultText}>
            Description : {weather.description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "red", marginBottom: 10 },
  resultContainer: { marginTop: 10 },
  resultText: { fontSize: 16, marginBottom: 5 },
});
