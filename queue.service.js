const amqp = require('amqplib');
let channel;

async function getChannel(){
  if(channel) return channel;
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();
  return channel;
}

exports.publish = async (routingKey, message) => {
  const ch = await getChannel();
  const exchange = 'cryptosmith';
  await ch.assertExchange(exchange, 'direct', { durable: true });
  ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });
};
