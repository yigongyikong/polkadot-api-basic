import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

const onlineSignClaim = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    const testAcnt = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';

    await api.isReady;

    console.log('===== STEP1-RawTx-Start =====');
    // const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
    const trsfRawTx = api.tx.dappsStaking.claimStaker({
        Evm: '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712',
    });
    console.log(trsfRawTx);
    console.log('===== ===== =====');
    console.log(`${trsfRawTx}`);
    console.log('===== STEP1-RawTx-End =====');

    console.log('===== STEP2-SignRawTx-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcntMnemonic = 'target loan chronic gaze paper figure cotton kitten beauty coconut field damage';
    const testAcntKey = keyring.addFromUri(testAcntMnemonic);
    console.log(`testAcnt2Key : ${testAcntKey.address}`);
    console.log('===== ===== =====');
    const signedTx = await trsfRawTx.signAsync(testAcntKey);
    console.log(signedTx);
    console.log('===== ===== =====');
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

onlineSignClaim().catch(console.error).finally(() => process.exit());