import bs58 from 'bs58';
import * as pmpt from 'prompt-sync';
const prompt = pmpt.default();
const input = prompt('Enter your Phantom wallet base58 private key: ');
const privateKeyBytes = bs58.decode(input);
console.log('Private key as byte array:', JSON.stringify([...privateKeyBytes]));