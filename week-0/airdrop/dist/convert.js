"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletToBase58 = exports.base58ToWallet = void 0;
const bs58_1 = __importDefault(require("bs58"));
const prompt = __importStar(require("prompt-sync"));
const pmpt = prompt.default();
const base58ToWallet = () => {
    const handle = pmpt("Enter base58 private key (Phantom style):");
    const wallet = bs58_1.default.decode(handle);
    console.log("Decoded wallet: ", Array.from(wallet));
};
exports.base58ToWallet = base58ToWallet;
const walletToBase58 = () => {
    const input = pmpt("Enter Uint8Array private key (comma-separated): ");
    const byteArray = new Uint8Array(input.split(',').map(Number));
    console.log("base58 encoded: ", byteArray);
};
exports.walletToBase58 = walletToBase58;
const choice = pmpt("1 for base58 -> wallet array, 2 for array -> base58: ");
if (choice == '1') {
    (0, exports.base58ToWallet)();
}
else if (choice == '2') {
    (0, exports.walletToBase58)();
}
else {
    console.log("Invalid choice. Please enter 1 or 2.");
}
