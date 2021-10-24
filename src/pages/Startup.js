import { Box, Button, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Link, NavLink } from 'react-router-dom';
import { grey } from "@mui/material/colors";

const useStyles = makeStyles(() => ({
  button: {
      width: '100%',
      margin: '10px 0'
  },
  link: {
      textDecoration: 'none !important',
      cursor: 'pointer',
      color: 'black'
  }
}))

export const Startup = () => {
  const classes = useStyles()
  return (
    <Box sx={{backgroundColor: grey[300]}} height='100vh'>
      <Box 
        sx={{
          backgroundColor: grey[500],
          marginBottom: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          paddingX: '50px'
        }}
      >
        <Box>
          <Typography variant='h4' color='secondary'>BLOG POSTING</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '15%'
          }}
        >
          <NavLink to='/log-in'  className={classes.link}><Button variant="contained">Log in</Button></NavLink>
          <NavLink to='/sign-up'  className={classes.link}><Button variant="contained" color='secondary'>Sign in</Button></NavLink>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '40%'
          }}
        >
          <Typography variant='h2' color='primary'>To start posting blogs</Typography>
          <Box display='flex' justifyContent='space-around' mt='80px' width='100%'>
            <Link to='/log-in' className={classes.link}>
              <Button color='primary' size='large' variant='contained'>Log in</Button>
            </Link>
            <Link to='/sign-up' className={classes.link}>
              <Button color='secondary' size='large' variant='contained'>Sign in</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
