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
    useTheme 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Loading } from '../components/Loading';
import { Link, useHistory } from 'react-router-dom';
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

export const Login = () => {
    const history = useHistory()
    const classes = useStyles()

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    
    const regexId = /^((([a-zA-Z0-9\.]+)@([a-z]+)\.(([a-z]{2,5}\.[a-z]{2,3})|([a-z]{2,5})))|(\d{10}))/g
    const regexPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/g

    const [values, setValues] = useState({
        id: '',
        pass: '',
        title: 0,
        count: 0
    });
    
    const [valid, setValid] = useState({
        id: true,
        pass: true,
    });

    const [load, setLoad] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
    const handleCheck = () => {
        setLoad(regexId.test(values.id) && regexPass.test(values.pass));
        setValid({
            pass: regexPass.test(values.pass), 
            id: regexId.test(values.id),
        })
        setValues({
            count: values.count + 1,
        })
        let data = JSON.stringify({
            "email": values.id,
            "password": values.pass
        });
    
        let config = {
            method: 'post',
            url: 'http://dhirajssh.pythonanywhere.com/api/token/',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        if (regexId.test(values.id) && regexPass.test(values.pass)) {
            axios(config)
            .then((response) => {
                localStorage.setItem('tokens', JSON.stringify(response.data))
                history.push('/home')
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
    }

    useEffect(() => {
        if (values.count !== 0) {
            setValid({
                pass: regexPass.test(values.pass), 
                id: regexId.test(values.id),
            })
        }
    }, [values.pass, values.id])
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <div>
            <Box>
                <Typography variant={sm ? 'h3' : 'h5'}>Welcome Back!</Typography>
            </Box>
            <Box mb='30px'>
                <Typography variant={sm ? 'h5' : 'subtitle2'}>Log In to Your Account</Typography>
            </Box>
            <Box textAlign='left' mb='5px' width='100%'>
                <form noValidate autoComplete="off">
                    <Box>
                        <TextField
                            id="outlined-number"
                            label="Email or Phone Number"
                            type="text"
                            variant="outlined"
                            name='id'
                            helperText={!valid.id ? (values.id === '' ? 'Enter Email or Phone number' : 'Email or Phone Number is not registered') : ' '}
                            fullWidth
                            size='small'
                            autoFocus
                            error={!valid.id}
                            onChange={e => handleChange(e)}
                        />
                    </Box>
                    <Box mt='10px'>
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
                    <Box mt='10px' display='flex' justifyContent='space-between' alignItems='center'>
                        <Box>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon color='primary' fontSize="small" />}
                                    name="checkedI"
                                />
                                }
                                label="Remember Me"
                            />
                        </Box>
                        <Box>
                            <Link className={classes.link} variant='subtitle2' to='#'>Forgot password?</Link>
                        </Box>
                    </Box>
                    <Box mt='4px'>
                        <Button onClick={e => handleCheck()} size='large' variant='contained' className={classes.button} color='primary'>
                            Log in
                        </Button>
                    </Box>
                </form>
            </Box>
            <Box mt='30px' mb='20px'>
                <Typography variant='subtitle1'>Don't have an account? <Link className={classes.link} to='/sign-up'>Sign up</Link></Typography>
            </Box>
            {load && <Loading load={load} setLoad={setLoad} values={values} />}
        </div>
    )
}
