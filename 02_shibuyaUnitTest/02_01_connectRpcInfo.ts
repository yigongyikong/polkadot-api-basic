import { ApiPromise, WsProvider } from "@polkadot/api";


const connectRpcInfo = async () => {
    // const provider = new WsProvider('ws://localhost:9944');
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    // OR
    // const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    const api = new ApiPromise(({ provider }));
    await api.isReady;

    // Use the api
    // For example:
    console.log((await api.rpc.system.properties()).toHuman());
    // { ss58Format: '5', tokenDecimals: [ '18' ], tokenSymbol: [ 'SBY' ] }

    // return api;
}

connectRpcInfo().catch(console.error).finally(() => process.exit());