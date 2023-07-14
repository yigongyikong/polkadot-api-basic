const { stringToU8a, u8aToHex } = require('@polkadot/util');
/**
 * https://polkadot.js.org/docs/keyring/start/create
 * Create]
 * - To create your first keyring,
 *      it is as simple as importing it and constructing it.
 */
const { Keyring } = require('@polkadot/keyring');
// create a keyring with some non-default values specified
const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
/**
 * - As detailed earlier, in stardard Polkadot/Substrate chains
 *      ed25519/sr25519/ecdsa types are supported.
 * - The ss58Format will be used to format addresses,
 *      more on this in a later section.
 * 
 * ME) keyring type으로 ed25519/sr25519/ecdsa types 등을 제공한다.
 * https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json
 * astar는 ss58Format: 5
 */

/**
 * Adding a pair]
 * - From the empty keyring above, we can now add a new pair to our keyring.
 */
/*
const { mnemonicGenerate } = require('@polkadot/util-crypto');

const mnemonic = mnemonicGenerate();
console.log(`mnemonic : ${mnemonic}`);
// mnemonic : neutral deputy capable tired plug height luxury control unhappy drink creek pizza

// create & add the pair to the keyring with the type and some additional
// metadata specified
const pair = keyring.addFromUri(mnemonic, { name: 'first pair' }, 'ed25519');

// the pair has been added to our keyring
console.log(keyring.pairs.length, 'pairs available'); // 1 pairs available

// log the name & address (the latter encoded with the ss58Format)
console.log(pair.meta.name, 'has address', pair.address); // first pair has address HJh3hecPJFFEJxPSQxsYosiUxTAMdzHN5HAvR9jZ2AEU7AA
*/

/** result of upper code
 * mnemonic : someone rough seat enhance ski exchange similar sing shaft orchard salt can
 * 1 pairs available
 * first pair has address EsYdLF1ZBQpeGZjBDGAJwCykK3rwRhEERarBKJZ46Lsqpy
 */
/*
const myMnemonic = 'someone rough seat enhance ski exchange similar sing shaft orchard salt can';
const result = keyring.addFromMnemonic(myMnemonic, { test: 'testing'}, 'ed25519');
// console.log(result);
console.log(result.address); // EsYdLF1ZBQpeGZjBDGAJwCykK3rwRhEERarBKJZ46Lsqpy5
console.log(u8aToHex(result.addressRaw)); // 0x659bc4e32df2770d08067899e641f63c7ab2c6751eba67ef6d7b63be7d3b992d : ascii-value for address
console.log(result.isLocked); // false
console.log(result.meta); // { test: 'testing' }
console.log(u8aToHex(result.publicKey)); // 0x659bc4e32df2770d08067899e641f63c7ab2c6751eba67ef6d7b63be7d3b992d : === addressRaw
console.log(result.type); // ed25519
*/

/**
 * Revisiting crypto]
 * - There is one caveat(경고) with different crypto types.
 * - sr25519 there is only a WASM interface.
 * - This means that before adding any keypair with sr25519,
 *      we first need to ensure the WASM is initialized.
 */
// const { cryptoWaitReady, mnemonicGenerate } = require('@polkadot/util-crypto');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

await cryptoWaitReady();

const getAddr = async () => {
    // we only need to do this once per app, somewhere in our init code
    // (when using the API and waiting on `isReady` this is done automatically)
    
    // await cryptoWaitReady();
    const myMnemonic = 'someone rough seat enhance ski exchange similar sing shaft orchard salt can';
    // create an ed25519 pair from the mnemonic
    const ep = keyring.createFromUri(myMnemonic, { name: 'ed25519' }, 'ed25519');
    
    // create an sr25519 pair from the mnemonic (keyring defaults)
    const sp = keyring.createFromUri(myMnemonic, { name: 'sr25519' });

    
    // log the addresses, different cryptos, different results
    console.log(ep.meta.name, ep.address);
        // ed25519 EsYdLF1ZBQpeGZjBDGAJwCykK3rwRhEERarBKJZ46Lsqpy5
    console.log(sp.meta.name, sp.address);
        // sr25519 FPiuN1FdujxW6aon6iZpx7fryhmEPqJ5F3WXNEDXrnBmKc6
}

getAddr();
/**
 * - In the above example,
 *      we just wanted to create the pair without adding it to the keyring.
 *      (In some cases where we don't need management this is useful.)
 * - To do this we changed the addFromUri in the first example.
 * - Like in the first example the pair is created,
 *      but unlike the first example
 *      it is not available as a pair on the keyring .pairs interface.
 * 
 * ME) keyring에 key 데이터를 넣을 때 addFromUri에 mnemonic을 넣어 사용.
 */