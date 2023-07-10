import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const pages = ['Resume', 'Contact'];

function Header() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Poof icon" src="/favicon.ico" />
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={"/" + page} style={{ textDecoration: 'none' }}>
                <Button
                  key={page}
                  sx={{ my: 0, color: 'white', display: 'block' }}
                >
                  <Typography
                    variant="h5"
                    noWrap
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {page}
                  </Typography>
                </Button>
                </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;