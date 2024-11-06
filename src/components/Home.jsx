import React from "react";
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../css/style.css';
// import Button from '../components/Button';

const Home = () => {
    return (
        <Box id="home" mt={5} pt={4} mx={2}>
            <Box className="background-image" borderRadius={3} py={5} mt={2}>
                <Container>
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="h2" color="white" fontWeight="bold">
                                Welcome To LearnGuide, The Online Learning Platform.
                            </Typography>
                            <Typography variant="h5" color="white" fontWeight="bold" mt={2}>
                                Start Your Journey Today.
                            </Typography>
                            <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                                <Button variant="contained" component={Link} to="courses" smooth={true} duration={500} color="primary" size="large" sx={{ mx: 1 }}>
                                    Start Now
                                </Button>
                                <Button variant="contained" component={Link} to="contactus" color="primary" size="large" sx={{ mx: 1 }}>
                                    Contact Us
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
} 

export default Home;