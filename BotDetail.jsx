import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bots } from '../services/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function BotDetail(){
  const { id } = useParams()
  const [bot, setBot] = useState(null)

  useEffect(()=>{
    async function load(){
      try{
        const res = await bots.detail(id)
        setBot(res)
      }catch(err){ console.error(err) }
    }
    load()
  }, [id])

  if(!bot) return <div>Loading...</div>

  const data = (bot.trades || []).map(t=>({ time: t.createdAt, pnl: t.pnl }))

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{bot.name}</h1>
      <div className="mb-6 bg-gray-900 p-4 rounded">
        <div>Exchange: {bot.exchange}</div>
        <div>Strategy: {bot.strategy}</div>
        <div>Status: {bot.status}</div>
      </div>

      <div className="bg-gray-900 p-4 rounded">
        <h2 className="font-semibold mb-2">Performance</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="pnl" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
