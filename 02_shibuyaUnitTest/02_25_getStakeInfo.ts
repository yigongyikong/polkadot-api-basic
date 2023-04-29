import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise, Keyring } from '@polkadot/api';
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';

const getStakeInfo = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    const dappAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

    // const info = await api.query.dappsStaking;
    // console.log(info);
    /*{
        palletVersion: [Getter],
            palletDisabled: [Getter],
                ledger: [Getter],
                    currentEra: [Getter],
                        blockRewardAccumulator: [Getter],
                            forceEra: [Getter],
                                nextEraStartingBlock: [Getter],
                                    registeredDevelopers: [Getter],
                                        registeredDapps: [Getter],
                                            generalEraInfo: [Getter],
                                                contractEraStake: [Getter],
                                                    generalStakerInfo: [Getter],
                                                        storageVersion: [Getter]
    }*/
    const rlt_palletVersion = await api.query.dappsStaking.palletVersion();
    console.log(rlt_palletVersion.toHuman()); // 0
    console.log('===== ===== =====');
    const rlt_palletDisabled = await api.query.dappsStaking.palletDisabled();
    console.log(rlt_palletDisabled.toHuman()); // false
    console.log('===== ===== =====');
    // const rlt_ledger = await api.query.dappsStaking.ledger();
    // console.log(rlt_ledger.toHuman()); // Error: dappsStaking.ledger(AccountId32) is a map, requiring 1 arguments, 0 found
    // console.log('===== ===== =====');
    const rlt_currentEra = await api.query.dappsStaking.currentEra();
    console.log(rlt_currentEra.toHuman()); // 2,801
    console.log(rlt_currentEra); // <BN: af1>
    console.log('===== ===== =====');
    const rlt_blockRewardAccumulator = await api.query.dappsStaking.blockRewardAccumulator();
    console.log(rlt_blockRewardAccumulator.toHuman());
    /*{
        stakers: '32,630,656,341,345,515,552',
            dapps: '21,971,052,514,400,000,000'
    }*/
    console.log('===== ===== =====');
    const rlt_forceEra = await api.query.dappsStaking.forceEra();
    console.log(rlt_forceEra.toHuman()); // NotForcing
    console.log('===== ===== =====');
    const rlt_nextEraStartingBlock = await api.query.dappsStaking.nextEraStartingBlock();
    console.log(rlt_nextEraStartingBlock.toHuman()); // 3,539,139
    console.log('===== ===== =====');
    // const rlt_registeredDevelopers = await api.query.dappsStaking.registeredDevelopers();
    // console.log(rlt_registeredDevelopers.toHuman()); // Error: dappsStaking.registeredDevelopers(AccountId32) is a map, requiring 1 arguments, 0 found
    // console.log('===== ===== =====');
    // const rlt_registeredDapps = await api.query.dappsStaking.registeredDapps();
    // console.log(rlt_registeredDapps.toHuman()); // Error: dappsStaking.registeredDapps({"_enum":{"Evm":"H160","Wasm":"AccountId32"}}) is a map, requiring 1 arguments, 0 found
    // console.log('===== ===== =====');
    const rlt_generalEraInfo = await api.query.dappsStaking.generalEraInfo(rlt_currentEra);
    console.log(rlt_generalEraInfo.toHuman());
    /*{
        rewards: { stakers: '0', dapps: '0' },
        staked: '2,751,699,042,648,826,442,136,571',
            locked: '2,761,754,768,872,378,624,184,206'
    }*/
    console.log('===== ===== =====');
    // const rlt_contractEraStake = await api.query.dappsStaking.contractEraStake();
    // console.log(rlt_contractEraStake.toHuman()); // Error: dappsStaking.contractEraStake({"_enum":{"Evm":"H160","Wasm":"AccountId32"}}, u32) is a map, requiring 2 arguments, 0 found
    // console.log('===== ===== =====');
    // const rlt_generalStakerInfo = await api.query.dappsStaking.generalStakerInfo(testAcnt2, getDappAddressEnum(dappAddress));
    const khlee = 'XPgfwAdkRiWMXxyXu7nwX3xPTcKavMfQPzXN87pzRh4jhKt';
    const evmAdd1 = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';
    const evmAdd2 = '0xde0f34d2845511c20bab0d7ce02b03c8065ff0c5';
    const rlt_generalStakerInfo1 = await api.query.dappsStaking.generalStakerInfo(khlee, getDappAddressEnum(evmAdd1));
    
    console.log(rlt_generalStakerInfo1.toHuman());
    /*{
        stakes: [
            { staked: '6,000,000,000,000,000,000', era: '2,795' },
            { staked: '0', era: '2,800' }
        ]
    }*/
    console.log('=====');
    const rlt_generalStakerInfo2 = await api.query.dappsStaking.generalStakerInfo(khlee, getDappAddressEnum(evmAdd2));
    console.log(rlt_generalStakerInfo2.toHuman());
    console.log('===== ===== =====');
    const rlt_storageVersion = await api.query.dappsStaking.storageVersion();
    console.log(rlt_storageVersion.toHuman()); // V4_0_0

}

getStakeInfo().catch(console.error).finally(() => process.exit());