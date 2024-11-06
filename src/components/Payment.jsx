import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import axios from "axios";
import { useSelector } from 'react-redux';

function CoursePayment({ onClose }) {
    const course = useSelector(state => state.course.courses);
    //console.log(course);
    const courseId = course[0].id;
    console.log(courseId);

    const loggedUser = useSelector(state => state.user.loggedUsers); // Correctly access the loggedUsers array 
    const userId = loggedUser[0].id;

    const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);

    useEffect(() => {
        const PAYPAL_CLIENT_ID = "ASkvDyxQ0r3TjcZJe5iDNo840uIigwHg-C7IsGF5RfbxuKOXGr3B-L8aoXpD250yQbx_OWI76nElDhlS";

        // Check if PayPal script is already loaded
        if (!window.paypal) {
            const script = document.createElement("script");
            script.id = "paypal-sdk";
            script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`;
            script.async = true;

            script.onload = () => {
                setIsPayPalLoaded(true);
                renderPayPalButtons();
            };

            document.body.appendChild(script);
        } else {
            setIsPayPalLoaded(true);
            renderPayPalButtons();
        }

        function renderPayPalButtons() {
            if (window.paypal) {
                window.paypal.Buttons({
                    createOrder: async () => {
                        try {
                            const res = await axios.post("http://localhost:5000/api/payments/create-course-payment", {
                                courseId,
                                userId
                            });
                            return res.data.id; // Return the PayPal order ID
                        } catch (error) {
                            console.error("Error creating PayPal order:", error);
                            alert("Failed to create PayPal order");
                        }
                    },
                    onApprove: async (data) => {
                        try {
                            const res = await axios.post("http://localhost:5000/api/payments/capture-course-payment", {
                                orderId: data.orderID
                            });
                            alert("Payment completed successfully!");
                            console.log(res.data); // Log the response for debugging
                        } catch (error) {
                            console.error("Error capturing PayPal payment:", error);
                            alert("Failed to capture PayPal payment");
                        }
                    },
                    onError: (err) => {
                        console.error("PayPal Button Error:", err);
                        alert("Payment failed!");
                    }
                }).render("#paypal-button-container");
            }
        }

        // Cleanup function to remove the PayPal script when the component unmounts
        return () => {
            const paypalScript = document.getElementById('paypal-sdk');
            if (paypalScript) {
                paypalScript.remove();
                delete window.paypal;
            }
        };
    }, [courseId, userId]);

    return (
        <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8', padding: 3 }}
        >
            <Card sx={{ maxWidth: 400, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Course Payment
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary">
                        Complete your payment to access the course content.
                    </Typography>
                    <Box 
                        id="paypal-button-container" 
                        sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}
                    />
                    {!isPayPalLoaded ? (
                        <CircularProgress sx={{ mt: 3 }} />
                    ) : (
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={() => document.getElementById('paypal-button-container').scrollIntoView()}
                        >
                            Proceed with PayPal
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        color="error" // Updated from "danger" to "error"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={onClose}
                    >
                        Close Payment
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default CoursePayment;
