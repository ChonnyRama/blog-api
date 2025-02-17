import { useEffect, useState } from 'react';
import axios from 'axios'

const useFetchData = (endpoint) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(endpoint)
        setData(response)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [endpoint])
  
  return { data, loading}
}

export default useFetchData