const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.query/
const testStateQueries = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    /**
     * In previous sections, we initialized the API and retrieved runtime constants. 
     * This section will walk through the concepts behind making queries to the chain to retrieve current state. 
     * The api.query.<module>.<method> interfaces, as already described earlier, is populated from the metadata. 
     * The API uses the metadata information provided to construct queries based on the location and parameters provided to generate state keys, 
     * and then queries these via RPC.
     */

    /**
     * Basic queries
     * Let's dive right in, connect to a general chain and retrieve some information on the current state. 
     * Of interest may be retrieving the nonce of a particular account as well as the current balance, this can be achieved via -
     */
    await api.isReady;

    // The actual address that we will use
    // const ADDR = 'X84AAbrZH1MqwHzTkd1JoJJKFDX7ZGbkkmrztabCjkiMNXn'; // balance of 2000000000000000000 and a nonce of 0
    const ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U'; // balance of 15596819873881302999 and a nonce of 2

    // Retrieve the last timestamp
    // const now = await api.query.timestamp.now();
    // Retrieve the account balance & nonce via the system module
    // const { nonce, data: balance } = await api.query.system.account(ADDR);
    // console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

    const [now, { nonce, data: balance }] = await Promise.all([
        api.query.timestamp.now(),
        api.query.system.account(ADDR)
    ]);
    console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
    // 1680835644590: balance of 17601369582490409236 and a nonce of 3
}
testStateQueries().catch(console.error).finally(() => process.exit());