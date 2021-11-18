import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from "@mui/material"
import { Blog } from '../components/Blog'
import axiosInstance from '../utils/axiosInstance';

export const Myblogs = () => {
  const [blogs, setBlogs] = useState()

  const [load, setLoad] = useState(true)

  let api = axiosInstance

  useEffect(() => {
    getMyBlogs()
  }, [])

  let getMyBlogs = async() => {
    let response = await api.get('/user/blogs/')

    if (response.status === 200) {
      setBlogs(response.data)
      setLoad(false)
    }
  }

  return (
    <Box pt='30px'>
      {
        (load) ? 
          <Box pt='200px' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <CircularProgress color="inherit" />
            <Typography variant="h5">Loading...</Typography>
          </Box> : 
          <Box pt='30px' px='100px' sx={{maxWidth: '600px', margin: '0 auto'}}>
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
