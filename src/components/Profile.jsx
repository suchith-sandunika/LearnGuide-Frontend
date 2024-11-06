import React, { useState, useEffect } from "react";
import { Box, Card, Grid, Typography, CardMedia, Button, CardContent } from "@mui/material";
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../css/style.css';

const Profile = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [courses, setCourses] = useState('');
    const [image, setImage] = useState(null);
    const [isStudent, setIsStudent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);

    const loggedUser = useSelector(state => state.user.loggedUsers);
    console.log(loggedUser);
    const registeredUser = useSelector(state => state.user.registeredUsers);
    console.log(registeredUser);

    const loggedUserName = loggedUser && loggedUser.length > 0 ? loggedUser[0].name : null;
    console.log(loggedUserName);
    const registeredUserName = registeredUser && registeredUser.length > 0? registeredUser[0].name : null;
    console.log(registeredUserName);

    useEffect(() => {
        const profileData = async () => {
            try {
                const username = loggedUserName || registeredUserName;
                console.log(username);
                if (!username) {
                    console.log("No user logged in");
                    return;
                }
                
                // Checking if the logged user is a student
                const studentDataResponse = await axios.get(`http://localhost:5000/api/ViewAllStudents/${username}`);
                console.log(studentDataResponse);
                console.log(studentDataResponse.data);
                console.log(studentDataResponse.data.data);
                console.log(studentDataResponse.data.data.name);
                if(studentDataResponse){
                    setName(studentDataResponse.data.data.name);
                    setEmail(studentDataResponse.data.data.email);
                    setCourses(studentDataResponse.data.data.courses);
                    const fixedImage = studentDataResponse.data.data.image.replace(/\\\\/g, "\\");
                    setImage(fixedImage);
                    setIsStudent(true);
                    setIsTeacher(false);
                    return;
                } else {
                    const teacherDataResponse = await axios.get(`http://localhost:5000/api/ViewAllTeachers/${username}`);
                    console.log(teacherDataResponse);
                    console.log(teacherDataResponse.data);
                    console.log(teacherDataResponse.data.data);
                    console.log(teacherDataResponse.data.data.name);
                    if(teacherDataResponse) {
                        setName(teacherDataResponse.data.data.name);
                        setEmail(teacherDataResponse.data.data.email);
                        setCourses(teacherDataResponse.data.data.courses);
                        const fixedImage = teacherDataResponse.data.data.image.replace(/\\\\/g, "\\");
                        setImage(fixedImage);
                        setIsTeacher(true);
                        setIsStudent(false);
                        return;
                    } else {
                        console.log('No user data found.');
                    }
                }
            } catch (error) {
                console.error("Error fetching profile data:", error.message);
            }
        };
    
        profileData();
    }, [loggedUserName, registeredUserName]);
    
    

    return (
        <Box 
            className="popup-overlay"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                marginTop: '70px',
                overflowY: 'auto',
            }}
        >
            <Box 
                className="popup-content" 
                sx={{
                    backgroundColor: '#1976d2', 
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '50%',
                    maxWidth: 2000,
                    padding: 2,
                    border: '2px solid #1976d2', 
                }}
            >   
                {/* Close Button */}
                <Button 
                    className="btn-close-course-deta"
                    sx={{
                        color: 'white', // Close button color
                        fontSize: '18px',
                        fontWeight: 'bold',
                        backgroundColor: '#a00000', 
                        borderColor: '#a00000',
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        minWidth: '36px', 
                        height: '36px', 
                        borderRadius: '50%',
                        '&:hover': {
                            backgroundColor: '#b30000', // Darker red on hover
                            borderColor: '#b30000',
                        }
                    }}
                    onClick={onClose}
                >
                    X
                </Button>

                {/* Header */}
                <Box 
                    className="popup-header" 
                    sx={{ 
                        textAlign: 'center',
                        backgroundColor: '#1976d2', 
                        color: 'white',
                        padding: '10px 16px',
                        borderRadius: '2px 2px 0 0', 
                        mb: 2,
                    }}
                >
                    <Typography variant="h5">Profile</Typography>
                </Box>

                {/* Profile Content */}
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Card 
                            className="bg-info cursor-pointer rounded-2 overflow-hidden" 
                            sx={{ backgroundColor: '#004ba0', borderRadius: 2 }}
                        >
                            <CardMedia 
                                component="img" 
                                src={image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} 
                                alt="Image" 
                                sx={{ 
                                    width: '20%',         // Adjusted width to 80% of the Card's width
                                    height: '10%',       // Set height to auto to maintain aspect ratio
                                    padding: '10px', 
                                    borderRadius: '20px', 
                                    margin: '0 auto'      // Center the image horizontally
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center" color="white" className="pt-1">
                                    Name : {name}
                                </Typography>
                                <Typography variant="h6" align="center" color="white" className="pt-1">
                                    Email : {email}
                                </Typography>
                                {isStudent && (
                                    <Typography variant="h6" align="center" color="white" className="pt-1">
                                        Enrolled Courses : {courses ? courses : "No courses"}
                                    </Typography>
                                )}
                                {isTeacher && (
                                    <Typography variant="h6" align="center" color="white" className="pt-1" sx={{ color: courses ? "white" : "gray" }}>
                                        Course: {courses ? courses : "No courses"}
                                    </Typography>
                                )}
                                {isTeacher && courses !== null && (
                                    <Box display="flex" justifyContent="center" pb={2} pt={2}>
                                        <Button variant="contained" color="primary">Add A Course</Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>        
    );
} 

export default Profile; 