const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/create
const testCreateAnInstance = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    /**
     * Focusing on the construction, any API requires a provider and we create one via the const wsProvider = new WsProvider(...). By default, 
     * if none is provided to the API it will construct a default WsProvider instance to connect to ws://127.0.0.1:9944.
     * 
     * We generally recommend always specifying the endpoint since in most cases we want to connect to an external node and even for local nodes, 
     * it is always better being explicit, less magic that can make you wonder in the future.
     * 
     * At this time the only provider type that is fully supported by the API is the WebSocket version.
     * 
     * Polkadot/Substrate really comes alive with possibilities once you have access to bi-directional RPCs such as what WebSockets provide.
     * (It is technically possible to have some limited capability via bare-HTTP, 
     * but at this point WebSockets is the only fully-operational and supported version - always remember that it is just "upgraded HTTP".)
     */

    await api.isReady;
    console.log(api.genesisHash.toHex());
    // 0xddb89973361a170839f80f152d2e9e38a376a5a7eccefcade763f46a8e567019
}
testCreateAnInstance().catch(console.error).finally(() => process.exit());