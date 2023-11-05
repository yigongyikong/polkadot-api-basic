import Keyring from "@polkadot/keyring";
import { mnemonicGenerate, cryptoWaitReady, mnemonicToMiniSecret, ed25519PairFromSeed } from '@polkadot/util-crypto';
import { hexToU8a, u8aToHex } from '@polkadot/util';

// import { ed25519PairFromSeed } from '@polkadot/util-crypto';
import * as ed from '@noble/ed25519';  // npm install @noble/ed25519@1.7 (2.0 doesn't support import via 'require')



const generateImportingKeys = async () => {

    const keyring = new Keyring({ type: 'ed25519', ss58Format: 5 });

    // const mnemonic = mnemonicGenerate(); // Creates a valid mnemonic string using using [BIP39]
    const mnemonic = 'move there victory impulse recall never grid unable original pause easy moral';
    console.log(`mnemonic : ${mnemonic}`);

    await cryptoWaitReady();

    const seed = mnemonicToMiniSecret(mnemonic);
    console.log(`seed : ${seed}`);

    const { publicKey, secretKey } = ed25519PairFromSeed(seed);
    console.log(`publicKey : ${u8aToHex(publicKey)}`);
    console.log(`secretKey : ${secretKey}`);
    console.log(`secretKey-u8aToHex : ${u8aToHex(secretKey)}`);
    console.log(`secretKey-slice : ${u8aToHex(secretKey).slice(2,66)}`);
    // b6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6

    // The seed to import
    const seedToImport = hexToU8a("b6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6")
    console.log("initial seed :", u8aToHex(seedToImport));

    // Derive the Ed25519 key pair from the seed according to RFC-8032 (Section 5.1.5)
    const hash = await ed.utils.sha512(seedToImport)	
    let left = hash.slice(0,32)
    console.log("bef-left :", u8aToHex(left));
    left[0] &= 248;
    left[31] &= 127;
    left[31] |= 64;
    console.log("aft-left :", u8aToHex(left));
    const privateKeyToImport = modlLE(left);
    const publicKeyToImport = ed.Point.BASE.multiply(privateKeyToImport);
    console.log("private key :", privateKeyToImport.toString(16).padStart(64, '0'))
    console.log("public key  :", Buffer.from(publicKeyToImport.toRawBytes()).toString("hex"))

    // // We can use polkadot-js to test that we have done it correctly:
    const keyPair = ed25519PairFromSeed(seed);
    console.log("public key (polkadot-js)  :", u8aToHex(keyPair.publicKey));

}

// I digged out these helper functions from noble/ed25519:

function mod(a, b) {
    const res = a % b;
    return res >= BigInt(0) ? res : b + res;
}
function bytesToNumberLE(uint8a) {
    if (!(uint8a instanceof Uint8Array))
        throw new Error('Expected Uint8Array');
    return BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
}
function modlLE(hash) {
    return mod(bytesToNumberLE(hash), ed.CURVE.l);
}
const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
function bytesToHex(uint8a) {
    if (!(uint8a instanceof Uint8Array))
        throw new Error('Uint8Array expected');
    let hex = '';
    for (let i = 0; i < uint8a.length; i++) {
        hex += hexes[uint8a[i]];
    }
    return hex;
}

generateImportingKeys().catch(console.error).finally(() => process.exit());







// Output:
//initial seed              : 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6
//private key               :   06e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d
//public key                :   c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
//public key (polkadot-js)  : 0xc03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962 


// initial seed : 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6
// private key : 06e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d
// public key  : c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
// public key (polkadot-js)  : 0xc03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962