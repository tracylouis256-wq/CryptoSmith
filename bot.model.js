const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Bot', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    exchange: { type: DataTypes.STRING },
    strategy: { type: DataTypes.STRING },
    params: { type: DataTypes.JSONB, defaultValue: {} },
    status: { type: DataTypes.STRING, defaultValue: 'stopped' },
    apiKeyId: { type: DataTypes.UUID }
  });
};
