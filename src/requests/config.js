import axios from 'axios';

export const config = (method, d) => {
  if(method === 'sign-up') {
    let config = {
      method: 'post',
      url: 'http://dhirajssh.pythonanywhere.com/api/user/register/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : d
    };
    
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  if(method === 'login') {
    let config = {
      method: 'post',
      url: 'http://dhirajssh.pythonanywhere.com/api/token/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : d
    };
    
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
