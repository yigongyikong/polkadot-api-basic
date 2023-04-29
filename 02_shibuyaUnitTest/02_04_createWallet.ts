import {
    mnemonicGenerate,
    mnemonicToEntropy,
    mnemonicToLegacySeed,
    mnemonicToMiniSecret,
    mnemonicValidate,
} from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';


const createWallet = async () => {
    const testMnemonic = mnemonicGenerate(); // Creates a valid mnemonic string using using [BIP39]
    console.log(`testMnemonic : ${testMnemonic}`);
    // testMnemonic : slice bronze until cabin gold cradle foil carbon measure owner topple dignity
    console.log(`validate-testMnemonic : ${mnemonicValidate(testMnemonic)}`);
    // validate-testMnemonic : true

    const testEntropy = mnemonicToEntropy(testMnemonic);
    console.log(`testEntropy : ${testEntropy}`);
    // testEntropy : 203,99,151,184,143,230,68,99,214,153,19,137,243,199,148,159
    console.log(`testEntropy=>u8aToHex : ${u8aToHex(testEntropy)}`);
    // testEntropy=>u8aToHex : 0xcb6397b88fe64463d6991389f3c7949f
    console.log(`validate-testEntropy : ${mnemonicValidate(u8aToHex(testEntropy))}`);
    // validate-testEntropy : false

    const testLegacySeed = mnemonicToLegacySeed(testMnemonic);
    console.log(`testLegacySeed : ${testLegacySeed}`); // Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
    // testLegacySeed : 235,136,113,199,250,101,12,154,49,52,113,116,123,82,64,30,61,39,231,96,118,139,9,91,37,138,15,225,237,106,92,71
    console.log(`testLegacySeed=>u8aToHex : ${u8aToHex(testLegacySeed)}`);
    // testLegacySeed=>u8aToHex : 0xeb8871c7fa650c9a313471747b52401e3d27e760768b095b258a0fe1ed6a5c47
    console.log(`validate-testLegacySeed : ${mnemonicValidate(u8aToHex(testLegacySeed))}`);
    // validate-testLegacySeed : false

    const testMiniSecret = mnemonicToMiniSecret(testMnemonic);
    console.log(`testMiniSecret : ${testMiniSecret}`);
    // testMiniSecret : 161,150,136,140,250,213,82,91,110,18,22,121,168,67,192,64,210,205,231,217,173,66,121,187,111,102,154,221,225,128,38,65
    console.log(`testMiniSecret=>u8aToHex : ${u8aToHex(testMiniSecret)}`);
    // testMiniSecret=>u8aToHex : 0xa196888cfad5525b6e121679a843c040d2cde7d9ad4279bb6f669adde1802641
    console.log(`validate-testMiniSecret : ${mnemonicValidate(u8aToHex(testMiniSecret))}`);
    // validate-testMiniSecret : false
}

createWallet().catch(console.error).finally(() => process.exit());