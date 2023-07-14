const { Keyring } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { SubmittableExtrinsic } = require('@polkadot/api/promise/submittable/types');
const { createWrapTx } = require('@substrate/txwrapper');
const { getRegistry } = require('@substrate/txwrapper/lib/registry');

const PROVIDER_URL = '<YOUR_POLKADOT_NODE_URL>';
const KEYRING_MNEMONIC = '<YOUR_KEYRING_MNEMONIC>';
const STAKING_CONTRACT_ADDRESS = '<YOUR_STAKING_CONTRACT_ADDRESS>';
const ASTR_ASSET_ID = '<YOUR_ASTR_ASSET_ID>'; // The asset ID of ASTR on the parachain
const STAKING_DURATION = 28 * 24 * 60 * 60; // Staking duration in seconds (28 days)

async function main() {
  // Wait for the crypto library to be ready
  await cryptoWaitReady();

  // Connect to the Polkadot node
  const { ApiPromise, WsProvider } = require('@polkadot/api');
  const provider = new WsProvider(PROVIDER_URL);
  const api = await ApiPromise.create({ provider });

  // Create a keyring from the mnemonic
  const keyring = new Keyring({ type: 'sr25519' });
  const account = keyring.addFromMnemonic(KEYRING_MNEMONIC);

  // Get the asset information for ASTR on the parachain
  const registry = getRegistry(api);
  const assetInfo = registry.createType('AssetId', ASTR_ASSET_ID);

  // Get the balance of ASTR in the account
  const { data: balance } = await api.query.system.account(account.address);
  const astrBalance = balance.free.find(({ assetId }) => assetId.eq(assetInfo))?.balance || 0;

  // Check if the account has enough ASTR to stake
  if (astrBalance.lt(100)) {
    console.error('Insufficient ASTR balance to stake.');
    return;
  }

  // Create the staking transaction
  const stakingTx = await createWrapTx(
    api,
    {
      palletName: 'staking',
      callableName: 'bond',
      inputParams: [
        STAKING_CONTRACT_ADDRESS,
        100000000000, // 100 ASTR (in Planck)
        STAKING_DURATION,
      ],
    },
    { account }
  );

  // Sign the transaction using the keyring
  const stakingExtrinsic = new SubmittableExtrinsic(registry, stakingTx, { signer: account });
  await stakingExtrinsic.signAsync(keyring, { nonce: -1 });

  // Send the transaction to the network
  const txHash = await api.rpc.author.submitExtrinsic(stakingExtrinsic);
  console.log(`Transaction sent: ${txHash}`);
}

main().catch(console.error);

/**
 * 
This code uses the @polkadot/api library to connect to a Polkadot node and the @substrate/txwrapper library to create and sign the staking transaction. You will need to replace the placeholders in the code with your own Polkadot node URL, keyring mnemonic, staking contract address, ASTR asset ID, and staking duration.

The main function creates a keyring from the mnemonic, connects to the Polkadot node, and gets the ASTR balance
 * 
 */