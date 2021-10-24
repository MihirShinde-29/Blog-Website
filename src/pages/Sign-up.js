import React, {  useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { 
    Box, 
    Typography, 
    TextField,
    Button, 
    Checkbox, 
    FormControlLabel,
    useMediaQuery, 
    useTheme,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Loading } from '../components/Loading';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

const useStyles = makeStyles(() => ({
    button: {
        width: '100%',
        margin: '10px 0'
    },
    link: {
        textDecoration: 'none !important',
        cursor: 'pointer'
    },
}))

export const SignUp = () => {
    const classes = useStyles()

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const regexEmail = /^((([a-zA-Z0-9\.]+)@([a-z]+)\.(([a-z]{2,5}\.[a-z]{2,3})|([a-z]{2,5})))|(\d{10}))/g
    const regexPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/g
    const regexName = /^([a-zA-Z]{2,})/g

    const [values, setValues] = useState({
        name: '',
        email: '',
        pass: '',
        checked: false,
        count: 0,
        title: 1
    });

    const [valid, setValid] = useState({
        name: true,
        email: true,
        pass: true,
        checked: true
    });

    const[load, setLoad] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const [redirect, setRedirect] = useState(false)

    const handleChange = e => {
        if(e.target.name === 'checked') {
            setValues({
                ...values,
                [e.target.name]: (e.target.value === 'on') ? true : false
            })
        }
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = () => {
        setLoad(
            regexPass.test(values.pass) && regexEmail.test(values.email) && regexName.test(values.name) && values.checked
        );
        setValid({
            name: regexName.test(values.name) && (values.name !== ''),
            email: regexEmail.test(values.email),
            pass: regexPass.test(values.pass),
            checked: values.checked
        })
        setValues({
            count: values.count + 1,
        })
        let data = JSON.stringify({
            "email": values.email,
            "first_name": values.name,
            "password": values.pass
        });
        
        let config = {
          method: 'post',
          url: 'http://dhirajssh.pythonanywhere.com/api/user/register/',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        if (regexPass.test(values.pass) && regexEmail.test(values.email) && regexName.test(values.name) && values.checked) {
            axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              setRedirect(true)
            })
            .catch((error) => {
              console.log(error);
            })
        }
    }

    useEffect(() => {
        if (values.count !== 0) {
            setValid({
                name: regexName.test(values.name),
                email: regexEmail.test(values.email),
                pass: regexPass.test(values.pass),
                checked: values.checked
            })
        }
    }, [values.name, values.email, values.pass, values.checked])

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (redirect) {
        return <Redirect to='/log-in'/>
    }

    return (
        <Box textAlign='left'>
            <Box textAlign='center' mb='20px'>
                <Typography variant={sm ? 'h3' : 'h5'}>Create Account</Typography>
                <Typography variant={sm ? 'subtitle1' : 'subtitle2'}>Already have an account? <Link className={classes.link} to='/log-in'>Log in</Link></Typography>
            </Box>
            <Box width='100%' mt='12px'>
                <form noValidate autoComplete="off">
                    <Box width='100%'>
                        <TextField
                            id="outlined-number"
                            label="Enter Name"
                            type="text"
                            values={values.name}
                            variant="outlined"
                            helperText={!valid.name ? 'Enter your Name' : ' '}
                            fullWidth
                            autoFocus
                            size='small'
                            name='name'
                            error={!valid.name}
                            onChange={e => handleChange(e)}
                        />
                    </Box>
                    <Box mt='7px'>
                        <TextField
                            id="outlined-number"
                            label="Enter Email"
                            type="text"
                            values={values.email}
                            variant="outlined"
                            helperText={!valid.email ? values.email === '' ? 'Enter email address' : "Email address don't exist" : ' '}
                            fullWidth
                            size='small'
                            name='email'
                            error={!valid.email}
                            onChange={e => handleChange(e)}
                        />
                    </Box>
                    <Box mt='7px' mb='17px'>
                        <FormControl error={!valid.pass} sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="password" size='small'>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.pass}
                                size='small'
                                name='pass'
                                onChange={e => handleChange(e)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText id="helper-text">Use 8 to 16 characters with a mix of letters, numbers & symbols</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box mb='7px' mt="-10px">
                        <FormControlLabel
                            control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon color='primary' fontSize="small" />}
                                name="checked"
                                onChange={e => handleChange(e)}
                            />
                            }
                            label="I agree to the Laws and Agreement*"
                        />
                        {(!valid.checked) ? (<Typography variant="caption" color='red'>Check the box to continue</Typography>) : null}
                    </Box>
                    <Box mb='25px'>
                        <Button onClick={() => handleCheck()} size='large' variant='contained' className={classes.button} color='primary'>
                            Sign in
                        </Button>
                    </Box>
                </form>
            </Box>
            <Loading load={load} setLoad={setLoad} values={values} />
        </Box>
    )
}
