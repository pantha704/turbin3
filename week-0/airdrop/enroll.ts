import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json"
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
const MPL_CORE_PROGRAM_ID = new
PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");

// const kp = Keypair.fromSecretKey(new Uint8Array(wallet));   
const kp = Keypair.fromSecretKey(new Uint8Array(wallet));   

const connection = new Connection('https://api.devnet.solana.com')

const provider = new AnchorProvider(connection, new Wallet(kp), {commitment:"confirmed"})

const program: Program<Turbin3Prereq> = new Program(IDL, provider);

const account_seeds = [Buffer.from("prereqs"), kp.publicKey.toBuffer()];

const [account_key, _account_bump] = PublicKey.findProgramAddressSync(account_seeds, program.programId)


// NFT mint + constants
const mintTs = Keypair.generate();
const mintCollection = new PublicKey("5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2");

const authority_seeds = [
    Buffer.from("collection"),
    mintCollection.toBuffer()
];
const [authority_key, _authority_bump] = PublicKey.findProgramAddressSync(authority_seeds, program.programId);

// INIT
(async () => {
    try {
        const txHash = await program.methods.initialize("panha704").accountsPartial({
            user: kp.publicKey,
            account: accounnt_key,
            system_program: SYSTEM_PROGRAM_ID,
        })
        .signers([kp])
        .rpc();
        console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();

// SUBMIT TS
(async() => {
    try { 
        const txHash = await program.methods
        // @ts-ignore
        .submitTs()
        .accountsPartial({
            user: kp.publicKey,
            account: account_key,
            mint: mintTs.publicKey,
            collection: mintCollection,
            authority: authority_key,
            mpl_core_program: MPL_CORE_PROGRAM_ID,
            system_program: SYSTEM_PROGRAM_ID
        })
        .signers([kp, mintTs])
        .rpc();
        console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})