import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

class ApiService {
  // Event-related API calls
  getAllEvents() {
    return axios.get(API_URL + 'events');
  }

}

export default new ApiService();