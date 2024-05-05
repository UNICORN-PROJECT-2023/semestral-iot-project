export default class ApiService {
    constructor() {
      // For development
      this.baseURL = 'http://localhost:3001/api/v1';
      
      // For production
      // this.baseURL = 'http://170.187.186.238:8080';
    }
  
    async get(url) {
      const response = await fetch(this.baseURL + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '  + localStorage.getItem('token')
        }
      });
      return response;
    }
  
    async post(url, data) {
      const response = await fetch(this.baseURL + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '  + localStorage.getItem('token')
        }
      });
      return response;
    }
    
    async put(url, data) {
      const response = await fetch(this.baseURL + url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '  + localStorage.getItem('token')
        }
      });
      return response;
    }
  
    async delete(url) {
      const response = await fetch(this.baseURL + url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '  + localStorage.getItem('token')
        }
      });
      return response;
    }
  }
