import { ACTION_SETUP_THEME, ACTION_SWITCH_THEME } from "../action/themeAction";

export default function themeReducer(state, action) {
  const savedTheme = localStorage.getItem("theme");
  const html = document.getElementsByTagName("html")[0];

  switch (action.type) {
    case ACTION_SWITCH_THEME:
      const newState = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newState);
      html.setAttribute("theme", newState);
      return newState;
    case ACTION_SETUP_THEME:
      html.setAttribute("theme", state);
      return state;
    default:
      return savedTheme ? savedTheme : "light";
  }
}
