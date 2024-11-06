import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', mt: 'auto', py: 3 }} id='footer'>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
            How To Reach Us
          </Typography>
          <IconButton href="" sx={{ color: 'white' }}>
            <FontAwesomeIcon icon={faEnvelope} size="1x" />
          </IconButton>
          <IconButton href="" sx={{ color: 'white' }}>
            <FontAwesomeIcon icon={faFacebook} size="1x" />
          </IconButton>
          <IconButton href="" sx={{ color: 'white' }}>
            <FontAwesomeIcon icon={faInstagram} size="1x" />
          </IconButton>
          <IconButton href="" sx={{ color: 'white' }}>
            <FontAwesomeIcon icon={faLinkedin} size="1x" />
          </IconButton>
          <IconButton href="" sx={{ color: 'white' }}>
            <FontAwesomeIcon icon={faTwitter} size="1x" />
          </IconButton>
        </Box>
        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
          &copy; 2024 LearnGuide Academy. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
