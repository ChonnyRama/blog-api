import { useEffect, useState } from 'react';
import axios from 'axios'

const useFetchData = (endpoint) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No token found. Please log in')
          setLoading(false)
          return
        }

        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const { data: response } = await axios.get(endpoint, {headers})
        setData(response)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [endpoint])
  
  return { data, loading, error}
}

export default useFetchData