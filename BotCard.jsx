import React from 'react'
import { Link } from 'react-router-dom'

export default function BotCard({ bot }){
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{bot.name}</div>
          <div className="text-sm text-gray-300">{bot.exchange} • {bot.strategy}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">Status</div>
          <div className="font-bold">{bot.status}</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <Link to={`/bots/${bot.id}`} className="px-3 py-1 bg-accent rounded text-black">Open</Link>
      </div>
    </div>
  )
}
