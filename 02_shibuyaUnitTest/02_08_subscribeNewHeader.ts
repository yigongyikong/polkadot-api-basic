import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const subscribeNewHeader = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // Subscribe to the new headers
    await api.rpc.chain.subscribeNewHeads((lastHeader) => {
        console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
        // Shibuya Testnet: last block #3434662 has hash 0x2dc566e25c9b40b774a8e7eea1b2ce9c73be4198efff66c229baa30f701209f0
    });
}

subscribeNewHeader();