const { Astar } = require('@airbloc/airbloc-utils');
const Web3 = require('web3');
const ethUtil = require('ethereumjs-util');

const web3 = new Web3('<YOUR_INFURA_ENDPOINT>');
const privateKey = '<YOUR_PRIVATE_KEY>';

const stakingContractAddress = '<YOUR_STAKING_CONTRACT_ADDRESS>';
const stakingContractABI = <YOUR_STAKING_CONTRACT_ABI>;

const astarContractAddress = '<YOUR_ASTAR_CONTRACT_ADDRESS>';
const astarContractABI = <YOUR_ASTAR_CONTRACT_ABI>;

const astar = new web3.eth.Contract(astarContractABI, astarContractAddress);
const stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);

async function stakeASTAR(amount, duration) {
  const nonce = await web3.eth.getTransactionCount('<YOUR_ETH_ADDRESS>');
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 300000;

  const data = stakingContract.methods.stake(amount, duration).encodeABI();

  const tx = {
    nonce: nonce,
    to: stakingContractAddress,
    value: 0,
    data: data,
    gasPrice: gasPrice,
    gasLimit: gasLimit
  };

  const signedTx = await signTransaction(tx);
  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(result);
}

async function signTransaction(tx) {
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const signedRawTx = signedTx.rawTransaction;
  const txHash = ethUtil.keccak(signedRawTx);

  const signature = await web3.eth.accounts.sign(txHash, privateKey);
  const r = signature.r;
  const s = signature.s;
  const v = signature.v;

  const serializedTx = ethUtil.rlp.encode([
    ethUtil.toBuffer(tx.nonce),
    ethUtil.toBuffer(tx.gasPrice),
    ethUtil.toBuffer(tx.gasLimit),
    ethUtil.toBuffer(tx.to),
    ethUtil.toBuffer(tx.value),
    ethUtil.toBuffer(tx.data),
    ethUtil.toBuffer(v),
    ethUtil.toBuffer(r),
    ethUtil.toBuffer(s),
  ]);

  return { rawTransaction: `0x${serializedTx.toString('hex')}` };
}

stakeASTAR(100, 30); // Stakes 100 ASTAR for 30 days


/** 
 This code uses the @airbloc/airbloc-utils library for generating the Astar wallet address from the private key. You will need to replace the placeholders in the code with your own Infura endpoint, private key, staking contract address and ABI, and ASTAR contract address and ABI.

The stakeASTAR function takes the amount of ASTAR to stake and the duration of the stake in days as parameters. It calculates the nonce, gas price, and gas limit for the transaction, encodes the transaction data using the stakingContract.methods.stake method, signs the transaction offline using the signTransaction function, and sends the signed transaction using web3.eth.sendSignedTransaction.

Note that this code is just an example and you should make sure to test it thoroughly and adapt it to your specific use case before using it in production.
*/