import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add token to requests
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Assuming you might use Bearer token later, though backend doesn't seem to check it properly yet in all routes, good practice to send it.
  }
  return config;
});

export const api = {
  auth: {
    login: async (data) => {
      const res = await apiInstance.post('/users/login', data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      return res.data;
    },
    register: async (data) => {
      const res = await apiInstance.post('/users/register', data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      return res.data;
    }
  },
  plans: {
    getAll: async (operator) => {
      const url = operator ? `/plans/${operator}` : '/plans/all';
      const res = await apiInstance.get(url);
      return res.data;
    },
    // Admin functions
    create: async (plan) => {
      const res = await apiInstance.post('/plans', plan);
      return res.data;
    },
    update: async (id, updates) => {
      const res = await apiInstance.put(`/plans/${id}`, updates);
      return res.data;
    },
    delete: async (id) => {
      const res = await apiInstance.delete(`/plans/${id}`);
      return res.data;
    }
  },
  recharge: {
    createOrder: async (amount) => {
      // In a real app, you would verify this on backend with Razorpay
      return {
        orderId: `order_${Date.now()}`,
        key: 'rzp_test_123456789', // Use environment variable in real app
        amount: amount * 100,
        currency: 'INR'
      };
    },
    verifyPayment: async (paymentData) => {
      // In real app, call backend to verify signature
      return true;
    },
    record: async (data) => {
      // data should look like { userId, mobileNumber, operator, planAmount, status, planId }
      // The frontend passes slightly different keys, mapping them here:
      const payload = {
        userId: data.userId,
        mobileNumber: data.phone || data.mobileNumber,
        operator: data.operator,
        planAmount: data.amount || data.planAmount,
        status: 'SUCCESS'
        // planId passed if available
      };

      const res = await apiInstance.post('/recharges', payload);
      return res.data;
    },
    getHistory: async (userId) => {
      const res = await apiInstance.get(`/recharges/user/${userId}`);
      return res.data;
    }
  },
  stats: {
    getDashboard: async () => {
      const res = await apiInstance.get('/stats/dashboard');
      return res.data;
    }
  }
};