import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bots } from '../services/api'

export default function BotBuilder(){
  const [name, setName] = useState('')
  const [exchange, setExchange] = useState('binance')
  const [strategy, setStrategy] = useState('scalping')
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      const payload = { name, exchange, strategy, apiKey, apiSecret, params: {} }
      const res = await bots.create(payload)
      navigate('/')
    }catch(err){ setError(err?.response?.data?.message || 'Failed to create bot') }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Create a new Bot</h1>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3 bg-gray-900 p-6 rounded">
        <input className="input" placeholder="Bot name" value={name} onChange={e=>setName(e.target.value)} />
        <select className="input" value={exchange} onChange={e=>setExchange(e.target.value)}>
          <option value="binance">Binance</option>
          <option value="kraken">Kraken</option>
          <option value="coinbase">Coinbase</option>
        </select>
        <select className="input" value={strategy} onChange={e=>setStrategy(e.target.value)}>
          <option value="scalping">Scalping</option>
          <option value="trend">Trend Following</option>
          <option value="arbitrage">Arbitrage</option>
        </select>
        <input className="input" placeholder="API Key" value={apiKey} onChange={e=>setApiKey(e.target.value)} />
        <input className="input" placeholder="API Secret" value={apiSecret} onChange={e=>setApiSecret(e.target.value)} />
        <button className="px-4 py-2 bg-accent rounded text-black">Create Bot</button>
      </form>
    </div>
  )
}
