const {
    construct,
    methods,
} = require('@substrate/txwrapper-polkadot');

const unsigned = methods.balances.transfer(
    {
        dest: 'FoQJpPyadYccjavVdTWxpxU7rUEaYhfLCPwXgkfD6Zat9QP',
        value: 100,
    },
    {
        // Additional information needed to construct the transaction offline.
    }
);

const signingPayload = construct.signingPayload(unsigned, { registry });
// On your offline device, sign the payload.
const signature = myOfflineSigning(signingPayload);

// `tx` is ready to be broadcasted.
const tx = construct.signedTx(unsigned, signature, { metadataRpc, registry });