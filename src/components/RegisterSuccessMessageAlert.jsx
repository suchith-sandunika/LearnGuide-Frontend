import React from 'react';
import { Snackbar, Alert } from "@mui/material";

const RegisterSuccessMessageAlert = ({ open, onClose, message }) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
            {message || 'Successfully logged in!'}
        </Alert>
    </Snackbar>
);

export default RegisterSuccessMessageAlert;