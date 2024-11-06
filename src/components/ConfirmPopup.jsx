import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ConfirmationPopup = ({ onConfirm, onClose }) => {
    return (
        <Box className="modal-overlay mt-5" sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <Box className="modal-content" sx={{
                backgroundColor: '#1976d2',
                borderRadius: 2,
                boxShadow: 3,
                width: '90%',
                maxWidth: 400,
                padding: 3,
                textAlign: 'center'
            }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>Are you sure?</Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'white'}}>
                    Do you really want to logout from the system?
                </Typography>
                <Box>
                    <Button variant="contained" onClick={onConfirm} sx={{
                        marginRight: '10px',
                        backgroundColor: '#004ba0',
                        color: 'white',      // Set text color
                        borderColor: '#004ba0',  // Set border color to match
                        '&:hover': {
                            backgroundColor: '#005bb5', // Darker red on hover
                            borderColor: '#005bb5',
                        }
                    }}>Yes</Button>
                    <Button variant="outlined" onClick={onClose} sx={{
                        backgroundColor: '#a00000',
                        color: 'white',      // Set text color
                        borderColor: '#a00000',  // Set border color to match
                        '&:hover': {
                            backgroundColor: '#b30000', // Darker red on hover
                            borderColor: '#b30000',
                        }
                    }}>No</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ConfirmationPopup;
