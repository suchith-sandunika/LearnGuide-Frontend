import React, { useState, useEffect } from "react";
import { Box, Card, Grid, Typography, CardMedia, Button, CardContent } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Payment from './Payment';
import '../css/style.css';

const CourseDetails = ({ courseId, onClose }) => {
    console.log(courseId);
    const [image, setImage] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();

    const CoursesIdArray = [];
    let n;

    const courses = useSelector(state => state.course.courses);
    console.log(courses);

    for(let i =0; i < courses.length; i++) {
        CoursesIdArray.push(courses[i].id);
    } 

    console.log(CoursesIdArray);

    // if(CoursesIdArray.includes(courseId)){
    //     console.log(CoursesIdArray.indexOf(courseId))
    //     n = CoursesIdArray.indexOf(courseId);
    // } 

    n = CoursesIdArray.indexOf(courseId);

    console.log(n);
    
    useEffect(() => {
        // for(let i = 1; i <= course.data.data.length; i++) {
        //     CoursesArray.push(course.data.data[i].name);
        // }
        // if(course.image !== undefined || course.image !== null) {
        //     const fixedimage = course.image.replace(/\\\\/g, "\\");
        //     setImage(fixedimage);
        // } else {
        //     const fixedimage = course.image;
        //     setImage(fixedimage);
        // }

        console.log(courses[n].id);
        console.log(courses[n].name);
        console.log(courses[n].image);
        console.log(courses[n].description);
        console.log(courses[n].prerequisites);
        console.log(courses[n].target_audience);
        console.log(courses[n].level);
        console.log(courses[n].fee);
        console.log(courses[n].teacher);  
    },[courses]);

    
    
    const MoveToPayment = () => {
        navigate('');
        setOpenPopup(true);
    }; 

    const closePopup = () => {
        setOpenPopup(false);
    };

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
                    width: '90%',
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
                    <Typography variant="h5">Course Details</Typography>
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
                                src={image || "https://images.prismic.io/vaultinum/0458a9f1-e149-4037-b9aa-aa4b4fb53c25_propriete-intellectuelle-code-source-protection-compressed.jpg?auto=compress,format&rect=0,0,2400,981&w=2400&h=981"} 
                                alt="Course Image" 
                                sx={{ 
                                    width: '20%',         // Adjusted width to 80% of the Card's width
                                    height: '15%',       // Set height to auto to maintain aspect ratio
                                    padding: '10px', 
                                    borderRadius: '20px', 
                                    margin: '0 auto'      // Center the image horizontally
                                }}
                            />
                            <CardContent>
                                <Typography variant="h5" align="center" color="white" className="pt-1">
                                    {courses[n].name} for {courses[0].prerequisites} by {courses[n].teacher}, Level - {courses[n].level}
                                </Typography>
                                <Typography variant="h5" align="center" color="white" className="pt-1">
                                    Course Price - USD {courses[n].fee}
                                </Typography>
                                <Typography variant="h6" align="left" color="white" className="pt-1" pt={2} sx={{ fontSize: '1.2rem' }}>
                                    {courses[n].description}
                                </Typography>
                            </CardContent>
                            <Box display="flex" justifyContent="center" pb={2}>
                                <Button variant="contained" color="primary" onClick={MoveToPayment}>Enroll</Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {openPopup && (
                <Box className="modal-overlay mt-5">
                    <Box className="modal-content">
                        <Payment onClose={closePopup} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default CourseDetails;
