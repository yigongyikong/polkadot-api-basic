const { methods } = require('@substrate/txwrapper-substrate');
const { Keyring } = require('@polkadot/api');

// Load keyring and account details
const keyring = new Keyring({ type: 'sr25519' });
const alice = keyring.addFromUri('//Alice');

// Define staking parameters
const amount = BigInt(5000000000000000000); // 5 ASTR (in Planck)
const rewardDestination = 'Staked'; // set the reward destination to Staked
const stakingInfo = {
  controller: alice.address,
  stash: alice.address,
  value: amount,
  payee: rewardDestination,
};

// Define transaction information
const baseTxInfo = {
  nonce: 0,
  eraPeriod: 64,
  tip: 0,
};

// Define transaction options
const options = {
  metadataRpc: 'http://localhost:9933',
  registryRpc: 'http://localhost:9933',
  specName: 'rococo-local',
  specVersion: 2006,
  transactionVersion: 2,
  genesisHash:
    '0x255da8c83a63e87a7425f025039b2a8c0f32bf6527f3d3a3b8d1db61f58a96a1',
};

// Create the staking.bond method call
const bondCall = methods.staking.bond(stakingInfo, baseTxInfo, options);

// Send the transaction
const txHash = await api.tx(bondCall).signAndSend(alice);
console.log(`Staking transaction has been submitted with hash ${txHash}`);
