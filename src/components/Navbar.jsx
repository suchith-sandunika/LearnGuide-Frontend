import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-scroll'; // Import if you want smooth scrolling
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/UserSlice';
import { addedCourses } from '../features/CourseSlice';
import Profile from './Profile';
import ConfirmationPopup from "./ConfirmPopup";
import '../css/style.css';


const Navbar = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openPopup = () => {
        setIsOpenPopup(true);
    };  

    const closePopup = () => {
        setIsOpenPopup(false);
    }

    const openConfirmation = () => {
        setConfirmation(true);
    };

    const closeConfirmation = () => {
        setConfirmation(false);
    };

    const handleLogout = () => {
        // Your logout logic can go here, for example, clearing user data or tokens
        console.log("User logged out");
        // Close the confirmation popup after logout
        setConfirmation(false);
        dispatch(logoutUser({ loggedUsers: [], registeredUsers: [] })); // Dispatch the logout action
        dispatch(addedCourses({  courses: [] }));
        navigate('/'); // Redirect to the login page after logout
    };

    const handleLogoutSession = () => {
        openConfirmation(); // Open the confirmation dialog when trying to logout
    };

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src="https://images-platform.99static.com//KlBLMX8dQrcq6hZGnxf5HSnG29I=/8x543:525x1060/fit-in/500x500/99designs-contests-attachments/123/123360/attachment_123360235" 
                        alt="Logo" 
                        style={{ width: '40px', height: '40px', marginRight: '8px', borderRadius: '10px' }} // Adjust size as needed
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        LearnGuide
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}>
                    <Button color="inherit" component={Link} to="home" smooth={true} duration={500}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="aboutus" smooth={true} duration={500}>
                        About Us
                    </Button>
                    <Button color="inherit" component={Link} to="courses" smooth={true} duration={500}>
                        Explore Courses
                    </Button>
                    <Button color="inherit" component={Link} to="contactus" smooth={true} duration={500}>
                        Contact Us
                    </Button>
                    <IconButton color="inherit" component={Link} to="" smooth={true} duration={500} onClick={openPopup}>
                        <AccountCircle />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleLogoutSession}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            {isOpenPopup && (
                <Box className="modal-overlay mt-5">
                    <Box className="modal-content">
                        <Profile onClose={closePopup}/>
                    </Box>
                </Box>
            )}

            {confirmation && (
                <ConfirmationPopup 
                    onConfirm={handleLogout} 
                    onClose={closeConfirmation}
                />
            )}
        </AppBar> 
    );
}

export default Navbar;
