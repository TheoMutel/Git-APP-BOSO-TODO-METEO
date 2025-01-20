// CompletedTasks.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next"; // IMPORT pour la traduction

export default function CompletedTasks({ route, navigation }) {
  const { t } = useTranslation();
  const { tachesTerminees } = route.params;

  const handleDetails = (task) => {
    navigation.navigate("CompletedTaskDetails", { tache: task });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("completedTasks")}</Text>

      <FlatList
        data={tachesTerminees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.texte}</Text>
            {/* Bouton pour afficher les détails de la tâche */}
            <Button title={t("details")} onPress={() => handleDetails(item)} />
          </View>
        )}
      />

      <Button
        title={t("backToMainScreen")}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 20,
  },
  taskContainer: {
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#e67e22',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
