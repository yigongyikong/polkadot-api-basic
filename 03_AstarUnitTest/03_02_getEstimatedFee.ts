import { getDappAddressEnum } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";


const getEstimatedFee = async () => {

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;
    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
    const dAppCa = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';
    const amount = 2000000000000000000;

    enum RewardDestination {
        FreeBalance = 'FreeBalance',
        StakeBalance = 'StakeBalance',
    }

    const trsfRawTx = await api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000)).paymentInfo(testAcnt2);
    // class=Normal,
    // weight={"refTime":173811000,"proofSize":0},
    // partialFee=1.5900 mSBY
    // https://shibuya.subscan.io/extrinsic/0xb98f893904481011697ad6ccd3f6725e0f5c71e0f8fad41e5473de2a3e85cb14
    // Used Fee : 0.001590060992308652SBY

    // const trsfRawTx = await api.tx.dappsStaking.bondAndStake(getDappAddressEnum(dAppCa), BigInt(amount)).paymentInfo(testAcnt2);
    // class=Normal,
    // weight={"refTime":790275000,"proofSize":0},
    // partialFee=1.4702 mSBY
    // https://shibuya.subscan.io/extrinsic/0xccd1488839de4f2578be47a84a2f9d0362fed6162006567d4f5d5c4e332c210f
    // Used Fee : 0.001480270652430175SBY

    // const trsfRawTx = await api.tx.dappsStaking.unbondAndUnstake(getDappAddressEnum(dAppCa), BigInt(amount)).paymentInfo(testAcnt2);
    // class=Normal,
    // weight={"refTime":791641000,"proofSize":0},
    // partialFee=1.4702 mSBY
    // https://shibuya.subscan.io/extrinsic/0xe1b3b1963541345dbcab06b7a35a1fedc2a08259c6bf655441165a37e43ae80d
    // Used Fee : 0.001470274374340759SBY

    // const trsfRawTx = await api.tx.dappsStaking.withdrawUnbonded().paymentInfo(testAcnt2);
    // class=Normal,
    // weight={"refTime":491564000,"proofSize":0},
    // partialFee=1.1701 mSBY
    // https://shibuya.subscan.io/extrinsic/0x2d0160254b820b178c6a96031125119e1cc058946176239af9dd08b2e8b0a904
    // Used Fee : 0.001170169934761305SBY

    // const trsfRawTx = await api.tx.dappsStaking.setRewardDestination(RewardDestination.FreeBalance).paymentInfo(testAcnt2);
    // class=Normal,
    // weight={"refTime":148412000,"proofSize":0},
    // partialFee=1.1800 mSBY
    // https://shibuya.subscan.io/extrinsic/0xef94e507a1c3c5e613dad203cc127ff62c94310095afe5d3ff7199998b0ef768
    // Used Fee : 0.001180051002334731SBY


    // const trsfRawTx = await api.tx.dappsStaking.nominationTransfer(getDappAddressEnum(dAppCa), BigInt(amount), getDappAddressEnum(dAppCa)).paymentInfo(testAcnt2);
    // const trsfRawTx = await api.tx.dappsStaking.nominationTransfer().paymentInfo(testAcnt2);
    // class=Normal,
    // weight={"refTime":593519000,"proofSize":0},
    // partialFee=1.6802 mSBY
    // https://shibuya.subscan.io/extrinsic/0xc42e846e0726a7687a8d7a2e4b013559e8d944854124449b66c413ef575ed163
    // Used Fee : 0.001680206030137168SBY

    // client.tx.dappsStaking.nominationTransfer(getDappAddressEnum(fromdAppCa), BigInt(amount), getDappAddressEnum(todAppCa)).method.toHex(),
    // .tx.dappsStaking.withdrawUnbonded().method.toHex(),
    // client.tx.utility.batch(txsToExecute);
    // client.tx.dappsStaking.setRewardDestination(dest).method.toHex(),

    // log relevant info, partialFee is Balance, estimated for current
    console.log(`
        class=${trsfRawTx.class.toString()},
        weight=${trsfRawTx.weight.toString()},
        partialFee=${trsfRawTx.partialFee.toHuman()}
        `);
}

getEstimatedFee().catch(console.error).finally(() => process.exit());