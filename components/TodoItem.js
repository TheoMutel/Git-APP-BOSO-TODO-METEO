import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next"; // <-- on importe le hook

export default function TodoItem({
  tache,
  onEditTodo,
  onDeleteTodo,
  onToggleRealisee,
}) {
  const { t } = useTranslation();
  const [texte, setTexte] = useState(tache.texte);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (texte.trim() === "") {
      alert(t("taskCannotBeEmpty")); // <-- traduction
      return;
    }
    onEditTodo(tache.id, { ...tache, texte });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTodo(tache.id);
  };

  const handleToggleRealisee = () => {
    onToggleRealisee(tache.id);
  };

  return (
    <View style={styles.itemContainer}>
      {isEditing ? (
        <TextInput value={texte} onChangeText={setTexte} style={styles.input} />
      ) : (
        <Text
          style={[styles.itemText, tache.estRealisee && styles.realiseeText]}
        >
          {tache.texte}
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>{t("validate")}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEdit} style={styles.button}>
            <Text style={styles.buttonText}>{t("edit")}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text style={styles.buttonText}>{t("delete")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleRealisee} style={styles.button}>
          <Text style={styles.buttonText}>
            {tache.estRealisee ? t("markUncompleted") : t("markCompleted")}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemText}>
        {t("Date d'éxécution")}:{" "}
        {new Date(tache.dateExecution).toLocaleString()}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 12,
    elevation: 2, // Pour une ombre légère
  },
  itemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  realiseeText: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#bdc3c7',
    paddingVertical: 5,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
