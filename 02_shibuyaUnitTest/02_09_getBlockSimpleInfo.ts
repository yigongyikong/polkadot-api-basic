import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const getBlockSimpleInfo = async (blockNumber) => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    const extrinsicsList = {};
    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    // returns SignedBlock
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    // console.log(signedBlock);

    // the hash for the block, always via header (Hash -> toHex()) - will be
    // the same as blockHash above (also available on any header retrieved,
    // subscription or once-off)
    console.log(signedBlock.block.header.hash.toHex()); // 0xba312018e666b0414ffb686e2a3d987a1782c48a686ca1d794475322bada84d5

    // the hash for each extrinsic in the block
    signedBlock.block.extrinsics.forEach((ex, index) => {
        console.log(index, ex.hash.toHex());
        // 0 0x4114eacdcdb86a1436b076470b966859c96548951ad627ad1829406c5bf54242
        // 1 0x0d4d41bfc4fbbff0d5757afde70e3bf18c66e85327a8f8ccab3498de92c7b425
        // 2 0x4b2d7e0fc2e13b532250b9e78e5e4868e014a3f5e00f08aa8815aa20834df001
        // 3 0x99160fb87708463c53d1361a81bf05223927f562378503e1f5b95c5b44f92b43
        // 4 0x52c40484eedaa583157748f80c54ed13dfa2384d64ec186af2fa8276cc4b1941

        extrinsicsList[index] = ex.hash.toHex();
        // console.log(index, ex.toHuman());
        // console.log(index, ex.toHuman()?.method?.method);
        /*if (ex.toHuman()?.method?.method === 'transfer') {
            console.log(index, ex.toHuman()?.method?.args?.value);
            console.log(index, ex.toHuman()?.method?.args?.dest?.Id);
        }*/
        // console.log(index, ex.toHuman()?.method?.args?.dest); // for transfer
        // console.log(index, ex.toHuman()?.method?.args?.contract_id); // for stake
        // console.log(index, ex.toHuman()?.method?.args?.calls); // for Re-Stake Turn on 상태 Claim

        // ex.toHuman()?.method?.args?.calls.forEach((element) => {
        //     console.log(element, element?.args?.contract_id); // for Re-Stake Turn on 상태 Claim    
        // });
        // let arr = ex.toHuman()?.method?.args?.calls;
        // console.log(arr[0]); // for Re-Stake Turn on 상태 Claim

        // console.log(index, ex.toHuman()?.method?.args?.origin_contract_id); // for Nomination Transfer
        // console.log(index, ex.toHuman()?.method?.args?.target_contract_id); // for Nomination Transfer
    });
    // 0x1faeda4b3fc579ffd26600f0be1a0fad2178f0a1722eb0e2c1550b96fce5e2dd : block-Hash
    // 0 0x163e4d2679082e011cebbf43691b40178118d84d8f41708d9f6ab9551538ce75 : Extrinsic#3435305-0
    // 1 0x096bc1a923384335cdeadb4de9ecfafe17fdeb23509ce87e12fe03fd0621b79e : Extrinsic#3435305-1

    console.log(extrinsicsList);
    // {
    //     '0': '0x4114eacdcdb86a1436b076470b966859c96548951ad627ad1829406c5bf54242',
    //         '1': '0x0d4d41bfc4fbbff0d5757afde70e3bf18c66e85327a8f8ccab3498de92c7b425',
    //             '2': '0x4b2d7e0fc2e13b532250b9e78e5e4868e014a3f5e00f08aa8815aa20834df001',
    //                 '3': '0x99160fb87708463c53d1361a81bf05223927f562378503e1f5b95c5b44f92b43',
    //                     '4': '0x52c40484eedaa583157748f80c54ed13dfa2384d64ec186af2fa8276cc4b1941'
    // }
}

getBlockSimpleInfo(3428552).catch(console.error).finally(() => process.exit());
