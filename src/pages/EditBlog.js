import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { Box, Typography, Button, TextField } from "@mui/material"
import axiosInstance from '../utils/axiosInstance';
import { UserContext } from '../context/UserContext'

export const EditBlog = () => {

  const { editBlog } = useContext(UserContext)

  const history = useHistory()

  const [values, setValues] = useState({
    image: null,
    title: editBlog.title,
    description: editBlog.description,
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
    if (values.description !== '' && values.title !== '' && values.image !== '') editPost(data)
  }

  const urlToObject= async()=> {
    const response = await fetch('http://dhirajssh.pythonanywhere.com/api' + values.image);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', {type: blob.type});
    if (values.image === null) {
      setValues({
        ...values,
        image: file,
      });
    }
  }

  useEffect(() => {
    urlToObject()
  }, [])

  let api = axiosInstance

  const editPost = async data => {
    let response = await api.put(`/blogs/detail/${editBlog.id}/`, data)
    if (response.status === 200) {
      history.push('/')
    }
  }

  return (
    <Box mt='30px' px='350px' pb='29px'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography variant='h4'>Edit Blog</Typography>
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
          value={values.image}
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
        <Button sx={{width: '35%', borderRadius: '20px'}} size='large' variant='outlined' onClick={() => validate()}>Confirm Edit</Button>
      </Box>
    </Box>
  )
}
