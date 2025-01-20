// EcranPrincipal.js

import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next"; // Pour traduire
import useLanguage from "../hooks/useLanguage";
import WeatherComponent from "./WeatherComponent";
import { Platform } from "react-native";


// Actions Redux hors-ligne
import {
  fetchTasks,
  createTask,
  editTask,
  deleteTaskAction,
  toggleTaskRealiseeAction,
} from "./taskActions";

import useNetworkStatus from "@/hooks/useNetworkStatus";
import TodoList from "./TodoList";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EcranPrincipal({ navigation }) {
  const PRIORITIES = ["high", "medium", "low"];
  const [prioriteTache, setPrioriteTache] = useState("");
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();
  const dispatch = useDispatch();
  const [dateExecution, setDateExecution] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Récupération depuis le store Redux
  const { tasks, isLoading } = useSelector((state) => state.tasks);


  const [nouvelleTache, setNouvelleTache] = useState("");
  const [isTaskAdded, setIsTaskAdded] = useState(false);


  const [categorieFiltre, setCategorieFiltre] = useState("");
  const [tachesAfficheesCount, setTachesAfficheesCount] = useState(1);


  const [categorieTache, setCategorieTache] = useState("");

  const isConnected = useNetworkStatus();


  useEffect(() => {
    (async () => {
      try {
        const savedFilter = await AsyncStorage.getItem("categorieFiltre");
        if (savedFilter !== null) {
          setCategorieFiltre(savedFilter);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération du filtre :", error);
      }
    })();

    dispatch(fetchTasks());
  }, [dispatch]);

  // Filtrage + pagination
  const tachesAffichees = useMemo(() => {
    if (!tasks) return [];
    let resultat = tasks;
    if (categorieFiltre) {
      resultat = resultat.filter(
        (tache) => tache.categorie === categorieFiltre
      );
    }
    return resultat.slice(0, tachesAfficheesCount);
  }, [tasks, categorieFiltre, tachesAfficheesCount]);


  const handleLoadMore = () => {
    setTachesAfficheesCount((prev) => prev + 1);
  };

  // Ajouter une nouvelle tâche
  const handleAddTodo = () => {
    if (nouvelleTache.trim() === "") {
      alert(t("taskCannotBeEmpty"));
      return;
    }
  
    const newTache = {
      texte: nouvelleTache,
      categorie: "",
      priorite: "",
      estRealisee: false,
      dateExecution: dateExecution.toISOString(), // Ajout de la date d'exécution
    };
  
    dispatch(createTask(newTache));
    setNouvelleTache("");
    setDateExecution(new Date()); // Réinitialise la date après ajout
    setIsTaskAdded(true);
  };
  

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDateExecution(selectedDate); // Mettez à jour l'état avec la nouvelle date
    }
    setShowDatePicker(false); // Fermez le sélecteur de date
  };
  // Éditer une tâche
  const handleEditTodo = (id, updatedTask) => {
    dispatch(editTask(id, updatedTask));
  };

  // Supprimer une tâche
  const handleDeleteTodo = (id) => {
    dispatch(deleteTaskAction(id));
  };

  // Toggle "réalisée"
  const handleToggleRealisee = (id) => {
    const tacheActuelle = tasks.find((t) => t.id === id);
    if (tacheActuelle) {
      dispatch(toggleTaskRealiseeAction(id, tacheActuelle));
    }
  };

  

  // Valider la catégorie et la priorité
  const handleConfirmCategoryAndPriority = () => {
    if (!categorieTache || !prioriteTache) {
      alert(t("categoryAndPriorityRequired"));
      return;
    }
    const taskToUpdate = [...tasks].reverse().find((t) => !t.categorie);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        categorie: categorieTache,
        priorite: prioriteTache,
      };
      dispatch(editTask(taskToUpdate.id, updatedTask));
    }
    setCategorieTache("");
    setPrioriteTache("");
    setIsTaskAdded(false);
  };

  // Filtrer par catégorie et sauvegarder
  const handleFiltrerParCategorie = async (cat) => {
    setCategorieFiltre(cat);
    try {
      await AsyncStorage.setItem("categorieFiltre", cat);
    } catch (error) {
      console.log("Erreur lors de la sauvegarde du filtre :", error);
    }
  };

  // Si on est en train de charger
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>{t("loadingTasks")}</Text>
      </View>
    );
  }

  

  
  return (
    <ScrollView style={styles.container}>
      {/* Sélection catégorie + priorité si la tâche vient d’être ajoutée */}
      {isTaskAdded ? (
        <View style={styles.categorySelectionContainer}>
          <Text style={styles.label}>{t("selectCategory")}</Text>
          <View style={styles.categoryButtonsContainer}>
            {[t("work"), t("home"), t("personal")].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  categorieTache === cat && styles.categoryButtonSelected,
                ]}
                onPress={() => setCategorieTache(cat)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    categorieTache === cat && styles.categoryButtonTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.categorySelectionContainer}>
            <Text style={styles.label}>{t("selectPriority")}</Text>

            <View style={styles.priorityButtonsContainer}>
              {PRIORITIES.map((priorityKey) => {
                const label = t(priorityKey);
                return (
                  <TouchableOpacity
                    key={priorityKey}
                    style={[
                      styles.priorityButton,
                      prioriteTache === priorityKey &&
                      styles.priorityButtonSelected,
                    ]}
                    onPress={() => setPrioriteTache(priorityKey)}
                  >
                    <Text
                      style={[
                        styles.priorityButtonText,
                        prioriteTache === priorityKey &&
                        styles.priorityButtonTextSelected,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirmCategoryAndPriority}
          >
            <Text style={styles.buttonText}>{t("confirm")}</Text>
          </TouchableOpacity>
        </View>
      ) : (

        <View>
          <TextInput
            value={nouvelleTache}
            onChangeText={setNouvelleTache}
            placeholder={t("newTaskPlaceholder")}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.buttonText}>{t("selectExecutionDate")}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateExecution}
              mode="datetime"
              display={Platform.OS === "android" ? "inline" : "spinner"} // Utilisation adaptée à la plateforme
              onChange={handleDateChange}
            />
          )}


          <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
            <Text style={styles.buttonText}>{t("addTask")}</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Boutons de filtre par catégorie */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>{t("filterByCategory")}</Text>
        <View style={styles.categoryButtonsContainer}>
          {[t("all"), t("work"), t("home"), t("personal")].map((catLabel) => {
            let catValue = "";
            if (catLabel === t("all")) catValue = "";
            if (catLabel === t("work")) catValue = "Travail";
            if (catLabel === t("home")) catValue = "Maison";
            if (catLabel === t("personal")) catValue = "Personnel";

            return (
              <TouchableOpacity
                key={catLabel}
                style={[
                  styles.filterButton,
                  categorieFiltre === catValue && styles.filterButtonSelected,
                ]}
                onPress={() => handleFiltrerParCategorie(catValue)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    categorieFiltre === catValue &&
                    styles.filterButtonTextSelected,
                  ]}
                >
                  {catLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* Liste de tâches paginées + filtrées */}
      <TodoList
        taches={tachesAffichees}
        onDeleteTodo={handleDeleteTodo}
        onToggleRealisee={handleToggleRealisee}
        onEditTodo={handleEditTodo}
      />
      ;{/* Bouton pour afficher les tâches terminées */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CompletedTasks", {
            tachesTerminees: tasks.filter((t) => t.estRealisee),
          })
        }
        style={styles.completedButton}
      >
        <Text style={styles.completedButtonText}>{t("seeCompletedTasks")}</Text>
      </TouchableOpacity>
      {/* "Charger plus" si on n'a pas tout affiché */}
      {tachesAffichees.length < tasks.length && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMore}
        >
          <Text style={styles.loadMoreButtonText}>{t("loadMore")}</Text>
        </TouchableOpacity>
      )}
      {/* Sélecteur de langue stylé (FR / EN) */}
      <View style={styles.languageSwitcherContainer}>
        <TouchableOpacity
          style={[styles.languageButton, { backgroundColor: "#4CAF50" }]}
          onPress={() => changeLanguage("fr")}
        >
          <Text style={styles.languageButtonText}>FR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.languageButton, { backgroundColor: "#2196F3" }]}
          onPress={() => changeLanguage("en")}
        >
          <Text style={styles.languageButtonText}>EN</Text>
        </TouchableOpacity>
      </View>
      <WeatherComponent />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8', // Arrière-plan clair
  },
  input: {
    height: 40,
    borderColor: '#ced4da', // Gris clair pour les bordures
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // Blanc pour les champs
  },
  button: {
    backgroundColor: '#007BFF', // Bleu uniforme pour tous les boutons
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: '#007BFF', // Même bleu pour la sélection de date
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  categorySelectionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50', // Texte gris foncé
    marginBottom: 10,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  categoryButtonSelected: {
    backgroundColor: '#007BFF', // Bleu actif pour la sélection
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  categoryButtonTextSelected: {
    color: '#ffffff', // Blanc pour les textes sélectionnés
  },
  priorityButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  priorityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  priorityButtonSelected: {
    backgroundColor: '#007BFF',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  priorityButtonTextSelected: {
    color: '#ffffff',
  },
  filterContainer: {
    marginVertical: 20,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#2c3e50',
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    backgroundColor: '#e9ecef',
    marginHorizontal: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#007BFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  filterButtonTextSelected: {
    color: '#ffffff',
  },
  completedButton: {
    backgroundColor: '#007BFF', // Uniformisation des boutons
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  completedButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadMoreButton: {
    backgroundColor: '#007BFF', // Uniformisation des boutons
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loadMoreButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  languageSwitcherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  languageButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#007BFF', // Uniformisation des boutons
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
