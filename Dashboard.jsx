import React, { useEffect, useState } from 'react'
import { bots } from '../services/api'
import BotCard from '../components/BotCard'

export default function Dashboard(){
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try{
        const res = await bots.list()
        setList(res)
      }catch(err){ console.error(err) }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(b => <BotCard key={b.id} bot={b} />)}
        </div>
      )}
    </div>
  )
}
