import React from 'react'
import { Backdrop, CircularProgress, Box, Typography } from '@mui/material';

export const Loading = ({ load, setLoad, values }) => {

  return (
    <div>
      {
        load &&
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={load}
            onClick={() => setLoad(false)}
        >
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <CircularProgress color="inherit" />
                <Typography variant="h5">{values.title ? 'Creating' : 'Logging In'} Your Account...</Typography>
            </Box>
        </Backdrop>
      }
    </div>
  )
}
