const { Keyring } = require('@polkadot/keyring');
const {
    mnemonicGenerate,
    mnemonicToEntropy,
    mnemonicToLegacySeed,
    mnemonicToMiniSecret,
    mnemonicValidate,
    cryptoWaitReady
} = require('@polkadot/util-crypto');
const { stringToU8a, u8aToHex } = require('@polkadot/util');
const keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });


const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } = require('@astar-network/astar-api');


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
    console.log(`validate-testEntropy : ${mnemonicValidate(testEntropy)}`);
    // validate-testEntropy : false

    const testLegacySeed = mnemonicToLegacySeed(testMnemonic);
    console.log(`testLegacySeed : ${testLegacySeed}`); // Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
    // testLegacySeed : 235,136,113,199,250,101,12,154,49,52,113,116,123,82,64,30,61,39,231,96,118,139,9,91,37,138,15,225,237,106,92,71
    console.log(`testLegacySeed=>u8aToHex : ${u8aToHex(testLegacySeed)}`);
    // testLegacySeed=>u8aToHex : 0xeb8871c7fa650c9a313471747b52401e3d27e760768b095b258a0fe1ed6a5c47
    console.log(`validate-testLegacySeed : ${mnemonicValidate(testLegacySeed)}`);
    // validate-testLegacySeed : false

    const testMiniSecret = mnemonicToMiniSecret(testMnemonic);
    console.log(`testMiniSecret : ${testMiniSecret}`);
    // testMiniSecret : 161,150,136,140,250,213,82,91,110,18,22,121,168,67,192,64,210,205,231,217,173,66,121,187,111,102,154,221,225,128,38,65
    console.log(`testMiniSecret=>u8aToHex : ${u8aToHex(testMiniSecret)}`);
    // testMiniSecret=>u8aToHex : 0xa196888cfad5525b6e121679a843c040d2cde7d9ad4279bb6f669adde1802641
    console.log(`validate-testMiniSecret : ${mnemonicValidate(testMiniSecret)}`);
    // validate-testMiniSecret : false
}

const revisitCrypto = async () => {
    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';

    // ed25519', Not need to cryptoWaitReady();
    const testAddFromMnemonic_ed = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ed25519');
    console.log(`testAddFromMnemonic_ed-address : ${testAddFromMnemonic_ed.address}`); // XkpVKDM2UmEjgmQZPCRNYB2UKpFQRWALQGeMwr9XEzfqbcN
    console.log(`testAddFromMnemonic_ed-addressRaw : ${u8aToHex(testAddFromMnemonic_ed.addressRaw)}`); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5
    console.log(`testAddFromMnemonic_ed-meta : ${testAddFromMnemonic_ed.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_ed-publicKey : ${u8aToHex(testAddFromMnemonic_ed.publicKey)}`); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5
    console.log(`testAddFromMnemonic_ed-KeypairType : ${testAddFromMnemonic_ed.KeypairType}`); // undefined

    await cryptoWaitReady();
    // 'sr25519'
    const testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
    console.log(`testAddFromMnemonic_sr-address : ${testAddFromMnemonic_sr.address}`); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya
    console.log(`testAddFromMnemonic_sr-addressRaw : ${u8aToHex(testAddFromMnemonic_sr.addressRaw)}`); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e
    console.log(`testAddFromMnemonic_sr-meta : ${testAddFromMnemonic_sr.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_sr-publicKey : ${u8aToHex(testAddFromMnemonic_sr.publicKey)}`); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e
    console.log(`testAddFromMnemonic_sr-KeypairType : ${testAddFromMnemonic_sr.KeypairType}`); // undefined

    // 'ecdsa', Not need to cryptoWaitReady();
    const testAddFromMnemonic_ec = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ecdsa');
    console.log(`testAddFromMnemonic_ec-address : ${testAddFromMnemonic_ec.address}`); // XCWdpqNyJTQuF2vygFK1dLjxfd9M3nLSNbpWSjhffoZH5dV
    console.log(`testAddFromMnemonic_ec-addressRaw : ${u8aToHex(testAddFromMnemonic_ec.addressRaw)}`); // 0x37d676896572575d8eeb574ce557a487872fda7de5899f52201c051bbc1b2e11
    console.log(`testAddFromMnemonic_ec-meta : ${testAddFromMnemonic_ec.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_ec-publicKey : ${u8aToHex(testAddFromMnemonic_ec.publicKey)}`); // 0x028cf142e9c7235598935dca16da534488eb247ae7613ff756d51e1cc03520dce1
    console.log(`testAddFromMnemonic_ec-KeypairType : ${testAddFromMnemonic_ec.KeypairType}`); // undefined

    // 'ethereum', Not need to cryptoWaitReady();
    const testAddFromMnemonic_eth = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ethereum');
    console.log(`testAddFromMnemonic_eth-address : ${testAddFromMnemonic_eth.address}`); // 0x887d2B6CC74053CD0A115243d399b27c8afBcA2C
    console.log(`testAddFromMnemonic_eth-addressRaw : ${u8aToHex(testAddFromMnemonic_eth.addressRaw)}`); // 0x887d2b6cc74053cd0a115243d399b27c8afbca2c
    console.log(`testAddFromMnemonic_eth-meta : ${testAddFromMnemonic_eth.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_eth-publicKey : ${u8aToHex(testAddFromMnemonic_eth.publicKey)}`); // 0x0201d40658b1fc247706d65b6e2556bb7072c28e6c7919ce6f030dcdd9114a3307
    console.log(`testAddFromMnemonic_eth-KeypairType : ${testAddFromMnemonic_eth.KeypairType}`); // undefined
}

const makeRawTxAndSign = async () => {
    const jisb = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    const trsfRawTx = api.tx.balances.transfer(jisb, BigInt(200000000000000000));

    const keyring = new Keyring({ type: 'sr25519' });

    // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testKey = keyring.addFromUri(testMnemonic, 'sr25519');
    console.log(`testKey : ${testKey}`); // testKey : [object Object]
    console.log(`testKey : ${testKey.address}`); // testKey : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA

    const signedTx = await trsfRawTx.signAsync(testKey);
    console.log(`signedTx : ${signedTx}`);
    /*signedTx: {
        "signature": {
            "signer": {
                "id": "b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"
            },
            "signature": {
                "sr25519": "0x5a0c7d5ffe9fe993a7456c598e9917126697bc90bb0a4aeddda74af78701ad2c59a9e287f9f35c2468495b55b8d2dffecaa066d414efb5780889027e53e48d82"
            },
            "era": {
                "mortalEra": "0x3401"
            },
            "nonce": 0, "tip": 0
        },
        "method": {
            "callIndex": "0x1f00",
                "args": {
                "dest": {
                    "id": "VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"
                },
                "value": 200000000
            }
        }
    }*/

    /*signedTx: {
        "signature": {
            "signer": {
                "id": "b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"
            },
            "signature": {
                "sr25519": "0xe838c8ffe0355a5daa6a8a2b264d099518d254b09de96a4dba088f89349d30179ad33f91464359a8db2fe1bfb38b2cc07f4017f049eee9a458b616586162be84"
            },
            "era": {
                "mortalEra": "0x0400"
            },
            "nonce": 0, "tip": 0
        },
        "method": {
            "callIndex": "0x1f00",
                "args": {
                "dest": {
                    "id": "VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"
                },
                "value": 200000000
            }
        }
    }*/
    // const txhash = await signedTx.send();
    // console.log(`txhash : ${txhash}`);
    // return txhash;
}

createWallet();

revisitCrypto();

makeRawTxAndSign().catch(console.error).finally(() => process.exit());