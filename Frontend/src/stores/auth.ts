import { defineStore } from 'pinia'

interface Credentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
  }),
  actions: {
    async login(credentials: Credentials) {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const text = await response.text();
        const data = JSON.parse(text);

        if (response.ok && data.success) {
          this.token = data.data.token;
          this.isAuthenticated = true;
          localStorage.setItem('authToken', data.data.token);
          await this.fetchUserDetails(); // Fetch user details after login
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    async register(credentials: RegisterCredentials) {
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const text = await response.text();
        const data = JSON.parse(text);

        if (response.ok && data.success) {
          this.token = data.data.token;
          this.isAuthenticated = true;
          localStorage.setItem('authToken', data.data.token);
          await this.fetchUserDetails(); // Fetch user details after registration
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Error registering:', error);
        throw error;
      }
    },
    async fetchUserDetails() {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        });

        const text = await response.text();
        const data = JSON.parse(text);
        console.log(data);

        if (response.ok && data.success) {
          this.user = data.data.user;
        } else {
          throw new Error(data.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.user = null;
      localStorage.removeItem('authToken');
    },
  },
});