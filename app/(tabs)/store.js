import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../components/rootReducer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Ajoute redux-thunk
);

export default store;
