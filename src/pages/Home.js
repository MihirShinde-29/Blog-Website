import { useEffect, useState, useContext, useRef, useCallback } from 'react'
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

  const { blogs, setBlogs, setCount } = useContext(UserContext)

  const observer = useRef()

  const [page, setPage] = useState(1)

  const [pagination, setPagination] = useState()

  const [load, setLoad] = useState(true)

  const lastBlog = useCallback(node => {
    if (load) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [load])

  let api = axiosInstance

  let getPage = async () => {
    let response = await api.get('/page?page=' + page)
    if (response === undefined) {return}
    if(response.status === 200){
      console.log(response.data)
      setCount(response.data.count)
      setPagination(response.data)
      if (blogs) {
        setBlogs(prevBlogs => {
          return [...new Set([...prevBlogs, ...response.data.results])]
        })
      } else {
        setBlogs(response.data.results)
      }
      setLoad(false)
    }
  }

  useEffect(() => {
    getPage()
  }, [page])
  
  return (
    <Box>
      {
        (load) ? 
          <Box pt='200px' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <CircularProgress color="inherit" />
            <Typography variant="h5">Loading...</Typography>
          </Box> : 
          <Box pt='30px' px='100px' sx={{maxWidth: '600px', margin: '0 auto'}}>
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
                blogs.map((blog, index) => {
                  if (blogs.length === index + 1 && pagination.next) {
                    return (
                      <Box ref={lastBlog} key={blog.id}>
                        <Blog blog={blog} />
                      </Box>
                    )
                  } else {
                    return (
                      <Box key={blog.id}>
                        <Blog blog={blog} />
                      </Box>
                    )
                  }
                }))
              }
            </Box>
          </Box>
      }
    </Box>
  )
}
