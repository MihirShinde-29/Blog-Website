import { useEffect, useState } from 'react'
import { Box, Button, Typography, CircularProgress } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Link, NavLink } from 'react-router-dom';
import { grey } from "@mui/material/colors";
import axios from 'axios'
import {Blog} from '../components/Blog'

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

export const Myblogs = () => {
  const classes = useStyles()

  const [blogs, setBlogs] = useState()

  const [load, setLoad] = useState(true)

  const bearer = 'Bearer ' + localStorage.getItem('access')

  useEffect(() => {
    let config = {
      method: 'get',
      url: 'http://dhirajssh.pythonanywhere.com/api/user/blogs/',
      headers: {
        'Authorization': bearer
      }
    };

    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setBlogs(response.data)
      setLoad(false)
    })
    .catch((error) => {
      console.log(error);
    });

  }, [])

  useEffect(() => console.log(blogs),[blogs])

  return (
    <Box pt='30px'>
      {
        (load) ? 
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <CircularProgress color="inherit" />
            <Typography variant="h5">Loading...</Typography>
          </Box> : 
          <Box px='100px' sx={{maxWidth: '600px', margin: '0 auto'}}>
            <Typography variant='h4'>My Blogs</Typography>
            <Box pt='30px' sx={{display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap:6, marginBottom: '50px'}}>
              {(blogs) && (
                blogs.map(blog => (
                  <Blog blog={blog} />
                )))
              }
            </Box>
          </Box>
      }
    </Box>
  )
}
