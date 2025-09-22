const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
    isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    mfaEnabled: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
};
