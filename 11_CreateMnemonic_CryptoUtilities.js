/**
 * https://polkadot.js.org/docs/util-crypto/examples/create-mnemonic
 * Create Mnemonic]
 * - The following example shows
 *      how to create and generate mnemonics using BIP39.
 */

const {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed,

    mnemonicToEntropy,
    mnemonicToLegacySeed
} = require('@polkadot/util-crypto');

const { stringToU8a, u8aToHex } = require('@polkadot/util');

async function test1() {
    // Create mnemonic string for Alice using BIP39
    // const mnemonicAlice = mnemonicGenerate();

    // console.log(`Generated mnemonic: ${mnemonicAlice}`);

    const astarTestMnemonic = 'accident beauty skill silk sphere gap dutch thank lottery relief vacant ethics';

    // Validate the mnemonic string that was generated
    // const isValidMnemonic = mnemonicValidate(mnemonicAlice);
    const isValidMnemonic = mnemonicValidate(astarTestMnemonic);

    console.log(`isValidMnemonic: ${isValidMnemonic}`);

    // Create valid Substrate-compatible seed from mnemonic
    // const seedAlice = mnemonicToMiniSecret(mnemonicAlice);
    const seedAlice = mnemonicToMiniSecret(astarTestMnemonic);

    // Generate new public/secret keypair for Alice from the supplied seed
    const { publicKey, secretKey } = ed25519PairFromSeed(seedAlice);
    console.log(`publicKey : ${u8aToHex(publicKey)}`);
    // 0x6f7afd79f216fe3d078b89a190fdeaa879865bb5cc3581eb33c630f64f7d4946
    console.log(`secretKey : ${secretKey}`);
    console.log(`secretKey-u8aToHex : ${u8aToHex(secretKey)}`);
    // secretKey : 0xfdb18c69abb92a9588c02e02e901f84adf85dcb47c66bbe3db10a98f4fcf90ba6f7afd79f216fe3d078b89a190fdeaa879865bb5cc3581eb33c630f64f7d4946
}

const test2 = async () => {
    const sampleMnemonic = 'settle whisper usual blast device source region pumpkin ugly beyond promote cluster';

    const isValidMnemonic = mnemonicValidate(sampleMnemonic);

    console.log(`isValidMnemonic: ${isValidMnemonic}`);

    const tt1 = mnemonicToEntropy(sampleMnemonic);
    console.log(u8aToHex(tt1));
    // 0x c4 7f 53 c0 8b b3 cb a0 2d 25 6d ec 02 ba b0 96
    const tt2 = mnemonicToLegacySeed(sampleMnemonic); // Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
    console.log(u8aToHex(tt2));
    // 0x 35 2b 6c 39 c2 85 04 fa e1 16 7d e1 72 19 98 7b 18 0f a8 03 02 87 d9 c5 4c f8 85 90 a9 2b 7e ca
}

// test1().catch(console.error).finally(() => process.exit());

test2();