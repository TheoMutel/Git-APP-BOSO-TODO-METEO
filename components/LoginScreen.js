import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher un message d'erreur
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    setLoading(true); // Démarrer le loader
    setError(""); // Réinitialiser l'erreur avant chaque tentative

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Vérifier si la réponse contient un token
      if (data.token) {
        // Si un token est retourné, naviguer vers l'écran principal
        navigation.navigate("EcranPrincipal", { token: data.token });
      } else {
        // Si aucun token, afficher un message d'erreur
        setError("Identifiants incorrects.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false); // Arrêter le loader
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Se connecter" onPress={handleLogin} />

      {loading && <ActivityIndicator color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eaf2f8',
  },
  input: {
    height: 40,
    borderColor: '#7f8c8d',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  error: {
    color: '#c0392b',
    fontSize: 14,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


