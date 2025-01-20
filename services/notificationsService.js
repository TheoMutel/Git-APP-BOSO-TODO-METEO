import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Configuration initiale des notifications
export async function configureNotifications() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permission pour les notifications refusée!");
      return;
    }

    // Configuration spécifique pour Android
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default-channel", {
        name: "Default Channel",
        description: "Canal par défaut pour les notifications des tâches",
        importance: Notifications.AndroidImportance.HIGH, // Importance maximale
        sound: true, // Activer le son pour les notifications
        vibrationPattern: [0, 250, 250, 250], // Vibration personnalisée
        lightColor: "#FF231F7C", // Couleur de la LED (si applicable)
      });
    }
  } else {
    alert(
      "Les notifications push ne fonctionnent que sur un appareil physique."
    );
  }
}

// Programmation d’une notification
export async function scheduleNotification(task) {
  const { texte, dateExecution } = task;

  if (!dateExecution) return;

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Rappel de tâche",
        body: `La tâche \"${texte}\" doit être exécutée.`,
        sound: true, // Activer le son pour iOS
      },
      trigger: new Date(dateExecution),
    });
  } catch (error) {
    console.error(
      "Erreur lors de la programmation de la notification :",
      error
    );
  }
}
