const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/api.rpc
/**
 * The api.derive interfaces will be covered in a follow-up section, 
 * but since the above example deals with new head subscriptions, a quick detour is warranted. 
 * The derives are just helpers that define certain functions and combine results from multiple sources. 
 * For new headers, the following information is useful in certain scenarios -
 */
const unsub = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    api.derive.chain.subscribeNewHeads((lastHeader) => {
        console.log(`#${lastHeader.number} was authored by ${lastHeader.author}`);
    });
    // #3493884 was authored by Z83aqAZrvLJmZyhG414dYxCPxbc4uD3MwBtbWdLrxV6FqcG
}
unsub();