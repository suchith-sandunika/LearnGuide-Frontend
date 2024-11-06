import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ErrorAlert = ({ open, handleClose, message }) => {
    return (
        <Snackbar
          open={open} // Control the open state
          autoHideDuration={3000} // Set the duration before the alert closes automatically
          onClose={handleClose} // Handle closing the Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ zIndex: 9999 }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message || "An Error Occurred!"}
          </Alert>
        </Snackbar>
    );
};

export default ErrorAlert;