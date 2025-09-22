require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 4000;

async function start(){
  try{
    await sequelize.authenticate();
    console.log('DB connected');
    app.listen(PORT, ()=>console.log(`API listening on ${PORT}`));
  }catch(err){
    console.error('Failed to start API', err);
    process.exit(1);
  }
}

start();
