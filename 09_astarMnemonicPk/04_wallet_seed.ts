import { /* cryptoWaitReady,*/  mnemonicGenerate, /* naclKeypairFromSeed ,*/ mnemonicToMiniSecret, 
mnemonicValidate, ed25519PairFromSeed, encodeAddress as toSS58  } from '@polkadot/util-crypto';
import { u8aToHex, stringToU8a, hexToU8a, u8aToString } from '@polkadot/util';
import { createPair } from '@polkadot/keyring';

async function generateKeys() {
    // const mnemonic = mnemonicGenerate();
    // await cryptoWaitReady();

    const mnemonic = 'move there victory impulse recall never grid unable original pause easy moral';
    const isValidMnemonic = mnemonicValidate(mnemonic);

    console.log(`isValidMnemonic: ${isValidMnemonic}`);

    const seed = mnemonicToMiniSecret(mnemonic);

    const { publicKey, secretKey } = ed25519PairFromSeed(seed);

    console.log(`seed : ${u8aToHex(seed)}`);
    console.log(`publicKey : ${u8aToHex(publicKey)}`);
    console.log(`secretKey : ${u8aToHex(secretKey)}`);
}

generateKeys();


/**
 * isValidMnemonic: true
 * seed : 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6
 * publicKey : 0xc03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
 * secretKey : 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
 */