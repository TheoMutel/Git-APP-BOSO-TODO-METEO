// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";




// Fonction TabBarIcon avec la gestion du bouton de rafraîchissement
export function TabBarIcon({
  
  style,
  onRefresh, // Ajout d'une prop pour passer la fonction de rafraîchissement
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]> & { onRefresh?: () => void }) {
  return (
    <TouchableOpacity onPress={onRefresh} style={styles.iconContainer}>
      <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 15, // Ajustement de l'espacement dans la top bar
  },
});
