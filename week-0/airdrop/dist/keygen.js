"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
// Generate a new Keypair
let kp = web3_js_1.Keypair.generate();
// Pub Key
console.log("You've generated a  new Solana wallet: " + kp.publicKey.toBase58());
// Priv Key as String
console.log("Your private key is: " + Buffer.from(kp.secretKey).toString('hex'));
// Raw Priv Key 
console.log(kp.secretKey);
