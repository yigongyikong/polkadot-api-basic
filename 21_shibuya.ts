// const { ApiPromise } = require('@polkadot/api');
// const { WsProvider } = require('@polkadot/rpc-provider');
// const { options } = require('@astar-network/astar-api');

const connectToShibuya = async () => {
    // const provider = new WsProvider('ws://localhost:9944');
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    // OR
    // const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // Use the api
    // For example:
    console.log((await api.rpc.system.properties()).toHuman());

    // return api;
}

const balance = async () => {

    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // const connect = connectToShibuya();

    // query and display account data
    const data = await api.query.system.account('b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6JagqS2');
    // const data = await connect.query.system.account('b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6JagqS2');
    /*{ // 5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn
        nonce: '0',
            consumers: '0',
                providers: '0',
                    sufficients: '0',
                        data: { free: '0', reserved: '0', miscFrozen: '0', feeFrozen: '0' }
    }*/
    /*{ // b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6JagqS2
        nonce: '0',
            consumers: '0',
                providers: '1',
                    sufficients: '0',
                        data: {
            free: '10,000,000,000,000,000,000',
                reserved: '0',
                    miscFrozen: '0',
                        feeFrozen: '0'
        }
    }*/
    console.log(data.toHuman());

    process.exit(0);
}

const blocks = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(3427689);

    // console.log(result);
    console.log(blockHash);

    process.exit(0);
}

// connectToShibuya();

// balance();

// blocks();