import Keyring from "@polkadot/keyring";
import { mnemonicGenerate, cryptoWaitReady, mnemonicToMiniSecret, ed25519PairFromSeed } from '@polkadot/util-crypto';
import { hexToU8a, u8aToHex, stringToU8a } from '@polkadot/util';

import { entropyToMnemonic, mnemonicToEntropy } from '@polkadot/util-crypto/mnemonic/bip39';
import { pbkdf2Encode } from '@polkadot/util-crypto/pbkdf2';

import * as ed from '@noble/ed25519';  // npm install @noble/ed25519@1.7 (2.0 doesn't support import via 'require')

// {
//     "mnemonic": "move there victory impulse recall never grid unable original pause easy moral"
// }
// {
//     "rawPrv": "06e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d",
//     "rawPub": "c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962"
// }

// make "rawPrv" to "mnemonic"
const generateExportingMnemonic = async () => {

    const rawPrv = "06e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d";
    console.log(rawPrv); // 06e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d

    const rawPrv2Hex = string2Hex(rawPrv);
    console.log(rawPrv2Hex); // 6e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d

    const rawPrv2HexBigInt = hex2BigInt(rawPrv2Hex);
    console.log(rawPrv2HexBigInt); // 3122664291373167687874415788399145151625635626973166064110695830631404985389n

    const publicKey = rawPrvBigInt2Pubkey(rawPrv2HexBigInt);
    console.log(publicKey); // c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
    console.log(hexToU8a(publicKey));
    // Uint8Array(32) [
    //     192,  58, 164, 161, 142, 149,   9, 226,
    //     182,  83, 191,  51, 167,  97, 203,  64,
    //      40, 109, 224, 195, 173,  63, 143, 247,
    //       4,  45, 221,  28, 153,  37,  89,  98
    //   ]


    const seed = "0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6";
    const seedHexToU8a = hexToU8a(seed);
    console.log(seedHexToU8a);
    // Uint8Array(32) [
    //     182, 179, 221,  48,  33, 207, 254,  95,
    //     218, 172, 205, 156,  47, 162,  84,  62,
    //     169, 117, 132, 173,  29, 160,  30,  59,
    //     209,  47, 224, 101, 111,  27, 244, 182
    //   ]

}
generateExportingMnemonic().catch(console.error).finally(() => process.exit());


function bigIntToUint8Array(bigInt) {
    const hexString = bigInt.toString(16);
    const length = Math.ceil(hexString.length / 2);
    const uint8Array = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        const byte = parseInt(hexString.slice(i * 2, (i + 1) * 2), 16);
        uint8Array[length - i - 1] = byte;
    }

    return uint8Array;
}

function numberLeToBytes(_leftU8a) {

    // const num = BigInt('53781703332699003185686721729700104837625450142632519306124352398629584742312');
    const num = _leftU8a;
    console.log(`[numberLeToBytes] num : ${num}\n`);
    // [numberLeToBytes] num : 53781703332699003185686721729700104837625450142632519306124352398629584742312
    // console.log(bigIntToUint8Array(num));
    // Uint8Array(32) [
    //     168, 167, 107, 150, 106, 128, 176,
    //     149,   9, 198, 195, 205,  69, 184,
    //     230,  16,  83, 160, 241, 141,  15,
    //     211, 200,  45, 212, 185, 255, 245,
    //     135,  93, 231, 118
    //   ]

    return bigIntToUint8Array(num);
}



function rawPrvBigInt2Pubkey (_rawPrv2HexBigInt) {
    return Buffer.from(ed.Point.BASE.multiply(_rawPrv2HexBigInt).toRawBytes()).toString("hex");
}

function hex2BigInt (_rawPrv2Hex) {
    return BigInt(BigInt("0x" + _rawPrv2Hex).toString(10));
}

function string2Hex (_rawPrv) {
    let rlt = '';
    for (let i = 0; i < _rawPrv.length; i++) {
        if (_rawPrv[i] === '0') {
            // tmp.concat('',rawPrvk.slice(i+1));
            // console.log(`rawPrvk.slice : ${_rawPrv.slice(i + 1)}\n`);
            rlt = _rawPrv.slice(i + 1);
            break;
        }
    }
    return rlt;
}


// function bytesToNumberLE(uint8a) {
//     if (!(uint8a instanceof Uint8Array))
//         throw new Error('Expected Uint8Array');
//     console.log(`[bytesToNumberLE] uint8a : ${uint8a}\n`);
//     // I03 uint8a : 168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118

//     const rlt = BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
//     console.log(`[bytesToNumberLE] return : ${rlt}\n`);
//     // I04 return : 53781703332699003185686721729700104837625450142632519306124352398629584742312
//     return rlt;
// }
// function bytesToHex(uint8a) {
//     if (!(uint8a instanceof Uint8Array))
//         throw new Error('Uint8Array expected');
//     let hex = '';
//     for (let i = 0; i < uint8a.length; i++) {
//         hex += hexes[uint8a[i]];
//     }
//     return hex;
// }
// const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));