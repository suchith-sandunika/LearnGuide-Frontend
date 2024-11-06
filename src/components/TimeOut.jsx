import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TimeOut = ({ onConfirm }) => {

    const navigate = useNavigate();

    const directToHome = () => {
        onConfirm(false);
        navigate('/');
    };
    
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
                <Typography variant="body1" sx={{ mb: 3, color: 'white'}}>
                    Session Expired ! Go Back 
                </Typography>
                <Box>
                    <Button variant="outlined" onClick={directToHome} sx={{
                        backgroundColor: '#a00000',
                        color: 'white',      // Set text color
                        borderColor: '#a00000',  // Set border color to match
                        '&:hover': {
                            backgroundColor: '#b30000', // Darker red on hover
                            borderColor: '#b30000',
                        }
                    }}>Ok</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TimeOut;
