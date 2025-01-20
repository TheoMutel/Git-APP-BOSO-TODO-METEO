// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      // EcranPrincipal
      taskCannotBeEmpty: "Le texte de la tâche ne peut pas être vide.",
      categoryAndPriorityRequired:
        "Veuillez sélectionner une catégorie et une priorité.",
      loadingTasks: "Chargement des tâches...",
      selectCategory: "Sélectionner la catégorie :",
      selectPriority: "Sélectionner la priorité :",
      confirm: "Confirmer",
      newTaskPlaceholder: "Nouvelle tâche",
      addTask: "Ajouter une tâche",
      filterByCategory: "Filtrer par catégorie :",
      all: "Tous",
      work: "Travail",
      home: "Maison",
      personal: "Personnel",
      seeCompletedTasks: "Voir les tâches terminées",
      loadMore: "Charger plus",

      // CompletedTasks
      completedTasks: "Tâches terminées",
      details: "Détails",
      backToMainScreen: "Retour à l'écran principal",

      // LoginScreen
      emailPlaceholder: "Email",
      passwordPlaceholder: "Mot de passe",
      wrongCredentials: "Identifiants incorrects.",
      unknownError: "Une erreur est survenue. Veuillez réessayer.",
      login: "Se connecter",

      // CompletedTaskDetails
      completedTaskDetails: "Détails de la tâche terminée",
      taskText: "Texte :",
      taskCategory: "Catégorie :",
      taskPriority: "Priorité :",
      back: "Retour",

      taskCannotBeEmpty: "Le texte de la tâche ne peut pas être vide.",
      validate: "Valider",
      edit: "Modifier",
      delete: "Supprimer",
      markCompleted: "Marquer comme terminée",
      markUncompleted: "Non réalisée",

      high: "Haute",
      medium: "Moyenne",
      low: "Basse",
    },
  },
  en: {
    translation: {
      // EcranPrincipal
      taskCannotBeEmpty: "Task text cannot be empty.",
      categoryAndPriorityRequired: "Please select a category and a priority.",
      loadingTasks: "Loading tasks...",
      selectCategory: "Select category:",
      selectPriority: "Select priority:",
      confirm: "Confirm",
      newTaskPlaceholder: "New task",
      addTask: "Add task",
      filterByCategory: "Filter by category:",
      all: "All",
      work: "Work",
      home: "Home",
      personal: "Personal",
      seeCompletedTasks: "See completed tasks",
      loadMore: "Load more",

      // CompletedTasks
      completedTasks: "Completed tasks",
      details: "Details",
      backToMainScreen: "Back to main screen",

      // LoginScreen
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      wrongCredentials: "Wrong credentials.",
      unknownError: "An error occurred. Please try again.",
      login: "Log in",

      // CompletedTaskDetails
      completedTaskDetails: "Completed task details",
      taskText: "Text:",
      taskCategory: "Category:",
      taskPriority: "Priority:",
      back: "Back",

      completedTaskDetails: "Completed task details",
      taskText: "Text:",
      taskCategory: "Category:",
      taskPriority: "Priority:",
      back: "Back",

      taskCannotBeEmpty: "Task text cannot be empty.",
      validate: "Validate",
      edit: "Edit",
      delete: "Delete",
      markCompleted: "Mark as completed",
      markUncompleted: "Mark as uncompleted",

      high: "High",
      medium: "Medium",
      low: "Low",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
