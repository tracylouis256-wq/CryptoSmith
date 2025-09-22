const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('ApiKey', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    exchange: { type: DataTypes.STRING, allowNull: false },
    apiKeyEncrypted: { type: DataTypes.TEXT, allowNull: false },
    apiSecretEncrypted: { type: DataTypes.TEXT, allowNull: false },
    permissions: { type: DataTypes.JSONB, defaultValue: {} }
  });
};
