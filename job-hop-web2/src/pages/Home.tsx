import React from 'react'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const Home: React.FC = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Example: fetch current timestamp from Supabase (public function)
    const fetchData = async () => {
      // This is just a placeholder; replace with your own table/query
      const { data, error } = await supabase.from('test').select('*').limit(1)
      if (error) setMessage('Supabase connection error')
      else setMessage('Supabase connected!')
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Home Page</h2>
      <Button variant="contained" color="primary">Material UI Button</Button>
      <div style={{ marginTop: 16 }}>{message}</div>
    </div>
  )
}

export default Home
