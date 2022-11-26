export const ACTION_SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const ACTION_HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export function showSnackbar(message, severity) {
  return (dispatch) => {
    return dispatch({
      type: ACTION_SHOW_SNACKBAR,
      payload: { message, severity },
    });
  };
}

export function closeSnackbar() {
  return (dispatch) => {
    return dispatch({ type: ACTION_HIDE_SNACKBAR });
  };
}
