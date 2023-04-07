"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signWith = exports.rpcToLocalNode = void 0;
var txwrapper_polkadot_1 = require("@substrate/txwrapper-polkadot");
var Extrinsic_1 = require("@polkadot/types/extrinsic/v4/Extrinsic");
var _a = require("@polkadot/api/types"), ApiTypes = _a.ApiTypes, SubmittableExtrinsic = _a.SubmittableExtrinsic;
var createPair = require("@polkadot/keyring").createPair;
var ISubmittableResult = require("@polkadot/types/types").ISubmittableResult;
var createClass = require("@polkadot/api/submittable/createClass").createClass;
var _b = require('@substrate/txwrapper-polkadot'), construct = _b.construct, getRegistry = _b.getRegistry, methods = _b.methods, deriveAddress = _b.deriveAddress, decode = _b.decode;
var createSigningPayload = require('@substrate/txwrapper-core/lib/core/construct').createSigningPayload;
var Keyring = require('@polkadot/keyring').Keyring;
var _c = require('@polkadot/util-crypto'), mnemonicGenerate = _c.mnemonicGenerate, mnemonicToEntropy = _c.mnemonicToEntropy, mnemonicToLegacySeed = _c.mnemonicToLegacySeed, mnemonicToMiniSecret = _c.mnemonicToMiniSecret, mnemonicValidate = _c.mnemonicValidate, cryptoWaitReady = _c.cryptoWaitReady;
var _d = require('@polkadot/util'), stringToU8a = _d.stringToU8a, u8aToHex = _d.u8aToHex;
var _e = require('@polkadot/api'), ApiPromise = _e.ApiPromise, GenericExtrinsicPayload = _e.GenericExtrinsicPayload;
var WsProvider = require('@polkadot/rpc-provider').WsProvider;
// const { options } = require('@astar-network/astar-api');
var createType = require('@polkadot/types').createType;
var keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
// Create a new instance of the api
var provider = new WsProvider('wss://rpc.shibuya.astar.network');
// const provider = new WsProvider('wss://rpc.polkadot.io');
// const api = new ApiPromise(options({ provider }));
var api = new ApiPromise({ provider: provider });
var createWallet = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testMnemonic, testEntropy, testLegacySeed, testMiniSecret;
    return __generator(this, function (_a) {
        testMnemonic = mnemonicGenerate();
        console.log("testMnemonic : ".concat(testMnemonic));
        // testMnemonic : slice bronze until cabin gold cradle foil carbon measure owner topple dignity
        console.log("validate-testMnemonic : ".concat(mnemonicValidate(testMnemonic)));
        testEntropy = mnemonicToEntropy(testMnemonic);
        console.log("testEntropy : ".concat(testEntropy));
        // testEntropy : 203,99,151,184,143,230,68,99,214,153,19,137,243,199,148,159
        console.log("testEntropy=>u8aToHex : ".concat(u8aToHex(testEntropy)));
        // testEntropy=>u8aToHex : 0xcb6397b88fe64463d6991389f3c7949f
        console.log("validate-testEntropy : ".concat(mnemonicValidate(testEntropy)));
        testLegacySeed = mnemonicToLegacySeed(testMnemonic);
        console.log("testLegacySeed : ".concat(testLegacySeed)); // Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
        // testLegacySeed : 235,136,113,199,250,101,12,154,49,52,113,116,123,82,64,30,61,39,231,96,118,139,9,91,37,138,15,225,237,106,92,71
        console.log("testLegacySeed=>u8aToHex : ".concat(u8aToHex(testLegacySeed)));
        // testLegacySeed=>u8aToHex : 0xeb8871c7fa650c9a313471747b52401e3d27e760768b095b258a0fe1ed6a5c47
        console.log("validate-testLegacySeed : ".concat(mnemonicValidate(testLegacySeed)));
        testMiniSecret = mnemonicToMiniSecret(testMnemonic);
        console.log("testMiniSecret : ".concat(testMiniSecret));
        // testMiniSecret : 161,150,136,140,250,213,82,91,110,18,22,121,168,67,192,64,210,205,231,217,173,66,121,187,111,102,154,221,225,128,38,65
        console.log("testMiniSecret=>u8aToHex : ".concat(u8aToHex(testMiniSecret)));
        // testMiniSecret=>u8aToHex : 0xa196888cfad5525b6e121679a843c040d2cde7d9ad4279bb6f669adde1802641
        console.log("validate-testMiniSecret : ".concat(mnemonicValidate(testMiniSecret)));
        return [2 /*return*/];
    });
}); };
var revisitCrypto = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testMnemonic, testAddFromMnemonic_ed, testAddFromMnemonic_sr, testAddFromMnemonic_ec, testAddFromMnemonic_eth;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testAddFromMnemonic_ed = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ed25519');
                console.log("testAddFromMnemonic_ed-address : ".concat(testAddFromMnemonic_ed.address)); // XkpVKDM2UmEjgmQZPCRNYB2UKpFQRWALQGeMwr9XEzfqbcN
                console.log("testAddFromMnemonic_ed-addressRaw : ".concat(u8aToHex(testAddFromMnemonic_ed.addressRaw))); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5
                console.log("testAddFromMnemonic_ed-meta : ".concat(testAddFromMnemonic_ed.meta['test'])); // 1
                console.log("testAddFromMnemonic_ed-publicKey : ".concat(u8aToHex(testAddFromMnemonic_ed.publicKey))); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5
                console.log("testAddFromMnemonic_ed-KeypairType : ".concat(testAddFromMnemonic_ed.KeypairType)); // undefined
                return [4 /*yield*/, cryptoWaitReady()];
            case 1:
                _a.sent();
                testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
                console.log("testAddFromMnemonic_sr-address : ".concat(testAddFromMnemonic_sr.address)); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya
                console.log("testAddFromMnemonic_sr-addressRaw : ".concat(u8aToHex(testAddFromMnemonic_sr.addressRaw))); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e
                console.log("testAddFromMnemonic_sr-meta : ".concat(testAddFromMnemonic_sr.meta['test'])); // 1
                console.log("testAddFromMnemonic_sr-publicKey : ".concat(u8aToHex(testAddFromMnemonic_sr.publicKey))); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e
                console.log("testAddFromMnemonic_sr-KeypairType : ".concat(testAddFromMnemonic_sr.KeypairType)); // undefined
                testAddFromMnemonic_ec = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ecdsa');
                console.log("testAddFromMnemonic_ec-address : ".concat(testAddFromMnemonic_ec.address)); // XCWdpqNyJTQuF2vygFK1dLjxfd9M3nLSNbpWSjhffoZH5dV
                console.log("testAddFromMnemonic_ec-addressRaw : ".concat(u8aToHex(testAddFromMnemonic_ec.addressRaw))); // 0x37d676896572575d8eeb574ce557a487872fda7de5899f52201c051bbc1b2e11
                console.log("testAddFromMnemonic_ec-meta : ".concat(testAddFromMnemonic_ec.meta['test'])); // 1
                console.log("testAddFromMnemonic_ec-publicKey : ".concat(u8aToHex(testAddFromMnemonic_ec.publicKey))); // 0x028cf142e9c7235598935dca16da534488eb247ae7613ff756d51e1cc03520dce1
                console.log("testAddFromMnemonic_ec-KeypairType : ".concat(testAddFromMnemonic_ec.KeypairType)); // undefined
                testAddFromMnemonic_eth = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ethereum');
                console.log("testAddFromMnemonic_eth-address : ".concat(testAddFromMnemonic_eth.address)); // 0x887d2B6CC74053CD0A115243d399b27c8afBcA2C
                console.log("testAddFromMnemonic_eth-addressRaw : ".concat(u8aToHex(testAddFromMnemonic_eth.addressRaw))); // 0x887d2b6cc74053cd0a115243d399b27c8afbca2c
                console.log("testAddFromMnemonic_eth-meta : ".concat(testAddFromMnemonic_eth.meta['test'])); // 1
                console.log("testAddFromMnemonic_eth-publicKey : ".concat(u8aToHex(testAddFromMnemonic_eth.publicKey))); // 0x0201d40658b1fc247706d65b6e2556bb7072c28e6c7919ce6f030dcdd9114a3307
                console.log("testAddFromMnemonic_eth-KeypairType : ".concat(testAddFromMnemonic_eth.KeypairType)); // undefined
                return [2 /*return*/];
        }
    });
}); };
var makeRawTxAndSign = function () { return __awaiter(void 0, void 0, void 0, function () {
    var jisb, cryptoTest, trsfRawTx, keyring, testMnemonic, testKey, signedTx, txhash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jisb = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                cryptoTest = 'X84AAbrZH1MqwHzTkd1JoJJKFDX7ZGbkkmrztabCjkiMNXn';
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                trsfRawTx = api.tx.balances.transfer(cryptoTest, BigInt(2000000000000000000));
                console.log("trsfRawTx : ".concat(trsfRawTx));
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
                keyring = new Keyring({ type: 'sr25519' });
                testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testKey = keyring.addFromUri(testMnemonic);
                return [4 /*yield*/, trsfRawTx.signAsync(testKey)];
            case 2:
                signedTx = _a.sent();
                console.log("signedTx : ".concat(signedTx));
                return [4 /*yield*/, signedTx.send()];
            case 3:
                txhash = _a.sent();
                console.log("txhash : ".concat(txhash));
                return [2 /*return*/];
        }
    });
}); };
var getLastestBlock = function () { return __awaiter(void 0, void 0, void 0, function () {
    var chain, lastHeader;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.system.chain()];
            case 2:
                chain = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getHeader()];
            case 3:
                lastHeader = _a.sent();
                // Log the information
                console.log("".concat(chain, ": last block #").concat(lastHeader.number, " has hash ").concat(lastHeader.hash));
                return [2 /*return*/];
        }
    });
}); };
var subscribeNewHeader = function () { return __awaiter(void 0, void 0, void 0, function () {
    var chain;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.system.chain()];
            case 2:
                chain = _a.sent();
                // Subscribe to the new headers
                return [4 /*yield*/, api.rpc.chain.subscribeNewHeads(function (lastHeader) {
                        console.log("".concat(chain, ": last block #").concat(lastHeader.number, " has hash ").concat(lastHeader.hash));
                        // Shibuya Testnet: last block #3434662 has hash 0x2dc566e25c9b40b774a8e7eea1b2ce9c73be4198efff66c229baa30f701209f0
                    })];
            case 3:
                // Subscribe to the new headers
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getBlockSimpleInfo = function (blockNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var extrinsicsList, blockHash, signedBlock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                extrinsicsList = {};
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash(blockNumber)];
            case 2:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock(blockHash)];
            case 3:
                signedBlock = _a.sent();
                // console.log(signedBlock);
                // the hash for the block, always via header (Hash -> toHex()) - will be
                // the same as blockHash above (also available on any header retrieved,
                // subscription or once-off)
                console.log(signedBlock.block.header.hash.toHex());
                // the hash for each extrinsic in the block
                signedBlock.block.extrinsics.forEach(function (ex, index) {
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
                return [2 /*return*/];
        }
    });
}); };
var getBlockInfo = function (blockNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var blockHash, signedBlock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash(blockNumber)];
            case 2:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock(blockHash)];
            case 3:
                signedBlock = _a.sent();
                // the hash for the block, always via header (Hash -> toHex()) - will be
                // the same as blockHash above (also available on any header retrieved,
                // subscription or once-off)
                console.log(signedBlock.block.header.hash.toHex());
                // the hash for each extrinsic in the block
                signedBlock.block.extrinsics.forEach(function (ex, index) {
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
                return [2 /*return*/];
        }
    });
}); };
var getBlockAndExtrinsicsListInfo = function (blockNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var blockDetailtmpRlt, blockHash, signedBlock, blockDetailArrRlt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                blockDetailtmpRlt = {};
                return [4 /*yield*/, api.rpc.chain.getBlockHash(blockNumber)];
            case 2:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock(blockHash)];
            case 3:
                signedBlock = _a.sent();
                // the hash for the block, always via header (Hash -> toHex()) - will be
                // the same as blockHash above (also available on any header retrieved,
                // subscription or once-off)
                // console.log(signedBlock.block.header.hash.toHex());
                // console.log(signedBlock.block.extrinsics);
                // the hash for each extrinsic in the block
                signedBlock.block.extrinsics.forEach(function (ex, index) {
                    // console.log(index, ex.hash.toHex());
                    // console.log(index, ex.toHuman()[index]);
                    // console.log(index, ex.toHuman());
                    blockDetailtmpRlt[ex.hash.toHex()] = ex.toHuman();
                    // console.log(blockDetailtmpRlt);
                    // console.log(index, '==========');
                });
                blockDetailArrRlt = Object.entries(blockDetailtmpRlt);
                // console.log('==========');
                console.log(blockDetailArrRlt);
                return [2 /*return*/];
        }
    });
}); };
var getMapExtrinsicsEvent = function (blockNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var blockHash, signedBlock, apiAt, allRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash(blockNumber)];
            case 2:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock(blockHash)];
            case 3:
                signedBlock = _a.sent();
                return [4 /*yield*/, api.at(signedBlock.block.header.hash)];
            case 4:
                apiAt = _a.sent();
                return [4 /*yield*/, apiAt.query.system.events()];
            case 5:
                allRecords = _a.sent();
                // map between the extrinsics and events
                signedBlock.block.extrinsics.forEach(function (_a, index) {
                    var _b = _a.method, method = _b.method, section = _b.section;
                    // filter the specific events based on the phase and then the
                    // index of our extrinsic in the block
                    var events = allRecords
                        .filter(function (_a) {
                        var phase = _a.phase;
                        return phase.isApplyExtrinsic &&
                            phase.asApplyExtrinsic.eq(index);
                    })
                        .map(function (_a) {
                        var event = _a.event;
                        return "".concat(event.section, ".").concat(event.method);
                    });
                    console.log("".concat(section, ".").concat(method, ":: ").concat(events.join(', ') || 'no events'));
                });
                return [2 /*return*/];
        }
    });
}); };
var test = function (blockNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var signedBlock, apiAt, allRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock()];
            case 2:
                signedBlock = _a.sent();
                return [4 /*yield*/, api.at(signedBlock.block.header.hash)];
            case 3:
                apiAt = _a.sent();
                return [4 /*yield*/, apiAt.query.system.events()];
            case 4:
                allRecords = _a.sent();
                // map between the extrinsics and events
                signedBlock.block.extrinsics.forEach(function (_a, index) {
                    var _b = _a.method, method = _b.method, section = _b.section;
                    allRecords
                        // filter the specific events based on the phase and then the
                        // index of our extrinsic in the block
                        .filter(function (_a) {
                        var phase = _a.phase;
                        return phase.isApplyExtrinsic &&
                            phase.asApplyExtrinsic.eq(index);
                    })
                        // test the events against the specific types we are looking for
                        .forEach(function (_a) {
                        var event = _a.event;
                        if (api.events.system.ExtrinsicSuccess.is(event)) {
                            // extract the data for this event
                            // (In TS, because of the guard above, these will be typed)
                            var dispatchInfo = event.data[0];
                            console.log("".concat(section, ".").concat(method, ":: ExtrinsicSuccess:: ").concat(JSON.stringify(dispatchInfo.toHuman())));
                        }
                        else if (api.events.system.ExtrinsicFailed.is(event)) {
                            // extract the data for this event
                            var _b = event.data, dispatchError = _b[0], dispatchInfo = _b[1];
                            var errorInfo = void 0;
                            // decode the error
                            if (dispatchError.isModule) {
                                // for module errors, we have the section indexed, lookup
                                // (For specific known errors, we can also do a check against the
                                // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                                var decoded = api.registry.findMetaError(dispatchError.asModule);
                                errorInfo = "".concat(decoded.section, ".").concat(decoded.name);
                            }
                            else {
                                // Other, CannotLookup, BadOrigin, no extra info
                                errorInfo = dispatchError.toString();
                            }
                            console.log("".concat(section, ".").concat(method, ":: ExtrinsicFailed:: ").concat(errorInfo));
                        }
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
var makeRawTx = function () { return __awaiter(void 0, void 0, void 0, function () {
    var jisb, trsfRawTx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jisb = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                trsfRawTx = api.tx.balances.transfer(jisb, BigInt(200000000000000000));
                console.log("trsfRawTx : ".concat(trsfRawTx));
                return [2 /*return*/];
        }
    });
}); };
var getBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
    var bal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.derive.balances.account('VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U')];
            case 2:
                bal = _a.sent();
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
                return [2 /*return*/];
        }
    });
}); };
var getExtrinsicStatus = function (blockNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var blockHash, signedBlock, apiAt, allRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash(blockNumber)];
            case 2:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock(blockHash)];
            case 3:
                signedBlock = _a.sent();
                return [4 /*yield*/, api.at(signedBlock.block.header.hash)];
            case 4:
                apiAt = _a.sent();
                return [4 /*yield*/, apiAt.query.system.events()];
            case 5:
                allRecords = _a.sent();
                // map between the extrinsics and events
                signedBlock.block.extrinsics.forEach(function (_a, index) {
                    var _b = _a.method, method = _b.method, section = _b.section;
                    console.log("001 || index:".concat(index, " || allRecords:").concat(allRecords));
                    console.log("===== ===== =====");
                    allRecords
                        // filter the specific events based on the phase and then the
                        // index of our extrinsic in the block
                        .filter(function (_a) {
                        var phase = _a.phase;
                        phase.isApplyExtrinsic &&
                            phase.asApplyExtrinsic.eq(index);
                    })
                        // test the events against the specific types we are looking for
                        .forEach(function (_a) {
                        var event = _a.event;
                        console.log("003 : event:".concat(event));
                        if (api.events.system.ExtrinsicSuccess.is(event)) {
                            // extract the data for this event
                            // (In TS, because of the guard above, these will be typed)
                            var dispatchInfo = event.data[0];
                            console.log("004 : ".concat(section, ".").concat(method, ":: ExtrinsicSuccess:: ").concat(JSON.stringify(dispatchInfo.toHuman())));
                            // 004 : timestamp.set:: ExtrinsicSuccess:: { "weight": { "refTime": "260,558,000", "proofSize": "0" }, "class": "Mandatory", "paysFee": "Yes" }
                            // 004 : parachainSystem.setValidationData:: ExtrinsicSuccess:: { "weight": { "refTime": "98,974,000", "proofSize": "0" }, "class": "Mandatory", "paysFee": "No" }
                            // 004 : balances.transfer:: ExtrinsicSuccess:: { "weight": { "refTime": "272,785,000", "proofSize": "0" }, "class": "Normal", "paysFee": "Yes" }
                            // 004 : contracts.call:: ExtrinsicSuccess:: { "weight": { "refTime": "2,134,453,909", "proofSize": "127,165" }, "class": "Normal", "paysFee": "Yes" }
                        }
                        else if (api.events.system.ExtrinsicFailed.is(event)) {
                            // extract the data for this event
                            var _b = event.data, dispatchError = _b[0], dispatchInfo = _b[1];
                            var errorInfo = void 0;
                            console.log("004");
                            // decode the error
                            if (dispatchError.isModule) {
                                // for module errors, we have the section indexed, lookup
                                // (For specific known errors, we can also do a check against the
                                // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                                var decoded = api.registry.findMetaError(dispatchError.asModule);
                                console.log("005");
                                errorInfo = "".concat(decoded.section, ".").concat(decoded.name);
                            }
                            else {
                                console.log("006");
                                // Other, CannotLookup, BadOrigin, no extra info
                                errorInfo = dispatchError.toString();
                            }
                            console.log("007 : ".concat(section, ".").concat(method, ":: ExtrinsicFailed:: ").concat(errorInfo));
                        }
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
var getAcnt = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.query.system.account('5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn')];
            case 2:
                data = _a.sent();
                console.log(data);
                console.log('=======');
                console.log(data.toHuman());
                return [2 /*return*/];
        }
    });
}); };
var decodeRawTx = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sample;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.tx("0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602")];
            case 2:
                sample = _a.sent();
                console.log(sample);
                // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                console.log('=======');
                console.log(sample.toString());
                // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
                console.log('=======');
                console.log(sample.toHuman());
                return [2 /*return*/];
        }
    });
}); };
var test_payload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testMnemonic, testAddFromMnemonic_sr, sampleid, transaction, non, payload, signature, signHex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                return [4 /*yield*/, cryptoWaitReady()];
            case 1:
                _a.sent();
                testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
                console.log("testAddFromMnemonic_sr-address : ".concat(testAddFromMnemonic_sr.address)); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya
                sampleid = 'VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy';
                return [4 /*yield*/, api.isReady];
            case 2:
                _a.sent();
                transaction = api.tx.balances.transfer(sampleid, BigInt(2000000000000000000));
                return [4 /*yield*/, api.query.system.account(testAddFromMnemonic_sr.address)];
            case 3:
                non = (_a.sent()).nonce;
                console.log('Nonce : ' + non);
                payload = createType('ExtrinsicPayload', {
                    method: transaction.toHex(),
                    nonce: non.toHex(),
                    specVersion: api.runtimeVersion.specVersion,
                    genesisHash: api.genesisHash,
                    blockHash: api.genesisHash
                }, { version: 4 });
                console.log(payload);
                signature = testAddFromMnemonic_sr.sign(payload.toU8a(true));
                signHex = u8aToHex(signature);
                console.log(signHex);
                transaction.addSignature(testAddFromMnemonic_sr.address, signHex, payload.toU8a());
                return [2 /*return*/];
        }
    });
}); };
var getExRlt = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockHash, signedBlock, apiAt, allRecords, test3, test5, test7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash(3434107)];
            case 2:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock(blockHash)];
            case 3:
                signedBlock = _a.sent();
                return [4 /*yield*/, api.at(signedBlock.block.header.hash)];
            case 4:
                apiAt = _a.sent();
                return [4 /*yield*/, apiAt.query.system.events()];
            case 5:
                allRecords = _a.sent();
                test3 = signedBlock.block.extrinsics[2].hash;
                return [4 /*yield*/, api.events.system.ExtrinsicSuccess.is(test3)];
            case 6:
                test5 = _a.sent();
                console.log("".concat(test5));
                return [4 /*yield*/, api.query.system.extrinsicData(test3)
                    // console.log(`${test7}`);
                ];
            case 7:
                test7 = _a.sent();
                // console.log(`${test7}`);
                console.log(test7);
                return [2 /*return*/];
        }
    });
}); };
var getExRltFinal = function () { return __awaiter(void 0, void 0, void 0, function () {
    var txhash, blockHash, signedBlock, apiAt, allRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                txhash = '0x03314bbe62cd9c00a970f7bc4f45e3957700b593dbc74271d';
                return [4 /*yield*/, api.rpc.chain.getBlockHash(3434107)];
            case 2:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlock(blockHash)];
            case 3:
                signedBlock = _a.sent();
                return [4 /*yield*/, api.at(signedBlock.block.header.hash)];
            case 4:
                apiAt = _a.sent();
                return [4 /*yield*/, apiAt.query.system.events()];
            case 5:
                allRecords = _a.sent();
                // map between the extrinsics and events
                signedBlock.block.extrinsics.forEach(function (item, index) {
                    // console.log(`index : ${index}`);
                    // console.log(item);
                    // console.log('=====');
                    // console.log(`${item.hash}`);
                    // console.log('===== ===== =====');
                    console.log('TP0', index);
                    if (txhash === u8aToHex(item.hash)) {
                        console.log('TP1', index);
                        allRecords.filter(function (_a) {
                            var phase = _a.phase;
                            return phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index);
                        }).forEach(function (_a) {
                            var event = _a.event;
                            console.log('TP2', index);
                            if (api.events.system.ExtrinsicSuccess.is(event)) {
                                // console.log('ExtrinsicSuccess')
                                console.log('TP3', index);
                                // return 'ExtrinsicSuccess';
                                console.log('ExtrinsicSuccess');
                            }
                            else if (api.events.system.ExtrinsicFailed.is(event)) {
                                var _b = event.data, dispatchError = _b[0], dispatchInfo = _b[1];
                                var errorInfo = void 0;
                                console.log('TP4', index);
                                // decode the error
                                if (dispatchError.isModule) {
                                    console.log('TP5', index);
                                    // for module errors, we have the section indexed, lookup
                                    // (For specific known errors, we can also do a check against the
                                    // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                                    var decoded = api.registry.findMetaError(dispatchError.asModule);
                                    errorInfo = "".concat(decoded.section, ".").concat(decoded.name);
                                }
                                else {
                                    console.log('TP5', index);
                                    // Other, CannotLookup, BadOrigin, no extra info
                                    errorInfo = dispatchError.toString();
                                }
                                console.log('TP7', index);
                                console.log("ExtrinsicFailed, ".concat(errorInfo));
                            }
                        });
                    }
                    // return 'ExtrinsicFailed';
                    console.log("ExtrinsicFailed");
                });
                return [2 /*return*/];
        }
    });
}); };
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
var sampleTransfer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, api, testAcnt1, testAcnt2, trsfRawTx, keyring, testAcnt2Mnemonic, testAcnt2Key, signedTx, txhash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                provider = new WsProvider('wss://rpc.shibuya.astar.network');
                api = new ApiPromise({ provider: provider });
                testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                console.log('===== STEP1-RawTx-Start =====');
                trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
                console.log(trsfRawTx);
                // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                console.log('===== ===== =====');
                console.log("".concat(trsfRawTx));
                // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
                console.log('===== STEP1-RawTx-End =====');
                console.log('===== STEP2-SignRawTx-Start =====');
                keyring = new Keyring({ type: 'sr25519' });
                testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
                console.log("testAcnt2Key : ".concat(testAcnt2Key.address));
                // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
                console.log('===== ===== =====');
                return [4 /*yield*/, trsfRawTx.signAsync(testAcnt2Key)];
            case 2:
                signedTx = _a.sent();
                console.log(signedTx);
                // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                console.log('===== ===== =====');
                console.log("signedTx : ".concat(signedTx));
                // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
                console.log('===== STEP2-SignRawTx-End =====');
                console.log('===== STEP3-SendSignedTx-Start =====');
                return [4 /*yield*/, signedTx.send()];
            case 3:
                txhash = _a.sent();
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
                console.log("txhash : ".concat(txhash));
                // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
                console.log('===== STEP3-SendSignedTx-End =====');
                return [2 /*return*/];
        }
    });
}); };
// sampleTransfer().catch(console.error).finally(() => process.exit());
// ===== ===== =====
// https://polkadot.js.org/docs/api/start/basics
var testBasicsMetadata = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockHash, metaData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
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
            return [4 /*yield*/, api.isReady];
            case 1:
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
                _a.sent();
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
                console.log('===');
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
                console.log('===');
                console.log(api.runtimeVersion.specName.toString()); // shibuya | polkadot
                console.log(api.runtimeVersion.implName.toString()); // shibuya | parity-polkadot
                console.log(api.runtimeVersion.authoringVersion.toString()); // 1 | 0
                console.log(api.runtimeVersion.specVersion.toString()); // 92 | 9370
                console.log(api.runtimeVersion.implVersion.toString()); // 0 | 0
                console.log(api.runtimeVersion.transactionVersion.toString()); // 2 | 20
                console.log(api.runtimeVersion.stateVersion.toString()); // 1 | 0
                console.log(api.runtimeVersion.metadata); // TypeError
                return [4 /*yield*/, api.rpc.chain.getBlockHash()];
            case 2:
                blockHash = _a.sent();
                // console.log(blockHash);
                console.log("".concat(blockHash)); // 0xd41b437c08fb42de5f604f8c1ac5ce2a33503a92abad6337554cd44c48d4483a
                return [4 /*yield*/, api.rpc.state.getMetadata(blockHash)];
            case 3:
                metaData = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// testBasicsMetadata().catch(console.error).finally(() => process.exit());
// https://polkadot.js.org/docs/api/start/create
var testCreateAnInstance = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
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
            return [4 /*yield*/, api.isReady];
            case 1:
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
                _a.sent();
                console.log(api.genesisHash.toHex());
                return [2 /*return*/];
        }
    });
}); };
// testCreateAnInstance().catch(console.error).finally(() => process.exit());
// https://polkadot.js.org/docs/api/start/api.consts
var testRuntimeConstants = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            /**
             * Constant queries will introduce you to the concepts behind the types and the interaction of the API with those types.
             * The same concepts are implemented in the remainder of the API - the runtime constants is just the simplest starting point.
             * For some background: constants are values that are defined in the runtime and used as part of chain operations.
             * These constants can be changed as part of an upgrade.
             */
            return [4 /*yield*/, api.isReady];
            case 1:
                /**
                 * Constant queries will introduce you to the concepts behind the types and the interaction of the API with those types.
                 * The same concepts are implemented in the remainder of the API - the runtime constants is just the simplest starting point.
                 * For some background: constants are values that are defined in the runtime and used as part of chain operations.
                 * These constants can be changed as part of an upgrade.
                 */
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// testRuntimeConstants().catch(console.error).finally(() => process.exit());
// https://polkadot.js.org/docs/api/start/api.query/
var testStateQueries = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ADDR, _a, now, _b, nonce, balance;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: 
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
            return [4 /*yield*/, api.isReady];
            case 1:
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
                _c.sent();
                ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                return [4 /*yield*/, Promise.all([
                        api.query.timestamp.now(),
                        api.query.system.account(ADDR)
                    ])];
            case 2:
                _a = _c.sent(), now = _a[0], _b = _a[1], nonce = _b.nonce, balance = _b.data;
                console.log("".concat(now, ": balance of ").concat(balance.free, " and a nonce of ").concat(nonce));
                return [2 /*return*/];
        }
    });
}); };
// testStateQueries().catch(console.error).finally(() => process.exit());
// https://polkadot.js.org/docs/api/start/api.rpc
var testRPCQueries = function () { return __awaiter(void 0, void 0, void 0, function () {
    var chain, lastHeader;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            /**
             * The RPC calls provide the backbone for the transmission of data to and from the node.
             * This means that all API endpoints such as api.query, api.tx or api.derive just wrap RPC calls,
             * providing information in the encoded format as expected by the node.
             *
             * Since you are already familiar with the api.query interface, the api.rpc interface follows the same format, for instance -
             */
            return [4 /*yield*/, api.isReady];
            case 1:
                /**
                 * The RPC calls provide the backbone for the transmission of data to and from the node.
                 * This means that all API endpoints such as api.query, api.tx or api.derive just wrap RPC calls,
                 * providing information in the encoded format as expected by the node.
                 *
                 * Since you are already familiar with the api.query interface, the api.rpc interface follows the same format, for instance -
                 */
                _a.sent();
                return [4 /*yield*/, api.rpc.system.chain()];
            case 2:
                chain = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getHeader()];
            case 3:
                lastHeader = _a.sent();
                // Log the information
                console.log("".concat(chain, ": last block #").concat(lastHeader.number, " has hash ").concat(lastHeader.hash));
                return [2 /*return*/];
        }
    });
}); };
// testRPCQueries().catch(console.error).finally(() => process.exit());
// https://polkadot.js.org/docs/api/start/api.rpc
/**
 * The api.derive interfaces will be covered in a follow-up section,
 * but since the above example deals with new head subscriptions, a quick detour is warranted.
 * The derives are just helpers that define certain functions and combine results from multiple sources.
 * For new headers, the following information is useful in certain scenarios -
 */
var unsub = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                api.derive.chain.subscribeNewHeads(function (lastHeader) {
                    console.log("#".concat(lastHeader.number, " was authored by ").concat(lastHeader.author));
                });
                return [2 /*return*/];
        }
    });
}); };
/**
 * In the above case the subscribeNewHeads derive augments the header retrieved with an .author getter.
 * This is done by parsing the actual header and logs received and filling in the author from the api.query.session.validators call.
 */
// unsub();
// https://polkadot.js.org/docs/api/start/api.query.subs/
var testQuerySubscriptions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ADDR;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                api.query.timestamp.now(function (moment) {
                    console.log("The last block has a timestamp of ".concat(moment));
                });
                ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                api.query.system.account(ADDR, function (_a) {
                    var nonce = _a.nonce, balance = _a.data;
                    console.log("free balance is ".concat(balance.free, " with ").concat(balance.reserved, " reserved and a nonce of ").concat(nonce));
                });
                return [2 /*return*/];
        }
    });
}); };
// testQuerySubscriptions();
// https://polkadot.js.org/docs/api/start/api.query.multi
var testMultiQueries = function () { return __awaiter(void 0, void 0, void 0, function () {
    var validatorKeys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            /**
             * A couple of items to note in the example above: we don't call account directly, but rather account.multi.
             * We pass the addresses we want to query as an array, and the length thereof would depend on the number of addresses we want to query.
             * As an extended example, we can track the balances of a list of validators,
             */
            return [4 /*yield*/, api.isReady];
            case 1:
                /**
                 * A couple of items to note in the example above: we don't call account directly, but rather account.multi.
                 * We pass the addresses we want to query as an array, and the length thereof would depend on the number of addresses we want to query.
                 * As an extended example, we can track the balances of a list of validators,
                 */
                _a.sent();
                return [4 /*yield*/, api.query.staking.validators.keys()];
            case 2:
                validatorKeys = _a.sent();
                // TypeError: Cannot read properties of undefined (reading 'validators')
                // Subscribe to the balances for these accounts
                api.query.balances.account.multi(validatorKeys, function (balances) {
                    console.log("The nonce and free balances are: ".concat(balances.map(function (_a) {
                        var nonce = _a[0], free = _a[1].free;
                        return [nonce, free];
                    })));
                });
                return [2 /*return*/];
        }
    });
}); };
// testMultiQueries();
// https://polkadot.js.org/docs/api/start/api.query.other
var testQueryExtras = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ADDR, activeEra, exposures;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            /**
             * In previous sections we took a walk through queries, showing how to use one-shot queries,
             * how to subscribe to results and how to combine multiple queries into one.
             * This section will aim to extend that knowledge showing some other features and utilities that are available on the api.query interfaces.
             *
             * State at a specific block
             * Quite often it is useful (taking pruning into account, more on this later) to retrieve the state at a specific block.
             * For instance we may wish to retrieve the current balance as well as the balance at a previous block for a specific account -
             */
            return [4 /*yield*/, api.isReady];
            case 1:
                /**
                 * In previous sections we took a walk through queries, showing how to use one-shot queries,
                 * how to subscribe to results and how to combine multiple queries into one.
                 * This section will aim to extend that knowledge showing some other features and utilities that are available on the api.query interfaces.
                 *
                 * State at a specific block
                 * Quite often it is useful (taking pruning into account, more on this later) to retrieve the state at a specific block.
                 * For instance we may wish to retrieve the current balance as well as the balance at a previous block for a specific account -
                 */
                _a.sent();
                ADDR = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                return [4 /*yield*/, api.query.staking.activeEra()];
            case 2:
                activeEra = _a.sent();
                return [4 /*yield*/, api.query.staking.erasStakers.entries(activeEra.unwrap().index)];
            case 3:
                exposures = _a.sent();
                exposures.forEach(function (_a) {
                    var key = _a[0], exposure = _a[1];
                    console.log('key arguments:', key.args.map(function (k) { return k.toHuman(); }));
                    console.log('     exposure:', exposure.toHuman());
                });
                return [2 /*return*/];
        }
    });
}); };
// testQueryExtras().catch(console.error).finally(() => process.exit());
// https://polkadot.js.org/docs/api/start/api.tx
var testTransactions = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
// https://polkadot.js.org/docs/api/start/keyring
var testKeyring = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testAcnt1, testAcnt2, trsfRawTx, keyring, testAcnt2Mnemonic, testAcnt2Key, signature, isValid, signedTx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                console.log('===== STEP1-RawTx-Start =====');
                trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
                console.log(trsfRawTx);
                // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                console.log('===== ===== =====');
                console.log("".concat(trsfRawTx));
                // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
                console.log('===== STEP1-RawTx-End =====');
                console.log('===== STEP2-SignRawTx-Start =====');
                keyring = new Keyring({ type: 'sr25519' });
                testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
                console.log("testAcnt2Key : ".concat(testAcnt2Key.address));
                // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
                console.log('===== sign-Method-Start =====');
                signature = testAcnt2Key.sign(trsfRawTx);
                console.log("signature : ".concat(u8aToHex(signature)));
                console.log('===== ===== =====');
                isValid = testAcnt2Key.verify(trsfRawTx, signature, testAcnt2Key.publicKey);
                // Log info
                console.log("The signature ".concat(u8aToHex(signature), ", is ").concat(isValid ? '' : 'in', "valid"));
                console.log('===== sign-Method-End =====');
                console.log('===== ===== =====');
                console.log('===== signAsync-Method-Start =====');
                return [4 /*yield*/, trsfRawTx.signAsync(testAcnt2Key)];
            case 2:
                signedTx = _a.sent();
                console.log(signedTx);
                // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                console.log('===== ===== =====');
                console.log("signedTx : ".concat(signedTx));
                // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
                console.log('===== signAsync-Method-Start =====');
                console.log('===== STEP2-SignRawTx-End =====');
                return [2 /*return*/];
        }
    });
}); };
// testKeyring().catch(console.error).finally(() => process.exit());
// https://polkadot.js.org/docs/api/start/api.tx.subs
var testTransactionSubscriptions = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
// https://polkadot.js.org/docs/substrate/extrinsics/#transferallowdeathdest-multiaddress-value-compactu128
var testTransfer2 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testAcnt1, testAcnt2, trsfRawTx, serial, deserial, keyring, testAcnt2Mnemonic, testAcnt2Key, signedTxSerial, signedTxDeserial, txhash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                console.log('===== STEP1-RawTx-Start =====');
                trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
                console.log(trsfRawTx);
                /**
                 * Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                 */
                // console.log('===== ===== =====');
                // console.log(`trsfRawTx-type : ${typeof trsfRawTx}`); // object
                console.log('===== ===== =====');
                console.log("".concat(trsfRawTx));
                serial = trsfRawTx.toHex();
                console.log(serial); // 0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602
                console.log('===== ===== =====');
                console.log(JSON.parse(trsfRawTx)); // JSON
                console.log('===== ===== =====');
                console.log(Object.getOwnPropertyDescriptors(trsfRawTx));
                // console.log(Object.getOwnPropertyDescriptors(tmpJson));
                // console.log(Object.getOwnPropertyDescriptors(trsfRawTx.registry));
                console.log('===== STEP1-RawTx-End =====');
                deserial = api.tx(serial);
                console.log(deserial);
                console.log('===== STEP2-SignRawTx-Start =====');
                keyring = new Keyring({ type: 'sr25519' });
                testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
                // console.log(`testAcnt2Key : ${testAcnt2Key.address}`);
                // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
                // last// testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
                console.log('===== sign-Method-Start =====');
                signedTxSerial = "0x4d028400e24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e01741632175d30b35be3288e5ac111494efc64cf629268f376bcd969e8983c60229960c699b512b6a77e55f22e9091833112ee536784398310c602b0d004cae186640020001f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602";
                signedTxDeserial = api.tx(signedTxSerial);
                console.log(signedTxDeserial);
                console.log("".concat(signedTxDeserial));
                return [4 /*yield*/, signedTxDeserial.send()];
            case 2:
                txhash = _a.sent();
                console.log(txhash);
                return [2 /*return*/];
        }
    });
}); };
// testTransfer2().catch(console.error).finally(() => process.exit());
var testOffChain = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testAcnt1, testAcnt2, trsfRawTx, serial, keyring, testAcnt2Mnemonic, testAcnt2Key, signedTx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                console.log('===== STEP1-RawTx-Start =====');
                trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
                console.log(trsfRawTx); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                console.log('===== ===== =====');
                console.log("trsfRawTx-type : ".concat(typeof trsfRawTx)); // object
                console.log('===== ===== =====');
                console.log("".concat(trsfRawTx)); // { "signature": { "signer": { "id": "VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy" }, "signature": { "ed25519": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" }, "era": { "immortalEra": "0x00" }, "nonce": 0, "tip": 0 }, "method": { "callIndex": "0x1f00", "args": { "dest": { "id": "VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U" }, "value": "0x000000000000000002c68af0bb140000" } } }
                console.log('===== ===== =====');
                serial = trsfRawTx.toHex();
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
                keyring = new Keyring({ type: 'sr25519' });
                testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
                return [4 /*yield*/, trsfRawTx.signAsync(testAcnt2Key)];
            case 2:
                signedTx = _a.sent();
                // console.log(signedTx);
                // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
                console.log(JSON.parse(signedTx)); // JSON
                console.log('===== ===== =====');
                console.log("signedTx-type : ".concat(typeof signedTx)); // object
                console.log('===== ===== =====');
                console.log("signedTx : ".concat(signedTx));
                // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
                console.log('===== signAsync-Method-Start =====');
                console.log('===== STEP2-SignRawTx-End =====');
                return [2 /*return*/];
        }
    });
}); };
// testOffChain().catch(console.error).finally(() => process.exit());
var testOffline = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testAcnt1, testAcnt2, chain, lastHeader, blockHash, metaData, accountBalInfo, nonceTestAcnt2, trsfRawTx, unsigned, signingPayload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
                return [4 /*yield*/, api.rpc.system.chain()];
            case 2:
                chain = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getHeader()];
            case 3:
                lastHeader = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash(lastHeader.number)];
            case 4:
                blockHash = _a.sent();
                return [4 /*yield*/, api.rpc.state.getMetadata(blockHash)];
            case 5:
                metaData = _a.sent();
                return [4 /*yield*/, api.derive.balances.account(testAcnt2)];
            case 6:
                accountBalInfo = _a.sent();
                nonceTestAcnt2 = accountBalInfo.accountNonce.toString();
                trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
                unsigned = methods.balances.transferKeepAlive({
                    dest: testAcnt1,
                    value: '200000000000000000',
                }, {
                    address: testAcnt2,
                    blockHash: blockHash,
                    blockNumber: lastHeader.number,
                    genesisHash: u8aToHex(api.genesisHash),
                    metadataRpc: metaData.toHex(),
                    nonce: nonceTestAcnt2,
                    specVersion: api.runtimeVersion.specVersion.toString(),
                    transactionVersion: api.runtimeVersion.transactionVersion.toString()
                }, {
                    metadataRpc: metaData.toHex(),
                    registry: trsfRawTx.registry
                });
                signingPayload = createSigningPayload(unsigned, trsfRawTx.registry);
                console.log(signingPayload);
                return [2 /*return*/];
        }
    });
}); };
// testOffline().catch(console.error).finally(() => process.exit());
// rpcToLocalNode
var mandala = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testAcnt1, testAcnt2, keyring, testAcnt2Mnemonic, testAcnt2Key, block, block_api, blockHash, blockHash_api, genesisHash, genesisHash_api, metadataRpc, metadataRpc_api, _a, specVersion, transactionVersion, specName, runtime_api, registry, registry_api, accountBalInfo, nonceTestAcnt2, unsigned_api;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _b.sent();
                testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
                return [4 /*yield*/, cryptoWaitReady()];
            case 2:
                _b.sent();
                keyring = new Keyring({ type: 'sr25519' });
                testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
                console.log(testAcnt2Key.publicKey);
                console.log(u8aToHex(testAcnt2Key.publicKey));
                console.log(deriveAddress(testAcnt2Key.publicKey, 42));
                return [4 /*yield*/, rpcToLocalNode('chain_getBlock')];
            case 3:
                block = (_b.sent()).block;
                return [4 /*yield*/, api.rpc.chain.getBlock()];
            case 4:
                block_api = _b.sent();
                return [4 /*yield*/, rpcToLocalNode('chain_getBlockHash')];
            case 5:
                blockHash = _b.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash()];
            case 6:
                blockHash_api = _b.sent();
                return [4 /*yield*/, rpcToLocalNode('chain_getBlockHash', [0])];
            case 7:
                genesisHash = _b.sent();
                return [4 /*yield*/, api.genesisHash];
            case 8:
                genesisHash_api = _b.sent();
                return [4 /*yield*/, rpcToLocalNode('state_getMetadata')];
            case 9:
                metadataRpc = _b.sent();
                return [4 /*yield*/, api.rpc.state.getMetadata()];
            case 10:
                metadataRpc_api = _b.sent();
                return [4 /*yield*/, rpcToLocalNode('state_getRuntimeVersion')];
            case 11:
                _a = _b.sent(), specVersion = _a.specVersion, transactionVersion = _a.transactionVersion, specName = _a.specName;
                return [4 /*yield*/, api.rpc.state.getRuntimeVersion()];
            case 12:
                runtime_api = _b.sent();
                registry = getRegistry({
                    chainName: 'shibuya',
                    specName: specName,
                    specVersion: specVersion,
                    metadataRpc: metadataRpc,
                });
                registry_api = getRegistry({
                    chainName: 'shibuya',
                    specName: runtime_api.specVersion.toNumber(),
                    specVersion: runtime_api.transactionVersion.toNumber(),
                    metadataRpc: metadataRpc_api.toHex(),
                });
                return [4 /*yield*/, api.derive.balances.account(testAcnt2)];
            case 13:
                accountBalInfo = _b.sent();
                nonceTestAcnt2 = accountBalInfo.accountNonce.toString();
                console.log("nonceTestAcnt2: ".concat(nonceTestAcnt2));
                unsigned_api = methods.balances.transfer({
                    value: '2000000000000000',
                    dest: testAcnt1, // Bob
                }, {
                    address: deriveAddress(testAcnt2Key.publicKey, 42),
                    blockHash: blockHash_api.toHex(),
                    blockNumber: registry_api
                        .createType('BlockNumber', block_api.block.header.number.toHex())
                        .toNumber(),
                    eraPeriod: 64,
                    genesisHash: genesisHash_api.toHex(),
                    metadataRpc: metadataRpc_api.toHex(),
                    // nonce: 0, // Assuming this is Alice's first tx on the chain
                    nonce: nonceTestAcnt2,
                    specVersion: runtime_api.specVersion.toNumber(),
                    tip: 0,
                    transactionVersion: runtime_api.transactionVersion.toNumber(),
                }, {
                    metadataRpc: metadataRpc_api.toHex(),
                    registry: registry_api,
                });
                return [2 /*return*/];
        }
    });
}); };
// mandala().catch(console.error).finally(() => process.exit());
var cryptoApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testAcnt1, testAcnt2, keyring, testAcnt2Mnemonic, testAcnt2Key, block_api, blockHash_api, genesisHash_api, metadataRpc_api, runtime_api, registry_api, accountBalInfo, nonceTestAcnt2, unsigned_api, decodedUnsigned_api, signingPayload_api, payloadInfo_api, signature_api, tx_api, expectedTxHash_api;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
                return [4 /*yield*/, cryptoWaitReady()];
            case 2:
                _a.sent();
                keyring = new Keyring({ type: 'sr25519' });
                testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
                // console.log(testAcnt2Key.publicKey);
                // console.log(u8aToHex(testAcnt2Key.publicKey));
                // console.log(deriveAddress(testAcnt2Key.publicKey, 42));
                console.log("testAcnt2Key's SS58-Encoded Address:", deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
                );
                return [4 /*yield*/, api.rpc.chain.getBlock()];
            case 3:
                block_api = _a.sent();
                return [4 /*yield*/, api.rpc.chain.getBlockHash()];
            case 4:
                blockHash_api = _a.sent();
                return [4 /*yield*/, api.genesisHash];
            case 5:
                genesisHash_api = _a.sent();
                return [4 /*yield*/, api.rpc.state.getMetadata()];
            case 6:
                metadataRpc_api = _a.sent();
                return [4 /*yield*/, api.rpc.state.getRuntimeVersion()];
            case 7:
                runtime_api = _a.sent();
                // console.log(runtime_api);
                console.log('===== ===== =====');
                console.log(runtime_api.specVersion.toNumber());
                console.log('===== ===== =====');
                console.log(runtime_api.transactionVersion.toNumber());
                console.log('===== ===== =====');
                console.log(runtime_api.specName.toString());
                console.log('===== ===== =====');
                registry_api = getRegistry({
                    chainName: 'shibuya',
                    specName: runtime_api.specVersion.toNumber(),
                    specVersion: runtime_api.transactionVersion.toNumber(),
                    metadataRpc: metadataRpc_api.toHex(),
                });
                console.log(registry_api);
                return [4 /*yield*/, api.derive.balances.account(testAcnt2)];
            case 8:
                accountBalInfo = _a.sent();
                nonceTestAcnt2 = accountBalInfo.accountNonce.toString();
                console.log("nonceTestAcnt2: ".concat(nonceTestAcnt2));
                // const unsigned = methods.balances.transfer(
                //     {
                //         value: '20000000000000',
                //         dest: testAcnt1, // Bob
                //     },
                //     {
                //         address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
                //         blockHash: blockHash,
                //         blockNumber: registry
                //             .createType('BlockNumber', block.header.number)
                //             .toNumber(),
                //         eraPeriod: 64,
                //         // eraPeriod: 128,
                //         genesisHash: genesisHash,
                //         metadataRpc: metadataRpc,
                //         // nonce: 0, // Assuming this is Alice's first tx on the chain
                //         nonce: nonceTestAcnt2,
                //         specVersion: specVersion,
                //         tip: 0,
                //         transactionVersion: transactionVersion,
                //     },
                //     {
                //         metadataRpc: metadataRpc,
                //         registry: registry,
                //     }
                // );
                // console.log(unsigned);
                console.log('===== ===== =====');
                unsigned_api = methods.balances.transfer({
                    value: '2000000000000000',
                    dest: testAcnt1, // Bob
                }, {
                    // address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
                    address: testAcnt2,
                    blockHash: blockHash_api.toHex(),
                    blockNumber: registry_api
                        .createType('BlockNumber', block_api.block.header.number.toHex())
                        .toNumber(),
                    eraPeriod: 64,
                    genesisHash: genesisHash_api.toHex(),
                    metadataRpc: metadataRpc_api.toHex(),
                    // nonce: 0, // Assuming this is Alice's first tx on the chain
                    nonce: nonceTestAcnt2,
                    specVersion: runtime_api.specVersion.toNumber(),
                    tip: 0,
                    transactionVersion: runtime_api.transactionVersion.toNumber(),
                }, {
                    metadataRpc: metadataRpc_api.toHex(),
                    registry: registry_api,
                });
                console.log(unsigned_api);
                decodedUnsigned_api = decode(unsigned_api, {
                    metadataRpc: metadataRpc_api.toHex(),
                    registry: registry_api,
                });
                console.log(
                // TODO all the log messages need to be updated to be relevant to the method used
                "\nDecoded Transaction\n  To: ".concat(decodedUnsigned_api.method.args.dest, "\n") +
                    "  Amount: ".concat(decodedUnsigned_api.method.args.value));
                signingPayload_api = construct.signingPayload(unsigned_api, { registry: registry_api });
                console.log("\nPayload to Sign: ".concat(signingPayload_api));
                payloadInfo_api = decode(signingPayload_api, {
                    metadataRpc: metadataRpc_api.toHex(),
                    registry: registry_api,
                });
                console.log(
                // TODO all the log messages need to be updated to be relevant to the method used
                "\nDecoded Transaction\n  To: ".concat(payloadInfo_api.method.args.dest, "\n") +
                    "  Amount: ".concat(payloadInfo_api.method.args.value));
                signature_api = signWith(testAcnt2Key, signingPayload_api, {
                    metadataRpc: metadataRpc_api.toHex(),
                    registry: registry_api,
                });
                console.log("\nSignature: ".concat(signature_api));
                tx_api = construct.signedTx(unsigned_api, signature_api, {
                    metadataRpc: metadataRpc_api.toHex(),
                    registry: registry_api,
                });
                console.log("\nTransaction to Submit: ".concat(tx_api));
                expectedTxHash_api = construct.txHash(tx_api);
                console.log("\nExpected Tx Hash: ".concat(expectedTxHash_api));
                return [2 /*return*/];
        }
    });
}); };
cryptoApp().catch(console.error).finally(function () { return process.exit(); });
function rpcToLocalNode(method, params) {
    if (params === void 0) { params = []; }
    return fetch('https://shibuya.public.blastapi.io', {
        body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            method: method,
            params: params,
        }),
        headers: {
            'Content-Type': 'application/json',
            connection: 'keep-alive',
        },
        method: 'POST',
    })
        .then(function (response) { return response.json(); })
        .then(function (_a) {
        var error = _a.error, result = _a.result;
        if (error) {
            throw new Error("".concat(error.code, " ").concat(error.message, ": ").concat(JSON.stringify(error.data)));
        }
        return result;
    });
}
exports.rpcToLocalNode = rpcToLocalNode;
/**
 * Signing function. Implement this on the OFFLINE signing device.
 *
 * @param pair - The signing pair.
 * @param signingPayload - Payload to sign.
 * @returns A signed ExtrinsicPayload returns a signature with the type `0x${string}` via polkadot-js.
 */
function signWith(pair, signingPayload, options) {
    var registry = options.registry, metadataRpc = options.metadataRpc;
    // Important! The registry needs to be updated with latest metadata, so make
    // sure to run `registry.setMetadata(metadata)` before signing.
    registry.setMetadata((0, txwrapper_polkadot_1.createMetadata)(registry, metadataRpc));
    var signature = registry
        .createType('ExtrinsicPayload', signingPayload, {
        version: Extrinsic_1.EXTRINSIC_VERSION,
    })
        .sign(pair).signature;
    return signature;
}
exports.signWith = signWith;
