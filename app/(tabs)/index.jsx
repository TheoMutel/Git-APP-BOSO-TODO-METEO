import React, { useEffect } from "react";
import { Text } from "react-native";
import { Provider } from "react-redux"; // Import du Provider Redux
import store from "./store";           // Ton store Redux
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../../components/LoginScreen";
import EcranPrincipal from "../../components/EcranPrincipal";
import TodoDetails from "../../components/TodoDetails";
import CompletedTasks from "../../components/CompletedTasks";
import CompletedTaskDetails from "@/components/CompletedTaskDetails";
import { configureNotifications } from "../../services/notificationsService";


// Offline queue & netinfo
import { networkQueue } from "@/services/networkQueue";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { fetchTasks } from "../../components/taskActions"; // Ajuste le chemin si nécessaire

// i18n
import { I18nextProvider } from "react-i18next";
import i18n from "../../services/i18n";           // Fichier de config i18n
import useLanguage from "../../hooks/useLanguage"; // Hook custom pour gérer la langue

const Stack = createStackNavigator();

export default function App() {
  // -- GESTION HORS LIGNE --
  const isConnected = useNetworkStatus();

  // Charger la file depuis AsyncStorage au démarrage
  useEffect(() => {
    (async () => {
      await networkQueue.loadQueueFromStorage();
    })();
  }, []);

  // Dès qu’on repasse en ligne, on traite la file et on refetch
  useEffect(() => {
    if (isConnected) {
      networkQueue.processQueue().then(() => {
        store.dispatch(fetchTasks());
      });
    }
  }, [isConnected]);


useEffect(() => {
  configureNotifications(); // Initialise les notifications (Android/iOS)
}, []);

  // -- GESTION DE LA LANGUE --
  const { isLoadingLanguage } = useLanguage(); 
  // 1) Charge la langue depuis AsyncStorage 
  // 2) Bascule i18n si nécessaire

  // Petit écran de chargement de la langue
  if (isLoadingLanguage) {
    return (
      <React.Fragment>
        {/* Optionnel: tu peux mettre un ActivityIndicator si tu veux */}
        <Text>Loading language...</Text>
      </React.Fragment>
    );
  }
  

  return (
    <Provider store={store}> 
      {/* Provider Redux */}
      <I18nextProvider i18n={i18n}>
        {/* Provider i18n */}
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="EcranPrincipal" component={EcranPrincipal} />
            <Stack.Screen name="TodoDetails" component={TodoDetails} />
            <Stack.Screen name="CompletedTasks" component={CompletedTasks} />
            <Stack.Screen
              name="CompletedTaskDetails"
              component={CompletedTaskDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  );
}