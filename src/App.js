import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
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
import { Myblogs } from "./pages/Myblogs";
import { AddBlog } from "./pages/AddBlog";
import { EditBlog } from "./pages/EditBlog";
import { Navbar } from './components/Navbar';
import { UserContext } from "./context/UserContext";
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
  const { login } = useContext(UserContext)
  const classes = useStyles()
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Navbar />
          {(login) ? <Redirect to='/home' /> : <Startup />}
        </Route>
        <Route path='/home' exact>
          <Navbar />
          <Home />
        </Route>
        <Route path='/my-blogs' exact>
          <Navbar />
          <Myblogs />
        </Route>
        <Route path='/add-blog' exact>
          <Navbar />
          <AddBlog />
        </Route>
        <Route path='/edit/'>
          <Navbar />
          <EditBlog />
        </Route>
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
                <Route path='/log-in' exact>
                  <Login />
                </Route>
                <Route path='/sign-up' exact>
                  <SignUp />
                </Route>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Switch>
    </Router>
  );
}

export default App;
