import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram
} from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { IDL } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});
const program : Program = new Program(IDL, provider);


const [accountKey] = PublicKey.findProgramAddressSync(
  [Buffer.from("prereqs"), keypair.publicKey.toBuffer()],
  program.programId
);

const githubUsername = Buffer.from("pantha704", "utf8");

(async () => {
  try {
    const tx = await program.methods
      .complete(githubUsername)
      .accounts({
        signer: keypair.publicKey
      })
      .signers([keypair])
      .rpc();

    console.log(`✅ Success! Check your TX: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
  } catch (err) {
    console.error("❌ Error initializing:", err);
  }
})();
