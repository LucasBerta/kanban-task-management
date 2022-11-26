import { connect } from 'react-redux';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import './Snackbar.scss';
import { closeSnackbar } from '../../../action/snackbarAction';

export const snackbarSeverities = {
  SUCCESS: 'success',
  ERROR: 'error',
};

function Snackbar({ className = '', autoHideDuration = 5000, snackbarState, dispatch }) {
  function handleOnClose() {
    dispatch(closeSnackbar());
  }

  return (
    <MuiSnackbar
      className={`app-snackbar ${className}`.trim()}
      open={snackbarState.open}
      autoHideDuration={autoHideDuration}
      onClose={handleOnClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleOnClose} severity={snackbarState.severity}>
        {snackbarState.message}
      </Alert>
    </MuiSnackbar>
  );
}

const mapStateToProps = ({ dispatch, snackbar }) => ({
  dispatch,
  snackbarState: snackbar,
});

export default connect(mapStateToProps)(Snackbar);
