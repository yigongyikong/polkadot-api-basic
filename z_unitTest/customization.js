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
var _this = this;
var Keyring = require('@polkadot/keyring').Keyring;
var _a = require('@polkadot/util-crypto'), mnemonicGenerate = _a.mnemonicGenerate, mnemonicToEntropy = _a.mnemonicToEntropy, mnemonicToLegacySeed = _a.mnemonicToLegacySeed, mnemonicToMiniSecret = _a.mnemonicToMiniSecret, mnemonicValidate = _a.mnemonicValidate, cryptoWaitReady = _a.cryptoWaitReady;
var _b = require('@polkadot/util'), stringToU8a = _b.stringToU8a, u8aToHex = _b.u8aToHex;
var keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
var ApiPromise = require('@polkadot/api').ApiPromise;
var WsProvider = require('@polkadot/rpc-provider').WsProvider;
var options = require('@astar-network/astar-api').options;
var createWallet = function () { return __awaiter(_this, void 0, void 0, function () {
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
var revisitCrypto = function () { return __awaiter(_this, void 0, void 0, function () {
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
var makeRawTxAndSign = function () { return __awaiter(_this, void 0, void 0, function () {
    var jisb, provider, api, trsfRawTx, keyring, testMnemonic, testKey, signedTx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jisb = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
                provider = new WsProvider('wss://rpc.shibuya.astar.network');
                api = new ApiPromise(options({ provider: provider }));
                return [4 /*yield*/, api.isReady];
            case 1:
                _a.sent();
                trsfRawTx = api.tx.balances.transfer(jisb, BigInt(200000000000000000));
                keyring = new Keyring({ type: 'sr25519' });
                testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
                testKey = keyring.addFromUri(testMnemonic, 'sr25519');
                console.log("testKey : ".concat(testKey)); // testKey : [object Object]
                console.log("testKey : ".concat(testKey.address)); // testKey : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
                return [4 /*yield*/, trsfRawTx.signAsync(testKey)];
            case 2:
                signedTx = _a.sent();
                console.log("signedTx : ".concat(signedTx));
                return [2 /*return*/];
        }
    });
}); };
// const signRawTx = async () => {
//     const rawTx = makeRawTx();
// }
// createWallet();
// revisitCrypto();
makeRawTxAndSign().catch(console.error).finally(function () { return process.exit(); });
