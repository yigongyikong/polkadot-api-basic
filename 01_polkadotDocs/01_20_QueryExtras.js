const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.query.other
const testQueryExtras = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    /**
     * In previous sections we took a walk through queries, showing how to use one-shot queries, 
     * how to subscribe to results and how to combine multiple queries into one. 
     * This section will aim to extend that knowledge showing some other features and utilities that are available on the api.query interfaces.
     * 
     * State at a specific block
     * Quite often it is useful (taking pruning into account, more on this later) to retrieve the state at a specific block. 
     * For instance we may wish to retrieve the current balance as well as the balance at a previous block for a specific account -
     */
    await api.isReady;
    const ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U'; // balance of 15596819873881302999 and a nonce of 2

    // // Retrieve the current block header
    // const lastHdr = await api.rpc.chain.getHeader();
    // // Get a decorated api instance at a specific block
    // const apiAt = await api.at(lastHdr.hash);
    // // query the balance at this point of the chain
    // const { data: { free } } = await apiAt.query.system.account(ADDR);
    // // Display the free balance
    // console.log(`The current free is ${free.toString()}`);
    // // The current free is 15596819873881302999

    /**
     * The .at queries are all single-shot, i.e. there are no subscription option to these, since the state for a previous block should be static. 
     * (This is true to a certain extent, i.e. when blocks have been finalized).
     * 
     * An additional point to take care of (briefly mentioned above), is state pruning. 
     * !!!!!By default a Polkadot/Substrate node will only keep state for the last 256 blocks, unless it is explicitly run in archive mode.
     * This means that querying state further back than the pruning period will result in an error returned from the Node. 
     * (Generally most public RPC nodes only run with default settings, which includes aggressive state pruning)!!!!!
     */


    // [Map keys & entries]
    // Retrieve the active era
    const activeEra = await api.query.staking.activeEra();
    // TypeError: Cannot read properties of undefined (reading 'activeEra')

    // retrieve all exposures for the active era
    const exposures = await api.query.staking.erasStakers.entries(activeEra.unwrap().index);

    exposures.forEach(([key, exposure]) => {
        console.log('key arguments:', key.args.map((k) => k.toHuman()));
        console.log('     exposure:', exposure.toHuman());
    });

    // [State entries]

    // [Entry metadata]
}
testQueryExtras();