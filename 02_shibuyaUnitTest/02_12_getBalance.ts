import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const getBalance = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const bal = await api.derive.balances.account('VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U');

    console.log(bal.accountId.toString()); // VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U
    // console.log(bal.accountNonce); // <BN: 2>
    // console.log(u8aToHex(bal.accountNonce)); // 0x00
    console.log(bal.accountNonce.toString()); // 3
    // console.log(bal.freeBalance);
    console.log(bal.freeBalance.toString()); // 17601369582490409236
    // console.log(bal.frozenFee);
    console.log(bal.frozenFee.toString()); // 0
    // console.log(bal.frozenMisc);
    console.log(bal.frozenMisc.toString()); // 0
    // console.log(bal.reservedBalance);
    console.log(bal.reservedBalance.toString()); // 0
    // console.log(bal.votingBalance);
    console.log(bal.votingBalance.toString()); // 17601369582490409236

    const data = await api.query.system.account('VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U');
    console.log(data.toHuman());
    /*{
        nonce: '3',
            consumers: '0',
                providers: '1',
                    sufficients: '0',
                        data: {
            free: '17,601,369,582,490,409,236',
                reserved: '0',
                    miscFrozen: '0',
                        feeFrozen: '0'
        }
    }*/
}

getBalance().catch(console.error).finally(() => process.exit());