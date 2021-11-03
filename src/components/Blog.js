import { useState } from 'react'
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


export const Blog = ({blog}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width="100%" key={blog.id}>
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
          image={'http://dhirajssh.pythonanywhere.com/' + blog.image}
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
        <MenuItem>
          Edit
        </MenuItem>
        <MenuItem>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}
