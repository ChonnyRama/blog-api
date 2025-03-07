import { useEffect, useState } from 'react';
import axios from 'axios'

const useFetchData = (endpoint) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {

        const { data: response } = await axios.get(endpoint)
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