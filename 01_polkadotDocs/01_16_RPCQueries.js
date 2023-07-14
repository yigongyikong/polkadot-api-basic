const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.rpc
const testRPCQueries = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    /**
     * The RPC calls provide the backbone for the transmission of data to and from the node. 
     * This means that all API endpoints such as api.query, api.tx or api.derive just wrap RPC calls, 
     * providing information in the encoded format as expected by the node.
     * 
     * Since you are already familiar with the api.query interface, the api.rpc interface follows the same format, for instance -
     */
    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();
    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    // Shibuya Testnet: last block #3493784 has hash 0x382b73017e8a2f16bc0d5f9d411a12983c43603a31c9088e46e50e3587b7deb3
}
testRPCQueries().catch(console.error).finally(() => process.exit());