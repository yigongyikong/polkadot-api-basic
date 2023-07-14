const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.tx
const testTransactions = async () => {

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

    /**
     * Transaction endpoints are exposed, as determined by the metadata, on the api.tx endpoint. 
     * These allow you to submit transactions for inclusion in blocks, be it transfers, setting information or anything else your chain supports.
     */

    /**
     * Under the hood
     * Despite the single-line format of signAndSend, there is a lot happening under the hood (and all of this can be manually provided)
     * => Based on the sender, the API will query system.account (or system.accountNonce on older chains) to determine the next nonce to use
     * => The API will retrieve the current block hash and use it to create a mortal transaction, 
     * ==> i.e. the transaction will only be valid for a limited number of blocks (by default this is 5 mins at 6s block times)
     * => It will construct a payload and sign this, this includes the genesisHash, 
     * ==> the blockHash for the start of the mortal era as well as the current chain specVersion
     * => The transaction is submitted to the node
     * As suggested, you can override all of this, 
     * i.e. by retrieving the nonce yourself and passing that as an option, 
     * i.e. signAndSend(alice, { nonce: aliceNonce }), this could be useful when manually tracking and submitting transactions in bulk.
     */


    // Sign and send a transfer from Alice to Bob
    // const txHash = await api.tx.balances
    //     .transfer(BOB, 12345)
    //     .signAndSend(alice);

    // Show the hash
    // console.log(`Submitted with hash ${txHash}`);
}
testTransactions();