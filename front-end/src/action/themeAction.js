export const ACTION_SWITCH_THEME = "SWITCH_THEME";
export const ACTION_SETUP_THEME = "SETUP_THEME";

export function switchTheme() {
  return (dispatch) => {
    return dispatch({ type: ACTION_SWITCH_THEME });
  };
}

export function setupTheme() {
  return (dispatch) => {
    return dispatch({ type: ACTION_SETUP_THEME });
  };
}
