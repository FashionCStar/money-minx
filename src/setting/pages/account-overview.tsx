import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Account } from 'auth/auth.types';
import { groupByProviderName } from 'auth/auth.helper';
import { getRefreshedProfile, deleteAccounts } from 'auth/auth.service';
import { appRouteConstants } from 'app/app-route.constant';
import { getRelativeDate } from '../../common/moment.helper';
import useGetSubscription from 'auth/hooks/useGetSubscription';
import { pricingDetailConstant } from 'common/common.constant';
import { useAuthDispatch, useAuthState } from 'auth/auth.context';
import { fNumber, numberWithCommas } from 'common/number.helper';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import DefaultAvatar from 'assets/icons/default-avatar.svg';
/*import { ReactComponent as Refresh } from 'assets/icons/refresh.svg';*/
import { ReactComponent as IconEdit } from 'assets/icons/icon-edit.svg';
import { ReactComponent as IconTrash } from 'assets/icons/icon-trash.svg';
import { ReactComponent as DefaultProviderLogo} from 'assets/icons/mm-default-provider.svg';

import {
  AccountCardProps,
  AccountRowProps,
  ManualAccountProps
} from 'setting/setting.type';

export const AccountOverview = () => {
  const { accounts } = useAuthState();
  const dispatch = useAuthDispatch();
  const { fetchingCurrentSubscription, currentSubscription } = useCurrentSubscription();
  const { fetchingSubscription, subscription } = useGetSubscription(currentSubscription?.priceId);

  useEffect(() => {
    if (!accounts) {
      const getUser = async () => {
        await getRefreshedProfile({ dispatch });
      };
      getUser();
    }
  }, [accounts, dispatch]);

  const loading = fetchingCurrentSubscription || fetchingSubscription;

  if (loading || !accounts) {
    return <CircularSpinner />;
  }

  const manualAccounts = accounts.filter((acc) => acc.isManual);
  const connectedAccounts = accounts.filter((acc) => !acc.isManual);

  const numberOfConnectedAccounts = subscription?.details?.[pricingDetailConstant.CONNECTED_ACCOUNT] || 0;
  const numberOfManualAccounts = subscription?.details?.[pricingDetailConstant.CONNECTED_ACCOUNT] || 0;

  return (
    <section className='mm-account-overview'>
      <AccountCard accountList={connectedAccounts} availableAccounts={numberOfConnectedAccounts} />
      <ManualAccounts manualAccountList={manualAccounts} availableAccounts={numberOfManualAccounts} />
    </section>
  );
};

export const ManualAccounts: React.FC<ManualAccountProps> = ({ manualAccountList, availableAccounts}) => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const [deleting, setDeleting] = useState<boolean>(false);
  const needUpgrade = manualAccountList.length >= availableAccounts;

  const addAccount = () => {
    if (!needUpgrade) {
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
    } else {
      history.push(`${appRouteConstants.settings.SETTINGS}?active=Plan`)
    }
  }

  const removeAccounts = async (accounts: Account[]) => {
    setDeleting(true);
    const { error } = await deleteAccounts({ dispatch, accounts });
    setDeleting(false);
  }

  return (
    <>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
            <div className='mm-account-overview__add-account m-b-8 mb-md-0'>
              <span>Manual Accounts ({manualAccountList.length}/{availableAccounts})</span>
              { needUpgrade &&
              <span className='upgrade-caption'>Upgrade your account to add more accounts</span>
              }
            </div>
            <div>
              <button
                type='button'
                className='btn btn-outline-primary mm-button btn-lg'
                onClick={addAccount}
              >
                {needUpgrade ? 'Upgrade Plan' : 'Add Account' }
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='card mm-setting-card mm-account-overview__account'>
        <div className='card-body manual'>
          <div className='row pb-2 pt-1'>
            <div className='col-10 col-md-6'>
              <div>
                <DefaultProviderLogo className='mr-3 mr-md-4'/>
                <span className='mm-account-overview__block-title'>My own account</span>
              </div>
            </div>
          </div>

          {manualAccountList.map((acc, index) => {
            return <AccountRow account={acc} key={index} />;
          })}

          <div className='row py-3'>
            <div className='col-12 col-md-6' />
            <div className='col-12 col-md-6 text-right'>
              <button className='btn text-danger mm-button__flat mm-account-overview__delete-link '
                      onClick={() => {removeAccounts(manualAccountList)}}
                      disabled={deleting}>
                {deleting && <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'/>}
                <span className={'ml-1'}> {deleting ? 'Deleting...' : 'Delete account and remove data'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AccountCard: React.FC<AccountCardProps> = ({ accountList, availableAccounts}) => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const [deleting, setDeleting] = useState<boolean>(false);
  const needUpgrade = accountList.length >= availableAccounts;
  const accountsByProvider = groupByProviderName(accountList);

  const addAccount = () => {
    if (!needUpgrade) {
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
    } else {
      history.push(`${appRouteConstants.settings.SETTINGS}?active=Plan`)
    }
  }

  const removeAccounts = async (accounts: Account[]) => {
    setDeleting(true);
    const { error } = await deleteAccounts({ dispatch, accounts });
    setDeleting(false);
  }

  return (
    <>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
            <div className='mm-account-overview__add-account m-b-8 mb-md-0'>
              <span>Connected Accounts ({accountList.length}/{availableAccounts})</span>
              { needUpgrade &&
                <span className='upgrade-caption'>Upgrade your account to add more connections</span>
              }
            </div>
            <div>
              <button
                type='button'
                className='btn btn-outline-primary mm-button btn-lg'
                onClick={addAccount}
              >
                {needUpgrade ? 'Upgrade Plan' : 'Add Account' }
              </button>
            </div>
          </div>
        </div>
      </div>

      {Object.entries(accountsByProvider).map(([providerName, accounts], index) => (
        <div key={index}>
          <div className='card mm-setting-card mm-account-overview__peer-street'>
            <div className='card-body connected'>
              <div className='row pb-2 pt-1'>
                <div className='col-10 col-md-6'>
                  <div>
                    <img src={accounts[0].providerLogo || DefaultAvatar} className='mr-3 mr-md-4 accounts-provider-logo' alt={`${providerName} logo`} />
                    <span className='mm-account-overview__block-title'>{providerName}</span>
                  </div>
                </div>
                {/* TODO Refresh single account when API is ready
                <div className='col-2 col-md-1 order-md-2 text-right'>
                  <Refresh />
                </div>*/}
                <div className='col-12 col-md-6 order-md-1 text-md-right pt-2 pt-md-0'>
                  <small className='text-gray'>Last updated {getRelativeDate(accountList[0].balancesFetchedAt)}</small>
                </div>
              </div>

              {accounts.map((account, accountIndex) => {
                return <AccountRow key={accountIndex} account={account} />;
              })}

              <div className='row py-3'>
                <div className='col-12 col-md-6'>
                  <a className='purple-links mm-account-overview__update-link mb-3 mb-md-0' href='/'>Update Credentials</a>
                </div>
                <div className='col-12 col-md-6 text-right'>
                  <button className='btn text-danger mm-button__flat mm-account-overview__delete-link '
                          onClick={() => {removeAccounts(accounts)}}
                          disabled={deleting}>
                    {deleting && <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'/>}
                    <span className={'ml-1'}> {deleting ? 'Deleting...' : 'Delete account and remove data'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const AccountRow: React.FC<AccountRowProps> = ({ account }) => {
  return (
    <div className='row py-3'>
      <div className='col-12 col-md-8'>
        <div className='d-flex justify-content-between justify-content-md-start'>
          {/*TODO Ability to switch accounts on or off (needs API)*/}
          {/*<span className='mm-switch-block mr-md-2'>
            <input type='checkbox' className='mm-switch-input' id={`mc3-${account.id}`} name='Switch' />
            <label className='mm-switch' htmlFor={`mc3-${account.id}`}></label>
          </span>*/}
          <span className='connections-account-name'>{account.accountName} {account.accountNumber? ` (${account.accountNumber.slice(-4)})` : null}</span>
        </div>
      </div>
      <div className='col-6 col-md-2'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='mm-account-overview__amount'>${numberWithCommas(fNumber(account.balance, 2))}</div>
        </div>
      </div>
      <div className='col-6 col-md-2'>
        <div className='d-flex float-right'>
          <Link to={`/account-details/${account.id}`}>
            <IconEdit className='edit-icon small-icon mr-2'/>
          </Link>
          <IconTrash className='trash-icon small-icon'/>
        </div>
      </div>
    </div>
  );
};
