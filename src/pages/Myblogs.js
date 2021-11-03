import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from "@mui/material"
import { makeStyles } from '@mui/styles';
import axios from 'axios'
import {Blog} from '../components/Blog'
import axiosInstance from '../utils/axiosInstance';

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

  let api = axiosInstance

  // useEffect(() => {
  //   let config = {
  //     method: 'get',
  //     url: 'http://dhirajssh.pythonanywhere.com/api/user/blogs/',
  //     headers: {
  //       'Authorization': bearer
  //     }
  //   };
  //   console.log(bearer)
  //   axios(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //     setBlogs(response.data)
  //     setLoad(false)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // }, [])

  useEffect(() => {
    getMyBlogs()
  }, [])

  let getMyBlogs = async() => {
    let response = await api.get('/user/blogs/')

    if (response.status === 200) {
      console.log(response.data)
      setBlogs(response.data)
      setLoad(false)
    }
  }

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
