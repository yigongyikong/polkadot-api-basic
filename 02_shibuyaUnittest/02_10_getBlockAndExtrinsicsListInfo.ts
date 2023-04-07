import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const getBlockAndExtrinsicsListInfo = async (blockNumber) => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    const blockDetailtmpRlt = {};
    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    // returns SignedBlock
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    // the hash for the block, always via header (Hash -> toHex()) - will be
    // the same as blockHash above (also available on any header retrieved,
    // subscription or once-off)
    // console.log(signedBlock.block.header.hash.toHex());

    // console.log(signedBlock.block.extrinsics);

    // the hash for each extrinsic in the block
    signedBlock.block.extrinsics.forEach((ex, index) => {
        // console.log(index, ex.hash.toHex());
        // console.log(index, ex.toHuman()[index]);
        // console.log(index, ex.toHuman());
        blockDetailtmpRlt[ex.hash.toHex()] = ex.toHuman();
        // console.log(blockDetailtmpRlt);

        // console.log(index, '==========');
    });
    const blockDetailArrRlt = Object.entries(blockDetailtmpRlt);
    // console.log('==========');
    // console.log(blockDetailArrRlt[0]);
    // console.log('==========');
    // console.log(blockDetailArrRlt[1]);
    // console.log('==========');
    // console.log(blockDetailArrRlt[2]);
    // const blockDetailArrRlt = Object.keys(blockDetailtmpRlt).map(item => blockDetailtmpRlt[item]);
    // console.log(blockDetailArrRlt);

    // console.log('==========');
    console.log(blockDetailArrRlt);
    /*[
        [
            '0x4114eacdcdb86a1436b076470b966859c96548951ad627ad1829406c5bf54242',
            { isSigned: false, method: [Object] }
        ],
        [
            '0x0d4d41bfc4fbbff0d5757afde70e3bf18c66e85327a8f8ccab3498de92c7b425',
            { isSigned: false, method: [Object] }
        ],
        [
            '0x4b2d7e0fc2e13b532250b9e78e5e4868e014a3f5e00f08aa8815aa20834df001',
            {
                isSigned: true,
                method: [Object],
                era: [Object],
                nonce: '2',
                signature: '0x5e505bd56e3e5797f11af3a21fac2b9375fa1ece00015f9baab1ac9a4615e51a4a62b3041460847e044a0066ec8d6238beb12efd2dfa5addfd40fb8a1f1de68d',
                signer: [Object],
                tip: '1.1000 µSBY'
            }
        ],
        [
            '0x99160fb87708463c53d1361a81bf05223927f562378503e1f5b95c5b44f92b43',
            {
                isSigned: true,
                method: [Object],
                era: [Object],
                nonce: '317,698',
                signature: '0xf47f00cd3f53cf53bcd8a0aa4b79e510ab8496b8bb0d640227c62184fd2b8c2859ea946675dc8cc986241d4de61e73dfcc99f70339c0d11db7ddfe32f2eba482',
                signer: [Object],
                tip: '0'
            }
        ],
        [
            '0x52c40484eedaa583157748f80c54ed13dfa2384d64ec186af2fa8276cc4b1941',
            {
                isSigned: true,
                method: [Object],
                era: [Object],
                nonce: '317,699',
                signature: '0x225d6098acf9c841751c0f70ced1df6d5a6469f61b5d9e5073a1d8526d623e22fec21bdf7c9583b0f58054070f5789569ec687d173f6675d10796b7180ec878d',
                signer: [Object],
                tip: '0'
            }
        ]
    ]*/
}

getBlockAndExtrinsicsListInfo(3428552).catch(console.error).finally(() => process.exit());
