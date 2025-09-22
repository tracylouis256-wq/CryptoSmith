const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const User = require('./user.model')(sequelize);
const ApiKey = require('./apikey.model')(sequelize);
const Bot = require('./bot.model')(sequelize);
const Trade = require('./trade.model')(sequelize);

// associations
User.hasMany(ApiKey, { as: 'apiKeys', foreignKey: 'userId' });
ApiKey.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Bot, { as: 'bots', foreignKey: 'userId' });
Bot.belongsTo(User, { foreignKey: 'userId' });
Bot.hasMany(Trade, { as: 'trades', foreignKey: 'botId' });

module.exports = { sequelize, User, ApiKey, Bot, Trade };
