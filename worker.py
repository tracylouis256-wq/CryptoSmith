"""Python worker: listens to RabbitMQ and executes bot jobs using CCXT.
This is a minimal starter. NEVER run live capital-affecting code in "dev" without proper safety checks.
""
import os
import json
import time
import ccxt
import pika

RABBIT_URL = os.environ.get('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq:5672/')

# connect
params = pika.URLParameters(RABBIT_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()
exchange = 'cryptosmith'
channel.exchange_declare(exchange=exchange, exchange_type='direct', durable=True)

result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue
channel.queue_bind(exchange=exchange, queue=queue_name, routing_key='bot.create')

print('Worker waiting for jobs...')

def decrypt_api_key(enc):
    # Implement decryption here (use same algorithm and MASTER_KEY)
    return enc


def handle(ch, method, properties, body):
    payload = json.loads(body)
    print('Received job', payload)
    # example: fetch market price
    # In production: fetch bot record from DB, decrypt API key, instantiate exchange via ccxt, run strategy
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(queue=queue_name, on_message_callback=handle)
channel.start_consuming()
