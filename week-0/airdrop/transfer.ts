import wallet from './dev-wallet.json'
import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("87eaezi5Nou5d5MFH2DStENzWZ6iHNroDHZSbSca4RDu");

const connection = new Connection('https://api.devnet.solana.com');

(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: 0.1 * LAMPORTS_PER_SOL // Transfer 0.1 SOL
            })
        )
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
        console.log('Success! Check out your TX here: ' + 'https://explorer.solana.com/tx/' + signature + '?cluster=devnet');              
    } catch (error) {
        console.error('Oops something went wrong: ', error);
    }
})();