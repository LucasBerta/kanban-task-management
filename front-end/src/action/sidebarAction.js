export const ACTION_SWITCH_SIDEBAR = "SWITCH_SIDEBAR";

export function switchSidebar() {
  return (dispatch) => {
    return dispatch({ type: ACTION_SWITCH_SIDEBAR });
  };
}
