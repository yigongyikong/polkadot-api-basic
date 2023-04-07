const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.consts
const testRuntimeConstants = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    /**
     * Constant queries will introduce you to the concepts behind the types and the interaction of the API with those types. 
     * The same concepts are implemented in the remainder of the API - the runtime constants is just the simplest starting point.
     * For some background: constants are values that are defined in the runtime and used as part of chain operations. 
     * These constants can be changed as part of an upgrade.
     */
    await api.isReady;

    // The length of an epoch (session) in Babe
    // console.log(api.consts.babe.epochDuration.toNumber());
    // TypeError: Cannot read properties of undefined (reading 'epochDuration')

    // The amount required to create a new account
    // console.log(api.consts.balances.existentialDeposit.toNumber());
    // 1000000

    // The amount required per byte on an extrinsic
    // console.log(api.consts.transactionPayment.transactionByteFee.toNumber());
    // TypeError: Cannot read properties of undefined (reading 'toNumber')

    /**
     * Since these are constants and defined by the metadata, 
     * it is not a call, but rather the values immediately available - 
     * as you'll see in subsequent sections, there is no need for await on these, it immediately returns the type and value for you to work with.
     */
}
testRuntimeConstants().catch(console.error).finally(() => process.exit());