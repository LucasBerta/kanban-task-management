import {
  ACTION_HIDE_SNACKBAR,
  ACTION_SHOW_SNACKBAR,
} from './../action/snackbarAction';

export default function snackbarReducer(state, action) {
  switch (action.type) {
    case ACTION_SHOW_SNACKBAR:
      const { message, severity } = action.payload;
      return { open: true, message, severity };
    case ACTION_HIDE_SNACKBAR:
      return { open: false, message: '', severity: undefined };
    default:
      return state || { open: false, message: '' };
  }
}
