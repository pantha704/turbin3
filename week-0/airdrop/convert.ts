import bs58 from 'bs58'
import * as prompt from 'prompt-sync'

const pmpt = prompt.default()

export const base58ToWallet = () => {
    const handle = pmpt("Enter base58 private key (Phantom style):")
    const wallet = bs58.decode(handle);
    console.log("Decoded wallet: ", Array.from(wallet));
}

export const walletToBase58 = () => {
    const input = pmpt("Enter Uint8Array private key (comma-separated): ")
    const byteArray = new Uint8Array(input.split(',').map(Number));
    console.log("base58 encoded: ", byteArray);
}

const choice = pmpt("1 for base58 -> wallet array, 2 for array -> base58: ");
if (choice == '1') {
    base58ToWallet();
}
else if (choice == '2') {
    walletToBase58();
}
else {
    console.log("Invalid choice. Please enter 1 or 2.");
}