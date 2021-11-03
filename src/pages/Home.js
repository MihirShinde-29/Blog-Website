import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Blog } from '../components/Blog'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../utils/axiosInstance';
import { UserContext } from '../context/UserContext'

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

  const { blogs, setBlogs } = useContext(UserContext)

  const [load, setLoad] = useState(true)

  let api = axiosInstance

  useEffect(() => {
    getBlogs()
  }, [])

  let getBlogs = async() =>{
    let response = await api.get('/blogs/')

    if(response.status === 200){
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
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography variant='h4'>All Blogs</Typography>
              <Link to='/add-blog' className={classes.link}>
                <Button variant="outlined" startIcon={<AddIcon />}>
                  Add Blog
                </Button>
              </Link>
            </Box>
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
