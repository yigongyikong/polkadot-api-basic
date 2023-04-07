/**
 * https://polkadot.js.org/docs/keyring/start/sign-verify
 * Sign & Verify]
 * - However,
 *  let's actually use the pairs in something
 *  that is not just extracting local information.
 * 
 * - When using the API,
 *      pairs are critical since it gets used in signing transactions.
 * - The same signing and verification structure
 *      can be used on any kind of message.
 * - Here we will take you through
 *      the steps of signing and verifying messages.
 * 
 * Using known pairs]
 * - Assuming a known pair Alice
 *      we can exchange signatures and perform verification.
 */
const { stringToU8a, u8aToHex } = require('@polkadot/util');
const { Keyring } = require('@polkadot/keyring');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

/*
// create Alice based on the development seed
const alice = keyring.addFromUri('//Alice');

// create the message, actual signature and verify
const message = stringToU8a('this is our message');
const signature = alice.sign(message);
const isValid = alice.verify(message, signature, alice.publicKey);

// output the result
console.log(`${u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);
*/

const test_signVerify = async () => {
    const astarTestMnemonic = 'accident beauty skill silk sphere gap dutch thank lottery relief vacant ethics';
    await cryptoWaitReady();

    const shibuKeyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
    const pairShibuya = shibuKeyring.createFromUri(astarTestMnemonic, { name: 'sr25519' });
    
    const message = stringToU8a('test message');
    const signature = pairShibuya.sign(message);
    // console.log(`signature: ${signature}`);
    const isValid = pairShibuya.verify(message, signature, pairShibuya.publicKey);

    // output the result
    console.log(`${u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);
    // 0x389f2f56cc20202f911d277e6b5e3c919e42e867337d2735cc9e6605fa1f5c58044eba1127178a86bfd6da8a76c2ac76a3c38c3e3338be3ef5985f4ddfd45b81 is valid
    // 0xa8bafe140bad8574a510017bb212b0989e775ebe10374ce012edfabd24408d1db9d847fa82e634a93fb071ed22bde6055590fdfbfb595f8a661dcff120377786 is valid
}
/**
 * - On the line logging,
 *      you will notice a difference between sr25519 pairs
 *      compared to other crypto types such as ed25519.
 * - In sr25519 signatures are non-deterministic.
 * - This means that each time a signature is generated, like above,
 *      even if the data does match, the signature will be different.
 * - In the case of ed25519 or ecdsa each signature,
 *      for the same input data, will be the same.
 */

test_signVerify();