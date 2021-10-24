import { useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Link, NavLink } from 'react-router-dom';
import { grey } from "@mui/material/colors";
import axios from 'axios'

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

export const Home = () => {
  const classes = useStyles()
  const bearer = 'Bearer ' + localStorage.getItem('access')
  useEffect(() => {
    let config = {
      method: 'get',
      url: 'http://dhirajssh.pythonanywhere.com/api/blogs/',
      headers: { 
        'Authorization': bearer
      }
    };

    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  }, [])
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
            width: '30%'
          }}
        >
          <Typography variant='h6'>Posts: </Typography>
          <NavLink to='/my-posts'  className={classes.link}>My Posts</NavLink>
          <NavLink to='/'  className={classes.link}><Button variant="contained">Log out</Button></NavLink>
        </Box>
      </Box>
      
    </Box>
  )
}
