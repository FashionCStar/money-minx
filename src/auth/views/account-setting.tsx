import { Dictionary } from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import React, { createRef, useCallback, useEffect, useState } from 'react';

import { Account } from 'auth/auth.types';
import { AuthLayout } from 'layouts/auth.layout';
import { groupByProviderName } from 'auth/auth.helper';
import { getRefreshedProfile } from 'auth/auth.service';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { useAuthState, useAuthDispatch } from 'auth/auth.context';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as SecurityIcon } from 'assets/images/signup/security.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import ConnectAccountSteps from './inc/connect-steps';
import AccountSettingForm from './inc/account-setting-form';

const AccountSetting = () => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const { accounts } = useAuthState();
  const [providerName, setProviderName] = useState('');
  const [finish, setFinish] = useState<boolean>(false);
  const [reloadCounter, setReloadCounter] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [clickEvent, setClickEvent] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [completedProviderName, setCompletedProviderName] = useState<string[]>([]);
  const [currentProviderAccounts, setCurrentProviderAccounts] = useState<Account[]>();
  const [accountsByProviderName, setAccountsByProviderName] = useState<Dictionary<Account[]>>();

  useEffect(() => {
    const getUser = async () => {
      await getRefreshedProfile({ dispatch });
    };

    getUser();
  }, [dispatch, reloadCounter]);

  useEffect(() => {
    if (accounts) {
      setCurrentAccount(accounts[0]);
      const accountsByProvider = groupByProviderName(accounts);
      setAccountsByProviderName(accountsByProvider);

      const completedProviders = Object.keys(accountsByProvider).filter((pName) =>
        accountsByProvider[pName].every((acc) => acc.accountDetails?.overridden === true)
      );

      setCompletedProviderName(completedProviders);

      const [curProviderName] = Object.keys(accountsByProvider);
      setProviderName(curProviderName);

      const curProviderAccounts = accountsByProvider[curProviderName];
      setCurrentProviderAccounts(curProviderAccounts);
    }
  }, [accounts]);

  /**
   * Get the first Non overridden account
   */
  useEffect(() => {
    if (accountsByProviderName) {
      const curProviderAccounts = accountsByProviderName[providerName];
      setCurrentProviderAccounts(curProviderAccounts);
      const firstNonOverriddenAccount = curProviderAccounts.find((acc) => acc.accountDetails?.overridden !== true);

      if (firstNonOverriddenAccount) {
        setCurrentAccount(firstNonOverriddenAccount);
      }
    }
  }, [providerName, accountsByProviderName]);

  /**
   * set completed account id's
   */
  useEffect(() => {
    if (accounts) {
      const completedIds = accounts.filter((acc) => acc.accountDetails?.overridden).map((item) => item.id);
      setCompleted(completedIds);
    }
  }, [accounts]);

  /**
   * If accounts of the current provider is overridden goto next provider
   * If nextProvider not found set finish true
   */
  useEffect(() => {
    if (currentProviderAccounts && accountsByProviderName && !clickEvent) {
      if (currentProviderAccounts.every((acc) => acc.accountDetails?.overridden)) {
        const pName = currentProviderAccounts[0]?.providerName;
        const providerIndex = Object.keys(accountsByProviderName).indexOf(pName);
        const nextProviderName = Object.keys(accountsByProviderName)[providerIndex + 1];

        if (nextProviderName) {
          setProviderName(nextProviderName);

          return setCurrentProviderAccounts(accountsByProviderName[nextProviderName]);
        }

        return setFinish(true);
      }
    }
  }, [currentProviderAccounts, accountsByProviderName, clickEvent]);

  if (!accounts || !currentAccount || !currentProviderAccounts) {
    return <CircularSpinner />;
  }

  const handleProviderChange = (provider: string) => {
    setClickEvent(true);
    setProviderName(provider);
  };

  const handleChangeCurrentAccount = (curAccount: Account) => {
    setCurrentAccount(curAccount);
  };

  const getProviderClass = (pName: string) => {
    if (providerName === pName) {
      return ' selected';
    }

    if (completedProviderName.includes(pName)) {
      return ' completed';
    }

    return '';
  };

  const navigateToNetworth = () => {
    return history.push('/net-worth');
  };

  return (
    <AuthLayout>
      <div className='main-table-wrapper'>
        <div className=''>
          <div className='row login-wrapper'>
            <div className='guide-content'>
              <Link to='/'>
                <LogoImg className='icon auth-logo' />
              </Link>

              <div className='auth-left-content'>
                <h1>Three easy steps to get started with Money Minx</h1>
                <ul>
                  <li>Find your accounts</li>
                  <li>Connect it securely to Money Minx</li>
                  <li>Let Money Minx do the rest</li>
                </ul>
                <div className='guide-bottom'>
                  <h4>Serious about security</h4>
                  <div className='guide-icon-wrap'>
                    <span className='locked-icon'>
                      <LoginLockIcon />
                    </span>
                    <p>The security of your information is our top priority</p>
                  </div>
                  <h4>Trusted by investors</h4>
                  <div className='guide-icon-wrap'>
                    <span className='shield-icon'>
                      <LoginShieldIcon />
                    </span>
                    <p>Investors from all over the world are using Money Minx</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white credentials-wrapper account-setting'>
              <div className='credentials-content'>
                <div className='logo-img-wrapper'>
                  <LogoImg className='auth-logo' />
                </div>
                <div className='top-content-wrap'>
                  <h2>Organize accounts</h2>
                  <p>
                    Great! You connected your accounts. Now you can organize them to get better insights into your
                    portfolio.
                  </p>
                </div>

                <div className='form-wrap'>
                  <ul className='bank-list'>
                    {accountsByProviderName
                      ? Object.keys(accountsByProviderName).map((pName, index) => {
                          const [account] = accountsByProviderName[pName];

                          return (
                            <li
                              key={index}
                              onClick={() => handleProviderChange(pName)}
                              role='button'
                              className={getProviderClass(pName)}
                            >
                              <Link to='#'>
                                {account.providerLogo ? <img src={account.providerLogo} alt={pName} /> : pName}
                              </Link>
                            </li>
                          );
                        })
                      : null}
                  </ul>

                  <div className='form-heading'>
                    <AccountNameList
                      completedIds={completed}
                      currentAccount={currentAccount}
                      currentProviderAccounts={currentProviderAccounts}
                      changeCurrentAccount={handleChangeCurrentAccount}
                    />
                  </div>

                  <AccountSettingForm
                    currentAccount={currentAccount}
                    handleReload={() => setReloadCounter((c) => c + 1)}
                  />

                  <p className='flex-box learn-more-security'>
                    <SecurityIcon />
                    <a href='/security' target='_blank' className='purple-links'>
                      Learn about our security
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConnectAccountSteps isAccountSettings onSkip={navigateToNetworth} isCompleted={finish} onFinish={navigateToNetworth} />
      </div>
    </AuthLayout>
  );
};

export default AccountSetting;

interface AccountNameListProps {
  currentProviderAccounts: Account[];
  currentAccount: Account;
  completedIds: number[];
  changeCurrentAccount: (curAccount: Account) => void;
}

export const AccountNameList: React.FC<AccountNameListProps> = ({
  completedIds,
  currentAccount,
  changeCurrentAccount,
  currentProviderAccounts,
}) => {
  const refList: any = [];

  currentProviderAccounts.forEach((currentProviderAccount) => {
    refList[currentProviderAccount.id] = createRef();
  });

  const scrollToCategory = useCallback(
    (id: number) => {
      if (refList) {
        refList[id]?.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    },
    [refList]
  );

  useEffect(() => {
    scrollToCategory(currentAccount.id);
  }, [scrollToCategory, currentAccount]);

  const getAccountClass = (accId: number) => (currentAccount?.id === accId ? 'account-btn active' : 'account-btn');
  const completedClass = (accId: number) => (completedIds.includes(accId) ? 'completed' : '');

  return (
    <ul className='nav'>
      {currentProviderAccounts?.map((providerAccount, index) => {
        return (
          <li key={index} ref={refList[providerAccount.id]}>
            <button
              className={`${getAccountClass(providerAccount.id)} ${completedClass(providerAccount.id)}`}
              onClick={() => changeCurrentAccount(providerAccount)}
            >
              {providerAccount.accountName}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
