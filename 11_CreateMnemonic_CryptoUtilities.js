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
    ed25519PairFromSeed
} = require('@polkadot/util-crypto');

const { stringToU8a, u8aToHex } = require('@polkadot/util');

async function main() {
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
    console.log(`secretKey : ${u8aToHex(secretKey)}`);
    // secretKey : 0xfdb18c69abb92a9588c02e02e901f84adf85dcb47c66bbe3db10a98f4fcf90ba6f7afd79f216fe3d078b89a190fdeaa879865bb5cc3581eb33c630f64f7d4946
}

main().catch(console.error).finally(() => process.exit());