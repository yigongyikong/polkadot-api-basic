/**
 * https://polkadot.js.org/docs/keyring/start/ss58
 * ss58 Formats]
 * - we explicitly passed the default ss58Format to the keyring.
 * - To understand the impact,
 *      we will used a read example of formatting using a known mnemonic.
 */
const { Keyring } = require('@polkadot/keyring');
// const { mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

const test_ss58Format = async () => {
    // known mnemonic, well, now it is - don't use it for funds
    const astarTestMnemonic = 'accident beauty skill silk sphere gap dutch thank lottery relief vacant ethics';
    await cryptoWaitReady();

    // type: ed25519, ssFormat: 42 (all defaults)
    const keyring = new Keyring();
    const pair = keyring.createFromUri(astarTestMnemonic);

    // use the default as setup on init
    // 5Easi2Bt4Cr1cEWrC79FUZZ66iaoCw3kDqA6eDSkgZFpQr8R
    console.log('Substrate generic', pair.address);

    // adjust the default ss58Format for Kusama
    // F6VNLXkgZrwMtLHxoxJNWv6FJs31brvgCzr2siiAMUK9siG
    keyring.setSS58Format(2);
    console.log('Kusama', pair.address);

    // adjust the default ss58Format for Polkadot
    // 13XArMSwuz7V3mXN9kCFciPExLaSuEbtJKtaoWS7EeHLbKPq
    keyring.setSS58Format(0);
    console.log('Polkadot', pair.address);

    // adjust the default ss58Format for Astar
    // YTU9K9xqSV7q4YggQbNWDiNBmHvB9kVF2fEsvecYvFmzqDk
    keyring.setSS58Format(5);
    console.log('astar', pair.address);

    const shibuKeyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
    const pairShibuya = shibuKeyring.createFromUri(astarTestMnemonic, { name: 'sr25519' });
    console.log('Shibuya', pairShibuya.address);
    // b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6JagqS2
}

/**
 * How is the encoding done?]
 * - To understand the above example,
 *      we will re-construct the actual encoding,
 *      based on the actual publicKey
 *      and using the underlying util-crypto libraries.
 */
const decodeAddr = async () => {
    const astarTestMnemonic = 'accident beauty skill silk sphere gap dutch thank lottery relief vacant ethics';
    await cryptoWaitReady();
    const shibuKeyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
    const pairShibuya = shibuKeyring.createFromUri(astarTestMnemonic, { name: 'sr25519' });
    console.log('Shibuya', pairShibuya.address);

    // 228, 112, 45, 32, 222, 120, 115, 72, 173, 174, 218, 237, 148, 178, 175, 120, 224, 144, 81, 221, 100, 51, 20, 218, 85, 93, 202, 77, 97, 75, 239, 9
    console.log(pairShibuya.publicKey);

    // 228, 112, 45, 32, 222, 120, 115, 72, 173, 174, 218, 237, 148, 178, 175, 120, 224, 144, 81, 221, 100, 51, 20, 218, 85, 93, 202, 77, 97, 75, 239, 9
    console.log(shibuKeyring.decodeAddress(pairShibuya.publicKey));

    console.log(shibuKeyring.encodeAddress(pairShibuya.publicKey, 42));
    // 5HEE6eZcLmmrURHKrSSHdCNNe4RcX48CyXuJagWfNjJd6ttg

    console.log(shibuKeyring.encodeAddress(pairShibuya.publicKey, 5));
    // b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6JagqS2
}


// test_ss58Format();


decodeAddr();