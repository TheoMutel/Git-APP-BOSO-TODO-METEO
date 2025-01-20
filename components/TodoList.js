// TodoList.js
import React from "react";
import { View, Text } from "react-native";
import TodoItem from "./TodoItem";

/**
 * taches: array de tâches déjà filtrées/paginées,
 * onDeleteTodo: callback pour supprimer,
 * onToggleRealisee: callback pour toggle,
 * onEditTodo: callback pour éditer
 */
export default function TodoList({
  taches,
  onDeleteTodo,
  onToggleRealisee,
  onEditTodo,
}) {
  if (!taches || taches.length === 0) {
    return (
      <View>
        <Text>Aucune tâche à afficher.</Text>
      </View>
    );
  }

  return (
    <View>
      {taches.map((task) => (
        <TodoItem
          key={task.id}
          tache={task}
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
          onToggleRealisee={onToggleRealisee}
        />
      ))}
    </View>
  );
}
