import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import * as prompt from 'prompt-sync';


// Generate a new Keypair
let kp = Keypair.generate();

// Pub Key
console.log("You've generated a  new Solana wallet: "+ kp.publicKey.toBase58());

// Priv Key as String
console.log("Your private key is: " + Buffer.from(kp.secretKey).toString('hex'));

// Priv Key as Raw Uint8Array 
console.log(kp.secretKey);
