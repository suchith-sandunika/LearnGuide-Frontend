import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/UserSlice';
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Aboutus from "../components/Aboutus";
import Footer from "../components/Footer";
import TimeOut from "../components/TimeOut";
import ContactUs from "../components/ContactUs";
import Courses from "../components/Courses";

const Homepage = () => {
    const [timeOut, setTimeOut] = useState(false);
    const dispatch = useDispatch();
    // Setting Timeout ...
    const timeoutRef = useRef(null); // Create a ref to hold the timeout ID

    const startTimeout = () => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            // console.log("Timeout completed");
            setTimeOut(true);
            dispatch(logoutUser({ loggedUsers: [] }));
        }, 5000 * 50);
    }; 

    startTimeout();

    return (
        <Box>
            <Navbar/>
            <Home/>
            <Aboutus/>
            <Courses/>
            <ContactUs/>
            <Footer/> 

            {timeOut && (
                <TimeOut  
                    onConfirm={setTimeOut} 
                />
            )}
        </Box>
    );
} 

export default Homepage;