import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TodoDetails({ route }) {
  const { tache } = route.params;  // Paramètre passé via la navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la tâche</Text>
      <Text style={styles.text}>ID: {tache.id}</Text>
      <Text style={styles.text}>Texte: {tache.texte}</Text>
      <Text style={styles.text}>Catégorie: {tache.categorie}</Text>
      <Text style={styles.text}>Priorité : {tache.priorite}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
    color: '#34495e',
  },
  text: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 10,
  },
});
