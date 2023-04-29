import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const getMapExtrinsicsEvent = async (blockNumber) => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    // returns SignedBlock
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    // no blockHash is specified, so we retrieve the latest

    const apiAt = await api.at(signedBlock.block.header.hash);
    const allRecords = await apiAt.query.system.events();

    // map between the extrinsics and events
    // map between the extrinsics and events
    signedBlock.block.extrinsics.forEach(({ method: { method, section } }, index) => {
        allRecords
            // filter the specific events based on the phase and then the
            // index of our extrinsic in the block
            .filter(({ phase }) =>
                phase.isApplyExtrinsic &&
                phase.asApplyExtrinsic.eq(index)
            )
            // test the events against the specific types we are looking for
            .forEach(({ event }) => {
                if (api.events.system.ExtrinsicSuccess.is(event)) {
                    // extract the data for this event
                    // (In TS, because of the guard above, these will be typed)
                    const [dispatchInfo] = event.data;

                    console.log(`${section}.${method}:: ExtrinsicSuccess:: ${JSON.stringify(dispatchInfo.toHuman())}`);
                } else if (api.events.system.ExtrinsicFailed.is(event)) {
                    // extract the data for this event
                    const [dispatchError, dispatchInfo] = event.data;
                    let errorInfo;

                    // decode the error
                    if (dispatchError.isModule) {
                        // for module errors, we have the section indexed, lookup
                        // (For specific known errors, we can also do a check against the
                        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                        const decoded = api.registry.findMetaError(dispatchError.asModule);

                        errorInfo = `${decoded.section}.${decoded.name}`;
                    } else {
                        // Other, CannotLookup, BadOrigin, no extra info
                        errorInfo = dispatchError.toString();
                    }

                    console.log(`${section}.${method}:: ExtrinsicFailed:: ${errorInfo}`);
                    // timestamp.set:: ExtrinsicSuccess:: { "weight": { "refTime": "260,558,000", "proofSize": "0" }, "class": "Mandatory", "paysFee": "Yes" }
                    // parachainSystem.setValidationData:: ExtrinsicSuccess:: { "weight": { "refTime": "98,974,000", "proofSize": "0" }, "class": "Mandatory", "paysFee": "No" }
                    // utility.batch:: ExtrinsicSuccess:: { "weight": { "refTime": "13,631,575,671", "proofSize": "0" }, "class": "Normal", "paysFee": "Yes" }
                    // contracts.call:: ExtrinsicSuccess:: { "weight": { "refTime": "2,134,453,909", "proofSize": "127,165" }, "class": "Normal", "paysFee": "Yes" }
                    // contracts.call:: ExtrinsicSuccess:: { "weight": { "refTime": "2,299,535,861", "proofSize": "189,287" }, "class": "Normal", "paysFee": "Yes" }
                }
            });
    });
}

getMapExtrinsicsEvent(3428552).catch(console.error).finally(() => process.exit());
