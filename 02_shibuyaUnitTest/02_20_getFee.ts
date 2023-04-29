import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';

const getFee = async (blockNumber, ExtrinsicHash) => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    console.log(`blockNumber:${blockNumber}`);
    console.log(`ExtrinsicHash:${ExtrinsicHash}`);

    // const feeDetails = await api.rpc.payment.queryFeeDetails('0x6af13bdd490ad11a461f324182752fef018b312d83b78fbf552ae21c3d0960e9', '0xd0a5f22ebff2676dd399ecc3d1606f4de7fc55fa207cecb6b0e2ee3037e869b5');
    // const feeDetails = await api.call.transactionPaymentApi.queryFeeDetails('0x6af13bdd490ad11a461f324182752fef018b312d83b78fbf552ae21c3d0960e9', '0xd0a5f22ebff2676dd399ecc3d1606f4de7fc55fa207cecb6b0e2ee3037e869b5');

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    console.log(`blockHash:${blockHash}`);
    // returns SignedBlock
    const { block } = await api.rpc.chain.getBlock(blockHash);

    const queryFeeDetails = await api.rpc.payment.queryFeeDetails(block.extrinsics[5].toHex(), blockHash);
    console.log('queryFeeDetails:', JSON.stringify(queryFeeDetails.toHuman(), null, 2));
    /*queryFeeDetails: {
        "inclusionFee": {
            "baseFee": "100.0000 µSBY",
                "lenFee": "1.4900 mSBY",
                    "adjustedWeightFee": "64.9028 nSBY"
        }
    }*/
    const queryInfo = await api.rpc.payment.queryInfo(block.extrinsics[5].toHex(), blockHash);
    console.log('queryInfo:', JSON.stringify(queryInfo.toHuman(), null, 2));
    /*queryInfo: {
        "weight": "173,811,000",
            "class": "Normal",
                "partialFee": "1.5900 mSBY"
    }*/

}

getFee('3518257', '0x6af13bdd490ad11a461f324182752fef018b312d83b78fbf552ae21c3d0960e9').catch(console.error).finally(() => process.exit());