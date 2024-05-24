import React, { useState } from 'react';
import { Announcement } from './Components/announcementBar/announcement';
import { Footer } from './Components/Footer/theFooter';
import { Container, Box, CssBaseline, Dialog, DialogContent, DialogTitle, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LandingPage } from './Components/Navbar/ComboComponent';
import { GoogleFontToSvgPath } from './Components/SVGgen';

function App() {
  const headerHeight = '64px';
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <CssBaseline /> 
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          // background: `linear-gradient(to left, ${theme.palette.teal[300]}, ${theme.palette.blue[500]})` // Adapted bgGradient to MUI
        }}
      >
        <Box 
          component='header'
          sx={{
            position: 'fixed', 
            top: 0, 
            width: '100%', 
            left: 0, 
            zIndex: 'tooltip', // Tooltip zIndex is relatively high; adjust as needed
            height: headerHeight, // Fixed height for the header
          }}
        >
          <Announcement />
        </Box>
        
        {/* Main content container with paddingTop to compensate for the fixed header's height */}
        <Container component="main" sx={{ flex: '1', mt: headerHeight }}>
          <LandingPage />
          <GoogleFontToSvgPath />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleOpen}
              sx={{
                borderRadius: '24px',
                padding: '12px 24px',
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Share Your Feedback
            </Button>
          </Box>
        </Container>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            Feedback Form
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeyrW9aZ8Ln5oeTGKXrdU0KyOWMhePnc-Kyw-2wxLPPw412Zw/viewform?embedded=true"
              width="100%"
              height="800"
            >
              Loading…
            </iframe>
          </DialogContent>
        </Dialog>

        <Footer />
      </Box>
    </>
  );
}

export default App;
