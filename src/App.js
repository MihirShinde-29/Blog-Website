import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { 
  Grid, 
  Box, 
  Typography,
  useMediaQuery, 
  useTheme  
} from '@mui/material';
import { grey } from "@mui/material/colors";
import { makeStyles } from '@mui/styles';
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Sign-up";
import { Startup } from "./pages/Startup";
import { Home } from "./pages/Home";
import './App.css';

const useStyles = makeStyles(() => ({
  box: {
    backgroundColor: 'rgb(240, 240, 240, 0.85)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    background: 'inherit',
    overflow: 'hidden',
  },
  link: {
      textDecoration: 'none !important',
      cursor: 'pointer',
      color: 'black'
  }
}))

function App() {
  const classes = useStyles()
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [refresh, setRefresh] = useState()
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Startup />
        </Route>
        <Route path='/home' exact>
          <Home />
        </Route>
        <Route path='/log-in' exact>
          <Box height={md ? '100vh' : '100%'} sx={{backgroundColor: grey[300]}}>
            <Grid container direction='column' alignItems='center' spacing={0} height='100%'>
              <Grid item>
                <Box my={sm ? '40px' : '20px'}>
                  <Link className={classes.link} to='/'>
                    <Typography variant={sm ? 'h2' : 'h4'} color=''>Blog Posting</Typography>
                  </Link>
                </Box>
              </Grid>
              <Grid item height='68%'>
                <Box textAlign='center' borderRadius={2} pt={sm ? '40px' : '25px'} pb='10px' px={sm ? '70px' : '20px'} className={classes.box} width={md ? '35vw' : '80vw'}>
                  <Login refresh={setRefresh} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Route>
        <Route path='/sign-up' exact>
          <Box height={md ? '100vh' : '100%'} sx={{backgroundColor: grey[300]}}>
            <Grid container direction='column' alignItems='center' spacing={0} height='100%'>
              <Grid item>
                <Box my={sm ? '40px' : '20px'}>
                  <Link className={classes.link} to='/'>
                    <Typography variant={sm ? 'h2' : 'h4'}>Blog Posting</Typography>
                  </Link>
                </Box>
              </Grid>
              <Grid item height='68%'>
                <Box textAlign='center' borderRadius={2} pt={sm ? '40px' : '25px'} pb='10px' px={sm ? '70px' : '20px'} className={classes.box} width={md ? '35vw' : '80vw'}>
                  <SignUp />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
