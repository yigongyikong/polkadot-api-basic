const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.query.subs/
const testQuerySubscriptions = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    api.query.timestamp.now((moment) => {
        console.log(`The last block has a timestamp of ${moment}`);
    });
    // The last block has a timestamp of 1680178044654

    const ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U'; // balance of 15596819873881302999 and a nonce of 2

    api.query.system.account(ADDR, ({ nonce, data: balance }) => {
        console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
    });
    // free balance is 17601369582490409236 with 0 reserved and a nonce of 3
}
testQuerySubscriptions();