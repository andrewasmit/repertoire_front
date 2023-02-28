import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {

  return (
    
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://www.linkedin.com/in/andrewasmit/">
        Andrew Smit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <Link color="inherit" target="_blank" href="https://medium.com/@andrewasmit">
          Blog
      </Link>{' '}
      <Link color="inherit" target="_blank" href="https://github.com/andrewasmit">
          GitHub
      </Link>{' '}
    </Typography>
  );
}

export default function Footer() {
  return (
    
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2">
            Repertoire was created with ReactJS & was styled using Material UI. The backend is based in Ruby & utilizes ActiveRecord & Sinatra.
          </Typography>
          <Copyright />
        </Container>
      </Box>
  );
}