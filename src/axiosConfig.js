import axios from 'axios'
export default axios.create({
    baseURL: "https://randomuser.me/api/",
    responseType: "json",
    xsrfHeaderName:"X-CSRFToken",
    xsrfCookieName:'csrftoken',
    withCredentials:true,
  });