import { AdminLoginData, AdminSignupData } from '@/schemas/auth/admin.schema'
import { DistributorLoginData, DistributorSignupData } from '@/schemas/auth/distributor.schema'
import { SalesPersonLoginData, SalesPersonSignupData } from '@/schemas/auth/salesperson.schema'
import { OrderData } from '@/schemas/order.schema'
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = {
  salesPersonSignup: (data: SalesPersonSignupData) =>
    api.post('/auth/salesperson/signup', data),
  salesPersonLogin: (data: SalesPersonLoginData) =>
    api.post('/auth/salesperson/login', data),
  distributorSignup: (data: DistributorSignupData) =>
    api.post('/auth/distributor/signup', data),
  distributorLogin: (data: DistributorLoginData) =>
    api.post('/auth/distributor/login', data),
  adminSignup: (data: AdminSignupData) =>
    api.post('/auth/admin/signup', data),
  adminLogin: (data: AdminLoginData) =>
    api.post('/auth/admin/login', data),
  // ... other auth endpoints
}

export const ordersApi = {
  create: (data: OrderData) => api.post('/orders', data),
  update: (id: string, data: Partial<OrderData>) => api.patch(`/orders/${id}`, data),
//   list: (params: OrderListParams) => api.get('/orders', { params }),
  // ... other order endpoints
}