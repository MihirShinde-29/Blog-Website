import { useState, useContext } from "react";
import { Box, Typography, Avatar, Menu, MenuItem } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Link, useHistory } from 'react-router-dom';
import { grey } from "@mui/material/colors";
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

export const Navbar = () => {

  const { login, setLogin, email, setEmail, setBlogs, count } = useContext(UserContext)

  const classes = useStyles()

  const history = useHistory()
  
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    setLogin(false)
    setEmail(null)
    setBlogs(null)
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    history.push('/')
  }

  return (
    <Box 
      sx={{
        backgroundColor: grey[500],
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
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        {(login && count) && <Typography variant='h5'>{count} Blogs</Typography>}
        <Box sx={{marginLeft: '50px'}}>
          <Link to='/' className={classes.link}>
            <Typography variant='h5'>Home</Typography>
          </Link>
        </Box>
        <Avatar onClick={handleClick} sx={{marginLeft: '50px'}}>{login ? email.charAt(0).toUpperCase() : null}</Avatar>
      </Box>
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
        { (login) ? 
          (
            <div>
              <MenuItem>
                <Link to='/my-blogs' className={classes.link}>
                  My Blogs
                </Link>
              </MenuItem>
              <MenuItem onClick={() => Logout()}>
                Log Out
              </MenuItem>
            </div>
          )
          : (
            <MenuItem>
              <Link to='/log-in' className={classes.link}>
                Login
              </Link>
            </MenuItem>
          ) 
        }
      </Menu>
    </Box>
  )
}
