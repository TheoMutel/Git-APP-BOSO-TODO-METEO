// CompletedTaskDetails.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTranslation } from "react-i18next"; // <-- on importe le hook

export default function CompletedTaskDetails({ route, navigation }) {
  const { t } = useTranslation();
  const { tache } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("completedTaskDetails")}</Text>
      <Text style={styles.info}>
        {t("taskText")} {tache.texte}
      </Text>
      <Text style={styles.info}>
        {t("taskCategory")} {tache.categorie}
      </Text>
      <Text style={styles.info}>
        {t("taskPriority")} {tache.priorite}
      </Text>
      <Text style={styles.text}>
        Date d'exécution : {new Date(tache.dateExecution).toLocaleString()}
      </Text>

      <Button title={t("back")} onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eef2f3',
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#2e4053',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4a6fa5',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#16a085',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
