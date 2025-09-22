const crypto = require('crypto');

const MASTER_KEY = Buffer.from(process.env.MASTER_KEY_BASE64 || '', 'base64');
if(MASTER_KEY.length !== 32) throw new Error('MASTER_KEY must be 32 bytes base64');

exports.encrypt = (plaintext) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', MASTER_KEY, iv);
  const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ct]).toString('base64');
};

exports.decrypt = (payload) => {
  const b = Buffer.from(payload, 'base64');
  const iv = b.slice(0,16);
  const tag = b.slice(16,32);
  const ct = b.slice(32);
  const decipher = crypto.createDecipheriv('aes-256-gcm', MASTER_KEY, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
  return plain.toString('utf8');
};
