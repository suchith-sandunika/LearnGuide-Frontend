import React, { useState, useEffect } from "react";
import { Box, Card, Grid, Typography, CardMedia, Button } from "@mui/material";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addedCourses } from "../features/CourseSlice";
import CourseDetails from "./CourseDetails";

const Courses = () => {
    const dispatch = useDispatch();

    const [courses, setCourses] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [image, setImage] = useState(null);
    const [Id, setId] = useState(null);

    const openPopUp = (course) => {
        dispatch(addedCourses(course));
        setOpenPopup(true);
        console.log(course);
        console.log(course._id);
        setId(course._id);
    };
    
    const closePopUp = () => {
        setOpenPopup(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataResponse = await axios.get('http://localhost:5000/api/ViewAllCourses');
                setCourses(dataResponse.data.data);
                dataResponse.data.data.forEach(element => {
                    const fixedimage = element.image.replace(/\\\\/g, "\\");
                    setImage(fixedimage);
                });
            } catch (error) {
                console.error(error.message);
            }
        }; 

        fetchData();

    }, []); 

    if (!courses || courses.length === 0) {
        return <Typography variant="h6" align="center">No courses available.</Typography>; // Handle no courses
    }

    return (
        <Box id="courses" className="w-100" px={2} pb={3}>
            <Card sx={{ bgcolor: 'primary.main', borderRadius: 3, overflow: 'hidden' }}>
                <Typography variant="h4" align="center" color="white" fontWeight="bold" pt={2} mt={1} pb={2}>
                    Courses
                </Typography>
                <Grid container spacing={2} justifyContent="center" pb={2}>
                    {courses.map((course, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index} sx={({marginLeft: '2px'})}> {/* Add key prop */}
                            <Card className='bg-info cursor-pointer rounded-2 overflow-hidden' sx={{ backgroundColor: '#004ba0' }}>
                                <CardMedia 
                                    component="img" 
                                    src={image || "https://images.prismic.io/vaultinum/0458a9f1-e149-4037-b9aa-aa4b4fb53c25_propriete-intellectuelle-code-source-protection-compressed.jpg?auto=compress,format&rect=0,0,2400,981&w=2400&h=981"} 
                                    alt={course.name} 
                                    sx={{ padding: '10px', borderRadius: '10px' }}
                                />
                                <Typography variant="h6" align="center" color="white" className='pt-1'>
                                    {course.name}
                                </Typography>
                                <Typography variant="h6" align="center" color="white" className='pt-1'>
                                    {course.level}
                                </Typography>
                                <Box display="flex" justifyContent="center" className="mt-2" pb={1}>
                                    <Button variant="contained" color="primary" onClick={() => openPopUp(course)}>View</Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Card>

            {openPopup && (
                <Box className="modal-overlay mt-5">
                    <Box className="modal-content">
                        <CourseDetails courseId={Id} onClose={closePopUp} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Courses;