import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';

const getExtrinsicStatus = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const txhash = '0x03314bbe62cd9c00a970f7bc4f45e3957700b593dbc74271d';
    // const txhash = '0x03314bbe62cd9c00a970f7bc4f45e3957700b593dbc74271d1686122c6776e8e';
    // const txhash = '0x26cbcee8f35fca5d5eecde40dde9732830ed879bd8429bcc0a00539570ba9202';
    // const txhash = '0x2eb62ee8f3af00718c3e39e9916e57ebe7378b1ac4fc7988bbca348873a3c800';
    // const txhash = '0xaead0a60270049b58d73be74434a4ba12a1c6c5b101de183656b0ec56cda5d76';
    // const txhash = '0xaead0a60270049b58d73be74434a4ba12a1c6c5b101de183656b0ec';
    // 0x26cbcee8f35fca5d5eecde40dde9732830ed879bd8429bcc0a00539570ba9202
    // 0x2eb62ee8f3af00718c3e39e9916e57ebe7378b1ac4fc7988bbca348873a3c800 
    // 0x03314bbe62cd9c00a970f7bc4f45e3957700b593dbc74271d1686122c6776e8e 
    // 0xaead0a60270049b58d73be74434a4ba12a1c6c5b101de183656b0ec56cda5d76

    const blockHash = await api.rpc.chain.getBlockHash(3434107);
    // console.log(`blockHash:${blockHash}`);

    // no blockHash is specified, so we retrieve the latest
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    // console.log(`signedBlock:${signedBlock}`);

    // get the api and events at a specific block
    const apiAt = await api.at(signedBlock.block.header.hash);
    const allRecords = await apiAt.query.system.events();

    // map between the extrinsics and events
    signedBlock.block.extrinsics.forEach((item, index) => {
        console.log('TP0', index);

        if (txhash === u8aToHex(item.hash)) {
            console.log('TP1', index);

            allRecords.filter(({ phase }) =>
                phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
            ).forEach(({ event }) => {
                console.log('TP2', index);
                if (api.events.system.ExtrinsicSuccess.is(event)) {
                    // console.log('ExtrinsicSuccess')
                    console.log('TP3', index);
                    // return 'ExtrinsicSuccess';
                    console.log('ExtrinsicSuccess')
                } else if (api.events.system.ExtrinsicFailed.is(event)) {
                    const [dispatchError, dispatchInfo] = event.data;
                    let errorInfo;
                    console.log('TP4', index);
                    // decode the error
                    if (dispatchError.isModule) {
                        console.log('TP5', index);
                        // for module errors, we have the section indexed, lookup
                        // (For specific known errors, we can also do a check against the
                        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                        const decoded = api.registry.findMetaError(dispatchError.asModule);

                        errorInfo = `${decoded.section}.${decoded.name}`;
                    } else {
                        console.log('TP5', index);
                        // Other, CannotLookup, BadOrigin, no extra info
                        errorInfo = dispatchError.toString();
                    }
                    console.log('TP7', index);
                    console.log(`ExtrinsicFailed, ${errorInfo}`);
                }
            })
        }
        // return 'ExtrinsicFailed';
        console.log(`ExtrinsicFailed`);
    });
}

getExtrinsicStatus().catch(console.error).finally(() => process.exit());
// TP0 0
// ExtrinsicFailed
// TP0 1
// ExtrinsicFailed
// TP0 2
// ExtrinsicFailed
// TP0 3
// ExtrinsicFailed