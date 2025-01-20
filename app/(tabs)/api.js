import axios from "axios";

// URL de base de votre API MockAPI
const API_URL = "https://6787b9b5c4a42c916107fb63.mockapi.io/tache"; // Assurez-vous que cette URL est correcte

// Fonctions pour les opérations CRUD
export const getTasks = () => axios.get(API_URL);
export const addTask = async (task) => {
  return await axios.post(API_URL, task); // Envoie la requête POST avec les données
};
export const updateTask = (id, updatedTask) => {
  return axios.put(`${API_URL}/${id}`, updatedTask);
};

export const deleteTask = (id) => {
  return axios.delete(
    `https://6787b9b5c4a42c916107fb63.mockapi.io/tache/${id}`
  );
};

export const toggleTaskRealisee = (id, updatedTask) => {
  return axios.put(
    `https://6787b9b5c4a42c916107fb63.mockapi.io/tache/${id}`,
    updatedTask
  );
};
