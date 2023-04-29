import { Keyring } from '@polkadot/keyring';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const makeRawTxAndSign = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    const jisb = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const cryptoTest = 'X84AAbrZH1MqwHzTkd1JoJJKFDX7ZGbkkmrztabCjkiMNXn';

    await api.isReady;

    // const trsfRawTx = api.tx.balances.transfer(jisb, BigInt(200000000000000000));
    const trsfRawTx = api.tx.balances.transfer(cryptoTest, BigInt(2000000000000000000));
    console.log(`${trsfRawTx}`);
    // { "signature": { "signer": { "id": "VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy" }, "signature": { "ed25519": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" }, "era": { "immortalEra": "0x00" }, "nonce": 0, "tip": 0 }, "method": { "callIndex": "0x1f00", "args": { "dest": { "id": "X84AAbrZH1MqwHzTkd1JoJJKFDX7ZGbkkmrztabCjkiMNXn" }, "value": "0x00000000000000001bc16d674ec80000" } } }
    // Object.getOwnPropertyDescriptor(trsfRawTx);
    // console.log(Object.getOwnPropertyDescriptors(api.tx.balances.transfer));
    // console.log(typeof api.tx.balances.transfer); // function
    // console.log(typeof trsfRawTx); // object
    // console.log('toString', trsfRawTx.toString());

    const keyring = new Keyring({ type: 'sr25519' });

    // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    // const testKey = keyring.addFromUri(testMnemonic, 'sr25519');
    const testKey = keyring.addFromUri(testMnemonic);
    // console.log(`testKey : ${testKey}`); // testKey : [object Object]
    // console.log(`testKey : ${testKey.address}`); // testKey : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    // console.log(typeof testKey); // testKey : [object Object]

    const signedTx = await trsfRawTx.signAsync(testKey);
    console.log(`${signedTx}`);
    // { "signature": { "signer": { "id": "b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V" }, "signature": { "sr25519": "0xac39ed683f113399c46a0de7bfac57b7747352b6e4093db4ab565192099ad36d54788a60bce153dc058edbf28f244f4ad10296822ae642c84c31e25da667d985" }, "era": { "mortalEra": "0x9400" }, "nonce": 19, "tip": 0 }, "method": { "callIndex": "0x1f00", "args": { "dest": { "id": "X84AAbrZH1MqwHzTkd1JoJJKFDX7ZGbkkmrztabCjkiMNXn" }, "value": "0x00000000000000001bc16d674ec80000" } } }

    // const txhash = await signedTx.send();
    // console.log(`txhash : ${txhash}`);
}

makeRawTxAndSign().catch(console.error).finally(() => process.exit());