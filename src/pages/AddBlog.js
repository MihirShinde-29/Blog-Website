import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { Box, Typography, Button, TextField } from "@mui/material"
import axiosInstance from '../utils/axiosInstance';

export const AddBlog = () => {
  const history = useHistory()

  const [values, setValues] = useState({
    image: null,
    title: 'My Blog',
    description: 'This is my blog.',
  })

  const onDrop = e => {
    setValues({
      ...values,
      image: e[0]
    })
  }

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    let data = new FormData();
    console.log(values.image)
    data.append('image', values.image);
    data.append('title', values.title);
    data.append('description', values.description);
    if (values.description !== '' && values.title !== '' && values.image !== '') addPost(data)
  }

  let api = axiosInstance

  const addPost = async data => {
    let response = await api.post('/blogs/', data)
    if (response.status === 201) {
      history.push('/')
    }
  }

  return (
    <Box mt='30px' px='350px' pb='29px'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography variant='h4'>Add Blog</Typography>
      </Box>
      <Box mt='10px'>
        <TextField
          id="outlined-number"
          label="Title"
          type="text"
          variant="standard"
          name='title'
          fullWidth
          autoFocus
          value={values.title}
          onChange={e => handleChange(e)}
          helperText={(values.title === '') ? 'Add Title' : ' '}
          error={values.title === ''}
        />
      </Box>
      <Box mt='10px'>
        <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          fullWidth
          name='description'
          maxRows={4}
          value={values.description}
          onChange={e => handleChange(e)}
          variant="standard"
          helperText={(values.description === '') ? 'Add Description' : ' '}
          error={values.description === ''}
        />
      </Box>
      <Box mt='15px'>
        <ImageUploader
          withIcon={true}
          buttonText='Choose image'
          onChange={e => onDrop(e)}
          imgExtension={['.jpg', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview={true}
          singleImage={true}
        />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' mt='30px'>
        <Button sx={{width: '30%', borderRadius: '20px'}} size='large' variant='outlined' onClick={() => validate()}>Add Blog</Button>
      </Box>
    </Box>
  )
}
