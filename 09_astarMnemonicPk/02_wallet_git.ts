import { cryptoWaitReady,  mnemonicGenerate, /* naclKeypairFromSeed ,*/ mnemonicToMiniSecret, 
mnemonicValidate, ed25519PairFromSeed, encodeAddress as toSS58  } from '@polkadot/util-crypto';
import { u8aToHex, stringToU8a, hexToU8a, u8aToString } from '@polkadot/util';
import Keyring, { createPair } from '@polkadot/keyring';
// import { encodePair } from '@polkadot/keyring';

async function generateKeys() {
    // const mnemonic = mnemonicGenerate();
    // await cryptoWaitReady();

    const mnemonic = 'move there victory impulse recall never grid unable original pause easy moral';
    // const mnemonic = 'knee depth visa girl inflict kite dress mansion urge avocado camp boat';
    const isValidMnemonic = mnemonicValidate(mnemonic);

    console.log(`isValidMnemonic: ${isValidMnemonic}`);
    // isValidMnemonic: true

    const seed = mnemonicToMiniSecret(mnemonic);

    const { publicKey, secretKey } = ed25519PairFromSeed(seed);

    // const keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
    // const krpair = keyring.addFromMnemonic(mnemonic, { astar: 0 }, 'sr25519');
    // const address = krpair.address;
    // const publicKey_kr = krpair.publicKey;
    // console.log(`publicKey-kr : ${u8aToHex(publicKey_kr)}`);
    // publicKey-kr : 0xb403dcee6e3c6e7d9f175f86fd90630e9c9b10a38c141ade2f21e9ebc7fea676

    console.log(`mnemonic : ${mnemonic}`);
    // mnemonic : move there victory impulse recall never grid unable original pause easy moral
    console.log(`publicKey : ${u8aToHex(publicKey)}`);
    // publicKey : 0xc03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
    console.log(`secretKey : ${u8aToHex(secretKey)}`);
    // secretKey : 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962

    console.log(`secretKey-slice : ${u8aToHex(secretKey).slice(2,66)}`);
    // 0xa9de5cfbebce8eabaff5182f9758ced16fa5d54356c2cf7f97d2a2d740a907ec

    // 0x583658da420aa068d2ee0285ea3ee2222fd3eb2f71411fe683ca8b041d833c9f
    // 0xa9de5cfbebce8eabaff5182f9758ced16fa5d54356c2cf7f97d2a2d740a907ec583658da420aa068d2ee0285ea3ee2222fd3eb2f71411fe683ca8b041d833c9f

    // 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6
    // c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
    

    // return {
    //     mnemonic,
    //     publicKey: u8aToHex(publicKey),
    //     secretKey: u8aToHex(secretKey),
    // };

    // const PUBLICDERIVED = '0x00ef13fae121e0a848290f960a2a6dedcc3592060e56d18b7ba3e50ce44cf339';
    // const SECRETDERIVED = '0x05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d20528';
    // const ed25519 = createPair( { toSS58, type: 'ed25519' }, { publicKey: hexToU8a(PUBLICDERIVED), secretKey: hexToU8a(SECRETDERIVED) } )

    // const newWaltAddr = ed25519.address;
    // console.log(`newWaltAddr : ${newWaltAddr}`);
    // const newPubKey = ed25519.publicKey;
    // console.log(`newPubKey : ${u8aToHex(newPubKey)}`);
    
}

generateKeys();

// Enter private key: 05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d20528
// Enter public key: 00ef13fae121e0a848290f960a2a6dedcc3592060e56d18b7ba3e50ce44cf339
// 0x05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d2052800ef13fae121e0a848290f960a2a6dedcc3592060e56d18b7ba3e50ce44cf339

// mnemonic : move there victory impulse recall never grid unable original pause easy moral
// publicKey : 0xc03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
// secretKey : 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6  c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962