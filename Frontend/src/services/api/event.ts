import axios from 'axios';
import { useAuthStore } from "@/stores/auth";

const API_URL = 'http://127.0.0.1:8000/';

class ApiService {
  // Event-related API calls
  getAllEvents() {
    return axios.get(API_URL + 'events');
  }

  async getAllEventsMe() {
    const authStore = useAuthStore();
    return await axios.get(API_URL + 'events-me', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
  }
  
  async getEventById(id: number) {
    const authStore = useAuthStore();
    return await axios.get(`${API_URL}events/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
  }
  async getEventRequests() {
    const authStore = useAuthStore();
    return await axios.get(API_URL + 'events-requests', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
  }

  async approveEntrance(eventId: number, userId: number, status: number) {
    const authStore = useAuthStore();
    return await axios.post(`${API_URL}events/${eventId}/approve/${userId}`, { isApproved: status }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
  }
  

  async requestEntrance(eventId: number) {
    const authStore = useAuthStore();
    return await axios.post(API_URL + `events/${eventId}/request-entrance`, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
  }

}

export default new ApiService();