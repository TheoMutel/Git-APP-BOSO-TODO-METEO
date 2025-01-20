// src/services/networkQueue.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Importe tes fonctions d'API ou appelle directement l'URL
// Ici on pourra utiliser ton axios.post/put/delete
// ou bien on mappe le type d'action vers ton fichier api.js

class NetworkQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  /**
   * Charger la queue depuis le stockage (pour persister entre les sessions)
   */
  async loadQueueFromStorage() {
    const saved = await AsyncStorage.getItem("networkQueue");
    if (saved) {
      this.queue = JSON.parse(saved);
    }
  }

  /**
   * Ajouter une action (ex: { type: 'ADD_TASK', payload: { texte: '...'} })
   */
  async addAction(action) {
    console.log("Ajout d'une action dans la file :", action);
    this.queue.push(action);
    await AsyncStorage.setItem("networkQueue", JSON.stringify(this.queue));
  }

  /**
   * Traiter toutes les actions en attente (appelé quand on repasse en ligne)
   */
  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      console.log("affichage de la queue", this.queue);
      while (this.queue.length > 0) {
        const action = this.queue[0];
        await this.executeAction(action); // tente l'action en ligne
        // si succès, on enlève l'action
        this.queue.shift();
        await AsyncStorage.setItem("networkQueue", JSON.stringify(this.queue));
      }
    } catch (err) {
      console.error("Erreur lors du traitement de la file : ", err);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Méthode qui exécute réellement l'appel axios en fonction du "type" d'action.
   * On peut mapper ça vers ton fichier api.js ou appeler directement l'URL MockAPI
   */
  async executeAction(action) {
    const { type, payload } = action;

    switch (type) {
      case "ADD_TASK":
        // Exemple : POST sur MockAPI
        // ou bien import { addTask } from "../app/(tabs)/api" puis await addTask(payload)
        await axios.post(
          "https://67876aa8c4a42c9161069af1.mockapi.io/taches",
          payload
        );
        break;

      case "EDIT_TASK":
        await axios.put(
          `https://67876aa8c4a42c9161069af1.mockapi.io/taches/${payload.id}`,
          payload
        );
        break;

      case "DELETE_TASK":
        await axios.delete(
          `https://67876aa8c4a42c9161069af1.mockapi.io/taches/${payload}`
        );
        break;

      case "TOGGLE_TASK_REAISEE":
        // Dans ton code, toggle = PUT /taches/:id
        await axios.put(
          `https://67876aa8c4a42c9161069af1.mockapi.io/taches/${payload.id}`,
          payload
        );
        break;

      default:
        console.warn("Action non reconnue dans la file :", action);
    }
  }
}

// On exporte une instance unique
export const networkQueue = new NetworkQueue();
