import { Box, Button, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh'
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
  )
}
