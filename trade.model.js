const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Trade', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    botId: { type: DataTypes.UUID },
    symbol: { type: DataTypes.STRING },
    side: { type: DataTypes.STRING },
    amount: { type: DataTypes.DECIMAL },
    price: { type: DataTypes.DECIMAL },
    pnl: { type: DataTypes.DECIMAL }
  });
};
