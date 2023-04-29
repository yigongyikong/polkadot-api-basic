import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';
import { Extrinsic } from '@polkadot/types/interfaces';

const onlineSignMultiClaim = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    const testAcnt5 = 'WcuUpmspMcykJdngmUW9nC4YssuoqvRKnMh69gkmBvFFM95';
    const dAppCa = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

    await api.isReady;

    const curEra = await api.query.dappsStaking.currentEra();
    console.log(`curEra : ${curEra}`);

    const generalStakerInfo = await api.query.dappsStaking.generalStakerInfo(testAcnt5, getDappAddressEnum(dAppCa));
    // console.log(`generalStakerInfo : ${generalStakerInfo.toHuman()}`);
    console.log(generalStakerInfo.toHuman());
    console.log(generalStakerInfo['stakes'].toHuman());
    console.log(generalStakerInfo['stakes'][0].toHuman());
    console.log(generalStakerInfo['stakes'][0]['era'].toHuman());
    console.log(generalStakerInfo['stakes'][0]['era'].toHex());
    console.log(Number(generalStakerInfo['stakes'][0]['era'].toHex()));

    console.log(`Available to claim_1 : ${Number(curEra) - Number(generalStakerInfo['stakes'][0]['era'].toHex())}`);
    const availEra = Number(curEra) - Number(generalStakerInfo['stakes'][0]['era'].toHex());
    console.log(`Available to claim_2 : ${availEra}`);

    const txs: Extrinsic[] = [];
    for( let i = 0; i < availEra; i++ ) {
        txs.push( api.tx.dappsStaking.claimStaker(getDappAddressEnum(dAppCa)) );
    } 

    // api.tx.utility.batch(txs);

    console.log('===== STEP1-RawTx-Start =====');
    // const trsfRawTx = api.tx.dappsStaking.claimStaker({
    //     Evm: '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712',
    // });
    const trsfRawTx = api.tx.utility.batch(txs);
        
    // console.log(trsfRawTx);
    // console.log('===== ===== =====');
    console.log(`${trsfRawTx}`);
    console.log('===== STEP1-RawTx-End =====');

    console.log('===== STEP2-SignRawTx-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcntMnemonic = 'another foil high excuse video pull connect elite resist entry stuff appear';
    const testAcntKey = keyring.addFromUri(testAcntMnemonic);
    console.log(`testAcnt2Key : ${testAcntKey.address}`);
    console.log('===== ===== =====');
    const signedTx = await trsfRawTx.signAsync(testAcntKey);
    // console.log(signedTx);
    // console.log('===== ===== =====');
    console.log(`${signedTx}`);
    console.log('===== ===== =====');
    console.log(signedTx.toHex());
    console.log('===== ===== =====');
    console.log(`${signedTx.method}`);
    console.log('===== ===== =====');
    console.log(`${signedTx.method.toHex()}`);
    console.log('===== STEP2-SignRawTx-End =====');

    console.log('===== STEP3-SendSignedTx-Start =====');
    const txhash = await signedTx.send();
    console.log(txhash);
    console.log('===== ===== =====');
    console.log(`txhash : ${txhash}`);
    // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
    console.log('===== STEP3-SendSignedTx-End =====');
}

onlineSignMultiClaim().catch(console.error).finally(() => process.exit());