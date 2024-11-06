import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SuccessAlert = ({ open, handleClose }) => {
    return (
        <Snackbar
          open={open} // Control the open state
          autoHideDuration={3000} // Set the duration before the alert closes automatically
          onClose={handleClose} // Handle closing the Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ zIndex: 9999 }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
    );
};

export default SuccessAlert;