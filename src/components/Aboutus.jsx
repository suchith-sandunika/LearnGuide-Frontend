import React from "react";
import { Container, Typography, CardMedia, Grid, Card, Box } from '@mui/material';

const Aboutus = () => {
    return (
        <Box id="aboutus" className="w-100" px={2} pb={3} pt={3}>
            <Card sx={{ bgcolor: 'primary.main', borderRadius: 3, overflow: 'hidden' }}>
                <Typography variant="h4" align="center" color="white" fontWeight="bold" pt={2} mt={1} pb={2}>
                    About Us
                </Typography>
                <Box sx={{ paddingX: '10px'}}>
                    <CardMedia component="img" align="center" image="https://www.estacionsur.ar/wp-content/uploads/2022/08/programador-1-1024x542-1-750x375.jpg" alt="About Us Image" 
                            sx={{ borderRadius: 2, width: '100%', height: '500px', margin: '0 auto 10px'}}/>
                </Box>
                <Card pb={5} pl={2} pt={2} sx={{ backgroundColor: '#63a4ff', borderRadius: 3, overflow: 'hidden', marginBottom: '10px', marginLeft: '10px', marginRight: '10px', height: '95%' }}>
                    <Typography variant="h6" align="left" color="white" fontWeight="bold" mb={3} mt={2} sx={{ lineHeight: 1.5, marginLeft: '20px', marginRight: '20px' }}>
                        "LearnGuide is an online learning platform that offers courses on a wide range of topics.
                        Our mission is to provide high-quality education to students around the world.
                        We believe that everyone should have access to education, regardless of their background
                        or circumstances. Our courses are designed to be engaging, interactive, and easy to follow.
                        Whether you're looking to learn a new skill, advance your career, or just have fun,
                        LearnGuide has something for you. So why wait? Start your learning journey today."
                    </Typography>
                </Card>
            </Card>
        </Box>
    );
} 

export default Aboutus;