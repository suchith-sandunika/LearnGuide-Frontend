import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loggedUser } from '../features/UserSlice';
import ErrorMessageAlert from "./ErrorMessageAlert";
import LoginSuccessMessageAlert from "./LoginSuccessMessageAlert";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccessPopupopen, setIsSuccessPopupopen] = useState(false);
    const [isErrorPopupopen, setIsErrorPopupopen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const StudentsArray = [];
    const TeachersArray = [];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/register'); // Change '/login' to the correct route for the login page
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev); // Toggle password visibility
    };  
    
    const handleSubmit = async () => {
        try{
            // Response 1 ...
            const response1 = await axios.get('http://localhost:5000/api/ViewAllStudents');
            const students = response1.data.data;
            
            for (let i = 0; i < students.length; i++) {
                StudentsArray.push(students[i].name);
            }
            
            console.log(StudentsArray);

            if (StudentsArray.includes(name)) {
                const finalResponse1 = await axios.post('http://localhost:5000/api/students/login', {name, password});
                console.log(finalResponse1.data);
                if (finalResponse1.data.data.token) {
                    const token = finalResponse1.data.data.token;
                    console.log(token);
                    localStorage.setItem('authToken', token);
                    console.log('Successfully logged in as a student');
                    dispatch(loggedUser({ name, token }));
                    // alert('Logged in successfully');
                    setIsSuccessPopupopen(true);
                    setIsErrorPopupopen(false);
                    navigate('/homepage');
                } else {
                    console.log('token Error');
                }
            } else {
                const response2 = await axios.get('http://localhost:5000/api/ViewAllTeachers');
                console.log(response2.data);
                const teachers = response2.data.data;
                
                for (let i = 0; i < teachers.length; i++) {
                    TeachersArray.push(teachers[i].name);
                }
                
                console.log(TeachersArray);

                if (TeachersArray.includes(name)) {
                    const finalResponse1 = await axios.post('http://localhost:5000/api/teachers/login', {name, password});
                    console.log(finalResponse1.data);
                    console.log(finalResponse1.data.data.token);
                    if (finalResponse1.data.data.token) {
                        const token = finalResponse1.data.data.token;
                        console.log(token);
                        localStorage.setItem('authToken', token);
                        console.log('Successfully logged in as a teacher');
                        dispatch(loggedUser({ name, token }));
                        // alert('Logged in successfully');
                        setIsSuccessPopupopen(true);
                        setIsErrorPopupopen(false);
                        navigate('/homepage');
                    } else {
                        console.log('token Error');
                    }
                } else {
                    //alert('error occured while logging in');
                    setErrorMessage('Invalid login credentials');
                    setIsErrorPopupopen(true);
                    setIsSuccessPopupopen(false);
                }
            }
        } catch(error) {
            setErrorMessage(error.message || 'An error occurred during login');
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
            <Box className="modal-content">
                <Container 
                    component="form"  
                    sx={{ 
                        backgroundColor: '#17a2b8', 
                        borderRadius: 2, 
                        padding: 4 
                    }}
                >
                    <Typography variant="h4" align="center" color="white" gutterBottom>
                        Login
                    </Typography>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        sx={{ bgcolor: 'white' }} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField 
                        label="Password" 
                        type={showPassword ? "text" : "password"} // Toggle the type based on state
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        sx={{ bgcolor: 'white' }} 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword} // Toggle show password
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography variant="body2" align="center" color="white">
                        New to LearnGuide? 
                        <span 
                            style={{ color: 'white', cursor: 'pointer', paddingLeft: '10px' }} 
                            onClick={handleSignInClick}
                        >
                            Sign Up
                        </span>
                    </Typography>
                    
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                        Login
                    </Button>
                </Container>
            </Box>
            
            {isSuccessPopupopen && <LoginSuccessMessageAlert open={isSuccessPopupopen} onClose={() => setIsSuccessPopupopen(false)} message="Successfully logged in!" />}

            {isErrorPopupopen && <ErrorMessageAlert open={isErrorPopupopen} onClose={() => setIsErrorPopupopen(false)} message={errorMessage} />}
        </Box>
    );
};

export default Login;
