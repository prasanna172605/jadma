import dotenv from 'dotenv';
dotenv.config();

const keyId = (process.env.RAZORPAY_KEY_ID || '').trim().replace(/["']/g, '');
const keySec = (process.env.RAZORPAY_KEY_SECRET || '').trim().replace(/["']/g, '');

console.log('keyId:', keyId);
console.log('keySec length:', keySec.length);
const auth = Buffer.from(keyId + ':' + keySec).toString('base64');

async function check() {
  const res = await fetch('https://api.razorpay.com/v1/methods', {
    headers: { 'Authorization': 'Basic ' + auth }
  });
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Result:', JSON.stringify(data, null, 2));
}

check();
