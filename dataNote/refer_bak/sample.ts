// test-rpc.js in https://github.dev/AstarNetwork/astar-apps
/*
import { capitalize, describeWithNetwork, sendTransaction } from './util.js';

const CONTRACT = '0x0000000000000000000000000000000000000001'; //0x01
const ALICE = 'ajYMsCKsEAhEvHpeA4XqsfiA9v1CdzZPrCfS6pEfeGHW9j8';
const BOB = 'ZAP5o2BjWAo5uoKDE6b6Xkk4Ju7k6bDu24LNjgZbfM3iyiR';
const CHARLIE = 'ZD39yAE4W4RiXCyk1gv6CD2tSaVjQU5KoKfujyft4Xa2GAz';
const DAVE = 'X2mE9hCGX771c3zzV6tPa8U2cDz4U4zkqUdmBrQn83M3cm7';

export const getAddressEnum = (address) => ({ Evm: address });

it('should fetch chain from rpc node', async function () {
  const chain = await context.api.rpc.system.chain();

  expect(chain.toString()).to.equal(`${capitalize(network)} Testnet`);
});

it('should fetch chain name from rpc node', async () => {
  const name = await context.api.rpc.system.name();

  expect(name.toString()).to.equal('Astar Collator');
});

it('should be able to Register contract on H160 address 0x01 using Alice account', async () => {
  const finalised = await sendTransaction(
    context.api.tx.dappsStaking.register(getAddressEnum(CONTRACT)),
    context.alice
  );

  const dappInfoOpt = await context.api.query.dappsStaking.registeredDapps(
    getAddressEnum(CONTRACT)
  );

  expect(finalised).to.be.true;
  expect(dappInfoOpt.isSome).to.be.true;

  const dappInfo = dappInfoOpt.unwrap();

  expect(dappInfo.developer.toString()).to.equals(ALICE);
  expect(dappInfo.state.toString()).to.equals('Registered');
});

it('should be able to transfer tokens from alice to charlie', async () => {
  const originalBalance = await context.api.query.system.account(CHARLIE);
  const finalised = await sendTransaction(
    context.api.tx.balances.transfer({ Id: CHARLIE }, 100),
    context.alice
  );
  const newBalance = await context.api.query.system.account(CHARLIE);

  expect(finalised).to.be.true;
  expect(newBalance.data.free.sub(originalBalance.data.free).toNumber()).to.equal(100);
});
*/


// utils.js in ~
/**
 * sendTransaction: sign and send transaction from sender accounts.
 *
 * @param {*} transaction polkadot js api transaction
 * @param {*} sender account from which transaction needs to be sent
 *
 * @returns true when transaction is finalised
 */
/*
export const SPAWNING_TIME = 500000;
export async function sendTransaction(transaction, sender) {
  return new Promise((resolve, reject) => {
    let unsubscribe;
    let timeout;

    transaction
      .signAndSend(sender, async (result) => {
        console.log(`Current status is ${result?.status}`);

        if (result.isFinalized) {
          if (unsubscribe) {
            unsubscribe();
          }

          clearTimeout(timeout);
          resolve(true);
        }
      })
      .then((unsub) => {
        unsubscribe = unsub;
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });

    timeout = setTimeout(() => {
      reject(new Error('Transaction timeout'));
    }, SPAWNING_TIME);
  });
}
*/


// src/c-bridge/index.ts
// bridge-contents


// import { truncate } from '@astar-network/astar-sdk-core';
// import { StatsDetail, fetchDappTransactions, fetchDappUAW } from '@astar-network/astar-sdk-core';
// import { CommunityType, getShortenAddress } from '@astar-network/astar-sdk-core';
// import { Duration, filterStatsData, StatsDetail, StatsType, fetchNativeBalance, checkSumEvmAddress } from '@astar-network/astar-sdk-core';


// DeveloperIncentive.vue in ~
/*
const rewardsDeveloper = ref<number>(0);

const calcDeveloperRewards = async (): Promise<void> => {
  try {
    const api = $api!;
    const [rewardsAllocation, rewardsAmount, blockPerEra] = await Promise.all([
      api.query.blockReward.rewardDistributionConfigStorage<RewardDistributionConfig>(),
      api.consts.blockReward.rewardAmount.toString(),
      Number(api.consts.dappsStaking.blockPerEra.toString()),
    ]);
    const rewardsAmountPerEra = Number(ethers.utils.formatEther(rewardsAmount)) * blockPerEra;
    const numAdjToPercentage = 0.000000001;
    const dappsPercent = rewardsAllocation.dappsPercent.toNumber() * numAdjToPercentage;
    rewardsDeveloper.value = rewardsAmountPerEra * dappsPercent;
  } catch (error) {
    console.error(error);
  }
};
*/


// SidebarDestop.vue in ~
/*
const getIndicatorClass = (path: string): string => {
  switch (path) {
    case 'dashboard':
      return 'menu__dashboard';
    case 'assets':
      return 'menu__assets';
    case 'dapp-staking':
      return 'menu__staking';
    default:
      return 'menu__staking';
  }
};
*/


// staking.ts in ~
/*
import type { Contract } from 'web3-eth-contract/types';

export class Staking {
  public ci: Contract;
  public fromAddr: string;
  constructor(contractInstance: Contract, fromAddress: string) {
    this.ci = contractInstance;
    this.fromAddr = fromAddress;
  }

  // view getters
  getCurrentEra = async () => {
    return await this.ci.methods.read_current_era().call();
  };

  getUnbondingPeriod = async () => {
    return await this.ci.methods.read_unbonding_period().call();
  };

  getEraReward = async (era: number) => {
    return await this.ci.methods.read_era_reward(era).call();
  };

  getEraStaked = async (era: number) => {
    return await this.ci.methods.read_era_staked(era).call();
  };

  getStakedAmount = async (staker: string) => {
    return await this.ci.methods.read_staked_amount(staker).call();
  };

  getContractEraStake = async (contract_id: string, era: number) => {
    return await this.ci.methods.read_contract_era_stake(contract_id, era).call();
  };

  // extrinsic calls
  callRegister = async (contractAddr: string) => {
    return await this.ci.methods.register(contractAddr).send({ from: this.fromAddr });
  };

  callBondAndStake = async (contractAddr: string, amount: number) => {
    return await this.ci.methods.bond_and_stake(contractAddr, amount).send({ from: this.fromAddr });
  };

  callUnbondAndUnstake = async (contractAddr: string, amount: number) => {
    return await this.ci.methods
      .unbond_and_unstake(contractAddr, amount)
      .send({ from: this.fromAddr });
  };

  callWithdrawUnbonded = async () => {
    return await this.ci.methods.withdraw_unbonded().send({ from: this.fromAddr });
  };

  callClaim = async (contractAddr: string, amount: number) => {
    return await this.ci.methods.claim(contractAddr, amount).send({ from: this.fromAddr });
  };
}
*/


// useClaimedReward.ts in ~
/*
import { useAccount, useNetworkInfo } from 'src/hooks';
import { useCompoundRewards } from 'src/hooks/dapps-staking/useCompoundRewards';
import { useStore } from 'src/store';
import { computed, ref, watchEffect, watch } from 'vue';
import { wait, getClaimedAmount } from '@astar-network/astar-sdk-core';

export function useClaimedReward() {
  const store = useStore();
  const { isStaker, isDappOwner, isUnclaimedEra, isCompounding, setRewardDestination } =
    useCompoundRewards();
  const { currentAccount } = useAccount();
  const pastClaimed = ref<number>(0);
  const isLoadingClaimed = ref<boolean>(false);
  const isH160 = computed(() => store.getters['general/isH160Formatted']);

  const claimed = computed<number>(() => {
    // Memo: update the number of claimed rewards after users invoking claim action
    const claimedAmount = store.getters['dapps/getClaimedRewards'];
    return claimedAmount + pastClaimed.value;
  });

  const { currentNetworkName } = useNetworkInfo();

  const isEnable = computed<boolean>(() => {
    return isDappOwner.value || isStaker.value || isUnclaimedEra.value;
  });

  const setClaimedAmount = async () => {
    const isLocalNode = currentNetworkName.value === 'Development';
    const isFetch =
      currentNetworkName.value && currentAccount.value && !isH160.value && !isLocalNode;
    try {
      if (isFetch) {
        const result = await getClaimedAmount({
          network: currentNetworkName.value.toLowerCase(),
          account: currentAccount.value,
        });
        const animationDelay = 2000;
        await wait(animationDelay);
        pastClaimed.value = result;
        isLoadingClaimed.value = false;
      }
    } catch (error) {
      console.error(error);
      isLoadingClaimed.value = false;
    }
  };

  watchEffect(async () => {
    await setClaimedAmount();
  });

  // Memo: Reset the state whenever users access staking page
  // (to avoid the 'double sum bug' after claiming)
  watch(
    [currentNetworkName],
    () => {
      store.commit('dapps/setClaimedRewardsAmount', 0);
    },
    { immediate: true }
  );

  return {
    isEnable,
    claimed,
    isLoadingClaimed,
    isCompounding,
    setRewardDestination,
  };
}
*/


// useCompoundRewards.ts in ~
/*
import { DappCombinedInfo } from 'src/v2/models/DappsStaking';
import { Struct, u32, Vec } from '@polkadot/types';
import { Balance } from '@polkadot/types/interfaces';
import { ISubmittableResult } from '@polkadot/types/types';
import { BN } from '@polkadot/util';
import { $api } from 'boot/api';
import { useCustomSignature, useGasPrice } from 'src/hooks';
import { signAndSend } from 'src/hooks/helper/wallet';
import { hasExtrinsicFailedEvent } from 'src/modules/extrinsic';
import { useStore } from 'src/store';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { checkIsDappOwner, getNumberOfUnclaimedEra } from '@astar-network/astar-sdk-core';
import { useCurrentEra } from '../useCurrentEra';

type EraIndex = u32;

export enum RewardDestination {
  FreeBalance = 'FreeBalance',
  StakeBalance = 'StakeBalance',
}

interface UnlockingChunk extends Struct {
  amount: Balance;
  unlockEra: EraIndex;
}

interface UnbondingInfo extends Struct {
  unlockingChunks: Vec<UnlockingChunk>;
}

export interface AccountLedger extends Struct {
  locked: Balance;
  unbondingInfo: UnbondingInfo;
  rewardDestination: RewardDestination;
}

export function useCompoundRewards() {
  const store = useStore();
  const { t } = useI18n();
  const { isCustomSig, handleCustomExtrinsic } = useCustomSignature({});
  const currentAddress = computed(() => store.getters['general/selectedAddress']);
  const substrateAccounts = computed(() => store.getters['general/substrateAccounts']);
  const dapps = computed<DappCombinedInfo[]>(() => store.getters['dapps/getAllDapps']);
  const { selectedTip } = useGasPrice();
  const { era } = useCurrentEra();

  const isSupported = ref<boolean>(false);
  const isCompounding = ref<boolean>(false);
  const isStaker = ref<boolean>(false);
  const isUnclaimedEra = ref<boolean>(false);
  const isDappOwner = ref<boolean>(false);
  const toggleCounter = ref<number>(0);
  const rewardDestination = ref<RewardDestination>(RewardDestination.FreeBalance);

  const getCompoundingType = async () => {
    try {
      // Check if metadata contains set_reward_destination so we know
      // if compounding is supported by a node or not.
      const metadata = $api?.runtimeMetadata;
      const metadataJson = JSON.stringify(metadata?.toJSON());
      isSupported.value = metadataJson.includes('set_reward_destination');

      // Subscribe to compounding data.
      await $api?.query.dappsStaking.ledger(currentAddress.value, (ledger: AccountLedger) => {
        if (ledger && isSupported.value) {
          rewardDestination.value = ledger.rewardDestination;
          isCompounding.value =
            ledger.rewardDestination.toString() === RewardDestination.StakeBalance;
        }

        isStaker.value = !ledger.locked.eq(new BN(0));
      });
    } catch (err) {
      // Compounding rewards are not supported by a node if reading of ledger.rewardDestination fails
      // or in case of error while querying ledger value.
      console.warn(err);
    }
  };

  const setRewardDestination = async (rewardDestination: RewardDestination): Promise<void> => {
    try {
      const transaction = $api!.tx.dappsStaking.setRewardDestination(rewardDestination);
      const txResHandler = async (result: ISubmittableResult): Promise<boolean> => {
        return new Promise<boolean>(async (resolve) => {
          if (result.status.isFinalized) {
            let errorMessage = '';
            if (
              !hasExtrinsicFailedEvent(
                result.events,
                store.dispatch,
                (message: string) => (errorMessage = message)
              )
            ) {
              store.dispatch(
                'general/showAlertMsg',
                {
                  msg: t('dappStaking.toast.successfullySetRewardDest'),
                  alertType: 'success',
                  txHash: result.txHash.toString(),
                },
                { root: true }
              );
              resolve(true);
            } else {
              if (errorMessage.includes('TooManyEraStakeValues')) {
                errorMessage = t('dappStaking.toast.requiredClaimFirstCompounding', {
                  message: errorMessage,
                });
                resolve(false);
              }
            }

            store.commit('general/setLoading', false, { root: true });
          } else {
            store.commit('general/setLoading', true);
          }
        });
      };

      await signAndSend({
        transaction,
        senderAddress: currentAddress.value,
        substrateAccounts: substrateAccounts.value,
        isCustomSignature: isCustomSig.value,
        txResHandler,
        handleCustomExtrinsic,
        dispatch: store.dispatch,
        tip: selectedTip.value.price,
      });
      toggleCounter.value++;
    } catch (e: any) {
      console.error(e);
      store.dispatch('general/showAlertMsg', {
        msg: e.message,
        alertType: 'error',
      });
    }
  };

  const checkIsClaimable = async () => {
    if (!dapps.value || !currentAddress.value || !era.value) return;
    await Promise.all(
      dapps.value.map(async (it) => {
        const [resIsDappOwner, { numberOfUnclaimedEra, isRequiredWithdraw }] = await Promise.all([
          checkIsDappOwner({
            dappAddress: it.contract.address,
            api: $api!,
            senderAddress: currentAddress.value,
          }),
          getNumberOfUnclaimedEra({
            dappAddress: it.contract.address,
            api: $api!,
            senderAddress: currentAddress.value,
            currentEra: era.value,
          }),
        ]);

        if (resIsDappOwner) {
          isDappOwner.value = true;
        }

        if (numberOfUnclaimedEra > 0 || isRequiredWithdraw) {
          isUnclaimedEra.value = true;
        }
      })
    );
  };

  watch(
    [currentAddress, toggleCounter],
    async () => {
      if (!currentAddress.value) return;
      await Promise.all([checkIsClaimable(), getCompoundingType()]);
    },
    { immediate: true }
  );

  return {
    isSupported,
    isCompounding,
    rewardDestination,
    isStaker,
    isDappOwner,
    isUnclaimedEra,
    setRewardDestination,
  };
}
*/


// useSignPayload.ts in ~
/*
import { computed } from 'vue';
import { $api } from 'src/boot/api';
import { getInjector } from 'src/hooks/helper/wallet';
import { useStore } from 'src/store';
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';

export function useSignPayload() {
  const store = useStore();
  const selectedAddress = computed(() => store.getters['general/selectedAddress']);
  const substrateAccounts = computed(() => store.getters['general/substrateAccounts']);

  const signPayload = async (
    developerAddress: string,
    contractAddress: string
  ): Promise<string> => {
    const payload = $api?.tx.dappsStaking
      .register(developerAddress, getDappAddressEnum(contractAddress))
      .toHex();
    const injector = await getInjector(substrateAccounts.value);

    const result = await injector.signer.signRaw({
      address: selectedAddress.value,
      data: payload,
      type: 'bytes',
    });

    return result.signature;
  };

  return {
    signPayload,
  };
}
*/


// useStake.ts in ~
/*
import { ASTAR_DECIMALS } from '@astar-network/astar-sdk-core';
import { BN } from '@polkadot/util';
import { ethers } from 'ethers';
import { useAccount, useStakingList } from 'src/hooks';
import { balanceFormatter } from 'src/hooks/helper/plasmUtils';
import { Path } from 'src/router';
import { container } from 'src/v2/common';
import { IDappStakingService } from 'src/v2/services';
import { Symbols } from 'src/v2/symbols';
import { computed, ref, watch } from 'vue';
import { useNetworkInfo } from 'src/hooks';
import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

export function useStake() {
  const router = useRouter();
  const route = useRoute();
  const { currentAccount } = useAccount();
  const { stakingList } = useStakingList();
  const isStakePage = computed<boolean>(() => route.fullPath.includes('stake'));
  const addressTransferFrom = ref<string>(currentAccount.value);
  const { t } = useI18n();
  const store = useStore();
  const { nativeTokenSymbol } = useNetworkInfo();

  const setAddressTransferFrom = (address: string) => {
    addressTransferFrom.value = address;
  };

  const formattedTransferFrom = computed(() => {
    const defaultData = { text: '', item: null, isNominationTransfer: false };
    try {
      const stakingListRef = stakingList.value;
      if (!stakingListRef) return defaultData;
      const item = stakingListRef.find((it) => it.address === addressTransferFrom.value);
      if (!item) return defaultData;

      const name = item.name === currentAccount.value ? 'Transferable Balance' : item.name;
      const isNominationTransfer = item.address !== currentAccount.value;

      const formattedText = `${name} (${balanceFormatter(item.balance, ASTAR_DECIMALS)})`;
      return { text: formattedText, item, isNominationTransfer };
    } catch (error) {
      console.error(error);
      return defaultData;
    }
  });

  const handleStake = async ({
    amount,
    targetContractId,
  }: {
    amount: string;
    targetContractId: string;
  }) => {
    const stakeAmount = new BN(ethers.utils.parseEther(amount).toString());
    const dappStakingService = container.get<IDappStakingService>(Symbols.DappStakingService);
    const balance = new BN(formattedTransferFrom.value.item?.balance || '0');
    if (balance.lt(stakeAmount)) {
      store.dispatch('general/showAlertMsg', {
        msg: t('dappStaking.error.invalidBalance'),
        alertType: 'error',
      });
      return;
    }

    if (formattedTransferFrom.value.isNominationTransfer) {
      if (!formattedTransferFrom.value.item) return;
      await dappStakingService.nominationTransfer({
        fromContractId: formattedTransferFrom.value.item.address,
        targetContractId,
        address: currentAccount.value,
        amount: stakeAmount,
      });
    } else {
      await dappStakingService.stake(targetContractId, currentAccount.value, stakeAmount);
    }
    isStakePage.value && router.push(Path.DappStaking);
  };

  watch(
    [currentAccount],
    () => {
      addressTransferFrom.value = currentAccount.value;
    },
    { immediate: true }
  );

  return {
    formattedTransferFrom,
    currentAccount,
    setAddressTransferFrom,
    handleStake,
  };
}
*/


// useStakeInfo.ts in ~
/*
import { BN } from 'bn.js';
import { ethers } from 'ethers';
import { useAccount } from 'src/hooks';
import { useStore } from 'src/store';
import { StakeInfo } from 'src/store/dapp-staking/actions';
import { DappItem } from '@astar-network/astar-sdk-core';
import { DappCombinedInfo } from 'src/v2/models/DappsStaking';
import { computed, ref, watch, watchEffect } from 'vue';
import { container } from 'src/v2/common';
import { Symbols } from 'src/v2/symbols';
import { IDappStakingService } from 'src/v2/services';

export type MyStakeInfo = StakeInfo | DappItem;

export function useStakerInfo() {
  const { currentAccount } = useAccount();
  const store = useStore();

  store.dispatch('dapps/getStakingInfo');
  const isLoadingTotalStaked = ref<boolean>(true);
  const totalStaked = ref<string>('0');
  const stakeInfos = ref<StakeInfo[]>();
  const myStakeInfos = ref<MyStakeInfo[]>();
  const isLoading = computed(() => store.getters['general/isLoading']);
  const dapps = computed(() => store.getters['dapps/getAllDapps']);
  const isH160 = computed(() => store.getters['general/isH160Formatted']);

  const setStakeInfo = async () => {
    let data: StakeInfo[] = [];
    let myData: MyStakeInfo[] = [];

    const dappStakingService = container.get<IDappStakingService>(Symbols.DappStakingService);
    data = await Promise.all<StakeInfo>(
      dapps.value.map(async (it: DappCombinedInfo) => {
        const stakeData = await dappStakingService.getStakeInfo(
          it.dapp?.address!,
          currentAccount.value
        );
        if (stakeData?.hasStake) {
          myData.push({ ...stakeData, ...it.dapp });
        }
        return stakeData;
      })
    );

    stakeInfos.value = data;
    myStakeInfos.value = myData;
  };

  const setTotalStaked = (): void => {
    isLoadingTotalStaked.value = true;
    if (myStakeInfos.value && !isLoading.value) {
      let ttl = new BN('0');
      myStakeInfos.value.forEach((it) => {
        ttl = ttl.add(it.yourStake.denomAmount);
      });
      totalStaked.value = ethers.utils.formatEther(ttl.toString());
      isLoadingTotalStaked.value = false;
    }
  };

  watchEffect(async () => {
    if (isLoading.value || !dapps.value || !currentAccount.value) {
      return;
    }
    try {
      await setStakeInfo();
    } catch (error) {
      console.error(error);
    }
  });

  watch([currentAccount, myStakeInfos], setTotalStaked);

  return {
    stakeInfos,
    myStakeInfos,
    totalStaked,
    isLoadingTotalStaked,
  };
}
*/


// useStakingList.ts in ~
/*
import { DappCombinedInfo } from 'src/v2/models/DappsStaking';
import { ethers } from 'ethers';
import { useAccount, useBalance, useNetworkInfo } from 'src/hooks';
import { StakingData } from 'src/modules/dapp-staking/index';
import { getTokenImage } from 'src/modules/token';
import { useStore } from 'src/store';
import { computed, ref, watchEffect } from 'vue';

export function useStakingList() {
  const { currentAccount } = useAccount();
  const { accountData } = useBalance(currentAccount);
  const { nativeTokenSymbol } = useNetworkInfo();
  const store = useStore();
  const isLoading = computed(() => store.getters['general/isLoading']);
  const dapps = computed<DappCombinedInfo[]>(() => store.getters['dapps/getAllDapps']);
  const isH160 = computed(() => store.getters['general/isH160Formatted']);
  const nativeTokenImg = computed<string>(() =>
    getTokenImage({ isNativeToken: true, symbol: nativeTokenSymbol.value })
  );

  const stakingList = ref<StakingData[]>([
    {
      address: '',
      name: 'Transferable Balance',
      balance: '0',
      iconUrl: '',
    },
  ]);

  const setStakingList = (): void => {
    const dappsRef = dapps.value;
    const accountDataRef = accountData.value;
    const currentAccountRef = currentAccount.value;
    if (!accountDataRef || !currentAccountRef || isH160.value) return;
    try {
      const data = dappsRef.map((it) => {
        const accountStakingAmount = it.stakerInfo.accountStakingAmount;
        if (it.dapp && Number(accountStakingAmount)) {
          return {
            address: it.dapp.address,
            balance: ethers.utils.parseEther(accountStakingAmount).toString(),
            name: it.dapp.name,
            iconUrl: it.dapp.iconUrl,
          };
        } else {
          return undefined;
        }
      });

      data.unshift({
        address: currentAccountRef,
        name: 'Transferable Balance',
        balance: accountDataRef.getUsableFeeBalance().toString(),
        iconUrl: nativeTokenImg.value,
      });

      stakingList.value = data.filter((it) => it !== undefined) as StakingData[];
    } catch (error) {
      console.error(error);
    }
  };

  watchEffect(() => {
    if (isLoading.value || !dapps.value) {
      return;
    }
    setStakingList();
  });

  return {
    stakingList,
    dapps,
  };
}
*/


// useUnbond.ts in ~
/*
import { computed } from 'vue';
import { BN } from '@polkadot/util';
import { ethers } from 'ethers';
import { useAccount } from 'src/hooks';
import { container } from 'src/v2/common';
import { IDappStakingService } from 'src/v2/services';
import { Symbols } from 'src/v2/symbols';
import { useStore } from 'src/store';

export function useUnbound() {
  const store = useStore();
  const { currentAccount } = useAccount();
  const unbondingPeriod = computed(() => store.getters['dapps/getUnbondingPeriod']);

  const handleUnbound = async (contractAddress: string, amount: string | null): Promise<void> => {
    if (amount) {
      const unbondAmount = new BN(ethers.utils.parseEther(amount).toString());
      const dappStakingService = container.get<IDappStakingService>(Symbols.DappStakingService);
      await dappStakingService.unbondAndUnstake(
        contractAddress,
        currentAccount.value,
        unbondAmount
      );
    }
  };

  return {
    unbondingPeriod,
    handleUnbound,
  };
}
*/


// useUnbonding.ts in ~
/*
import { VoidFn } from '@polkadot/api/types';
import { u32 } from '@polkadot/types';
import { ISubmittableResult } from '@polkadot/types/types';
import BN from 'bn.js';
import { $api } from 'boot/api';
import { displayCustomMessage, TxType } from 'src/hooks/custom-signature/message';
import { useUnbondWithdraw } from 'src/hooks/useUnbondWithdraw';
import { useStore } from 'src/store';
import { computed, onUnmounted, ref, watch } from 'vue';
import { container } from 'src/v2/common';
import { IDappStakingService } from 'src/v2/services';
import { Symbols } from 'src/v2/symbols';
import { ChunkInfo } from 'src/v2/models';
import { useI18n } from 'vue-i18n';

export function useUnbonding() {
  const store = useStore();
  const { t } = useI18n();
  const selectedAccountAddress = computed(() => store.getters['general/selectedAddress']);
  const unlockingChunksCount = computed(() => store.getters['dapps/getUnlockingChunks']);
  const maxUnlockingChunks = computed(() => store.getters['dapps/getMaxUnlockingChunks']);
  const unbondingPeriod = computed(() => store.getters['dapps/getUnbondingPeriod']);
  const unlockingChunks = ref<ChunkInfo[]>();
  const canWithdraw = ref<boolean>(false);
  const totalToWithdraw = ref<BN>(new BN(0));
  const { canUnbondWithdraw } = useUnbondWithdraw($api);

  const withdraw = async (): Promise<void> => {
    try {
      const transaction = $api!.tx.dappsStaking.withdrawUnbonded();
      const finalizedCallback = (result: ISubmittableResult): void => {
        displayCustomMessage({
          txType: TxType.withdrawUnbonded,
          result,
          senderAddress: selectedAccountAddress.value,
          store,
          t,
        });
      };

      try {
        const dappStakingService = container.get<IDappStakingService>(Symbols.DappStakingService);
        await dappStakingService.sendTx({
          senderAddress: selectedAccountAddress.value,
          transaction,
          finalizedCallback,
        });
      } catch (error: any) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const subscribeToEraChange = async (): Promise<VoidFn | undefined> => {
    const unsub = (await $api?.query.dappsStaking.currentEra(async (era: u32) => {
      await getChunks(era);
    })) as VoidFn | undefined;

    return unsub;
  };

  const unsub = subscribeToEraChange();

  const getChunks = async (era: u32) => {
    if (!canUnbondWithdraw.value || !selectedAccountAddress.value) {
      return;
    }

    const service = container.get<IDappStakingService>(Symbols.DappStakingService);
    const ledger = await service.getLedger(selectedAccountAddress.value);

    if (ledger.unbondingInfo.unlockingChunks) {
      unlockingChunks.value = ledger.unbondingInfo.unlockingChunks;
      store.commit('dapps/setUnlockingChunks', unlockingChunks.value?.length);
      canWithdraw.value = false;
      totalToWithdraw.value = new BN(0);
      for (const chunk of ledger.unbondingInfo.unlockingChunks) {
        const erasBeforeUnlock = era.sub(chunk.unlockEra).toNumber();
        chunk.erasBeforeUnlock = Math.abs(erasBeforeUnlock > 0 ? 0 : erasBeforeUnlock);

        if (erasBeforeUnlock >= 0) {
          totalToWithdraw.value = totalToWithdraw.value.add(chunk.amount);
        }

        if (!canWithdraw.value) {
          canWithdraw.value = chunk.erasBeforeUnlock === 0;
        }
      }
    }
  };

  watch(
    () => [unlockingChunksCount.value, selectedAccountAddress.value],
    async (chunks) => {
      // console.log('chunks count changed');
      const era = await $api?.query.dappsStaking.currentEra<u32>();
      if (era) {
        await getChunks(era);
      }
    }
  );

  onUnmounted(async () => {
    const unsubFn = await unsub;
    if (unsubFn) {
      unsubFn();
    }
  });

  return {
    unlockingChunks,
    canWithdraw,
    withdraw,
    totalToWithdraw,
    maxUnlockingChunks,
    canUnbondWithdraw,
    unlockingChunksCount,
    unbondingPeriod,
  };
}
*/


// payload.ts in ~
/*
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import { u16, u32, TypeRegistry } from '@polkadot/types';
import { keccakFromArray } from 'ethereumjs-util';

export const getPayload = (
  method: SubmittableExtrinsic<'promise'>,
  nonce: u32,
  networkPrefix: number
): Uint8Array | null => {
  const methodPayload: Uint8Array = method.toU8a(true).slice(1);
  const prefix = new u16(new TypeRegistry(), networkPrefix);
  let payload = new Uint8Array(0);

  if (nonce) {
    const payloadLength = prefix.byteLength() + nonce.byteLength() + methodPayload.byteLength;
    payload = new Uint8Array(payloadLength);
    payload.set(prefix.toU8a(), 0);
    payload.set(nonce.toU8a(), prefix.byteLength());
    payload.set(methodPayload, prefix.byteLength() + nonce.byteLength());
    const buffer = keccakFromArray(Array.from(payload));

    return new Uint8Array(buffer);
  } else {
    return null;
  }
};
*/


// src/hook/helper/claim.ts
/*
import { EventRecord } from '@polkadot/types/interfaces';
import { BN } from '@polkadot/util';
import { ethers } from 'ethers';
import { balanceFormatter } from 'src/hooks/helper/plasmUtils';

export const calculateClaimedStaker = ({
  events,
  senderAddress,
}: {
  events: EventRecord[];
  senderAddress: string;
}): { formattedAmount: string; claimedAmount: number } => {
  let totalClaimStaker = new BN(0);
  events.forEach(({ event: { data, method, section } }) => {
    if (section === 'dappsStaking' && method === 'Reward') {
      const d = data.toHuman() as string[];
      const isClaimStakerEvent = d[0] === senderAddress;
      const claimedAmount = d[3];
      if (isClaimStakerEvent) {
        const amount = claimedAmount.replace(/,/g, '');
        totalClaimStaker = totalClaimStaker.add(new BN(amount));
      }
    }
  });
  const claimedAmount = Number(ethers.utils.formatEther(totalClaimStaker.toString()).toString());
  const formattedAmount = balanceFormatter(totalClaimStaker);
  return { claimedAmount, formattedAmount };
};
*/


// src/hooks/useGasPrice.ts
/*
import { SupportWallet } from 'src/config/wallets';
import { $web3 } from 'boot/api';
import { useStore } from 'src/store';
import { ref, watchEffect, computed, watch } from 'vue';
import { GasPrice, fetchEvmGasPrice, SelectedGas, Speed } from '@astar-network/astar-sdk-core';
import { GasPriceChangedMessage, TipPriceChangedMessage, IEventAggregator } from 'src/v2/messaging';
import { container } from 'src/v2/common';
import { Symbols } from 'src/v2/symbols';
import { useNetworkInfo } from 'src/hooks';

const initialGasPrice = {
  slow: '0',
  average: '0',
  fast: '0',
  baseFeePerGas: '0',
};

export const useGasPrice = (isFetch = false) => {
  const selectedGas = ref<SelectedGas>({ speed: 'average', price: '0' });
  const selectedTip = ref<SelectedGas>({ speed: 'average', price: '0' });
  const evmGasPrice = ref<GasPrice>(initialGasPrice);
  const nativeTipPrice = ref<GasPrice>(initialGasPrice);

  // Memo: Actual gas cost calculated by evmGasPrice and transaction data
  const evmGasCost = ref<GasPrice>(initialGasPrice);

  const store = useStore();
  const gas = computed(() => store.getters['general/getGas']);
  const { currentNetworkName, isMainnet } = useNetworkInfo();
  const network = computed<string>(() => {
    return isMainnet ? currentNetworkName.value.toLowerCase() : 'shibuya';
  });

  const setSelectedGas = (speed: Speed): void => {
    selectedGas.value = {
      speed,
      price: evmGasPrice.value[speed],
    };

    // Notify of gas price change.
    const eventAggregator = container.get<IEventAggregator>(Symbols.EventAggregator);
    eventAggregator.publish(new GasPriceChangedMessage(selectedGas.value));
  };

  const setSelectedTip = (speed: Speed): void => {
    selectedTip.value = {
      speed,
      price: nativeTipPrice.value[speed],
    };

    // Notify of tip price change.
    const eventAggregator = container.get<IEventAggregator>(Symbols.EventAggregator);
    eventAggregator.publish(new TipPriceChangedMessage(selectedTip.value));
  };

  const updateDefaultSelectedGasValue = (): void => {
    if (selectedGas.value.price === '0') {
      setSelectedGas('average');
    }
    if (selectedTip.value.price === '0') {
      setSelectedTip('average');
    }
  };

  const setGasPrice = (): void => {
    if (!network.value || !gas.value) return;
    evmGasPrice.value = gas.value.evmGasPrice;
    nativeTipPrice.value = gas.value.nativeTipPrice;
  };

  const dispatchGasPrice = async (network: string): Promise<void> => {
    try {
      const result = await fetchEvmGasPrice({
        network,
        isEip1559: false,
        web3: $web3.value!,
      });
      store.commit('general/setGas', result);
    } catch (error) {
      console.error(error);
    }
  };

  const isEnableSpeedConfiguration = computed<boolean>(() => {
    const currentWallet = store.getters['general/currentWallet'];
    return (
      currentWallet !== SupportWallet.TalismanEvm && currentWallet !== SupportWallet.SubWalletEvm
    );
  });

  watch(
    [network, $web3],
    async () => {
      if (isFetch && network.value && !gas.value && $web3.value) {
        // console.info('gas price', network.value, gas.value);
        await dispatchGasPrice(network.value);
      }
    },
    { immediate: false }
  );

  watchEffect(async () => {
    setGasPrice();
  });

  watchEffect(async () => {
    if (!network.value) return;
    updateDefaultSelectedGasValue();
  });

  return {
    evmGasPrice,
    selectedGas,
    setSelectedGas,
    evmGasCost,
    selectedTip,
    nativeTipPrice,
    setSelectedTip,
    isEnableSpeedConfiguration,
  };
};
*/


// src/hooks/useGetMinStaking.ts
/*
import { VoidFn } from '@polkadot/api/types';
import { $api } from 'boot/api';
import { onUnmounted, ref, Ref, watchEffect } from 'vue';

export function useGetMinStaking() {
  const minStaking = ref<string>('0');
  const unsub: Ref<VoidFn | undefined> = ref();

  watchEffect(() => {
    if (unsub.value) {
      unsub.value();
      unsub.value = undefined;
    }

    $api!.isReady.then(async () => {
      const amount = await $api!.consts.dappsStaking.minimumStakingAmount;
      minStaking.value = amount.toString();
    });
  });

  onUnmounted(() => {
    const unsubFn = unsub.value;
    if (unsubFn) {
      unsubFn();
    }
  });
  return {
    minStaking,
  };
}
*/


// src/hooks/useStaking.ts
/*
import { useStore } from 'src/store';
import { computed, Ref, watch, ref } from 'vue';
import { contractInstance, Staking } from 'src/config/web3';
import dappsStakingContractAbi from 'src/config/web3/abi/dapps-staking-abi.json';
import { $web3 } from 'boot/api';

export function useStaking() {
  const store = useStore();
  const isH160Formatted = computed(() => store.getters['general/isH160Formatted']);

  // dApps Staking precompiled contract address
  const PRECOMPILED_ADDR = '0x0000000000000000000000000000000000005001';

  const getEraInfo = async (addressRef: Ref<string>) => {
    const result = ref();

    watch(
      () => addressRef.value,
      async () => {
        const ci = contractInstance(
          $web3.value!!,
          dappsStakingContractAbi,
          PRECOMPILED_ADDR,
          addressRef.value
        );
        const staking = new Staking(ci, addressRef.value);

        result.value = {
          currentEra: await staking.getCurrentEra(),
          unbondingPeriod: await staking.getUnbondingPeriod(),
        };
      },
      { immediate: true }
    );

    return { getEraInfo };
  };
}
*/


// src/hooks/useUnbondWithdraw.ts
/*
import { ApiPromise } from '@polkadot/api';
import { ref, watchEffect } from 'vue';

export const useUnbondWithdraw = (apiRef: ApiPromise | undefined) => {
  const canUnbondWithdraw = ref<boolean>(false);

  watchEffect(() => {
    try {
      const unbondingPeriod = apiRef?.consts.dappsStaking.unbondingPeriod;
      canUnbondWithdraw.value = !!unbondingPeriod;
    } catch {
      canUnbondWithdraw.value = false;
    }
  });

  return {
    canUnbondWithdraw,
  };
};
*/


// src/hooks/useVesting.ts
/*
import { useGasPrice, ExtendedVestingInfo, useBalance, useCustomSignature } from 'src/hooks';
import { ApiPromise } from '@polkadot/api';
import { ISubmittableResult } from '@polkadot/types/types';
import { $api } from 'boot/api';
import { ethers } from 'ethers';
import { useStore } from 'src/store';
import { computed } from 'vue';
import { signAndSend } from 'src/hooks/helper/wallet';

export function useVesting(closeModal: () => void) {
  const store = useStore();
  const selectedAddress = computed(() => store.getters['general/selectedAddress']);
  const substrateAccounts = computed(() => store.getters['general/substrateAccounts']);
  const { accountData } = useBalance(selectedAddress);
  const { selectedTip, nativeTipPrice, setSelectedTip } = useGasPrice();

  const { isCustomSig, handleResult, handleCustomExtrinsic } = useCustomSignature({
    fn: closeModal,
  });

  const info = computed(() => {
    const defaultData = {
      claimableAmount: 0,
      vestings: [
        {
          vestedAmount: 0,
          totalDistribution: 0,
          unlockPerBlock: 0,
          untilBlock: 0,
        },
      ],
    };
    try {
      if (accountData.value && accountData.value.vesting.length) {
        const claimableAmount = Number(
          ethers.utils.formatEther(accountData.value.vestedClaimable.toString())
        );

        const vestings = accountData.value.vesting.map((vesting: ExtendedVestingInfo) => {
          const { perBlock, locked, startingBlock } = vesting.basicInfo;
          const vestedAmount = Number(ethers.utils.formatEther(vesting.vested.toString()));
          const totalDistribution = Number(ethers.utils.formatEther(locked.toString()));
          const unlockPerBlock = Number(ethers.utils.formatEther(perBlock.toString()));
          const block = locked.div(perBlock).add(startingBlock);
          const untilBlock = block.toNumber();
          return {
            vestedAmount,
            totalDistribution,
            unlockPerBlock,
            untilBlock,
          };
        });

        const data = {
          claimableAmount,
          vestings,
        };
        return data;
      } else {
        return defaultData;
      }
    } catch (error) {
      console.error(error);
      return defaultData;
    }
  });

  const unlockVestedTokens = async (api: ApiPromise): Promise<void> => {
    try {
      const txResHandler = async (result: ISubmittableResult): Promise<boolean> => {
        return await handleResult(result);
      };

      await signAndSend({
        transaction: api.tx.vesting.vest(),
        senderAddress: selectedAddress.value,
        substrateAccounts: substrateAccounts.value,
        isCustomSignature: isCustomSig.value,
        txResHandler,
        handleCustomExtrinsic,
        dispatch: store.dispatch,
        tip: selectedTip.value.price,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const sendTransaction = async (): Promise<void> => {
    await unlockVestedTokens($api!);
  };

  return {
    info,
    sendTransaction,
    selectedTip,
    nativeTipPrice,
    setSelectedTip,
  };
}
*/


// src/hooks/useWasm.ts
/*
import { ref, watch } from 'vue';
import { compactAddLength, isWasm } from '@polkadot/util';
import { FileState } from './useFile';

export function useWasm(
  abi: any,
  wasmFromFile: FileState | null,
  isWasmFromFileValid: (_: FileState) => boolean
) {
  const wasm = ref();
  const isWasmValid = ref(false);

  watch(abi, () => {
    // console.log('constructor', abi.value?.constructors);
    if (abi.value && isWasm(abi.value.project.source.wasm)) {
      wasm.value = abi.value.project.source.wasm;
      isWasmValid.value = true;

      return;
    }

    if (wasmFromFile && isWasmFromFileValid(wasmFromFile)) {
      wasm.value = compactAddLength(wasmFromFile.data);
      isWasmValid.value = true;

      return;
    }

    wasm.value = null;
    isWasmValid.value = false;
  });

  return { wasm, isWasmValid };
}
*/


// src/modules/information/recent-history/stake/index.ts
/*
import { TOKEN_API_URL } from '@astar-network/astar-sdk-core';
import axios from 'axios';
import { ethers } from 'ethers';
import { DappCombinedInfo } from 'src/v2/models';
import { RecentHistory, RecentHistoryTxType } from './../../index';

interface UserStakeHistory {
  timestamp: string;
  contractAddress: string;
  transaction: RecentHistoryTxType;
  amount: string;
  transactionHash?: string;
  transactionSuccess?: boolean;
}

export const castStakeTxType = (txType: RecentHistoryTxType): string => {
  switch (txType) {
    case 'BondAndStake':
      return 'Stake';
    case 'NominationTransfer':
      return 'Nomination Transfer';
    case 'UnbondAndUnstake':
      return 'Unstake';
    default:
      return txType;
  }
};

export const getStakeTxHistories = async ({
  address,
  network,
  symbol,
  dapps,
  subScan,
}: {
  address: string;
  network: string;
  symbol: string;
  dapps: DappCombinedInfo[];
  subScan: string;
}): Promise<RecentHistory[]> => {
  const url = `${TOKEN_API_URL}/v1/${network}/dapps-staking/stats/user/${address}/1%20years`;
  const result = await axios.get<UserStakeHistory[]>(url);
  const numberOfHistories = 5;
  return result.data
    .filter(
      (it) =>
        it.transaction === 'BondAndStake' ||
        it.transaction === 'NominationTransfer' ||
        it.transaction === 'UnbondAndUnstake'
    )
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    .slice(0, numberOfHistories)
    .map((it) => {
      const dapp = dapps.find(
        (that) => that.contract.address.toLowerCase() === it.contractAddress.toLowerCase()
      );
      const note = dapp && dapp.dapp ? dapp.dapp.name : '';
      const explorerUrl = subScan + '/extrinsic/' + it.transactionHash;
      return {
        amount: ethers.utils.formatEther(it.amount),
        timestamp: String(Number(it.timestamp) / 1000),
        txType: it.transaction as RecentHistoryTxType,
        explorerUrl,
        symbol,
        note,
      };
    });
};
*/


// src/store/dapp-staking/calculation.ts
/*
import { bool, Option, Struct, u32 } from '@polkadot/types';
import { Balance } from '@polkadot/types/interfaces';
import { BN } from '@polkadot/util';
import { $api } from 'boot/api';
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';
import { ClaimInfo, EraRewardAndStake } from './actions';
*/
/**
 * Gets claimable eras from first staked era to next staked era or current era.
 * e.g. if stakerInfo is [EraStake(1000, 5), EraStake(2000, 7), EraStake(500, 9)] and current era is 10
 * function will return [EraStake(1000, 5), EraStake(1000, 6), EraStake(2000, 7), EraStake(2000, 8), EraStake(500, 9)]
 * @param stakerInfo Staker info structure
 * @param currentEra Current staking era
 * @returns Claimable eras arrat
 */
/*
const getClaimableEras = async (
  stakerInfo: StakerInfo,
  currentEra: number
): Promise<EraStake[]> => {
  const result: EraStake[] = [];

  if (!stakerInfo.stakes || stakerInfo.stakes.length == 0) {
    return result;
  }

  // Sort stakerInfo from lowest to highest era.
  const sortedStakes = stakerInfo.stakes.sort((stake1, stake2) => {
    return stake1.era - stake2.era;
  });

  // add current era so we can loop through all stakes
  const lastStake = stakerInfo.stakes[stakerInfo.stakes.length - 1];
  if (Number(lastStake.era) !== currentEra) {
    stakerInfo.stakes.push({
      staked: lastStake.staked, // staked amount not important for this item since it will not be taken into account
      era: currentEra,
    } as EraStake);
  }

  // Biuild result array
  for (let i = 0; i < stakerInfo.stakes.length - 1; i++) {
    let currentStake = stakerInfo.stakes[i];
    for (let era = currentStake.era; era < stakerInfo.stakes[i + 1].era; era++) {
      result.push({
        staked: currentStake.staked,
        era: Number(era),
      } as EraStake);
    }
  }

  return result;
};
*/
/**
 * Calculates individual claim reward for staker and contract.
 * @param senderAddress Staker address
 * @param contractAddress Contract address
 * @returns Calculated reward.
 */
/*
export const getIndividualClaimReward = async (
  senderAddress: string,
  contractAddress: string
): Promise<ClaimInfo> => {
  let reward = new BN(0);
  let erasToClaim: number[] = [];

  const stakerInfo = await $api?.query.dappsStaking.generalStakerInfo<StakerInfo>(
    senderAddress,
    getDappAddressEnum(contractAddress)
  );

  // Developer percentage string has format like 80.00%, get whole part as number.
  const developerRewardPercentage = Number(
    ((await $api?.consts.dappsStaking.developerRewardPercentage.toHuman()) || '0.0')
      .toString()
      .split('.')[0]
  );

  const stakerRewardPercentage = 100 / (100 - developerRewardPercentage);

  if (stakerInfo) {
    const currentEra = Number(await $api?.query.dappsStaking.currentEra());
    const claimableEras = await getClaimableEras(stakerInfo, currentEra);

    if (claimableEras.length > 0) {
      const firstUnclaimedEra = claimableEras[claimableEras.length - 1].era + 1;
      erasToClaim = [...Array(currentEra - firstUnclaimedEra).keys()].map(
        (x) => x + firstUnclaimedEra
      );

      let totalForEra = new BN(0);
      for (const claimableEra of claimableEras) {
        const eraStake = (
          await $api?.query.dappsStaking.contractEraStake<Option<EraStakingPointsIndividualClaim>>(
            getDappAddressEnum(contractAddress),
            claimableEras[0].era
          )
        )?.unwrapOrDefault();

        if (eraStake) {
          // If era stake doesn't exist use previous eraTotal.
          // Fist claimable era has contract era stake info so totalForEra will be filled with value > 0
          totalForEra = eraStake?.total.toBn() || new BN(0);
        }
        const eraInfo = (
          await $api?.query.dappsStaking.eraRewardsAndStakes<Option<EraRewardAndStake>>(
            claimableEra.era
          )
        )?.unwrapOrDefault();

        // Memo: comment out to avoid displaying `claimableEra.staked.mul` error
        // if (eraInfo) {
        //   const eraReward = claimableEra.staked
        //     .mul(eraInfo.rewards.toBn())
        //     .div(eraInfo.staked.toBn());
        //   const stakerJointReward = eraReward.divn(stakerRewardPercentage);
        //   const stakerReward = stakerJointReward.mul(claimableEra.staked.toBn()).div(totalForEra);

        //   reward = reward.add(stakerReward);
        // }
      }
    }
  }

  // console.log('reward', reward.toString());
  return {
    rewards: reward,
    estimatedClaimedRewards: new BN(0),
    unclaimedEras: erasToClaim,
  };
};

export const getIndividualClaimStakingInfo = async (
  senderAddress: string,
  contractAddress: string
): Promise<ClaimInfo> => {
  return await getIndividualClaimReward(senderAddress, contractAddress);
};

interface EraStake extends Struct {
  staked: Balance;
  era: number;
}

interface StakerInfo extends Struct {
  stakes: EraStake[];
}

interface EraStakingPointsIndividualClaim extends Struct {
  total: Balance;
  numberOfStakers: u32;
  contractRewardClaimed: bool;
}
*/


// src/store/dapp-staking/getters.ts
/*
import { TvlModel } from 'src/v2/models';
import { DappCombinedInfo, SmartContractState, StakerInfo } from 'src/v2/models/DappsStaking';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { DappStateInterface as State } from './state';

export interface ContractsGetters {
  getAllDapps(state: State): DappCombinedInfo[];
  getRegisteredDapps(state: State): (tag: string) => DappCombinedInfo[];
  getStakerDapps(state: State): DappCombinedInfo[];
  getRegisteredDapps(state: State): (mainCategory: string) => DappCombinedInfo[];
  getMinimumStakingAmount(state: State): string;
  getMaxNumberOfStakersPerContract(state: State): number;
  getUnbondingPeriod(state: State): number;
  getMaxUnlockingChunks(state: State): number;
  getUnlockingChunks(state: State): number;
  getIsPalletDisabled(state: State): boolean;
  getClaimedRewards(state: State): number;
  getTvl(state: State): TvlModel;
  getCurrentEra(state: State): number;
}

const getters: GetterTree<State, StateInterface> & ContractsGetters = {
  getAllDapps: (state) => Object.values(state.dappsCombinedInfo),
  getRegisteredDapps: (state) => (mainCategory) =>
    mainCategory
      ? state.dappsCombinedInfo.filter((x) => {
        try {
          return (
            (x.dapp?.mainCategory === mainCategory ||
              (x.dapp?.mainCategory === undefined && mainCategory === 'others')) &&
            x.contract.state === SmartContractState.Registered
          );
        } catch (error) {
          return state.dappsCombinedInfo;
        }
      })
      : state.dappsCombinedInfo,
  getStakerDapps: (state) =>
    state.dappsCombinedInfo.filter((x) => !x.stakerInfo.accountStakingAmount.startsWith('0')),
  getMinimumStakingAmount: (state) => state.minimumStakingAmount,
  getMaxNumberOfStakersPerContract: (state) => state.maxNumberOfStakersPerContract,
  getUnbondingPeriod: (state) => state.unbondingPeriod,
  getMaxUnlockingChunks: (state) => state.maxUnlockingChunks,
  getUnlockingChunks: (state) => state.unlockingChunks,
  getIsPalletDisabled: (state) => state.isPalletDisabled,
  getClaimedRewards: (state) => state.claimedRewards,
  getTvl: (state) => state.tvl,
  getCurrentEra: (state) => state.currentEra,
};

export default getters;
*/


// src/v2/repositories/implementations/DappStakingRepository.ts !!!!!!!!
/*
import { balanceFormatter } from 'src/hooks/helper/plasmUtils';
import { BN } from '@polkadot/util';
import { u32, Option, Struct } from '@polkadot/types';
import { Codec, ISubmittableResult } from '@polkadot/types/types';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import { AccountId, Balance, EraIndex } from '@polkadot/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import { injectable, inject } from 'inversify';
import { IDappStakingRepository } from 'src/v2/repositories';
import { IApi } from 'src/v2/integration';
import { Symbols } from 'src/v2/symbols';
import {
  RewardDestination,
  SmartContract,
  SmartContractState,
  StakerInfo,
  DappStakingConstants,
} from 'src/v2/models/DappsStaking';
import { EventAggregator, NewEraMessage } from 'src/v2/messaging';
import {
  GeneralStakerInfo,
  checkIsDappRegistered,
  TOKEN_API_URL,
} from '@astar-network/astar-sdk-core';
import { ethers } from 'ethers';
import { EditDappItem } from 'src/store/dapp-staking/state';
import { StakeInfo, EraStakingPoints } from 'src/store/dapp-staking/actions';
import axios from 'axios';
import { Guard } from 'src/v2/common';
import { AccountLedger } from 'src/v2/models/DappsStaking';
import {
  wait,
  getDappAddressEnum,
  isValidAddressPolkadotAddress,
} from '@astar-network/astar-sdk-core';
import { checkIsLimitedProvider } from 'src/modules/dapp-staking/utils';

// TODO type generation
interface EraInfo extends Struct {
  rewards: {
    stakers: Balance;
    dapps: Balance;
  };
  staked: Balance;
  locked: Balance;
}

interface ContractStakeInfo extends Struct {
  total: BN;
  numberOfStakers: u32;
}

interface RegisteredDapp extends Struct {
  readonly developer: AccountId;
  readonly state: DappState;
}

interface DappState {
  isUnregistered: boolean;
  asUnregistered: {
    // Memo: era of unregistration
    words: number[];
  };
}

interface SmartContractAddress extends Struct {
  isEvm: boolean;
  asEvm?: Codec;
  isWasm: boolean;
  asWasm?: Codec;
}

interface PalletDappsStakingAccountLedger extends Codec {
  locked: Balance;
  rewardDestination: Codec;
  unbondingInfo: UnbondingInfo;
}

interface UnbondingInfo {
  unlockingChunks: ChunkInfo[];
}

interface ChunkInfo extends Codec {
  amount: Balance;
  unlockEra: EraIndex;
  erasBeforeUnlock: number;
}

@injectable()
export class DappStakingRepository implements IDappStakingRepository {
  private static isEraSubscribed = false;
  private currentEra?: number;

  constructor(
    @inject(Symbols.DefaultApi) private api: IApi,
    @inject(Symbols.EventAggregator) private eventAggregator: EventAggregator
  ) { }

  public async getTvl(): Promise<BN> {
    const api = await this.api.getApi();
    const era = await this.getCurrentEra();
    const result = await api.query.dappsStaking.generalEraInfo<Option<EraInfo>>(era);

    return result.unwrap().locked.toBn();
  }

  public async fetchAccountStakingAmount(
    contractAddress: string,
    walletAddress: string
  ): Promise<string> {
    try {
      if (!isValidAddressPolkadotAddress(walletAddress)) return '0';
      const api = await this.api.getApi();
      const stakerInfo = await api.query.dappsStaking.generalStakerInfo<GeneralStakerInfo>(
        walletAddress,
        getDappAddressEnum(contractAddress)
      );
      const balance = stakerInfo.stakes.length && stakerInfo.stakes.slice(-1)[0].staked.toString();
      return String(balance);
    } catch (error) {
      return '0';
    }
  }

  public async getBondAndStakeCall(
    contractAddress: string,
    amount: BN
  ): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> {
    const api = await this.api.getApi();

    return api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), amount);
  }

  public async getUnbondAndUnstakeCall(
    contractAddress: string,
    amount: BN
  ): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> {
    const api = await this.api.getApi();

    return api.tx.dappsStaking.unbondAndUnstake(getDappAddressEnum(contractAddress), amount);
  }

  public async getNominationTransferCall({
    amount,
    fromContractId,
    targetContractId,
  }: {
    amount: BN;
    fromContractId: string;
    targetContractId: string;
  }): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> {
    const api = await this.api.getApi();
    return api.tx.dappsStaking.nominationTransfer(
      getDappAddressEnum(fromContractId),
      amount,
      getDappAddressEnum(targetContractId)
    );
  }

  public async getStakerInfo(
    contractAddresses: string[],
    walletAddress: string
  ): Promise<StakerInfo[]> {
    const api = await this.api.getApi();
    const currentEra = await this.getCurrentEra();

    const eraStakes = await api.queryMulti<Option<ContractStakeInfo>[]>(
      contractAddresses.map((address) => {
        return [api.query.dappsStaking.contractEraStake, [getDappAddressEnum(address), currentEra]];
      })
    );

    const stakingAmounts = await Promise.all(
      contractAddresses.map(async (address) => {
        return {
          contractAddress: address,
          accountStakingAmount: walletAddress
            ? await this.fetchAccountStakingAmount(address, walletAddress)
            : '0',
        };
      })
    );

    return eraStakes.map((x, index) => {
      if (x.isSome) {
        const eraStake = x.unwrap();
        const accountStakingData = stakingAmounts.find(
          (it) => it.contractAddress === contractAddresses[index]
        );
        const accountStakingAmount = accountStakingData
          ? ethers.utils.formatEther(accountStakingData.accountStakingAmount)
          : '0';
        return new StakerInfo(
          contractAddresses[index],
          eraStake.total,
          eraStake.numberOfStakers.toNumber(),
          accountStakingAmount
        );
      } else {
        return new StakerInfo('-', new BN(0), 0, '0');
      }
    });
  }

  public async getRegisteredDapps(): Promise<SmartContract[]> {
    const api = await this.api.getApi();
    const dapps = await api.query.dappsStaking.registeredDapps.entries();

    const result: SmartContract[] = [];
    dapps.forEach(([key, value]) => {
      const v = <Option<RegisteredDapp>>value;
      const address = this.getContractAddress(key.args[0] as unknown as SmartContractAddress);
      let developer = '';
      let state = SmartContractState.Unregistered;

      if (v.isSome) {
        const unwrappedValue = v.unwrap();
        developer = unwrappedValue.developer.toString();
        state = unwrappedValue.state.isUnregistered
          ? SmartContractState.Unregistered
          : SmartContractState.Registered;
      }

      if (address) {
        result.push(new SmartContract(address, developer, state));
      }
    });

    return result;
  }

  public async getRegisteredContract(developerAddress: string): Promise<string | undefined> {
    try {
      const api = await this.api.getApi();
      const account = api.registry.createType('AccountId32', developerAddress.toString());
      const contractAddress = await api.query.dappsStaking.registeredDevelopers<
        Option<SmartContractAddress>
      >(account);
      return contractAddress.isNone ? undefined : this.getContractAddress(contractAddress.unwrap());
    } catch (error) {
      return undefined;
    }
  }

  public async starEraSubscription(): Promise<void> {
    // Avoid multiple subscriptions.
    if (!DappStakingRepository.isEraSubscribed) {
      DappStakingRepository.isEraSubscribed = true;
      const api = await this.api.getApi();
      await api.query.dappsStaking.currentEra((era: u32) => {
        // For some reason subscription is triggered for every produced block,
        // so that's why logic below.
        const newEra = era.toNumber();
        if (!this.currentEra || this.currentEra !== newEra) {
          this.eventAggregator.publish(new NewEraMessage(era.toNumber()));
          this.currentEra = newEra;
        }
      });
    }
  }

  public async getDapp(
    contractAddress: string,
    network: string
  ): Promise<EditDappItem | undefined> {
    Guard.ThrowIfUndefined('contractAddress', contractAddress);
    Guard.ThrowIfUndefined('network', network);

    const url = `${TOKEN_API_URL}/v1/${network.toLowerCase()}/dapps-staking/dapps/${contractAddress}`;

    try {
      const response = await axios.get<EditDappItem>(url);
      return response.data;
    } catch {
      return undefined;
    }
  }

  public async getLedger(accountAddress: string): Promise<AccountLedger> {
    const api = await this.api.getApi();
    const ledger = await api.query.dappsStaking.ledger<PalletDappsStakingAccountLedger>(
      accountAddress
    );

    return {
      locked: ledger.locked.toBn(),
      rewardDestination: <RewardDestination>ledger.rewardDestination.toString(),
      unbondingInfo: {
        unlockingChunks: ledger.unbondingInfo.unlockingChunks.map((x) => {
          return {
            amount: x.amount.toBn(),
            unlockEra: x.unlockEra.toBn(),
            erasBeforeUnlock: x.erasBeforeUnlock,
          };
        }),
      },
    };
  }

  public async getConstants(): Promise<DappStakingConstants> {
    const api = await this.api.getApi();
    const maxEraStakeValues = Number(api.consts.dappsStaking.maxEraStakeValues.toString());

    return {
      maxEraStakeValues,
    };
  }

  public async getGeneralStakerInfo(
    stakerAddress: string,
    contractAddress: string
  ): Promise<Map<string, GeneralStakerInfo>> {
    Guard.ThrowIfUndefined('contractAddress', contractAddress);
    Guard.ThrowIfUndefined('stakerAddress', stakerAddress);

    const result = new Map<string, GeneralStakerInfo>();
    const api = await this.api.getApi();
    const stakerInfos = await api.query.dappsStaking.generalStakerInfo.entries(stakerAddress);
    stakerInfos.forEach(([key, stakerInfo]) => {
      const contractAddress = key.args[1].toString();
      const info = stakerInfo.toHuman() as unknown as GeneralStakerInfo;
      result.set(contractAddress, info);
    });

    return result;
  }

  public async getApr(network: string): Promise<{ apr: number; apy: number }> {
    Guard.ThrowIfUndefined('network', network);

    const baseUrl = `${TOKEN_API_URL}/v1/${network.toLowerCase()}/dapps-staking`;
    const [apr, apy] = await Promise.all([
      (await axios.get<number>(`${baseUrl}/apr`)).data,
      (await axios.get<number>(`${baseUrl}/apy`)).data,
    ]);

    return { apr, apy };
  }

  public async getCurrentEra(): Promise<u32> {
    const api = await this.api.getApi();

    return await api.query.dappsStaking.currentEra<u32>();
  }

  public async getNextEraEta(network: string): Promise<number> {
    Guard.ThrowIfUndefined('network', network);

    const baseUrl = `${TOKEN_API_URL}/v1/${network.toLowerCase()}/dapps-staking/stats/nexteraeta`;
    const result = await axios.get<number>(baseUrl);

    return result.data;
  }

  private getContractAddress(address: SmartContractAddress): string | undefined {
    if (address.isEvm) {
      return address?.asEvm?.toString();
    } else if (address.isWasm) {
      return address?.asWasm?.toString();
    } else {
      return undefined;
    }
  }

  public async getStakeInfo(
    dappAddress: string,
    currentAccount: string
  ): Promise<StakeInfo | undefined> {
    const api = await this.api.getApi();
    const stakeInfo = new Promise<StakeInfo | undefined>(async (resolve) => {
      const data = await this.handleGetStakeInfo({ api, dappAddress, currentAccount });
      resolve(data);
    });
    const fallbackTimeout = new Promise<string>(async (resolve) => {
      const timeout = 4 * 1000;
      await wait(timeout);
      resolve('timeout');
    });

    const race = Promise.race<StakeInfo | undefined | string>([stakeInfo, fallbackTimeout]);
    const result = race.then((res) => {
      if (res === 'timeout') {
        return undefined;
      } else {
        return res as StakeInfo;
      }
    });
    return result;
  }

  private async handleGetStakeInfo({
    api,
    dappAddress,
    currentAccount,
  }: {
    api: ApiPromise;
    dappAddress: string;
    currentAccount: string;
  }): Promise<StakeInfo | undefined> {
    const initialYourStake = {
      formatted: '',
      denomAmount: new BN('0'),
    };

    const stakeInfo = await this.getLatestStakePoint(api, dappAddress);
    if (!stakeInfo) return undefined;

    const data = {
      totalStake: balanceFormatter(stakeInfo.total.toString()),
      yourStake: initialYourStake,
      claimedRewards: '0',
      hasStake: false,
      stakersCount: Number(stakeInfo.numberOfStakers.toString()),
      dappAddress,
      isRegistered: true,
    };

    try {
      const [stakerInfo, { isRegistered }] = await Promise.all([
        api.query.dappsStaking.generalStakerInfo<GeneralStakerInfo>(
          currentAccount,
          getDappAddressEnum(dappAddress)
        ),
        checkIsDappRegistered({ dappAddress, api }),
      ]);

      const balance = stakerInfo.stakes.length && stakerInfo.stakes.slice(-1)[0].staked.toString();
      const yourStake = balance
        ? {
          formatted: balanceFormatter(balance),
          denomAmount: new BN(balance.toString()),
        }
        : initialYourStake;

      return {
        ...data,
        hasStake: Number(balance.toString()) > 0,
        yourStake,
        isRegistered,
      };
    } catch (error) {
      return data;
    }
  }

  private async getLatestStakePoint(
    api: ApiPromise,
    contract: string
  ): Promise<EraStakingPoints | undefined> {
    if (!contract) {
      return undefined;
    }
    const currentEra = await (await api.query.dappsStaking.currentEra<EraIndex>()).toNumber();
    const contractAddress = getDappAddressEnum(contract);
    // iterate from currentEra backwards until you find record for ContractEraStake
    for (let era = currentEra; era > 0; era -= 1) {
      // Memo: wait for avoiding provider limitation
      checkIsLimitedProvider() && (await wait(200));
      const stakeInfoPromise = await api.query.dappsStaking.contractEraStake<
        Option<EraStakingPoints>
      >(contractAddress, era);
      const stakeInfo = stakeInfoPromise.unwrapOr(undefined);
      if (stakeInfo) {
        return stakeInfo;
      }
    }

    return undefined;
  }
}
*/


// src/v2/services/implementatins/DappStakingService.ts !!!!!!!
/*
import { BN } from '@polkadot/util';
import { ethers } from 'ethers';
import { inject, injectable } from 'inversify';
import { astarMainnetNativeToken, ASTAR_NATIVE_TOKEN } from 'src/config/chain';
import { EditDappItem } from 'src/store/dapp-staking/state';
import { Guard } from 'src/v2/common';
import { TvlModel } from 'src/v2/models';
import { DappCombinedInfo, StakerInfo } from 'src/v2/models/DappsStaking';
import {
  IDappStakingRepository,
  IMetadataRepository,
  IPriceRepository,
  ISystemRepository,
} from 'src/v2/repositories';
import { IBalanceFormatterService, IDappStakingService } from 'src/v2/services';
import { Symbols } from 'src/v2/symbols';
import { IWalletService } from '../IWalletService';
import { AccountLedger } from 'src/v2/models/DappsStaking';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { StakeInfo } from 'src/store/dapp-staking/actions';

@injectable()
export class DappStakingService implements IDappStakingService {
  private readonly wallet: IWalletService;

  constructor(
    @inject(Symbols.DappStakingRepository) private dappStakingRepository: IDappStakingRepository,
    @inject(Symbols.PriceRepository) private priceRepository: IPriceRepository,
    @inject(Symbols.MetadataRepository) private metadataRepository: IMetadataRepository,
    @inject(Symbols.SystemRepository) private systemRepository: ISystemRepository,
    @inject(Symbols.BalanceFormatterService) private balanceFormatter: IBalanceFormatterService,
    @inject(Symbols.WalletFactory) walletFactory: () => IWalletService
  ) {
    this.wallet = walletFactory();
    this.systemRepository.startBlockSubscription();
    this.dappStakingRepository.starEraSubscription();
  }

  public async getTvl(): Promise<TvlModel> {
    const metadata = await this.metadataRepository.getChainMetadata();
    const [tvl, priceUsd] = await Promise.all([
      this.dappStakingRepository.getTvl(),
      this.priceRepository.getUsdPrice(metadata.token),
    ]);

    const tvlDefaultUnit = Number(
      ethers.utils.formatUnits(BigInt(tvl.toString()), metadata.decimals)
    );
    const tvlUsd = astarMainnetNativeToken.includes(metadata.token as ASTAR_NATIVE_TOKEN)
      ? tvlDefaultUnit * priceUsd
      : 0;

    return new TvlModel(tvl, tvlDefaultUnit, tvlUsd);
  }

  public async nominationTransfer({
    amount,
    fromContractId,
    targetContractId,
    address,
  }: {
    amount: BN;
    fromContractId: string;
    targetContractId: string;
    address: string;
  }): Promise<void> {
    Guard.ThrowIfUndefined('fromContractId', fromContractId);
    Guard.ThrowIfUndefined('targetContractId', targetContractId);
    Guard.ThrowIfUndefined('stakerAddress', address);

    const stakeCall = await this.dappStakingRepository.getNominationTransferCall({
      amount,
      fromContractId,
      targetContractId,
    });
    await this.wallet.signAndSend(
      stakeCall,
      address,
      `You successfully staked to ${targetContractId} from ${fromContractId}`
    );
  }

  public async stake(contractAddress: string, stakerAddress: string, amount: BN): Promise<void> {
    Guard.ThrowIfUndefined('contractAddress', contractAddress);
    Guard.ThrowIfUndefined('stakerAddress', stakerAddress);

    const stakeCall = await this.dappStakingRepository.getBondAndStakeCall(contractAddress, amount);
    await this.wallet.signAndSend(
      stakeCall,
      stakerAddress,
      `You successfully staked to ${contractAddress}`
    );
  }

  public async unbondAndUnstake(
    contractAddress: string,
    stakerAddress: string,
    amount: BN
  ): Promise<void> {
    Guard.ThrowIfUndefined('contractAddress', contractAddress);
    Guard.ThrowIfUndefined('stakerAddress', stakerAddress);

    const unboundCall = await this.dappStakingRepository.getUnbondAndUnstakeCall(
      contractAddress,
      amount
    );
    await this.wallet.signAndSend(
      unboundCall,
      stakerAddress,
      `You successfully started unbonding process for ${contractAddress}`
    );
  }
*/
/**
 * Gets staker info (total staked, stakers count) for a given contracts.
 * @param contractAddresses List of contract addresses to provide info for.
 */
/*
public async getStakerInfo(
  contractAddresses: string[],
  walletAddress: string
): Promise<StakerInfo[]> {
  Guard.ThrowIfUndefined('contractAddresses', contractAddresses);

  const stakerInfos = await this.dappStakingRepository.getStakerInfo(
    contractAddresses,
    walletAddress
  );
  const metadata = await this.metadataRepository.getChainMetadata();

  return stakerInfos.map((x) => {
    x.totalStakeFormatted = this.balanceFormatter.format(x.totalStake, metadata.decimals);
    return x;
  });
}

public async getCombinedInfo(currentAccount: string): Promise<DappCombinedInfo[]> {
  const dapps = await this.dappStakingRepository.getRegisteredDapps();
  const stakerInfo = await this.getStakerInfo(
    dapps.map((x) => x.address),
    currentAccount
  );

  return dapps.map((x, index) => {
    return new DappCombinedInfo(x, stakerInfo[index]);
  });
}

public async getRegisteredContract(developerAddress: string): Promise<string | undefined> {
  Guard.ThrowIfUndefined('developerAddress', developerAddress);

  return await this.dappStakingRepository.getRegisteredContract(developerAddress);
}

public async getDapp(
  contractAddress: string,
  network: string
): Promise<EditDappItem | undefined> {
  Guard.ThrowIfUndefined('contractAddress', contractAddress);
  Guard.ThrowIfUndefined('network', network);

  return await this.dappStakingRepository.getDapp(contractAddress, network);
}

public async getLedger(accountAddress: string): Promise<AccountLedger> {
  Guard.ThrowIfUndefined('accountAddress', accountAddress);

  return await this.dappStakingRepository.getLedger(accountAddress);
}

public async canClaimRewardWithoutErrors(accountAddress: string): Promise<boolean> {
  Guard.ThrowIfUndefined('accountAddress', accountAddress);

  const ledger = await this.dappStakingRepository.getLedger(accountAddress);

  if (ledger.rewardDestination === 'StakeBalance') {
    const currentEra = await this.dappStakingRepository.getCurrentEra();
    const constants = await this.dappStakingRepository.getConstants();
    const stakerInfo = await this.dappStakingRepository.getGeneralStakerInfo(
      accountAddress,
      accountAddress
    );

    for (const [_, info] of stakerInfo) {
      const stakes = info.stakes;
      if (stakes.length === constants.maxEraStakeValues) {
        if (
          stakes[1].era - stakes[0].era > 1 &&
          stakes[constants.maxEraStakeValues - 1].era < currentEra.toNumber()
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

public async sendTx({
  senderAddress,
  transaction,
  finalizedCallback,
}: {
  senderAddress: string;
  transaction: SubmittableExtrinsic<'promise'>;
  finalizedCallback: (result?: ISubmittableResult) => void;
}): Promise<void> {
  Guard.ThrowIfUndefined('senderAddress', senderAddress);
  Guard.ThrowIfUndefined('transaction', transaction);

  await this.wallet.signAndSend(
    transaction,
    senderAddress,
    undefined,
    undefined,
    finalizedCallback
  );
}

public async getStakeInfo(
  dappAddress: string,
  currentAccount: string
): Promise<StakeInfo | undefined> {
  Guard.ThrowIfUndefined('currentAccount', currentAccount);

  return await this.dappStakingRepository.getStakeInfo(dappAddress, currentAccount);
}
}
*/


// src/v2/services/implementations/PolkadotWalletService.ts
/*
import { isMobileDevice } from './../../../hooks/helper/wallet';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult, Signer } from '@polkadot/types/types';
import { InjectedExtension } from '@polkadot/extension-inject/types';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { inject, injectable } from 'inversify';
import { ethers } from 'ethers';
import { IWalletService, IGasPriceProvider } from 'src/v2/services';
import { Account } from 'src/v2/models';
import { IMetadataRepository } from 'src/v2/repositories';
import { BusyMessage, ExtrinsicStatusMessage, IEventAggregator } from 'src/v2/messaging';
import { WalletService } from './WalletService';
import { Guard, wait } from 'src/v2/common';
import { Symbols } from 'src/v2/symbols';

@injectable()
export class PolkadotWalletService extends WalletService implements IWalletService {
  private readonly extensions: InjectedExtension[] = [];

  constructor(
    @inject(Symbols.MetadataRepository) private readonly metadataRepository: IMetadataRepository,
    @inject(Symbols.EventAggregator) readonly eventAggregator: IEventAggregator,
    @inject(Symbols.GasPriceProvider) private readonly gasPriceProvider: IGasPriceProvider
  ) {
    super(eventAggregator);
  }
*/
/**
 * Signs given transaction.
 * @param extrinsic Transaction to sign.
 * @param senderAddress Sender address.
 * @param successMessage Mesage to be displayed to user in case of successful tansaction.
 * If not defined, default message will be shown.
 * @param tip Transaction tip, If not provided it will be fetched from gas price provider,
 */
/*
public async signAndSend(
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>,
  senderAddress: string,
  successMessage?: string,
  transactionTip?: number,
  finalizedCallback?: (result?: ISubmittableResult) => void
): Promise<string | null> {
  Guard.ThrowIfUndefined('extrinsic', extrinsic);
  Guard.ThrowIfUndefined('senderAddress', senderAddress);

  let result: string | null = null;
  try {
    return new Promise<string>(async (resolve) => {
      !isMobileDevice && this.detectExtensionsAction(true);
      await this.checkExtension();
      let tip = transactionTip?.toString();
      if (!tip) {
        tip = this.gasPriceProvider.getTip().price;
        tip = tip ? ethers.utils.parseEther(tip).toString() : '1';
      }

      console.info('transaction tip', tip);

      const unsub = await extrinsic.signAndSend(
        senderAddress,
        {
          signer: await this.getSigner(senderAddress),
          nonce: -1,
          tip,
        },
        (result) => {
          try {
            !isMobileDevice && this.detectExtensionsAction(false);
            if (result.isCompleted) {
              if (!this.isExtrinsicFailed(result.events)) {
                this.eventAggregator.publish(
                  new ExtrinsicStatusMessage(
                    true,
                    successMessage ?? 'Transaction successfully executed',
                    `${extrinsic.method.section}.${extrinsic.method.method}`,
                    result.txHash.toHex()
                  )
                );
              }

              this.eventAggregator.publish(new BusyMessage(false));
              if (finalizedCallback) {
                finalizedCallback(result);
              }
              resolve(extrinsic.hash.toHex());
              unsub();
            } else {
              if (isMobileDevice && !result.isCompleted) {
                this.eventAggregator.publish(new BusyMessage(true));
              }
            }
          } catch (error) {
            this.eventAggregator.publish(new BusyMessage(false));
            unsub();
          }
        }
      );
    });
  } catch (e) {
    const error = e as unknown as Error;
    this.eventAggregator.publish(new ExtrinsicStatusMessage(false, error.message));
    this.eventAggregator.publish(new BusyMessage(false));
  }

  return result;
}

private async getAccounts(): Promise<Account[]> {
  await this.checkExtension();
  const metadata = await this.metadataRepository.getChainMetadata();
  const accounts = await web3Accounts({ ss58Format: metadata.ss58format });
  const result = accounts.map((x) => {
    return new Account(x.address, x.meta.genesisHash, x.meta.name, x.meta.source);
  });

  return result;
}

private async getSigner(address: string): Promise<Signer> {
  const sender = (await this.getAccounts()).find((x) => x.address === address);

  if (sender) {
    const extension = this.extensions.find((x) => x.name === sender.source);

    if (extension) {
      return extension.signer;
    } else {
      throw new Error(`Can't find polkadot extension for ${sender.address}, ${sender.source}`);
    }
  } else {
    throw new Error(`Can't find account for ${address}`);
  }
}

private async checkExtension(): Promise<void> {
  if (this.extensions.length === 0) {
    const maxRetryCount = 10;
    let retryCount = 0;
    let extensions: InjectedExtension[] = [];
    do {
      extensions = await web3Enable('Astar portal');
      await wait(100);
      retryCount++;
    } while (extensions.length === 0 && retryCount <= maxRetryCount);

    if (extensions.length === 0) {
      throw new Error('Polkadot extension not installed.');
    }

    this.extensions.push(...extensions);
  }
}

// Memo: detects status in the wallet extension
// Fixme: doesn't work on MathWallet Mobile
// Ref: https://github.com/polkadot-js/extension/issues/674
// Ref: https://github.com/polkadot-js/extension/blob/297b2af14c68574b24bb8fdeda2208c473eccf43/packages/extension/src/page.ts#L10-L22
private detectExtensionsAction(isMonitorExtension: boolean): void {
  const handleDetectSign = (listener: any): void => {
    const { source, data } = listener;
    if (source !== window || !data.origin) {
      return;
    }
    if (data.id) {
      if (data.response && data.response.hasOwnProperty('signature')) {
        this.eventAggregator.publish(new BusyMessage(true));
        return;
      }
      // Memo: detect if the transaction was canceled by users
      if (data.error === 'Cancelled') {
        this.eventAggregator.publish(new BusyMessage(false));
        throw Error(data.error);
      }
    }
  };

  isMonitorExtension
    ? window.addEventListener('message', handleDetectSign)
    : window.removeEventListener('message', handleDetectSign);
}
}
*/


// src/v2/services/implementations/WalletService.ts
/*
import { Null, Result } from '@polkadot/types-codec';
import { DispatchError, EventRecord } from '@polkadot/types/interfaces';
import { ITuple } from '@polkadot/types/types';
import { ExtrinsicStatusMessage, IEventAggregator } from 'src/v2/messaging';

enum ErrorCode {
  TooManyEraStakeValues = 'dappsStaking.TooManyEraStakeValues',
}

export class WalletService {
  constructor(protected readonly eventAggregator: IEventAggregator) { }

  protected isExtrinsicFailed(events: EventRecord[]): boolean {
    let result = false;
    let message = '';
    events
      .filter((record): boolean => !!record.event && record.event.section !== 'democracy')
      .map(({ event: { data, method, section } }) => {
        if (section === 'system' && method === 'ExtrinsicFailed') {
          const [dispatchError] = data as unknown as ITuple<[DispatchError]>;
          message = dispatchError.type.toString();
          message = this.getErrorMessage(dispatchError);
          result = true;
        } else if (section === 'ethCall' && method === 'Executed') {
          const [, dispatchError] = data as unknown as ITuple<[Result<Null, DispatchError>]>;

          if (dispatchError && dispatchError.isErr) {
            message = this.getErrorMessage(dispatchError.asErr);
            result = true;
          }
        } else if (section === 'utility' && method === 'BatchInterrupted') {
          const anyData = data as any;
          const error = anyData[1].registry.findMetaError(anyData[1].asModule);
          let message = `${error.section}.${error.name}`;
          message = `action: ${section}.${method} ${message}`;
          result = true;
        }
      });

    if (result) {
      let msg = '';
      if (message === ErrorCode.TooManyEraStakeValues) {
        msg = 'Please claim your rewards before sending transaction';
      } else {
        msg = message;
      }
      this.eventAggregator.publish(new ExtrinsicStatusMessage(false, msg));
      throw Error(msg);
    }
    return result;
  }

  private getErrorMessage(dispatchError: DispatchError): string {
    let message = '';
    if (dispatchError.isModule) {
      try {
        const mod = dispatchError.asModule;
        const error = dispatchError.registry.findMetaError(mod);

        message = `${error.section}.${error.name}`;
      } catch (error) {
        // swallow
        console.error(error);
      }
    } else if (dispatchError.isToken) {
      message = `${dispatchError.type}.${dispatchError.asToken.type}`;
    }

    return message;
  }
}
*/


// src/v2/services/IDappStakingService.ts
// import { SubmittableExtrinsic } from '@polkadot/api/types';
// import { ISubmittableResult } from '@polkadot/types/types';
// import { BN } from '@polkadot/util';
// import { EditDappItem } from 'src/store/dapp-staking/state';
// import { TvlModel } from 'src/v2/models';
// import { DappCombinedInfo, StakerInfo } from '../models/DappsStaking';
// import { AccountLedger } from '../models/DappsStaking';
// import { StakeInfo } from 'src/store/dapp-staking/actions';

// /**
//  * Definition of service used to manage dapps staking.
//  */
// export interface IDappStakingService {
//   /**
//    * Gets Total Value Locked (TVL) value.
//    */
//   getTvl(): Promise<TvlModel>;

//   /**
//    * Stakes given amount to contract.
//    * @param contractAddress Contract address.
//    * @param stakerAddress Staked address.
//    * @param amount Amount to stake.
//    */
//   stake(contractAddress: string, stakerAddress: string, amount: BN): Promise<void>;

//   /**
//    * Starts unbonding process.
//    * @param contractAddress Contract address.
//    * @param stakerAddress Staked address.
//    * @param amount Amount to stake.
//    */
//   unbondAndUnstake(contractAddress: string, stakerAddress: string, amount: BN): Promise<void>;

//   /**
//    * Nomination transfer
//    * @param fromContractId Contract address transfer from.
//    * @param targetContractId Contract address transfer to.
//    * @param address Staked address.
//    * @param amount Amount to stake.
//    */
//   nominationTransfer({
//     amount,
//     fromContractId,
//     targetContractId,
//     address,
//   }: {
//     amount: BN;
//     fromContractId: string;
//     targetContractId: string;
//     address: string;
//   }): Promise<void>;

//   /**
//    * Gets staker info (total staked, stakers count) for a given contracts.
//    * @param contractAddresses List of contract addresses to provide info for.
//    */
//   getStakerInfo(contractAddresses: string[], walletAddress: string): Promise<StakerInfo[]>;

//   /**
//    * Gets dapps info combined from different sources.
//    */
//   getCombinedInfo(currentAccount: string): Promise<DappCombinedInfo[]>;

//   /** Gets contract address registered by the given developer address */
//   getRegisteredContract(developerAddress: string): Promise<string | undefined>;

//   /**
//    * Gets dapp data from Firebase.
//    * @param contractAddress Dapp contract address.
//    * @param network Name of the network where dapp has been deployed.
//    */
//   getDapp(contractAddress: string, network: string): Promise<EditDappItem | undefined>;

//   /**
//    * Gets dapps staking ledger for a given account.
//    * @param accountAddress User account.
//    */
//   getLedger(accountAddress: string): Promise<AccountLedger>;

//   /**
//    * Gets the value indicating whether use will be able to execute claim all batch without errors.
//    * @param accountAddress User account address
//    */
//   canClaimRewardWithoutErrors(accountAddress: string): Promise<boolean>;

//   /**
//    * claim dApp staking rewards
//    */
//   sendTx({
//     senderAddress,
//     transaction,
//     finalizedCallback,
//   }: {
//     senderAddress: string;
//     transaction: SubmittableExtrinsic<'promise'>;
//     finalizedCallback: (result: ISubmittableResult) => void;
//   }): Promise<void>;

//   getStakeInfo(dappAddress: string, currentAccount: string): Promise<StakeInfo | undefined>;
// }


// src/v2/services/IGasPriceProvider.ts
// import { SelectedGas } from '@astar-network/astar-sdk-core';

// /**
//  * Definition of service used to manage transaction gas price.
//  */
// export interface IGasPriceProvider {
//   getGas(): SelectedGas;

//   getTip(): SelectedGas;
// }


// src/v2/services/IWalletService.ts
// import { SubmittableExtrinsic } from '@polkadot/api/types';
// import { ISubmittableResult } from '@polkadot/types/types';

// export enum WalletType {
//   Metamask = 'Metamask',
//   Polkadot = 'Polkadot',
// }

// export interface IWalletService {
//   /**
//    * Signs and sends transaction. Returns transaction hash.
//    * @param extrinsic Extrisnic to sign and send
//    * @param senderAddress Signer address
//    * @param successMessage Message to show in case of sucessfull transaction
//    * @param transactionTip Transation tip.
//    */
//   signAndSend(
//     extrinsic: SubmittableExtrinsic<'promise'>,
//     senderAddress: string,
//     successMessage?: string,
//     transactionTip?: number,
//     finalizedCallback?: (result?: ISubmittableResult) => void
//   ): Promise<string | null>;
// }


// for stack exchange
/*
const sampleTransfer = async () => {

  // Create a new instance of the api
  const provider = new WsProvider('wss://rpc.shibuya.astar.network');
  const api = new ApiPromise({ provider });

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

  console.log('===== ===== =====');
  console.log(`txhash : ${txhash}`);
  // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
  console.log('===== STEP3-SendSignedTx-End =====');
}
*/



// import { Args, BaseTxInfo, OptionsWithMeta, UnsignedTransaction } from '@substrate/txwrapper-core';
// export interface BalancesTransferArgs extends Args {
//     /**
//      * The recipient address, SS-58 encoded.
//      */
//     dest: string;
//     /**
//      * The amount to send.
//      */
//     value: number | string;
// }
// /**
//  * Construct a balance transfer transaction offline.
//  *
//  * @param args - Arguments specific to this method.
//  * @param info - Information required to construct the transaction.
//  * @param options - Registry and metadata used for constructing the method.
//  */
// export declare function transfer(args: BalancesTransferArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction;




