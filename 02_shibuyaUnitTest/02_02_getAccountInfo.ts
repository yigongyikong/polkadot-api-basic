import { ApiPromise, WsProvider } from "@polkadot/api";


const getAccountInfo = async () => {

    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(({ provider }));
    await api.isReady;

    // const connect = connectToShibuya();

    // query and display account data
    const data = await api.query.system.account('b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6JagqS2');
    /*
    {
        nonce: '2',
            consumers: '0',
                providers: '1',
                    sufficients: '0',
                        data: {
            free: '9,996,939,845,765,906,658',
                reserved: '0',
                    miscFrozen: '0',
                        feeFrozen: '0'
        }
    }
    */
    console.log(data.toHuman());
}

getAccountInfo().catch(console.error).finally(() => process.exit());