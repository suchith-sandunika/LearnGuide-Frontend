import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Grid, InputLabel, Select, MenuItem, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../features/UserSlice';
import RegisterSuccessMessageAlert from './RegisterSuccessMessageAlert';
import ErrorMessageAlert from "./ErrorMessageAlert";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null); // Store image file object
    const [role, setRole] = useState('');
    const [isSuccessPopupopen, setIsSuccessPopupopen] = useState(false);
    const [isErrorPopupopen, setIsErrorPopupopen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/');
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !name || !email || !password || !confirmPassword || !role) {
            alert('Please fill in all fields');
            return;
        }

        if (password === confirmPassword && validatePassword(password) && validateEmail(email)) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);
            formData.append('role', role);

            try {
                const endpoint = role === 'student' ? 'http://localhost:5000/api/students/register' : 'http://localhost:5000/api/teachers/register';
                const response = await axios.post(endpoint, formData);
                console.log('Registration successful:', response.data);
                dispatch(registerUser({ name, email, password, image, role }));
                // Reset fields
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setImage(null);
                setRole('');

                setIsSuccessPopupopen(true);
                setIsErrorPopupopen(false);
                // alert('Registration successful');
                navigate('/homepage');
            } catch (error) {
                // alert(error.message);
                setErrorMessage(error.message || 'An error occurred during login');
                setIsErrorPopupopen(true);
                setIsSuccessPopupopen(false);
            }
        } else {
            // alert('Passwords do not match or invalid email/password format');
            setErrorMessage('Invalid Data');
            setIsErrorPopupopen(true);
            setIsSuccessPopupopen(false);
        }
    };

    return (
        <Box 
            className="modal-overlay" 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
        >
            <Box className="modal-content-reg">
                <Container 
                    component="form" 
                    sx={{ 
                        backgroundColor: '#17a2b8', 
                        borderRadius: 2, 
                        padding: 4, 
                        maxWidth: 600 
                    }}
                    onSubmit={handleSubmit} // Change this to onSubmit
                >
                    <Typography variant="h4" align="center" color="white" gutterBottom>
                        Register
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="photoUpload" sx={{ color: 'white', paddingBottom: '10px' }}>
                                Upload Photo
                            </InputLabel>
                            <TextField
                                type="file"
                                id="photoUpload"
                                fullWidth
                                sx={{ bgcolor: 'white'}}
                                onChange={(e) => setImage(e.target.files[0])} // Update image state with the file
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                id="name"
                                placeholder="Enter Your Name"
                                sx={{ bgcolor: 'white' }}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                id="email"
                                placeholder="Enter Your Email"
                                sx={{ bgcolor: 'white' }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Create Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                id="create_password"
                                placeholder="Enter Your Password"
                                sx={{ bgcolor: 'white' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                id="confirm_password"
                                placeholder="Confirm Your Password"
                                sx={{ bgcolor: 'white' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="role-label" sx={{ color: 'white', paddingBottom: '10px' }}>You willing to log as</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={role} // Use value instead of defaultValue
                                fullWidth
                                sx={{ bgcolor: 'white' }}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value="" disabled selected>Select Your Role</MenuItem> {/* Adjusted default value */}
                                <MenuItem value="student">Student</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Typography variant="body2" align="center" color="white" sx={{ mt: 2 }}>
                        Already have an account? 
                        <span 
                            style={{ color: 'white', cursor: 'pointer' }} 
                            onClick={handleSignInClick}
                        >
                            Login
                        </span>
                    </Typography>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Register
                    </Button>
                </Container>
            </Box>

            {isSuccessPopupopen && <RegisterSuccessMessageAlert open={isSuccessPopupopen} onClose={() => setIsSuccessPopupopen(false)} message="Successfully logged in!" />}

            {isErrorPopupopen && <ErrorMessageAlert open={isErrorPopupopen} onClose={() => setIsErrorPopupopen(false)} message={errorMessage} />}
        </Box>
    );
};

export default Register;