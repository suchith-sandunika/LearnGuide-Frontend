import React, { useState, useEffect, useRef } from "react";
import emailjs from 'emailjs-com';
import { Box, Grid, Card, Typography, TextField, Button } from "@mui/material";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Create a ref for the form element
    const form = useRef();

    const handleClick = (e) => {
        e.preventDefault();

        // Simple validation to check if fields are filled
        if (name === '' || email === '' || message === '') {
            setError('Please fill in all fields.');
            setSubmitted(false);
            return; // Prevent submission if fields are empty
        }

        setError(''); // Clear any previous errors
        setSubmitted(true);

        console.log(`${name} ${email} ${message}`);
        emailjs.sendForm('service_9q6bjk3', 'template_f4wkwzb', form.current, 'RQxEF_SnQNQ1A36fN')
            .then((result) => {
                console.log("Message Sent!");
                form.current.reset();  // Reset the form
            }, (error) => {
                console.log(error.text);
                setError('Failed to send message. Please try again.');  // Set error if submission fails
                setSubmitted(false);  // Form submission failed
            });
    }; 

    // Handle the success and error message display
    useEffect(() => {
        if (submitted || error) {
            // Hide messages after 3 seconds
            const timer = setTimeout(() => {
                setSubmitted(false);
                setError('');
            }, 3000);

            return () => clearTimeout(timer);  // Clean up the timer
        }
    }, [submitted, error]);

    return (
        <Box id="contactus" className="w-100" px={2} pb={3}>
            <Card sx={{ bgcolor: 'primary.main', borderRadius: 3, overflow: 'hidden' }}>
                <Typography variant="h4" align="center" color="white" fontWeight="bold" pt={2} mt={1} pb={2}>
                    Contact Us
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <form ref={form} onSubmit={handleClick}>
                            <Card sx={{ backgroundColor: '#63a4ff', borderRadius: 3, overflow: 'hidden', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                                <Typography 
                                    variant="h4" 
                                    align="center" 
                                    color="white" 
                                    fontWeight="bold" 
                                    pt={2} 
                                    mt={1} 
                                    pb={2}
                                >
                                    Write To Us
                                </Typography>
                                <TextField 
                                    label="Name" 
                                    variant="outlined"  
                                    margin="normal" 
                                    sx={{ bgcolor: 'white', width: '75%' }} 
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <TextField 
                                    label="Email" 
                                    variant="outlined"  
                                    margin="normal" 
                                    sx={{ bgcolor: 'white', width: '75%' }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField 
                                    label="Message" 
                                    variant="outlined"  
                                    margin="normal" 
                                    sx={{ bgcolor: 'white', width: '75%' }}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                                <Button variant="contained" color="primary" mb={1} sx={{ mt: 2, width: '50%', backgroundColor: '#004ba0', mb: 2, '&:hover': {
                                    backgroundColor: '#005bb5', // Darker blue on hover
                                } }} type="submit">
                                    Submit
                                </Button>
                            </Card>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card pb={5} sx={{ backgroundColor: '#63a4ff', borderRadius: 3, overflow: 'hidden', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px', height: '95%' }}>
                            <Typography 
                                variant="h4" 
                                align="center" 
                                color="white" 
                                fontWeight="bold" 
                                pt={2} 
                                mt={1} 
                                pb={1}
                            >
                                Our Details
                            </Typography>

                            <Card pb={5} sx={{ backgroundColor: '#4f94e6', borderRadius: 3, overflow: 'hidden', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px', height: '75%' }}>
                                <Typography 
                                    variant="h6" 
                                    align="left" 
                                    color="white" 
                                    fontWeight="bold" 
                                    pt={2} 
                                    mt={1} 
                                    pl={5}
                                >
                                    Name: LearnGuide Academy
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    align="left" 
                                    color="white" 
                                    fontWeight="bold" 
                                    pt={2} 
                                    mt={1} 
                                    pb={2}
                                    pl={5}
                                >
                                    Email Address: info@LearnGuide.com
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    align="left"
                                    color="white" 
                                    fontWeight="bold"  
                                    mt={1} 
                                    pb={2}
                                    pl={5}
                                >
                                    Address: 123 Main Street, Springfield, IL 62701, USA
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    align="left" 
                                    color="white" 
                                    fontWeight="bold"  
                                    mt={1} 
                                    pb={1}
                                    pl={5}
                                >
                                    Telephone: (555) 123-4567
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    align="left"
                                    color="white" 
                                    fontWeight="bold"  
                                    mt={2} 
                                    pl={5}
                                >
                                    Official Website: www.LearnGuide.com
                                </Typography>
                            </Card>
                        </Card>
                    </Grid>
                </Grid>
            </Card>

            {submitted && (
                <SuccessAlert open={submitted} handleClose={() => setSubmitted(false)} />
            )} 

            {error && (
                <ErrorAlert open={!!error} handleClose={() => setError('')} message={error} />
            )}
        </Box>
    );
}

export default ContactUs;