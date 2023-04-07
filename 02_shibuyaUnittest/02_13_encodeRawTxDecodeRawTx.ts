import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';

const encodeRawTxDecodeRawTx = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const trsfRawTx = api.tx.balances.transfer('VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U', BigInt(2000000000000000000));
    console.log(trsfRawTx); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log(trsfRawTx.toHuman());
    /*{
        isSigned: false,
            method: {
            args: { dest: [Object], value: '2,000,000,000,000,000,000' },
            method: 'transfer',
                section: 'balances'
        }
    }*/
    console.log(trsfRawTx.toHex()); // 0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f65130000c84e676dc11b

    const decodeRawTx = await api.tx(trsfRawTx.toHex());
    console.log(decodeRawTx); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log(decodeRawTx.toHuman());
    /*{
        isSigned: false,
            method: {
            args: { dest: [Object], value: '2,000,000,000,000,000,000' },
            method: 'transfer',
                section: 'balances'
        }
    }*/
    console.log(decodeRawTx.toHex()); // 0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f65130000c84e676dc11b
}

encodeRawTxDecodeRawTx().catch(console.error).finally(() => process.exit());