import { ACTION_SWITCH_SIDEBAR } from "../action/sidebarAction";

export default function themeReducer(state, action) {
  const savedTheme = localStorage.getItem("sidebar");
  switch (action.type) {
    case ACTION_SWITCH_SIDEBAR:
      const newState = state === "open" ? "closed" : "open";
      localStorage.setItem("sidebar", newState);
      return newState;
    default:
      return savedTheme ? savedTheme : "open";
  }
}
