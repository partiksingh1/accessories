import { useAuth } from './useAuth'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const { token } = useAuth.getState()
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export function useOrders(page = 1, limit = 10, status?: string) {
  const { token } = useAuth()
  
  const { data, error, mutate } = useSWR(
    token ? `/api/orders?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}` : null,
    fetcher
  )

  return {
    orders: data?.orders ?? [],
    pagination: data?.pagination,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}