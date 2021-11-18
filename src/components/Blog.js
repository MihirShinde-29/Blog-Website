import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardHeader, 
  CardMedia, 
  CardContent,
  IconButton, 
  Typography,
  Menu,
  MenuItem
} from '@mui/material'
import { grey } from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import { UserContext } from '../context/UserContext';
import axiosInstance from '../utils/axiosInstance';
import Swal from 'sweetalert2'

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

export const Blog = ({ blog }) => {

  const { setEditBlog } = useContext(UserContext)  

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  let api = axiosInstance

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  let Delete = async () => {
    let response = await api.delete('blogs/detail/' + blog.id)
    console.log(response);
    if(response.status === 200){
      console.log(response.data)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
    if (response === undefined) {
      Swal.fire(
        'Declined',
        'You cannot delete this file.',
        'swarning'
      )
    }
  }

  const PopUp = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Delete()
      }
    })
  }

  return (
    <Box width="100%">
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings"  onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={blog.title}
          subheader={'by ' + blog.user_name}
          sx={{paddingX:'30px', display: 'flex', alignItems: 'center'}}
        />
        <CardMedia
          component="img"
          height="300"
          image={blog.image.includes('http://dhirajssh.pythonanywhere.com') ? blog.image : ('http://dhirajssh.pythonanywhere.com' + blog.image)}
          alt={blog.title}
          sx={{backgroundColor: grey[500], display: 'flex', justifyContent: 'center'}}
        />
        <CardContent  sx={{paddingX:'30px'}}>
          <Typography variant="body1">
            {blog.description}
          </Typography>
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={'/edit/' + blog.id}  className={classes.link} onClick={() => setEditBlog(blog)}>
          <MenuItem>
            Edit
          </MenuItem>
        </Link>
        <MenuItem onClick={() => PopUp()}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}
