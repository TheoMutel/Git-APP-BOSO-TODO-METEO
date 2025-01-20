// useLanguage.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../services/i18n";

const STORAGE_KEY = "userLanguage";

export default function useLanguage() {
  const [language, setLanguage] = useState("fr");
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(true);

  useEffect(() => {
    // Charger la langue sauvegardée (si elle existe)
    (async () => {
      try {
        const savedLang = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedLang) {
          setLanguage(savedLang);
          i18n.changeLanguage(savedLang);
        }
      } catch (err) {
        console.log("Erreur lors du chargement de la langue :", err);
      } finally {
        setIsLoadingLanguage(false);
      }
    })();
  }, []);

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      console.log("Erreur lors de la sauvegarde de la langue :", err);
    }
  };

  return { language, isLoadingLanguage, changeLanguage };
}
