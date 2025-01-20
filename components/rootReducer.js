import { combineReducers } from "redux";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
  tasks: taskReducer, // Définit `tasks` comme clé dans le state global
});

export default rootReducer;
