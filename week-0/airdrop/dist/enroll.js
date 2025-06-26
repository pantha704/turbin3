"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@coral-xyz/anchor");
const Turbin3_prereq_1 = require("./programs/Turbin3_prereq");
const dev_wallet_json_1 = __importDefault(require("./dev-wallet.json"));
// 1. Create a Keypair from your Turbin3 wallet
const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(dev_wallet_json_1.default));
// 2. Devnet Connection
const connection = new web3_js_1.Connection("https://api.devnet.solana.com");
// 3. Anchor Provider & Program
const provider = new anchor_1.AnchorProvider(connection, new anchor_1.Wallet(keypair), {
    commitment: "confirmed",
});
const program = new anchor_1.Program(Turbin3_prereq_1.IDL, new web3_js_1.PublicKey("TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM"), provider);
// 4. PDA for the program to store your GitHub info
const [accountKey] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("prereqs"), keypair.publicKey.toBuffer()], program.programId);
// 5. Github username
const githubUsername = "pantha704"; // <- replace this
// 6. Send TX to initialize account
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tx = yield program.methods
            .initialize(githubUsername)
            .accounts({
            user: keypair.publicKey,
            account: accountKey,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .signers([keypair])
            .rpc();
        console.log(`✅ Success! Check your TX: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    }
    catch (err) {
        console.error("❌ Error initializing:", err);
    }
}))();
