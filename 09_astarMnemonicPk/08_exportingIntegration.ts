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

const generateExmportingMnemonic = async () => {

    console.log("\n===== ===== ===== Start Importing ===== ===== ===== \n");
    const keyring = new Keyring({ type: 'ed25519', ss58Format: 5 });

    // const mnemonic = mnemonicGenerate(); // Creates a valid mnemonic string using using [BIP39]
    const mnemonic = 'move there victory impulse recall never grid unable original pause easy moral';
    /*
    console.log(`mnemonic : ${mnemonic}\n`); 90dc0fceb91b372a199f629cb42d1747
    mnemonic : move there victory impulse recall never grid unable original pause easy moral
    */

    await cryptoWaitReady();

    const seed = mnemonicToMiniSecret(mnemonic);
    // console.log(`seed-u8aToHex : ${u8aToHex(seed)}\n`);

    console.log(u8aToHex(mnemonicToEntropy(mnemonic))); // 0x90dc0fceb91b372a199f629cb42d1747
    console.log(entropyToMnemonic(mnemonicToEntropy(mnemonic))); // move there victory impulse recall never grid unable original pause easy moral
    const salt = stringToU8a(`mnemonic${''}`);
    console.log(salt);
    // Uint8Array(8) [
    //     109, 110, 101,
    //     109, 111, 110,
    //     105,  99
    //   ]
    console.log(mnemonicToEntropy(mnemonic));
    // Uint8Array(16) [
    //     144, 220, 15, 206, 185,  27,
    //      55,  42, 25, 159,  98, 156,
    //     180,  45, 23,  71
    //   ]
    console.log(pbkdf2Encode(mnemonicToEntropy(mnemonic), salt));
    // {
    //     password: Uint8Array(64) [
    //       182, 179, 221, 48,  33, 207, 254,  95, 218, 172, 205,
    //       156,  47, 162, 84,  62, 169, 117, 132, 173,  29, 160,
    //        30,  59, 209, 47, 224, 101, 111,  27, 244, 182,  96,
    //        22, 224, 143, 92, 163,  78, 139, 131, 220,  12,  14,
    //       164, 118, 250, 53, 165,  32,  55,  70,  78, 246,  36,
    //       200,   8, 239, 11,  27,  94,  39, 121,  78
    //     ],
    //     rounds: 2048,
    //     salt: Uint8Array(8) [
    //       109, 110, 101,
    //       109, 111, 110,
    //       105,  99
    //     ]
    //   }
    console.log(pbkdf2Encode(mnemonicToEntropy(mnemonic), salt).password);
    // Uint8Array(64) [
    //     182, 179, 221, 48,  33, 207, 254,  95, 218, 172, 205,
    //     156,  47, 162, 84,  62, 169, 117, 132, 173,  29, 160,
    //      30,  59, 209, 47, 224, 101, 111,  27, 244, 182,  96,
    //      22, 224, 143, 92, 163,  78, 139, 131, 220,  12,  14,
    //     164, 118, 250, 53, 165,  32,  55,  70,  78, 246,  36,
    //     200,   8, 239, 11,  27,  94,  39, 121,  78
    //   ]
    console.log(pbkdf2Encode(mnemonicToEntropy(mnemonic), salt).password.slice(0, 32));
    // Uint8Array(32) [
    //     182, 179, 221,  48,  33, 207, 254,  95,
    //     218, 172, 205, 156,  47, 162,  84,  62,
    //     169, 117, 132, 173,  29, 160,  30,  59,
    //     209,  47, 224, 101, 111,  27, 244, 182
    //   ]
    // const salt = stringToU8a(`mnemonic${''}`);
    console.log(u8aToHex( pbkdf2Encode(mnemonicToEntropy(mnemonic), salt).password.slice(0, 32) ));
    // 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6

    const { publicKey, secretKey } = ed25519PairFromSeed(seed);
    console.log(`publicKey-u8aToHex : ${u8aToHex(publicKey)}\n`);
        // 0x c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
    console.log(`secretKey-u8aToHex : ${u8aToHex(secretKey)}\n`);
        // 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
    
    /*
    // console.log(`secretKeyToImport: ${u8aToHex(secretKey).slice(0, 66)}\n`);
    // b6b3dd3021cffe5fdaaccd9c2fa2543e a97584ad1da01e3bd12fe0656f1bf4b6
    // The seed to import
    // const seedToImport = hexToU8a("b6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6");
    // console.log(`initial seed : ${u8aToHex(seedToImport)} \n`);

    const seedToImport = hexToU8a(u8aToHex(secretKey).slice(0, 66));
    // console.log(`seedToImport-u8aToHex : ${u8aToHex(secretKey).slice(0, 66)} \n`);

    // Derive the Ed25519 key pair from the seed according to RFC-8032 (Section 5.1.5)
    const hash = await ed.utils.sha512(seedToImport);
    console.log(`hash : ${hash}\n`);
        // hash : 168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118,188,62,189,158,202,33,98,9,183,67,251,107,131,153,162,252,70,145,107,168,228,4,41,70,115,160,9,23,219,128,78,18
    console.log(`hash-u8aToHex : ${u8aToHex(hash)}\n`);
        // hash-u8aToHex : 0xa8a76b966a80b09509c6c3cd45b8e61053a0f18d0fd3c82dd4b9fff5875de776bc3ebd9eca216209b743fb6b8399a2fc46916ba8e404294673a00917db804e12
    let left = hash.slice(0, 32)
    console.log(`bef-left-u8aToHex : ${u8aToHex(left)}`);
        // bef-left-u8aToHex : 0xa8a76b966a80b09509c6c3cd45b8e61053a0f18d0fd3c82dd4b9fff5875de776
    console.log(`bef-left-u8a : ${left}`);
        // bef-left-u8a : 168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118
    console.log(`bef-left-u8a[0] : ${left[0]}`);
        // bef-left-u8a[0] : 168
    console.log(`bef-left-u8a[31] : ${left[31]}`);
        // bef-left-u8a[31] : 118
    left[0] &= 248;
    left[31] &= 127;
    left[31] |= 64;
    console.log(`aft-left-u8a : ${left}`);
        // aft-left-u8a : 168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118
    console.log(left);
        // Uint8Array(32) [
        // 168, 167, 107, 150, 106, 128, 176,
        // 149,   9, 198, 195, 205,  69, 184,
        // 230,  16,  83, 160, 241, 141,  15,
        // 211, 200,  45, 212, 185, 255, 245,
        // 135,  93, 231, 118
        // ]
    console.log(BigInt(u8aToHex(left)));
        // 76284364563873892912005100100107751084110787510238242125649229604798758512502 n
    const privateKeyToImport = modlLE(left);
    console.log(`raw private key (privateKeyToImport) : ${privateKeyToImport}\n`);
        // raw private key (privateKeyToImport) : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    const publicKeyToImport = ed.Point.BASE.multiply(privateKeyToImport);
    // console.log(`raw public key (publicKeyToImport) : ${publicKeyToImport}`);
    // console.log(`raw private key : ${privateKeyToImport.toString(16).padStart(64, '0')}\n`) // private key : 06e7 5d87f5ffb9 d42dc8d30f 8df1a0527e cde32f58fe 7c2d2d2fca b20bb2dc2d
    // console.log(`public key  : ${Buffer.from(publicKeyToImport.toRawBytes()).toString("hex")}\n`)

    // We can use polkadot-js to test that we have done it correctly:
    const keyPair = ed25519PairFromSeed(seed);
    console.log(`public key (polkadot-js) : ${u8aToHex(keyPair.publicKey)}\n`);
        // public key (polkadot-js) : 0xc03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
    console.log(`toString (publicKeyToImport) : ${privateKeyToImport.toString(16)}\n`);
        // toString (publicKeyToImport) : 6e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d

    console.log("\n===== ===== ===== End Importing ===== ===== ===== \n");
    console.log("\n===== ===== ===== ===== ===== ===== ===== =====");
    console.log("===== ===== ===== ===== ===== ===== ===== ===== \n");

    */
    /*
    console.log("\n===== ===== ===== Start Exporting ===== ===== ===== \n");


    const rawPrvk = "06e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d";
    console.log(`raw private key : ${rawPrvk}\n`);
    let tmp = '';
    for (let i = 0; i < rawPrvk.length; i++) {
        if (rawPrvk[i] === '0') {
            // tmp.concat('',rawPrvk.slice(i+1));
            console.log(`rawPrvk.slice : ${rawPrvk.slice(i + 1)}\n`);
            tmp = rawPrvk.slice(i + 1);
            break;
        }
    }
    console.log(`privateKey-Hex : ${tmp}\n`); // 6e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d
    // console.log(`privateKey-Hex-decimal : ${BigInt(Hex2decimal(tmp))}\n`);

    const privateKeyToExport: any = BigInt(Hex2decimal(tmp));
    console.log(`privateKeyToExport : ${privateKeyToExport}\n`);
    // E00 privateKeyToExport : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    const publicKeyToExport = ed.Point.BASE.multiply(privateKeyToExport);
    // console.log(`publicKeyExported : ${Buffer.from(publicKeyToExport.toRawBytes()).toString("hex")}\n`);
    // publicKeyExported : c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962

    const leftU8a = numberLeToBytes(publicKeyToExport);
    console.log(leftU8a);
    // console.log(reverseModlLE(privateKeyToExport));


    console.log("\n ===== ===== ===== End Exporting ===== ===== ===== \n");
    */
}
generateExmportingMnemonic().catch(console.error).finally(() => process.exit());

// I digged out these helper functions from noble/ed25519:
function modlLE(hash) {
    console.log(`[modlLE] hash : ${hash}\n`);
        // I01 hash : 168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118
    console.log(`[modlLE] ed.CURVE.l : ${ed.CURVE.l}\n`);
        // Ia02 ed.CURVE.l : 7237005577332262213973186563042994240857116359379907606001950938285454250989

        // bytesToNumberLE(hash) : 53781703332699003185686721729700104837625450142632519306124352398629584742312
    const rlt = mod(bytesToNumberLE(hash), ed.CURVE.l);
    console.log(`[modlLE] return : ${rlt}\n`);
    // I08 3122664291373167687874415788399145151625635626973166064110695830631404985389
    return rlt;
    // 7237005577332262213973186563042994240857116359379907606001950938285454250989
    // 53781703332699003185686721729700104837625450142632519306124352398629584742312
    // 3122664291373167687874415788399145151625635626973166064110695830631404985389
}
function bytesToNumberLE(uint8a) {
    if (!(uint8a instanceof Uint8Array))
        throw new Error('Expected Uint8Array');
    console.log(`[bytesToNumberLE] uint8a : ${uint8a}\n`);
    // I03 uint8a : 168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118

    const rlt = BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
    console.log(`[bytesToNumberLE] return : ${rlt}\n`);
    // I04 return : 53781703332699003185686721729700104837625450142632519306124352398629584742312
    return rlt;
}
function mod(a, b) {
    console.log(`[mod] a : ${a}\n`);
    // I05 a : 53781703332699003185686721729700104837625450142632519306124352398629584742312
    console.log(`[mod] b : ${b}\n`);
    // I06 b : 7237005577332262213973186563042994240857116359379907606001950938285454250989
    const res = a % b;

    const rlt = res >= BigInt(0) ? res : b + res;
    console.log(`[mod] return : ${rlt}\n`);
    // I07 return : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    return rlt;
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

/*
function Hex2decimal(hex) {
    return BigInt("0x" + hex).toString(10);
}

function reverseMod(res, b) {
    console.log(`[reverseMod] res : ${res}\n`);
    // E03 res : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    console.log(`[reverseMod] b : ${b}\n`);
    // E04 b : 7237005577332262213973186563042994240857116359379907606001950938285454250989
    const a = res >= BigInt(0) ? res : b + res;
    console.log(`[reverseMod] return : ${a}\n`);
    // E05 return : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    return a;
}

function numberToBytesLE(num) {
    console.log(`[numberToBytesLE] num : ${num}\n`);
    // E07 num : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    const hexString = num.toString(16).padStart(64, '0');
    console.log(`[numberToBytesLE] hexString : ${hexString}\n`);
    // E08 exString : 06e75d87f5ffb9d42dc8d30f8df1a0527ecde32f58fe7c2d2d2fcab20bb2dc2d
    const byteArray = new Uint8Array(hexString.match(/.{2}/g).map(byte => parseInt(byte, 16)));
    const rlt = byteArray.reverse();
    console.log(`[numberToBytesLE] return : ${rlt}\n`);
    // E09 return : 45,220,178,11,178,202,47,45,45,124,254,88,47,227,205,126,82,160,241,141,15,211,200,45,212,185,255,245,135,93,231,6
    return rlt;
}

function reverseModlLE(a) {
    console.log(`[reverseModlLE] a : ${a}\n`);
    // E01 a : 3122664291373167687874415788399145151625635626973166064110695830631404985389 
    const l = ed.CURVE.l;
    console.log(`[reverseModlLE] l : ${l}\n`);
    // E02 l : 7237005577332262213973186563042994240857116359379907606001950938285454250989
    const res = mod(a, l);
    // const res = reverseMod(a, l);
    console.log(`[reverseModlLE] res : ${res}\n`);
    // E06 res : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    const hashBytes = numberToBytesLE(res);
    console.log(`[reverseModlLE] return : ${hashBytes}\n`);
    // E10 return : 45,220,178,11,178,202,47,45,45,124,254,88,47,227,205,126,82,160,241,141,15,211,200,45,212,185,255,245,135,93,231,6
    return hashBytes;
}
*/



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




function numberLeToBytes() {

    const num = BigInt('53781703332699003185686721729700104837625450142632519306124352398629584742312');
    console.log(`[numberLeToBytes] num : ${num}\n`);
    // [numberLeToBytes] num : 53781703332699003185686721729700104837625450142632519306124352398629584742312
    console.log(bigIntToUint8Array(num));
    // Uint8Array(32) [
    //     168, 167, 107, 150, 106, 128, 176,
    //     149,   9, 198, 195, 205,  69, 184,
    //     230,  16,  83, 160, 241, 141,  15,
    //     211, 200,  45, 212, 185, 255, 245,
    //     135,  93, 231, 118
    //   ]

    // return bigIntToUint8Array(num);

    const numToHex = num.toString(16);
    console.log(`[numberLeToBytes] numToHex : ${numToHex}\n`);
    // [numberLeToBytes] numToHex : 76e75d87f5ffb9d42dc8d30f8df1a05310e6b845cdc3c60995b0806a966ba7a8


    // const rlt = BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
    // console.log(`[numberLeToBytes] return : ${rlt}\n`);
    // I04 return : 53781703332699003185686721729700104837625450142632519306124352398629584742312
    // return rlt;
}

// numberLeToBytes();



/*
function unitBytesToNumberLE() {
    const uint8a = [168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118];
    console.log(`[bytesToNumberLE] uint8a : ${uint8a}\n`);
    // I03 uint8a : 168,167,107,150,106,128,176,149,9,198,195,205,69,184,230,16,83,160,241,141,15,211,200,45,212,185,255,245,135,93,231,118

    const step1Unit8a = Uint8Array.from(uint8a).reverse();
    console.log(`[bytesToNumberLE] step1Unit8a : ${step1Unit8a}\n`);
    // step1Unit8a : 118,231,93,135,245,255,185,212,45,200,211,15,141,241,160,83,16,230,184,69,205,195,198,9,149,176,128,106,150,107,167,168

    const step2Hex = '0x' + bytesToHex(step1Unit8a)
    console.log(`[bytesToNumberLE] step2Hex : ${step2Hex}\n`);
    // const rlt = BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
    const rlt = BigInt('0x' + bytesToHex(step1Unit8a));
    console.log(`[bytesToNumberLE] return : ${rlt}\n`);
    // I04 return : 53781703332699003185686721729700104837625450142632519306124352398629584742312
}
// unitBytesToNumberLE();


function unitReverseMod() {
    const res = BigInt(3122664291373167687874415788399145151625635626973166064110695830631404985389);
    console.log(`[reverseMod] res : ${res}\n`);
    // E03 res : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    const b = ed.CURVE.l;
    console.log(`[reverseMod] b : ${b}\n`);
    // E04 b : 7237005577332262213973186563042994240857116359379907606001950938285454250989
    const a = res >= BigInt(0) ? res : b + res;
    console.log(`[reverseMod] return : ${a}\n`);
    // E05 return : 3122664291373167687874415788399145151625635626973166064110695830631404985389
}
// unitReverseMod();


function unitMod() {
    const a = BigInt(53781703332699003185686721729700104837625450142632519306124352398629584742312);
    console.log(`[mod] a : ${a}\n`);
    // I05 a : 53781703332699003185686721729700104837625450142632519306124352398629584742312
    const b = ed.CURVE.l;
    console.log(`[mod] b : ${b}\n`);
    // I06 b : 7237005577332262213973186563042994240857116359379907606001950938285454250989
    const res = a % b;

    const rlt = res >= BigInt(0) ? res : b + res;
    console.log(`[mod] return : ${rlt}\n`);
    // I07 return : 3122664291373167687874415788399145151625635626973166064110695830631404985389
    // return rlt;
}
// unitMod();
*/