const initialState = {
  tasks: [],
  isLoading: false,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case "TASKS_LOADING":
      return { ...state, isLoading: true };
    case "SET_TASKS":
      return { ...state, tasks: action.payload, isLoading: false };
    case "TASKS_LOADING_DONE":
      return { ...state, isLoading: false };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...action.payload, dateExecution: action.payload.dateExecution },
        ],
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((tache) =>
          tache.id === action.payload.id ? action.payload : tache
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((tache) => tache.id !== action.payload),
      };
    case "TOGGLE_TASK_REALISEE":
      return {
        ...state,
        tasks: state.tasks.map((tache) =>
          tache.id === action.payload.id ? action.payload : tache
        ),
      };

    default:
      return state;
  }
}
