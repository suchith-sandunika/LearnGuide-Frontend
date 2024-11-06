import React from 'react';
import { Snackbar, Alert } from "@mui/material";

const ErrorMessageAlert = ({ open, onClose, message }) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
            {message || 'An error occurred'}
        </Alert>
    </Snackbar>
);

export default ErrorMessageAlert;
