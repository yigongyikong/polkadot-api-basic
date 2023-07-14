import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const getLastestBlock = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();

    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
}

getLastestBlock().catch(console.error).finally(() => process.exit());