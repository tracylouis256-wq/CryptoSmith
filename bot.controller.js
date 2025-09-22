const { Bot, ApiKey } = require('../models');
const queue = require('../services/queue.service');
const { encrypt } = require('../services/encryption.service');

exports.createBot = async (req, res, next) => {
  try{
    const { name, exchange, strategy, apiKey, apiSecret, params } = req.body;
    // store encrypted apikey
    const api = await ApiKey.create({
      userId: req.user.id,
      exchange,
      apiKeyEncrypted: encrypt(apiKey),
      apiSecretEncrypted: encrypt(apiSecret),
      permissions: { trade: true }
    });
    const bot = await Bot.create({ userId: req.user.id, name, exchange, strategy, params, status: 'stopped', apiKeyId: api.id });
    // Optionally enqueue a job to start/backtest
    await queue.publish('bot.create', { botId: bot.id });
    res.status(201).json(bot);
  }catch(err){ next(err); }
};

exports.list = async (req, res, next) => {
  try{
    const bots = await Bot.findAll({ where: { userId: req.user.id }});
    res.json(bots);
  }catch(err){ next(err); }
};

exports.detail = async (req, res, next) => {
  try{
    const bot = await Bot.findByPk(req.params.id, { include: ['trades'] });
    if(!bot) return res.status(404).json({ message: 'Not found' });
    res.json(bot);
  }catch(err){ next(err); }
};
