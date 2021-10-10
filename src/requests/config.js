import axios from 'axios';

export const config = (method, d) => {
  if(method === 'post') {
    var data = JSON.stringify(d);

    var config = {
      method: method,
      url: 'http://dhirajssh.pythonanywhere.com/api/user/register/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
  }
}
