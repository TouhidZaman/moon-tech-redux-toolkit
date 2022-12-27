import axios from "axios"

let URL = "";
switch(process.env.REACT_APP_ENVIRONMENT) {
    case "DEVELOPMENT": 
        URL = "http://localhost:5000/";
        break;
    case "PRODUCTION": 
        URL = "https://productionserver.com/";
        break;
    default: 
        URL = "http://localhost:5000/";
}

const axiosInstance = axios.create({
    baseURL: URL
})

export default axiosInstance;