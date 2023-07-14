import { ApiPromise, WsProvider } from "@polkadot/api";


const getBlockLimitTest = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(({
        provider: provider,
    }));
    await api.isReady;

    const blockHash = await api.rpc.chain.getBlockHash(3654722);
    console.log(`blockHash:${blockHash}`);

    // no blockHash is specified, so we retrieve the latest
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    console.log(`signedBlock:${signedBlock}`);

    //3654722 | 3636456
    // const blockHash = await rpcToLocalNode('chain_getBlockHash', [3636456]);
    // console.log(`blockHash:${blockHash}`);

    // const signedBlock = await rpcToLocalNode('chain_getBlock', [blockHash]);
    // console.log(`signedBlock:${signedBlock.toString()}`);
    // console.log(signedBlock);
}

getBlockLimitTest().catch(console.error).finally(() => process.exit());

// blockHash:0x9ba0f2f3cdc0e75e001a48dd1798cb9eb1d572855179a426ea11be2edbb7df51

export function rpcToLocalNode(
    method: string,
    params: any[] = []
): Promise<any> {
    return fetch('https://shibuya.public.blastapi.io', {
        body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            method,
            params,
        }),
        headers: {
            'Content-Type': 'application/json',
            connection: 'keep-alive',
        },
        method: 'POST',
    })
        .then((response) => response.json())
        .then(({ error, result }) => {
            if (error) {
                throw new Error(
                    `${error.code} ${error.message}: ${JSON.stringify(error.data)}`
                );
            }

            return result;
        });
}