import { ApiTypes, SubmittableExtrinsic } from "@polkadot/api/types";
import { createPair } from "@polkadot/keyring";
import { ISubmittableResult } from "@polkadot/types/types";
import { createClass } from "@polkadot/api/submittable/createClass";

const { Keyring } = require('@polkadot/keyring');
const {
    mnemonicGenerate,
    mnemonicToEntropy,
    mnemonicToLegacySeed,
    mnemonicToMiniSecret,
    mnemonicValidate,
    cryptoWaitReady
} = require('@polkadot/util-crypto');
const { stringToU8a, u8aToHex } = require('@polkadot/util');
const keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });

const { ApiPromise, GenericExtrinsicPayload } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } = require('@astar-network/astar-api');

const { createType } = require('@polkadot/types');

// Create a new instance of the api
const provider = new WsProvider('wss://rpc.shibuya.astar.network');
// const provider = new WsProvider('wss://rpc.polkadot.io');
// const api = new ApiPromise(options({ provider }));
const api = new ApiPromise({ provider });


const createWallet = async () => {
    const testMnemonic = mnemonicGenerate(); // Creates a valid mnemonic string using using [BIP39]
    console.log(`testMnemonic : ${testMnemonic}`);
    // testMnemonic : slice bronze until cabin gold cradle foil carbon measure owner topple dignity
    console.log(`validate-testMnemonic : ${mnemonicValidate(testMnemonic)}`);
    // validate-testMnemonic : true

    const testEntropy = mnemonicToEntropy(testMnemonic);
    console.log(`testEntropy : ${testEntropy}`);
    // testEntropy : 203,99,151,184,143,230,68,99,214,153,19,137,243,199,148,159
    console.log(`testEntropy=>u8aToHex : ${u8aToHex(testEntropy)}`);
    // testEntropy=>u8aToHex : 0xcb6397b88fe64463d6991389f3c7949f
    console.log(`validate-testEntropy : ${mnemonicValidate(testEntropy)}`);
    // validate-testEntropy : false

    const testLegacySeed = mnemonicToLegacySeed(testMnemonic);
    console.log(`testLegacySeed : ${testLegacySeed}`); // Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
    // testLegacySeed : 235,136,113,199,250,101,12,154,49,52,113,116,123,82,64,30,61,39,231,96,118,139,9,91,37,138,15,225,237,106,92,71
    console.log(`testLegacySeed=>u8aToHex : ${u8aToHex(testLegacySeed)}`);
    // testLegacySeed=>u8aToHex : 0xeb8871c7fa650c9a313471747b52401e3d27e760768b095b258a0fe1ed6a5c47
    console.log(`validate-testLegacySeed : ${mnemonicValidate(testLegacySeed)}`);
    // validate-testLegacySeed : false

    const testMiniSecret = mnemonicToMiniSecret(testMnemonic);
    console.log(`testMiniSecret : ${testMiniSecret}`);
    // testMiniSecret : 161,150,136,140,250,213,82,91,110,18,22,121,168,67,192,64,210,205,231,217,173,66,121,187,111,102,154,221,225,128,38,65
    console.log(`testMiniSecret=>u8aToHex : ${u8aToHex(testMiniSecret)}`);
    // testMiniSecret=>u8aToHex : 0xa196888cfad5525b6e121679a843c040d2cde7d9ad4279bb6f669adde1802641
    console.log(`validate-testMiniSecret : ${mnemonicValidate(testMiniSecret)}`);
    // validate-testMiniSecret : false
}

const revisitCrypto = async () => {
    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';

    // ed25519', Not need to cryptoWaitReady();
    const testAddFromMnemonic_ed = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ed25519');
    console.log(`testAddFromMnemonic_ed-address : ${testAddFromMnemonic_ed.address}`); // XkpVKDM2UmEjgmQZPCRNYB2UKpFQRWALQGeMwr9XEzfqbcN
    console.log(`testAddFromMnemonic_ed-addressRaw : ${u8aToHex(testAddFromMnemonic_ed.addressRaw)}`); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5
    console.log(`testAddFromMnemonic_ed-meta : ${testAddFromMnemonic_ed.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_ed-publicKey : ${u8aToHex(testAddFromMnemonic_ed.publicKey)}`); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5
    console.log(`testAddFromMnemonic_ed-KeypairType : ${testAddFromMnemonic_ed.KeypairType}`); // undefined

    await cryptoWaitReady();
    // 'sr25519'
    const testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
    console.log(`testAddFromMnemonic_sr-address : ${testAddFromMnemonic_sr.address}`); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya
    console.log(`testAddFromMnemonic_sr-addressRaw : ${u8aToHex(testAddFromMnemonic_sr.addressRaw)}`); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e
    console.log(`testAddFromMnemonic_sr-meta : ${testAddFromMnemonic_sr.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_sr-publicKey : ${u8aToHex(testAddFromMnemonic_sr.publicKey)}`); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e
    console.log(`testAddFromMnemonic_sr-KeypairType : ${testAddFromMnemonic_sr.KeypairType}`); // undefined

    // 'ecdsa', Not need to cryptoWaitReady();
    const testAddFromMnemonic_ec = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ecdsa');
    console.log(`testAddFromMnemonic_ec-address : ${testAddFromMnemonic_ec.address}`); // XCWdpqNyJTQuF2vygFK1dLjxfd9M3nLSNbpWSjhffoZH5dV
    console.log(`testAddFromMnemonic_ec-addressRaw : ${u8aToHex(testAddFromMnemonic_ec.addressRaw)}`); // 0x37d676896572575d8eeb574ce557a487872fda7de5899f52201c051bbc1b2e11
    console.log(`testAddFromMnemonic_ec-meta : ${testAddFromMnemonic_ec.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_ec-publicKey : ${u8aToHex(testAddFromMnemonic_ec.publicKey)}`); // 0x028cf142e9c7235598935dca16da534488eb247ae7613ff756d51e1cc03520dce1
    console.log(`testAddFromMnemonic_ec-KeypairType : ${testAddFromMnemonic_ec.KeypairType}`); // undefined

    // 'ethereum', Not need to cryptoWaitReady();
    const testAddFromMnemonic_eth = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ethereum');
    console.log(`testAddFromMnemonic_eth-address : ${testAddFromMnemonic_eth.address}`); // 0x887d2B6CC74053CD0A115243d399b27c8afBcA2C
    console.log(`testAddFromMnemonic_eth-addressRaw : ${u8aToHex(testAddFromMnemonic_eth.addressRaw)}`); // 0x887d2b6cc74053cd0a115243d399b27c8afbca2c
    console.log(`testAddFromMnemonic_eth-meta : ${testAddFromMnemonic_eth.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_eth-publicKey : ${u8aToHex(testAddFromMnemonic_eth.publicKey)}`); // 0x0201d40658b1fc247706d65b6e2556bb7072c28e6c7919ce6f030dcdd9114a3307
    console.log(`testAddFromMnemonic_eth-KeypairType : ${testAddFromMnemonic_eth.KeypairType}`); // undefined
}

const makeRawTxAndSign = async () => {

    const jisb = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';

    const cryptoTest = 'X84AAbrZH1MqwHzTkd1JoJJKFDX7ZGbkkmrztabCjkiMNXn';

    await api.isReady;

    // const trsfRawTx = api.tx.balances.transfer(jisb, BigInt(200000000000000000));
    const trsfRawTx = api.tx.balances.transfer(cryptoTest, BigInt(2000000000000000000));
    console.log(`trsfRawTx : ${trsfRawTx}`);
    /*"signature":{
        "signer":{
            "id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"
        },
        "signature":{
            "ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        },
        "era":{
            "immortalEra":"0x00"
        },
        "nonce":0,
        "tip":0
    },
    "method":{
        "callIndex":"0x1f00",
        "args":{
            "dest":{
                "id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"
            },
            "value":"0x000000000000000002c68af0bb140000"
        }
    }*/
    // Object.getOwnPropertyDescriptor(trsfRawTx);
    // console.log(Object.getOwnPropertyDescriptors(api.tx.balances.transfer));
    console.log(typeof api.tx.balances.transfer); // function
    console.log(typeof trsfRawTx); // object
    console.log('toString', trsfRawTx.toString());
    console.log(u8aToHex(trsfRawTx));

    const keyring = new Keyring({ type: 'sr25519' });

    // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    // const testKey = keyring.addFromUri(testMnemonic, 'sr25519');
    const testKey = keyring.addFromUri(testMnemonic);
    // console.log(`testKey : ${testKey}`); // testKey : [object Object]
    // console.log(`testKey : ${testKey.address}`); // testKey : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    // console.log(typeof testKey); // testKey : [object Object]

    const signedTx = await trsfRawTx.signAsync(testKey);
    console.log(`signedTx : ${signedTx}`);
    /*signedTx: {
        "signature": {
            "signer": {
                "id": "b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"
            },
            "signature": {
                "sr25519": "0x5a0c7d5ffe9fe993a7456c598e9917126697bc90bb0a4aeddda74af78701ad2c59a9e287f9f35c2468495b55b8d2dffecaa066d414efb5780889027e53e48d82"
            },
            "era": {
                "mortalEra": "0x3401"
            },
            "nonce": 0, "tip": 0
        },
        "method": {
            "callIndex": "0x1f00",
                "args": {
                "dest": {
                    "id": "VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"
                },
                "value": 200000000
            }
        }
    }*/

    /*signedTx: {
        "signature": {
            "signer": {
                "id": "b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"
            },
            "signature": {
                "sr25519": "0xe838c8ffe0355a5daa6a8a2b264d099518d254b09de96a4dba088f89349d30179ad33f91464359a8db2fe1bfb38b2cc07f4017f049eee9a458b616586162be84"
            },
            "era": {
                "mortalEra": "0x0400"
            },
            "nonce": 0, "tip": 0
        },
        "method": {
            "callIndex": "0x1f00",
                "args": {
                "dest": {
                    "id": "VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"
                },
                "value": 200000000
            }
        }
    }*/
    const txhash = await signedTx.send();
    console.log(`txhash : ${txhash}`);
    // return txhash;

    // const rlt = trsfRawTx.sign(testKey);
    // console.log(`rlt : ${rlt}`);
}

const getLastestBlock = async () => {
    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();

    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
}

const subscribeNewHeader = async () => {
    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // Subscribe to the new headers
    await api.rpc.chain.subscribeNewHeads((lastHeader) => {
        console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
        // Shibuya Testnet: last block #3434662 has hash 0x2dc566e25c9b40b774a8e7eea1b2ce9c73be4198efff66c229baa30f701209f0
    });
}

const getBlockSimpleInfo = async (blockNumber) => {
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
    console.log(signedBlock.block.header.hash.toHex());

    // the hash for each extrinsic in the block
    signedBlock.block.extrinsics.forEach((ex, index) => {
        console.log(index, ex.hash.toHex());
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
}

const getBlockInfo = async (blockNumber) => {
    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    // returns SignedBlock
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    // the hash for the block, always via header (Hash -> toHex()) - will be
    // the same as blockHash above (also available on any header retrieved,
    // subscription or once-off)
    console.log(signedBlock.block.header.hash.toHex());

    // the hash for each extrinsic in the block
    signedBlock.block.extrinsics.forEach((ex, index) => {
        // console.log(index, ex.hash.toHex());
        console.log(index, ex.toHuman());
        // console.log(index, ex.toHuman()?.method?.method);
        /*if (ex.toHuman()?.method?.method === 'transfer') {
            console.log(index, ex.toHuman()?.method?.args?.value);
            console.log(index, ex.toHuman()?.method?.args?.dest?.Id);
        }*/
        // console.log(index, ex.toHuman()?.method?.args?.dest); // for transfer
        // console.log(index, ex.toHuman()?.method?.args?.contract_id); // for stake

        // console.log(index, ex.toHuman()?.method?.args?.calls); // for Re-Stake Turn on 상태 Claim
        // console.log(ex.toHuman()?.method?.args?.calls); // for Re-Stake Turn on 상태 Claim
        // console.log(typeof ex.toHuman()?.method?.args?.calls); // for Re-Stake Turn on 상태 Claim : object
        /*console.log(ex.toHuman()?.method?.args?.calls?.length); // for Re-Stake Turn on 상태 Claim
        for (let i = 0; i < ex.toHuman()?.method?.args?.calls?.length; i++) {
            console.log(i, ex.toHuman()?.method?.args?.calls[i]?.args?.contract_id);
        }*/


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
}

const getBlockAndExtrinsicsListInfo = async (blockNumber) => {
    await api.isReady;

    const blockDetailtmpRlt = {};

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
    console.log(blockDetailArrRlt);
    // console.log('==========');
    // console.log(blockDetailArrRlt[0]);
    // console.log('==========');
    // console.log(blockDetailArrRlt[1]);
    // console.log('==========');
    // console.log(blockDetailArrRlt[2]);
    // const blockDetailArrRlt = Object.keys(blockDetailtmpRlt).map(item => blockDetailtmpRlt[item]);
    // console.log(blockDetailArrRlt);
}

const getMapExtrinsicsEvent = async (blockNumber) => {
    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    // returns SignedBlock
    const signedBlock = await api.rpc.chain.getBlock(blockHash);


    // no blockHash is specified, so we retrieve the latest

    const apiAt = await api.at(signedBlock.block.header.hash);
    const allRecords = await apiAt.query.system.events();

    // map between the extrinsics and events
    signedBlock.block.extrinsics.forEach(({ method: { method, section } }, index) => {
        // filter the specific events based on the phase and then the
        // index of our extrinsic in the block
        const events = allRecords
            .filter(({ phase }) =>
                phase.isApplyExtrinsic &&
                phase.asApplyExtrinsic.eq(index)
            )
            .map(({ event }) => `${event.section}.${event.method}`);

        console.log(`${section}.${method}:: ${events.join(', ') || 'no events'}`);
    });
    /* console.log - result
    timestamp.set:: balances.Deposit, balances.Deposit, balances.Deposit, system.ExtrinsicSuccess
    parachainSystem.setValidationData:: system.ExtrinsicSuccess
    balances.transfer:: balances.Withdraw, balances.Transfer, balances.Deposit, transactionPayment.TransactionFeePaid, system.ExtrinsicSuccess
    contracts.call:: balances.Withdraw, contracts.Called, balances.Transfer, balances.Reserved, balances.Deposit, balances.Deposit, transactionPayment.TransactionFeePaid, system.ExtrinsicSuccess*/
}

const test = async (blockNumber) => {
    await api.isReady;

    // returns Hash
    // const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    // returns SignedBlock
    // const signedBlock = await api.rpc.chain.getBlock(blockHash);

    // no blockHash is specified, so we retrieve the latest
    const signedBlock = await api.rpc.chain.getBlock();

    // get the api and events at a specific block
    const apiAt = await api.at(signedBlock.block.header.hash);
    const allRecords = await apiAt.query.system.events();

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
                }
            });
    });
}

const makeRawTx = async () => {

    const jisb = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';

    await api.isReady;

    const trsfRawTx = api.tx.balances.transfer(jisb, BigInt(200000000000000000));
    console.log(`trsfRawTx : ${trsfRawTx}`);
    // console.log(`trsfRawTx-toString : ${trsfRawTx.toString()}`);

}

const getBalance = async () => {
    await api.isReady;

    const bal = await api.derive.balances.account('VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U');

    // console.log(bal);
    // console.log(u8aToHex(bal.accountId)); // 0x00c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f65
    console.log(bal.accountId.toString()); // VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U
    // console.log(bal.accountNonce); // <BN: 2>
    // console.log(u8aToHex(bal.accountNonce)); // 0x00
    console.log(bal.accountNonce.toString()); // 2
    // console.log(bal.freeBalance);
    console.log(bal.freeBalance.toString()); // 15396819873881302999
    // console.log(bal.frozenFee);
    console.log(bal.frozenFee.toString()); // 0
    // console.log(bal.frozenMisc);
    console.log(bal.frozenMisc.toString()); // 0
    // console.log(bal.reservedBalance);
    console.log(bal.reservedBalance.toString()); // 0
    // console.log(bal.votingBalance);
    console.log(bal.votingBalance.toString()); // 15396819873881302999

    // 15 396 81987 38813 02999
}

const getExtrinsicStatus = async (blockNumber) => {
    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);


    // no blockHash is specified, so we retrieve the latest
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    // get the api and events at a specific block
    const apiAt = await api.at(signedBlock.block.header.hash);
    const allRecords = await apiAt.query.system.events();

    // map between the extrinsics and events
    signedBlock.block.extrinsics.forEach(({ method: { method, section } }, index) => {
        console.log(`001 || index:${index} || allRecords:${allRecords}`);
        console.log(`===== ===== =====`);
        allRecords
            // filter the specific events based on the phase and then the
            // index of our extrinsic in the block
            .filter(({ phase }) => {
                phase.isApplyExtrinsic &&
                    phase.asApplyExtrinsic.eq(index)
            })
            // test the events against the specific types we are looking for
            .forEach(({ event }) => {
                console.log(`003 : event:${event}`);
                if (api.events.system.ExtrinsicSuccess.is(event)) {
                    // extract the data for this event
                    // (In TS, because of the guard above, these will be typed)
                    const [dispatchInfo] = event.data;

                    console.log(`004 : ${section}.${method}:: ExtrinsicSuccess:: ${JSON.stringify(dispatchInfo.toHuman())}`);
                    // 004 : timestamp.set:: ExtrinsicSuccess:: { "weight": { "refTime": "260,558,000", "proofSize": "0" }, "class": "Mandatory", "paysFee": "Yes" }
                    // 004 : parachainSystem.setValidationData:: ExtrinsicSuccess:: { "weight": { "refTime": "98,974,000", "proofSize": "0" }, "class": "Mandatory", "paysFee": "No" }
                    // 004 : balances.transfer:: ExtrinsicSuccess:: { "weight": { "refTime": "272,785,000", "proofSize": "0" }, "class": "Normal", "paysFee": "Yes" }
                    // 004 : contracts.call:: ExtrinsicSuccess:: { "weight": { "refTime": "2,134,453,909", "proofSize": "127,165" }, "class": "Normal", "paysFee": "Yes" }
                } else if (api.events.system.ExtrinsicFailed.is(event)) {
                    // extract the data for this event
                    const [dispatchError, dispatchInfo] = event.data;
                    let errorInfo;
                    console.log(`004`);
                    // decode the error
                    if (dispatchError.isModule) {
                        // for module errors, we have the section indexed, lookup
                        // (For specific known errors, we can also do a check against the
                        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                        const decoded = api.registry.findMetaError(dispatchError.asModule);
                        console.log(`005`);
                        errorInfo = `${decoded.section}.${decoded.name}`;
                    } else {
                        console.log(`006`);
                        // Other, CannotLookup, BadOrigin, no extra info
                        errorInfo = dispatchError.toString();
                    }

                    console.log(`007 : ${section}.${method}:: ExtrinsicFailed:: ${errorInfo}`);
                }
            });
    });
}

const getAcnt = async () => {
    await api.isReady;
    // query and display account data
    const data = await api.query.system.account('5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn');
    console.log(data)
    console.log('=======')
    console.log(data.toHuman())
}

const decodeRawTx = async () => {
    await api.isReady;

    const sample = await api.tx("0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602"); // rawTx

    console.log(sample);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('=======')
    console.log(sample.toString());
    // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('=======')
    console.log(sample.toHuman());
    /*{
        isSigned: false,
            method: {
            args: { dest: [Object], value: '200,000,000,000,000,000' },
            method: 'transfer',
                section: 'balances'
        }
    }*/
}

const test_payload = async () => {

    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';

    await cryptoWaitReady();
    // 'sr25519'
    const testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
    console.log(`testAddFromMnemonic_sr-address : ${testAddFromMnemonic_sr.address}`); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya

    const sampleid = 'VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy';

    await api.isReady;

    const transaction = api.tx.balances.transfer(sampleid, BigInt(2000000000000000000));

    // Get nonce
    const { nonce: non } = await api.query.system.account(testAddFromMnemonic_sr.address);
    console.log('Nonce : ' + non);

    // Create a payload
    const payload = createType('ExtrinsicPayload', {
        method: transaction.toHex(),
        nonce: non.toHex(),
        specVersion: api.runtimeVersion.specVersion,
        genesisHash: api.genesisHash,
        blockHash: api.genesisHash
    }, { version: 4 });
    console.log(payload);

    const signature = testAddFromMnemonic_sr.sign(payload.toU8a(true));

    const signHex = u8aToHex(signature);
    console.log(signHex);

    transaction.addSignature(testAddFromMnemonic_sr.address, signHex, payload.toU8a());

    // const hash = await transaction.send();
    // console.log(hash);

}

const getExRlt = async () => {
    await api.isReady;
    // 0x03314bbe62cd9c00a970f7bc4f45e3957700b593dbc74271d1686122c6776e8e

    const blockHash = await api.rpc.chain.getBlockHash(3434107);
    // console.log(`${blockHash}`);
    // 0x966ecd1b21c20c92563bc50600b66d49ea2b34c27c43b946ed0c6af860b7617f

    // no blockHash is specified, so we retrieve the latest
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    // console.log(signedBlock); // 01.json
    // console.log('===== ===== =====');
    // console.log(`signedBlock : ${signedBlock}`); // 02.json
    // console.log('===== ===== =====');

    const apiAt = await api.at(signedBlock.block.header.hash);
    // console.log(apiAt); // 03_query.json

    const allRecords = await apiAt.query.system.events();
    // console.log(allRecords); // 04.json
    // console.log('===== ===== =====');
    // console.log(`allRecords : ${allRecords}`); // 05.json
    // console.log('===== ===== =====');

    // const test = signedBlock.block.extrinsics;
    // console.log(`${test}`); // 06.json
    // const test1 = signedBlock.block.extrinsics[0].hash;
    // console.log(`${test1}`); // 0x26cbcee8f35fca5d5eecde40dde9732830ed879bd8429bcc0a00539570ba9202
    // const test2 = signedBlock.block.extrinsics[1].hash;
    // console.log(`${test2}`); // 0x2eb62ee8f3af00718c3e39e9916e57ebe7378b1ac4fc7988bbca348873a3c800
    const test3 = signedBlock.block.extrinsics[2].hash;
    // console.log(`${test3}`); // 0x03314bbe62cd9c00a970f7bc4f45e3957700b593dbc74271d1686122c6776e8e
    // const test4 = signedBlock.block.extrinsics[3].hash;
    // console.log(`${test4}`); // 0xaead0a60270049b58d73be74434a4ba12a1c6c5b101de183656b0ec56cda5d76

    // console.log('===== ===== =====');
    const test5 = await api.events.system.ExtrinsicSuccess.is(test3);
    console.log(`${test5}`);
    // console.log('===== ===== =====');
    // const test6 = await api.events.system.ExtrinsicFailed.is(test3);
    // console.log(`${test6}`);

    const test7 = await api.query.system.extrinsicData(test3)
    // console.log(`${test7}`);
    console.log(test7);

    // const test8 = await api.query.preimage.statusFor(test3);
    // // console.log(`${test7}`);
    // console.log(test8);


    // const test5 = signedBlock.block.extrinsics.hash;
    // console.log(`${test5}`); // 07.json

    // console.log('===== ===== =====');
    // console.log(`allRecords : ${allRecords}`); // 04.json
    // console.log('===== ===== =====');
}

const getExRltFinal = async () => {
    await api.isReady;
    // 0x03314bbe62cd9c00a970f7bc4f45e3957700b593dbc74271d1686122c6776e8e

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
        // console.log(`index : ${index}`);
        // console.log(item);
        // console.log('=====');
        // console.log(`${item.hash}`);
        // console.log('===== ===== =====');
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

// getExRltFinal().catch(console.error).finally(() => process.exit());

// getExRlt().catch(console.error).finally(() => process.exit());

// test_payload().catch(console.error).finally(() => process.exit());

// decodeRawTx().catch(console.error).finally(() => process.exit());

// getAcnt().catch(console.error).finally(() => process.exit());

// getExtrinsicStatus(3434107).catch(console.error).finally(() => process.exit());

// getBalance().catch(console.error).finally(() => process.exit());

// makeRawTx().catch(console.error).finally(() => process.exit());

// createWallet();

// revisitCrypto();

// makeRawTxAndSign().catch(console.error).finally(() => process.exit());

// getLastestBlock().catch(console.error).finally(() => process.exit());

// subscribeNewHeader();

// getMapExtrinsicsEvent(BigInt(3435305)).catch(console.error).finally(() => process.exit());

// getBlockInfo(BigInt(3435305)).catch(console.error).finally(() => process.exit());
// getBlockInfo(BigInt(3434107)).catch(console.error).finally(() => process.exit());

// getExtrinsicsEvent(BigInt(3434107)).catch(console.error).finally(() => process.exit());
// test(BigInt(3434107)).catch(console.error).finally(() => process.exit());

// getBlockSimpleInfo(BigInt(3428552)).catch(console.error).finally(() => process.exit());

// getBlockInfo(BigInt(3428552)).catch(console.error).finally(() => process.exit());


// getBlockInfo(BigInt(3434107)).catch(console.error).finally(() => process.exit()); // Transfer
// getBlockAndExtrinsicsListInfo(BigInt(3434107)).catch(console.error).finally(() => process.exit()); // Transfer

// getBlockInfo(BigInt(3410622)).catch(console.error).finally(() => process.exit()); // Stake
// getBlockAndExtrinsicsListInfo(BigInt(3410622)).catch(console.error).finally(() => process.exit()); // Stake

// getBlockInfo(BigInt(3428713)).catch(console.error).finally(() => process.exit()); // Re-Stake Turn
// getBlockAndExtrinsicsListInfo(BigInt(3428713)).catch(console.error).finally(() => process.exit()); // Re-Stake Turn

// getBlockInfo(BigInt(3428552)).catch(console.error).finally(() => process.exit()); // Re-Stake Turn on 상태 Claim
// getBlockAndExtrinsicsListInfo(BigInt(3428552)).catch(console.error).finally(() => process.exit()); // Re-Stake Turn on 상태 Claim

// getBlockInfo(BigInt(3428717)).catch(console.error).finally(() => process.exit()); // Re-Stake Turn off 상태 Claim
// getBlockAndExtrinsicsListInfo(BigInt(3428717)).catch(console.error).finally(() => process.exit()); // Re-Stake Turn off 상태 Claim

// getBlockInfo(BigInt(3429533)).catch(console.error).finally(() => process.exit()); // Unbond
// getBlockAndExtrinsicsListInfo(BigInt(3429533)).catch(console.error).finally(() => process.exit()); // Unbond

// getBlockInfo(BigInt(3435390)).catch(console.error).finally(() => process.exit()); // Nomination Transfer
// getBlockAndExtrinsicsListInfo(BigInt(3435390)).catch(console.error).finally(() => process.exit()); // Nomination Transfer

// test(BigInt(3428552)).catch(console.error).finally(() => process.exit());


// for stack exchange
const sampleTransfer = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(options({ provider }));

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await api.isReady;

    console.log('===== STEP1-RawTx-Start =====');
    const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
    console.log(trsfRawTx);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${trsfRawTx}`);
    // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('===== STEP1-RawTx-End =====');

    console.log('===== STEP2-SignRawTx-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    console.log(`testAcnt2Key : ${testAcnt2Key.address}`);
    // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    console.log('===== ===== =====');
    const signedTx = await trsfRawTx.signAsync(testAcnt2Key);
    console.log(signedTx);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`signedTx : ${signedTx}`);
    // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('===== STEP2-SignRawTx-End =====');

    console.log('===== STEP3-SendSignedTx-Start =====');
    const txhash = await signedTx.send();
    console.log(txhash);
    /*Type(32) [Uint8Array] [
        200,
        2,
        33,
        72,
        119,
        185,
        239,
        160,
        204,
        131,
        232,
        7,
        240,
        121,
        215,
        203,
        71,
        157,
        105,
        98,
        100,
        46,
        130,
        158,
        88,
        129,
        19,
        225,
        222,
        218,
        10,
        203,
        registry: TypeRegistry {},
        initialU8aLength: 32
      ]*/
    console.log('===== ===== =====');
    console.log(`txhash : ${txhash}`);
    // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
    console.log('===== STEP3-SendSignedTx-End =====');
}
// sampleTransfer().catch(console.error).finally(() => process.exit());

// ===== ===== =====

// https://polkadot.js.org/docs/api/start/basics
const testBasicsMetadata = async () => {
    /**
     * When the API connects to node, one of the first things it does is to retrieve the metadata and decorate the API based on the metadata information.
     * The metadata effectively provides data in the form of api.<type>.<module>.<section> the fits into one of the following categories - 
     * => consts - All runtime constants, e.g. api.consts.balances.existentialDeposit. These are not functions, rather accessing the endpoint immediately yields the result as defined.
     * => query - All chain state, e.g. api.query.system.account(<accountId>).
     * => tx - All extrinsics, e.g. api.tx.balances.transfer(<accountId>, <value>).
     * 
     * Additionally the metadata also provides information on events,
     *  these are query-able via the api.query.system.events() interface and also appear on transactions...
     *  both these cases are detailed later.
     */

    await api.isReady;

    // console.log(api.consts);
    /*{
        system: {
            blockWeights: [Getter],
                blockLength: [Getter],
                    blockHashCount: [Getter],
                        dbWeight: [Getter],
                            version: [Getter],
                                ss58Prefix: [Getter]
        },
        utility: { batchedCallsLimit: [Getter] },
        identity: {
            basicDeposit: [Getter],
                fieldDeposit: [Getter],
                    subAccountDeposit: [Getter],
                        maxSubAccounts: [Getter],
                            maxAdditionalFields: [Getter],
                                maxRegistrars: [Getter]
        },
        timestamp: { minimumPeriod: [Getter] },
        multisig: {
            depositBase: [Getter],
                depositFactor: [Getter],
                    maxSignatories: [Getter]
        },
        ethCall: { callFee: [Getter], callMagicNumber: [Getter] },
        scheduler: { maximumWeight: [Getter], maxScheduledPerBlock: [Getter] },
        proxy: {
            proxyDepositBase: [Getter],
                proxyDepositFactor: [Getter],
                    maxProxies: [Getter],
                        maxPending: [Getter],
                            announcementDepositBase: [Getter],
                                announcementDepositFactor: [Getter]
        },
        transactionPayment: { operationalFeeMultiplier: [Getter] },
        balances: {
            existentialDeposit: [Getter],
                maxLocks: [Getter],
                    maxReserves: [Getter]
        },
        vesting: { minVestedTransfer: [Getter], maxVestingSchedules: [Getter] },
        dappsStaking: {
            blockPerEra: [Getter],
                registerDeposit: [Getter],
                    maxNumberOfStakersPerContract: [Getter],
                        minimumStakingAmount: [Getter],
                            palletId: [Getter],
                                minimumRemainingAmount: [Getter],
                                    maxUnlockingChunks: [Getter],
                                        unbondingPeriod: [Getter],
                                            maxEraStakeValues: [Getter],
                                                unregisteredDappRewardRetention: [Getter]
        },
        blockReward: { rewardAmount: [Getter] },
        assets: {
            removeItemsLimit: [Getter],
                assetDeposit: [Getter],
                    assetAccountDeposit: [Getter],
                        metadataDepositBase: [Getter],
                            metadataDepositPerByte: [Getter],
                                approvalDeposit: [Getter],
                                    stringLimit: [Getter]
        },
        authorship: { uncleGenerations: [Getter] },
        contracts: {
            schedule: [Getter],
                deletionQueueDepth: [Getter],
                    deletionWeightLimit: [Getter],
                        depositPerByte: [Getter],
                            depositPerItem: [Getter],
                                maxCodeLen: [Getter],
                                    maxStorageKeyLen: [Getter],
                                        unsafeUnstableInterface: [Getter],
                                            maxDebugBufferLen: [Getter]
        },
        democracy: {
            enactmentPeriod: [Getter],
                launchPeriod: [Getter],
                    votingPeriod: [Getter],
                        voteLockingPeriod: [Getter],
                            minimumDeposit: [Getter],
                                instantAllowed: [Getter],
                                    fastTrackVotingPeriod: [Getter],
                                        cooloffPeriod: [Getter],
                                            maxVotes: [Getter],
                                                maxProposals: [Getter],
                                                    maxDeposits: [Getter],
                                                        maxBlacklisted: [Getter]
        },
        treasury: {
            proposalBond: [Getter],
                proposalBondMinimum: [Getter],
                    proposalBondMaximum: [Getter],
                        spendPeriod: [Getter],
                            burn: [Getter],
                                palletId: [Getter],
                                    maxApprovals: [Getter]
        }
    }*/

    // console.log(api.query);
    /*{
        substrate: {
            changesTrieConfig: [Getter],
                childStorageKeyPrefix: [Getter],
                    code: [Getter],
                        extrinsicIndex: [Getter],
                            heapPages: [Getter]
        },
        system: {
            palletVersion: [Getter],
                account: [Getter],
                    extrinsicCount: [Getter],
                        blockWeight: [Getter],
                            allExtrinsicsLen: [Getter],
                                blockHash: [Getter],
                                    extrinsicData: [Getter],
                                        number: [Getter],
                                            parentHash: [Getter],
                                                digest: [Getter],
                                                    events: [Getter],
                                                        eventCount: [Getter],
                                                            eventTopics: [Getter],
                                                                lastRuntimeUpgrade: [Getter],
                                                                    upgradedToU32RefCount: [Getter],
                                                                        upgradedToTripleRefCount: [Getter],
                                                                            executionPhase: [Getter]
        },
        identity: {
            palletVersion: [Getter],
                identityOf: [Getter],
                    superOf: [Getter],
                        subsOf: [Getter],
                            registrars: [Getter]
        },
        timestamp: { palletVersion: [Getter], now: [Getter], didUpdate: [Getter] },
        multisig: { palletVersion: [Getter], multisigs: [Getter] },
        randomnessCollectiveFlip: { palletVersion: [Getter], randomMaterial: [Getter] },
        scheduler: {
            palletVersion: [Getter],
                incompleteSince: [Getter],
                    agenda: [Getter],
                        lookup: [Getter]
        },
        proxy: {
            palletVersion: [Getter],
                proxies: [Getter],
                    announcements: [Getter]
        },
        parachainSystem: {
            palletVersion: [Getter],
                pendingValidationCode: [Getter],
                    newValidationCode: [Getter],
                        validationData: [Getter],
                            didSetValidationCode: [Getter],
                                lastRelayChainBlockNumber: [Getter],
                                    upgradeRestrictionSignal: [Getter],
                                        relayStateProof: [Getter],
                                            relevantMessagingState: [Getter],
                                                hostConfiguration: [Getter],
                                                    lastDmqMqcHead: [Getter],
                                                        lastHrmpMqcHeads: [Getter],
                                                            processedDownwardMessages: [Getter],
                                                                hrmpWatermark: [Getter],
                                                                    hrmpOutboundMessages: [Getter],
                                                                        upwardMessages: [Getter],
                                                                            pendingUpwardMessages: [Getter],
                                                                                announcedHrmpMessagesPerCandidate: [Getter],
                                                                                    reservedXcmpWeightOverride: [Getter],
                                                                                        reservedDmpWeightOverride: [Getter],
                                                                                            authorizedUpgrade: [Getter],
                                                                                                customValidationHeadData: [Getter]
        },
        parachainInfo: { palletVersion: [Getter], parachainId: [Getter] },
        transactionPayment: {
            palletVersion: [Getter],
                nextFeeMultiplier: [Getter],
                    storageVersion: [Getter]
        },
        balances: {
            palletVersion: [Getter],
                totalIssuance: [Getter],
                    inactiveIssuance: [Getter],
                        account: [Getter],
                            locks: [Getter],
                                reserves: [Getter]
        },
        vesting: {
            palletVersion: [Getter],
                vesting: [Getter],
                    storageVersion: [Getter]
        },
        dappsStaking: {
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
        },
        blockReward: {
            palletVersion: [Getter],
                rewardDistributionConfigStorage: [Getter]
        },
        assets: {
            palletVersion: [Getter],
                asset: [Getter],
                    account: [Getter],
                        approvals: [Getter],
                            metadata: [Getter]
        },
        authorship: {
            palletVersion: [Getter],
                uncles: [Getter],
                    author: [Getter],
                        didSetUncles: [Getter]
        },
        collatorSelection: {
            palletVersion: [Getter],
                invulnerables: [Getter],
                    candidates: [Getter],
                        lastAuthoredBlock: [Getter],
                            desiredCandidates: [Getter],
                                candidacyBond: [Getter],
                                    slashDestination: [Getter]
        },
        session: {
            palletVersion: [Getter],
                validators: [Getter],
                    currentIndex: [Getter],
                        queuedChanged: [Getter],
                            queuedKeys: [Getter],
                                disabledValidators: [Getter],
                                    nextKeys: [Getter],
                                        keyOwner: [Getter]
        },
        aura: {
            palletVersion: [Getter],
                authorities: [Getter],
                    currentSlot: [Getter]
        },
        auraExt: { palletVersion: [Getter], authorities: [Getter] },
        xcmpQueue: {
            palletVersion: [Getter],
                inboundXcmpStatus: [Getter],
                    inboundXcmpMessages: [Getter],
                        outboundXcmpStatus: [Getter],
                            outboundXcmpMessages: [Getter],
                                signalMessages: [Getter],
                                    queueConfig: [Getter],
                                        overweight: [Getter],
                                            overweightCount: [Getter],
                                                queueSuspended: [Getter]
        },
        polkadotXcm: {
            palletVersion: [Getter],
                queryCounter: [Getter],
                    queries: [Getter],
                        assetTraps: [Getter],
                            safeXcmVersion: [Getter],
                                supportedVersion: [Getter],
                                    versionNotifiers: [Getter],
                                        versionNotifyTargets: [Getter],
                                            versionDiscoveryQueue: [Getter],
                                                currentMigration: [Getter]
        },
        dmpQueue: {
            palletVersion: [Getter],
                configuration: [Getter],
                    pageIndex: [Getter],
                        pages: [Getter],
                            overweight: [Getter]
        },
        xcAssetConfig: {
            palletVersion: [Getter],
                assetIdToLocation: [Getter],
                    assetLocationToId: [Getter],
                        assetLocationUnitsPerSecond: [Getter]
        },
        evm: {
            palletVersion: [Getter],
                accountCodes: [Getter],
                    accountStorages: [Getter]
        },
        ethereum: {
            palletVersion: [Getter],
                pending: [Getter],
                    currentBlock: [Getter],
                        currentReceipts: [Getter],
                            currentTransactionStatuses: [Getter],
                                blockHash: [Getter]
        },
        baseFee: {
            palletVersion: [Getter],
                baseFeePerGas: [Getter],
                    elasticity: [Getter]
        },
        evmChainId: { palletVersion: [Getter], chainId: [Getter] },
        contracts: {
            palletVersion: [Getter],
                pristineCode: [Getter],
                    codeStorage: [Getter],
                        ownerInfoOf: [Getter],
                            nonce: [Getter],
                                contractInfoOf: [Getter],
                                    deletionQueue: [Getter]
        },
        democracy: {
            palletVersion: [Getter],
                publicPropCount: [Getter],
                    publicProps: [Getter],
                        depositOf: [Getter],
                            referendumCount: [Getter],
                                lowestUnbaked: [Getter],
                                    referendumInfoOf: [Getter],
                                        votingOf: [Getter],
                                            lastTabledWasExternal: [Getter],
                                                nextExternal: [Getter],
                                                    blacklist: [Getter],
                                                        cancellations: [Getter]
        },
        council: {
            palletVersion: [Getter],
                proposals: [Getter],
                    proposalOf: [Getter],
                        voting: [Getter],
                            proposalCount: [Getter],
                                members: [Getter],
                                    prime: [Getter]
        },
        technicalCommittee: {
            palletVersion: [Getter],
                proposals: [Getter],
                    proposalOf: [Getter],
                        voting: [Getter],
                            proposalCount: [Getter],
                                members: [Getter],
                                    prime: [Getter]
        },
        treasury: {
            palletVersion: [Getter],
                proposalCount: [Getter],
                    proposals: [Getter],
                        deactivated: [Getter],
                            approvals: [Getter]
        },
        preimage: {
            palletVersion: [Getter],
                statusFor: [Getter],
                    preimageFor: [Getter]
        },
        sudo: { palletVersion: [Getter], key: [Getter] },
        contractsMigration: { palletVersion: [Getter], migrationStateStorage: [Getter] }
    }*/

    // console.log(api.tx);
    /*[Function(anonymous)] {
        system: [Getter],
            utility: [Getter],
                identity: [Getter],
                    timestamp: [Getter],
                        multisig: [Getter],
                            ethCall: [Getter],
                                scheduler: [Getter],
                                    proxy: [Getter],
                                        parachainSystem: [Getter],
                                            parachainInfo: [Getter],
                                                balances: [Getter],
                                                    vesting: [Getter],
                                                        dappsStaking: [Getter],
                                                            blockReward: [Getter],
                                                                assets: [Getter],
                                                                    authorship: [Getter],
                                                                        collatorSelection: [Getter],
                                                                            session: [Getter],
                                                                                xcmpQueue: [Getter],
                                                                                    polkadotXcm: [Getter],
                                                                                        cumulusXcm: [Getter],
                                                                                            dmpQueue: [Getter],
                                                                                                xcAssetConfig: [Getter],
                                                                                                    evm: [Getter],
                                                                                                        ethereum: [Getter],
                                                                                                            baseFee: [Getter],
                                                                                                                contracts: [Getter],
                                                                                                                    democracy: [Getter],
                                                                                                                        council: [Getter],
                                                                                                                            technicalCommittee: [Getter],
                                                                                                                                treasury: [Getter],
                                                                                                                                    preimage: [Getter],
                                                                                                                                        xvm: [Getter],
                                                                                                                                            sudo: [Getter],
                                                                                                                                                contractsMigration: [Getter]
    }*/

    // console.log(api.genesisHash); // The genesisHash of the connected chain
    /*Type(32) [Uint8Array] [
        221,
        184,
        153,
        115,
        54,
        26,
        23,
        8,
        57,
        248,
        15,
        21,
        45,
        46,
        158,
        56,
        163,
        118,
        165,
        167,
        236,
        206,
        252,
        173,
        231,
        99,
        244,
        106,
        142,
        86,
        112,
        25,
        registry: TypeRegistry {},
        initialU8aLength: 32
      ]*/
    console.log(u8aToHex(api.genesisHash)); // The genesisHash of the connected chain
    // 0xddb89973361a170839f80f152d2e9e38a376a5a7eccefcade763f46a8e567019
    // console.log('===')
    // console.log(api.runtimeMetadata); // The metadata as retrieved from the chain
    /*Metadata(2) [Map] {
        'magicNumber' => <BN: 6174656d>,
        'metadata' => Type { registry: TypeRegistry {}, initialU8aLength: 254685 },
        initialU8aLength: 254689,
        registry: TypeRegistry {}
      }*/
    console.log('===')
    // console.log(api.runtimeVersion); // The chain runtime version (including spec/impl. versions and types)
    /*Type(8) [Map] {
        'specName' => [String (Text): 'shibuya'] {
          registry: TypeRegistry {},
          initialU8aLength: 0
        },
        'implName' => [String (Text): 'shibuya'] {
          registry: TypeRegistry {},
          initialU8aLength: 0
        },
        'authoringVersion' => <BN: 1>,
        'specVersion' => <BN: 5c>,
        'implVersion' => <BN: 0>,
        'apis' => Type(14) [
          Type(2) [
            [Type [Uint8Array]],
            <BN: 4>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 6>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 3>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 4>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          registry: TypeRegistry {},
          initialU8aLength: 0
        ],
        'transactionVersion' => <BN: 2>,
        'stateVersion' => <BN: 1>,
        initialU8aLength: 0,
        registry: TypeRegistry {}
      }*/
    console.log('===')
    console.log(api.runtimeVersion.specName.toString()); // shibuya | polkadot
    console.log(api.runtimeVersion.implName.toString()); // shibuya | parity-polkadot
    console.log(api.runtimeVersion.authoringVersion.toString()); // 1 | 0
    console.log(api.runtimeVersion.specVersion.toString()); // 92 | 9370
    console.log(api.runtimeVersion.implVersion.toString()); // 0 | 0
    console.log(api.runtimeVersion.transactionVersion.toString()); // 2 | 20
    console.log(api.runtimeVersion.stateVersion.toString()); // 1 | 0
    console.log(api.runtimeVersion.metadata); // TypeError

    // await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash();
    // console.log(blockHash);
    console.log(`${blockHash}`); // 0xd41b437c08fb42de5f604f8c1ac5ce2a33503a92abad6337554cd44c48d4483a

    const metaData = await api.rpc.state.getMetadata(blockHash);
    // console.log(metaData);
    console.log(metaData.toHex());
    /**
     *  'magicNumber' => <BN: 6174656d>,
  'metadata' => Type { registry: TypeRegistry {}, initialU8aLength: 254685 },
     */
    // console.log(`${metaData}`);
    
    // api.rpc.chain.getBlockHash
    
    // console.log(api.libraryInfo); // The version of the API, i.e. @polkadot/api v0.90.1
    // @polkadot/api v10.1.4
}
testBasicsMetadata().catch(console.error).finally(() => process.exit());


// https://polkadot.js.org/docs/api/start/create
const testCreateAnInstance = async () => {
    /**
     * Focusing on the construction, any API requires a provider and we create one via the const wsProvider = new WsProvider(...). By default, 
     * if none is provided to the API it will construct a default WsProvider instance to connect to ws://127.0.0.1:9944.
     * 
     * We generally recommend always specifying the endpoint since in most cases we want to connect to an external node and even for local nodes, 
     * it is always better being explicit, less magic that can make you wonder in the future.
     * 
     * At this time the only provider type that is fully supported by the API is the WebSocket version.
     * 
     * Polkadot/Substrate really comes alive with possibilities once you have access to bi-directional RPCs such as what WebSockets provide.
     * (It is technically possible to have some limited capability via bare-HTTP, 
     * but at this point WebSockets is the only fully-operational and supported version - always remember that it is just "upgraded HTTP".)
     */

    await api.isReady;
    console.log(api.genesisHash.toHex());
    // 0xddb89973361a170839f80f152d2e9e38a376a5a7eccefcade763f46a8e567019
}
// testCreateAnInstance().catch(console.error).finally(() => process.exit());


// https://polkadot.js.org/docs/api/start/api.consts
const testRuntimeConstants = async () => {
    /**
     * Constant queries will introduce you to the concepts behind the types and the interaction of the API with those types. 
     * The same concepts are implemented in the remainder of the API - the runtime constants is just the simplest starting point.
     * For some background: constants are values that are defined in the runtime and used as part of chain operations. 
     * These constants can be changed as part of an upgrade.
     */
    await api.isReady;

    // The length of an epoch (session) in Babe
    // console.log(api.consts.babe.epochDuration.toNumber());
    // TypeError: Cannot read properties of undefined (reading 'epochDuration')

    // The amount required to create a new account
    // console.log(api.consts.balances.existentialDeposit.toNumber());
    // 1000000

    // The amount required per byte on an extrinsic
    // console.log(api.consts.transactionPayment.transactionByteFee.toNumber());
    // TypeError: Cannot read properties of undefined (reading 'toNumber')

    /**
     * Since these are constants and defined by the metadata, 
     * it is not a call, but rather the values immediately available - 
     * as you'll see in subsequent sections, there is no need for await on these, it immediately returns the type and value for you to work with.
     */
}
// testRuntimeConstants().catch(console.error).finally(() => process.exit());


// https://polkadot.js.org/docs/api/start/api.query/
const testStateQueries = async () => {
    /**
     * In previous sections, we initialized the API and retrieved runtime constants. 
     * This section will walk through the concepts behind making queries to the chain to retrieve current state. 
     * The api.query.<module>.<method> interfaces, as already described earlier, is populated from the metadata. 
     * The API uses the metadata information provided to construct queries based on the location and parameters provided to generate state keys, 
     * and then queries these via RPC.
     */

    /**
     * Basic queries
     * Let's dive right in, connect to a general chain and retrieve some information on the current state. 
     * Of interest may be retrieving the nonce of a particular account as well as the current balance, this can be achieved via -
     */
    await api.isReady;

    // The actual address that we will use
    // const ADDR = 'X84AAbrZH1MqwHzTkd1JoJJKFDX7ZGbkkmrztabCjkiMNXn'; // balance of 2000000000000000000 and a nonce of 0
    const ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U'; // balance of 15596819873881302999 and a nonce of 2

    // Retrieve the last timestamp
    // const now = await api.query.timestamp.now();
    // Retrieve the account balance & nonce via the system module
    // const { nonce, data: balance } = await api.query.system.account(ADDR);
    // console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

    const [now, { nonce, data: balance }] = await Promise.all([
        api.query.timestamp.now(),
        api.query.system.account(ADDR)
    ]);
    console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
}
// testStateQueries().catch(console.error).finally(() => process.exit());


// https://polkadot.js.org/docs/api/start/api.rpc
const testRPCQueries = async () => {
    /**
     * The RPC calls provide the backbone for the transmission of data to and from the node. 
     * This means that all API endpoints such as api.query, api.tx or api.derive just wrap RPC calls, 
     * providing information in the encoded format as expected by the node.
     * 
     * Since you are already familiar with the api.query interface, the api.rpc interface follows the same format, for instance -
     */
    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();
    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    // Shibuya Testnet: last block #3493784 has hash 0x382b73017e8a2f16bc0d5f9d411a12983c43603a31c9088e46e50e3587b7deb3
}
// testRPCQueries().catch(console.error).finally(() => process.exit());

// https://polkadot.js.org/docs/api/start/api.rpc
/**
 * The api.derive interfaces will be covered in a follow-up section, 
 * but since the above example deals with new head subscriptions, a quick detour is warranted. 
 * The derives are just helpers that define certain functions and combine results from multiple sources. 
 * For new headers, the following information is useful in certain scenarios -
 */
const unsub = async () => {
    await api.isReady;

    api.derive.chain.subscribeNewHeads((lastHeader) => {
        console.log(`#${lastHeader.number} was authored by ${lastHeader.author}`);
    });
    // #3493884 was authored by Z83aqAZrvLJmZyhG414dYxCPxbc4uD3MwBtbWdLrxV6FqcG(Collator)
}
/**
 * In the above case the subscribeNewHeads derive augments the header retrieved with an .author getter. 
 * This is done by parsing the actual header and logs received and filling in the author from the api.query.session.validators call.
 */
// unsub();


// https://polkadot.js.org/docs/api/start/api.query.subs/
const testQuerySubscriptions = async () => {
    await api.isReady;

    api.query.timestamp.now((moment) => {
        console.log(`The last block has a timestamp of ${moment}`);
    });
    // The last block has a timestamp of 1680178044654

    const ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U'; // balance of 15596819873881302999 and a nonce of 2

    api.query.system.account(ADDR, ({ nonce, data: balance }) => {
        console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
    });
}
// testQuerySubscriptions();


// https://polkadot.js.org/docs/api/start/api.query.multi
const testMultiQueries = async () => {
    /**
     * A couple of items to note in the example above: we don't call account directly, but rather account.multi. 
     * We pass the addresses we want to query as an array, and the length thereof would depend on the number of addresses we want to query. 
     * As an extended example, we can track the balances of a list of validators,
     */
    await api.isReady;

    // Retrieve a snapshot of the validators
    // (all active & waiting based on ValidatorPrefs storage)
    const validatorKeys = await api.query.staking.validators.keys();
    // TypeError: Cannot read properties of undefined (reading 'validators')

    // Subscribe to the balances for these accounts
    api.query.balances.account.multi(validatorKeys, (balances) => {
        console.log(`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
    });
}
// testMultiQueries();


// https://polkadot.js.org/docs/api/start/api.query.other
const testQueryExtras = async () => {
    /**
     * In previous sections we took a walk through queries, showing how to use one-shot queries, 
     * how to subscribe to results and how to combine multiple queries into one. 
     * This section will aim to extend that knowledge showing some other features and utilities that are available on the api.query interfaces.
     * 
     * State at a specific block
     * Quite often it is useful (taking pruning into account, more on this later) to retrieve the state at a specific block. 
     * For instance we may wish to retrieve the current balance as well as the balance at a previous block for a specific account -
     */
    await api.isReady;
    const ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U'; // balance of 15596819873881302999 and a nonce of 2

    // // Retrieve the current block header
    // const lastHdr = await api.rpc.chain.getHeader();
    // // Get a decorated api instance at a specific block
    // const apiAt = await api.at(lastHdr.hash);
    // // query the balance at this point of the chain
    // const { data: { free } } = await apiAt.query.system.account(ADDR);
    // // Display the free balance
    // console.log(`The current free is ${free.toString()}`);
    // // The current free is 15596819873881302999

    /**
     * The .at queries are all single-shot, i.e. there are no subscription option to these, since the state for a previous block should be static. 
     * (This is true to a certain extent, i.e. when blocks have been finalized).
     * 
     * An additional point to take care of (briefly mentioned above), is state pruning. 
     * !!!!!By default a Polkadot/Substrate node will only keep state for the last 256 blocks, unless it is explicitly run in archive mode.
     * This means that querying state further back than the pruning period will result in an error returned from the Node. 
     * (Generally most public RPC nodes only run with default settings, which includes aggressive state pruning)!!!!!
     */


    // [Map keys & entries]
    // Retrieve the active era
    const activeEra = await api.query.staking.activeEra();

    // retrieve all exposures for the active era
    const exposures = await api.query.staking.erasStakers.entries(activeEra.unwrap().index);

    exposures.forEach(([key, exposure]) => {
        console.log('key arguments:', key.args.map((k) => k.toHuman()));
        console.log('     exposure:', exposure.toHuman());
    });

    // [State entries]

    // [Entry metadata]
}
// testQueryExtras().catch(console.error).finally(() => process.exit());


// https://polkadot.js.org/docs/api/start/api.tx
const testTransactions = async () => {
    /**
     * Transaction endpoints are exposed, as determined by the metadata, on the api.tx endpoint. 
     * These allow you to submit transactions for inclusion in blocks, be it transfers, setting information or anything else your chain supports.
     */

    /**
     * Under the hood
     * Despite the single-line format of signAndSend, there is a lot happening under the hood (and all of this can be manually provided)
     * => Based on the sender, the API will query system.account (or system.accountNonce on older chains) to determine the next nonce to use
     * => The API will retrieve the current block hash and use it to create a mortal transaction, 
     * ==> i.e. the transaction will only be valid for a limited number of blocks (by default this is 5 mins at 6s block times)
     * => It will construct a payload and sign this, this includes the genesisHash, 
     * ==> the blockHash for the start of the mortal era as well as the current chain specVersion
     * => The transaction is submitted to the node
     * As suggested, you can override all of this, 
     * i.e. by retrieving the nonce yourself and passing that as an option, 
     * i.e. signAndSend(alice, { nonce: aliceNonce }), this could be useful when manually tracking and submitting transactions in bulk.
     */


    // Sign and send a transfer from Alice to Bob
    // const txHash = await api.tx.balances
    //     .transfer(BOB, 12345)
    //     .signAndSend(alice);

    // Show the hash
    // console.log(`Submitted with hash ${txHash}`);
}


// https://polkadot.js.org/docs/api/start/keyring
const testKeyring = async () => {


    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await api.isReady;

    console.log('===== STEP1-RawTx-Start =====');
    const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
    console.log(trsfRawTx);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${trsfRawTx}`);
    // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('===== STEP1-RawTx-End =====');

    console.log('===== STEP2-SignRawTx-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    console.log(`testAcnt2Key : ${testAcnt2Key.address}`);
    // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    console.log('===== sign-Method-Start =====');

    const signature = testAcnt2Key.sign(trsfRawTx);
    console.log(`signature : ${u8aToHex(signature)}`);
    console.log('===== ===== =====');
    const isValid = testAcnt2Key.verify(trsfRawTx, signature, testAcnt2Key.publicKey);
    // Log info
    console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
    console.log('===== sign-Method-End =====');

    console.log('===== ===== =====');

    console.log('===== signAsync-Method-Start =====');
    const signedTx = await trsfRawTx.signAsync(testAcnt2Key);
    console.log(signedTx);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`signedTx : ${signedTx}`);
    // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('===== signAsync-Method-Start =====');
    console.log('===== STEP2-SignRawTx-End =====');

    // console.log('===== STEP3-SendSignedTx-Start =====');
    // const txhash = await signedTx.send();
    // console.log(txhash);
    // console.log('===== ===== =====');
    // console.log(`txhash : ${txhash}`);
    // // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
    // console.log('===== STEP3-SendSignedTx-End =====');
}
// testKeyring().catch(console.error).finally(() => process.exit());


// https://polkadot.js.org/docs/api/start/api.tx.subs
const testTransactionSubscriptions = async () => {
    /**
     * Previously we sent simple transactions using the api.tx endpoints, 
     * in this section we will extend that to monitor the actual transactions for inclusion and also extend the monitoring for transaction events.
     */
}


// https://polkadot.js.org/docs/substrate/extrinsics/#transferallowdeathdest-multiaddress-value-compactu128
const testTransfer2 = async () => {

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await api.isReady;

    console.log('===== STEP1-RawTx-Start =====');
    const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
    console.log(trsfRawTx);
    /**
     * Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
     */
    // console.log('===== ===== =====');
    // console.log(`trsfRawTx-type : ${typeof trsfRawTx}`); // object
    console.log('===== ===== =====');
    console.log(`${trsfRawTx}`);
    /**
     * { "signature": { "signer": { "id": "VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy" }, "signature": { "ed25519": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" }, "era": { "immortalEra": "0x00" }, "nonce": 0, "tip": 0 }, "method": { "callIndex": "0x1f00", "args": { "dest": { "id": "VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U" }, "value": "0x000000000000000002c68af0bb140000" } } }
     */
    // console.log('===== ===== =====');
    const serial = trsfRawTx.toHex();
    console.log(serial); // 0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602

    console.log('===== ===== =====');
    console.log(JSON.parse(trsfRawTx)); // JSON
    console.log('===== ===== =====');
    console.log(Object.getOwnPropertyDescriptors(trsfRawTx));
    // console.log(Object.getOwnPropertyDescriptors(tmpJson));
    // console.log(Object.getOwnPropertyDescriptors(trsfRawTx.registry));
    console.log('===== STEP1-RawTx-End =====');
    const deserial = api.tx(serial);
    console.log(deserial);

    console.log('===== STEP2-SignRawTx-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(`testAcnt2Key : ${testAcnt2Key.address}`);
    // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    // last// testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    console.log('===== sign-Method-Start =====');

    const signedTxSerial = "0x4d028400e24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e01741632175d30b35be3288e5ac111494efc64cf629268f376bcd969e8983c60229960c699b512b6a77e55f22e9091833112ee536784398310c602b0d004cae186640020001f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602";
    const signedTxDeserial = api.tx(signedTxSerial);
    console.log(signedTxDeserial);
    console.log(`${signedTxDeserial}`);

    const txhash = await signedTxDeserial.send();
    console.log(txhash);


    

    // const signature = testAcnt2Key.sign(trsfRawTx, 'sr25519');
    // const signature2 = testAcnt2Key.sign(trsfRawTx);
    // console.log('===== ===== =====');
    // console.log(`signature-type : ${typeof signature}`); // object
    // console.log('===== ===== =====');
    // console.log(`signature : ${u8aToHex(signature)}`);
    // // last// signature : 0x96cbddb8027d119e25d841316c1255e7e1abb0a9f1543d7f4d7463671ad9b01192551e877b5bf012f878e64ff45a689aed261d7f31e5844240d0fc20c01afb8f
    // console.log(`signature2 : ${u8aToHex(signature2)}`);
    // console.log('===== ===== =====');xw
    // const isValid = testAcnt2Key.verify(trsfRawTx, signature, testAcnt2Key.publicKey);
    // const isValid2 = testAcnt2Key.verify(trsfRawTx, signature2, testAcnt2Key.publicKey);
    // // Log info
    // console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
    // // last// The signature 0x96cbddb8027d119e25d841316c1255e7e1abb0a9f1543d7f4d7463671ad9b01192551e877b5bf012f878e64ff45a689aed261d7f31e5844240d0fc20c01afb8f, is valid
    // console.log(`The signature2 ${u8aToHex(signature2)}, is ${isValid2 ? '' : 'in'}valid2`);
    // console.log('===== sign-Method-End =====');

    // console.log('===== ===== =====');

    // console.log('===== signAsync-Method-Start =====');
    // // const signedTx = await trsfRawTx.signAsync(testAcnt2Key);
    // const signedTx = await trsfRawTx.signAsync(testAcnt2Key);
    // console.log(signedTx);
    // // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    // // last// Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    // console.log('===== ===== =====');
    // console.log(`signedTx-type : ${typeof signedTx}`); // object
    // console.log('===== ===== =====');
    // console.log(`signedTx : ${signedTx}`);
    // // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    // // last// signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0xdc2b5142adab7b8da42802b08f8f80e09c15a90fb6456541af95df0c8f7c3154dddd6ee7f628ed2e249a76e84ad7ce419fda83581a329565afbdb11185cb8e8c"},"era":{"mortalEra":"0xa400"},"nonce":7,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    // console.log('===== signAsync-Method-Start =====');
    // console.log('===== STEP2-SignRawTx-End =====');


    // console.log('===== STEP3-SendSignedTx-Start =====');
    // const txhash = await signedTx.send();
    // console.log(txhash);
    // console.log('===== ===== =====');
    // console.log(`txhash : ${txhash}`);
    // // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
    // // last// txhash : 0xa8a124afc53f5136214abadec693aa45072ff7598760a93a14f47e6fb4627862
    // console.log('===== STEP3-SendSignedTx-End =====');

    /**
     * testAcnt1 : 15.596 SBY
     * testAcnt1 : 2.388 SBY
     * 
     * =>
     * 
     * testAcnt1 : 15.796 SBY
     * testAcnt1 : 2.187 SBY
     */
}
// testTransfer2().catch(console.error).finally(() => process.exit());



const testOffChain = async () => {

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await api.isReady;

    console.log('===== STEP1-RawTx-Start =====');
    const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
    console.log(trsfRawTx); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`trsfRawTx-type : ${typeof trsfRawTx}`); // object
    console.log('===== ===== =====');
    console.log(`${trsfRawTx}`); // { "signature": { "signer": { "id": "VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy" }, "signature": { "ed25519": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" }, "era": { "immortalEra": "0x00" }, "nonce": 0, "tip": 0 }, "method": { "callIndex": "0x1f00", "args": { "dest": { "id": "VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U" }, "value": "0x000000000000000002c68af0bb140000" } } }
    console.log('===== ===== =====');
    const serial = trsfRawTx.toHex();
    console.log(serial); // 0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602
    // console.log('===== ===== =====');
    // console.log(JSON.parse(trsfRawTx)); // JSON
    /*{
        signature: {
            signer: { id: 'VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy' },
            signature: {
                ed25519: '0x0000000000 0000000000 | 0000000000 0000000000 | 0000000000 0000000000 | 0000000000 0000000000 | 0000000000 0000000000 | 0000000000 0000000000 | 00000000'
            },
            era: { immortalEra: '0x00' },
            nonce: 0,
                tip: 0
        },
        method: {
            callIndex: '0x1f00',
                args: { dest: [Object], value: '0x000000000000000002c68af0bb140000' }
        }
    }*/
    // console.log('===== ===== =====');
    // console.log(Object.getOwnPropertyDescriptors(trsfRawTx));
    /*{
        initialU8aLength: {
            value: undefined,
                writable: true,
                    enumerable: true,
                        configurable: true
        },
        registry: {
            value: TypeRegistry { },
            writable: true,
                enumerable: true,
                    configurable: true
        }
    }*/
    // console.log(Object.getOwnPropertyDescriptors(tmpJson));
    // console.log(Object.getOwnPropertyDescriptors(trsfRawTx.registry));
    console.log('===== STEP1-RawTx-End =====');

    // console.log(trsfRawTx.__proto__); // Type {}
    // console.log(trsfRawTx.initialU8aLength); // undefined
    // console.log(trsfRawTx.registry); // TypeRegistry {}
    // console.log(Object.getOwnPropertyDescriptor(trsfRawTx, 'TypeRegistry')); // undefined
    // console.log(trsfRawTx.signature);
    // console.log('===== ===== =====');
    // console.log(trsfRawTx.method);

    /*
    const deserial = api.tx(serial);
    console.log(deserial);
    console.log('===== STEP2-SignRawTx-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(`testAcnt2Key : ${testAcnt2Key.address}`);
    // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    // last// testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    console.log('===== sign-Method-Start =====');
    const signedTxSerial = "0x4d028400e24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e01741632175d30b35be3288e5ac111494efc64cf629268f376bcd969e8983c60229960c699b512b6a77e55f22e9091833112ee536784398310c602b0d004cae186640020001f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602";
    const signedTxDeserial = api.tx(signedTxSerial);
    console.log(signedTxDeserial);
    console.log(`${signedTxDeserial}`);
    const txhash = await signedTxDeserial.send();
    console.log(txhash);
    const signature = testAcnt2Key.sign(trsfRawTx, 'sr25519');
    const signature2 = testAcnt2Key.sign(trsfRawTx);
    console.log('===== ===== =====');
    console.log(`signature-type : ${typeof signature}`); // object
    console.log('===== ===== =====');
    console.log(`signature : ${u8aToHex(signature)}`);
    // last// signature : 0x96cbddb8027d119e25d841316c1255e7e1abb0a9f1543d7f4d7463671ad9b01192551e877b5bf012f878e64ff45a689aed261d7f31e5844240d0fc20c01afb8f
    console.log(`signature2 : ${u8aToHex(signature2)}`);
    console.log('===== ===== =====');xw
    const isValid = testAcnt2Key.verify(trsfRawTx, signature, testAcnt2Key.publicKey);
    const isValid2 = testAcnt2Key.verify(trsfRawTx, signature2, testAcnt2Key.publicKey);
    // Log info
    console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
    // last// The signature 0x96cbddb8027d119e25d841316c1255e7e1abb0a9f1543d7f4d7463671ad9b01192551e877b5bf012f878e64ff45a689aed261d7f31e5844240d0fc20c01afb8f, is valid
    console.log(`The signature2 ${u8aToHex(signature2)}, is ${isValid2 ? '' : 'in'}valid2`);
    console.log('===== sign-Method-End =====');
    console.log('===== ===== =====');
    */

    console.log('===== signAsync-Method-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(`testAcnt2Key : ${testAcnt2Key.address}`);
    // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    // const signedTx = await trsfRawTx.signAsync(testAcnt2Key);
    const signedTx = await trsfRawTx.signAsync(testAcnt2Key);
    // console.log(signedTx);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log(JSON.parse(signedTx)); // JSON
    console.log('===== ===== =====');
    console.log(`signedTx-type : ${typeof signedTx}`); // object
    console.log('===== ===== =====');
    console.log(`signedTx : ${signedTx}`);
    // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('===== signAsync-Method-Start =====');
    console.log('===== STEP2-SignRawTx-End =====');

    /*
    console.log('===== STEP3-SendSignedTx-Start =====');
    const txhash = await signedTx.send();
    console.log(txhash);
    console.log('===== ===== =====');
    console.log(`txhash : ${txhash}`);
    // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
    // last// txhash : 0xa8a124afc53f5136214abadec693aa45072ff7598760a93a14f47e6fb4627862
    console.log('===== STEP3-SendSignedTx-End =====');
    */
}
// testOffChain().catch(console.error).finally(() => process.exit());



const testSubmittable = async () => {
    
}
// testSubmittable().catch(console.error).finally(() => process.exit());


