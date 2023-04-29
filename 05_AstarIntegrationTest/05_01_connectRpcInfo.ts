import { ApiPromise, WsProvider } from "@polkadot/api";

import Api from '@polkadot/api/promise';
import { HttpProvider } from '@polkadot/rpc-provider';



const connectRpcInfo = async () => {
    // const provider = new WsProvider('ws://localhost:9944');
    // const provider = new WsProvider('wss://rpc.astar.network');
    // OR
    // const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    // const provider = new HttpProvider('https://!!');
    // const provider = new HttpProvider('https://astar.public.blastapi.io');
    // const api = await ApiPromise.create({provider});

    // console.log('latest block Hash', version);

    // Use the api
    // For example:
    // console.log((await api.rpc.system.properties()).toHuman());
    // { ss58Format: '5', tokenDecimals: [ '18' ], tokenSymbol: [ 'ASTR' ] }
    // https://hazel-gondolin-982d6.astar.bdnodes.net?auth=KpsskkIce4d-ogsKq42cUirhP29tqwW3bOH4sfpPuJ8
    // return api;
}

connectRpcInfo().catch(console.error).finally(() => process.exit());


// curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' https://astar.public.blastapi.io
// curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' https://hazel-gondolin-982d6.astar.bdnodes.net?auth=KpsskkIce4d-ogsKq42cUirhP29tqwW3bOH4sfpPuJ8
// curl -H "Content-Type: application/json" -H "Authorization: Bearer KpsskkIce4d-ogsKq42cUirhP29tqwW3bOH4sfpPuJ8" -d '{"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}' https://hazel-gondolin-982d6.astar.bdnodes.net/para-http-rpc