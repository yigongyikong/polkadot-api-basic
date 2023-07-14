const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.query.multi
const testMultiQueries = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    /**
     * A couple of items to note in the example above: we don't call account directly, but rather account.multi. 
     * We pass the addresses we want to query as an array, and the length thereof would depend on the number of addresses we want to query. 
     * As an extended example, we can track the balances of a list of validators,
     */
    await api.isReady;

    // Retrieve a snapshot of the validators
    // (all active & waiting based on ValidatorPrefs storage)
    const validatorKeys = await api.query.staking.validators.keys();
    // TypeError: Cannot read properties of undefined (reading 'validators')

    // Subscribe to the balances for these accounts
    api.query.balances.account.multi(validatorKeys, (balances) => {
        console.log(`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
    });
}
testMultiQueries();