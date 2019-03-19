import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        //apply to ever request
        axios.defaults.headers.common['Authorization'] = token;

    } else {
        // delete auth header 
        delete axios.defaults.headers.common['Authorization']
    }
};

export default setAuthToken