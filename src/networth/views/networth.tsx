import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { fNumber, numberWithCommas } from 'common/number.helper';
import { useAlert } from 'common/components/alert';
import useNetworth from 'networth/hooks/useNetworth';
import NetworthLayout from 'networth/networth.layout';
import { AccountCategory } from 'networth/networth.enum';
import MeasureIcon from 'assets/images/networth/measure.svg';
import BlurChart from 'assets/images/networth/chart-blur.png';
import { getMonthYear, getQuarter, getYear } from 'common/moment.helper';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import NetworthHead from './inc/networth-head';
import NetworthBarGraph from './networth-bar-graph';
import NetworthFilter from './inc/networth-filter';
/*import ConnectionAlert from './inc/connection-alert';*/
import { useNetworthState, useNetworthDispatch } from 'networth/networth.context';

import { setToggleInvestment, setToggleOther, setToggleLiabilities, setToggleNet } from 'networth/networth.actions';
import useProfile from 'auth/hooks/useProfile';

const Networth = () => {
  useProfile();
  const history = useHistory();
  const connectionAlert = useAlert();

  const { loading } = useNetworth();
  const { accounts, networth, fToggleInvestment, fToggleOther, fToggleLiabilities, fToggleNet, fCategories } = useNetworthState();
  const dispatch = useNetworthDispatch();

  useEffect(() => {
    connectionAlert.open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !networth || !accounts) {
    return <CircularSpinner />;
  }

  const otherAssets = accounts[AccountCategory.OTHER_ASSETS];
  const liabilities = accounts[AccountCategory.LIABILITIES];
  const investmentAssets = accounts[AccountCategory.INVESTMENT_ASSETS];

  const isCurrent = (interval: string) =>
    getMonthYear() === interval || getYear() === interval || getQuarter() === interval;

  const gc = (interval: string) => {
    if (interval) {
      if (isCurrent(interval)) {
        return 'current-m';
      }
    }
    // return 'tab-hide';
    return '';
  };

  const [curNetworthItem] = networth.filter((networthItem) => isCurrent(networthItem.interval));
  const currentNetworth = curNetworthItem?.networth || 0;
  const currentOtherAssets = curNetworthItem?.otherAssets || 0;
  const currentLiabilities = curNetworthItem?.liabilities || 0;
  const currentInvestmentAsset = curNetworthItem?.investmentAssets || 0;

  const handleAccountDetail = (accountId: number) => {
    history.push(`/account-details/${accountId}`);
  };

  const toggleInvestment = () => {
    dispatch(setToggleInvestment(!fToggleInvestment));
  };
  const toggleOther = () => {
    dispatch(setToggleOther(!fToggleOther));
  };
  const toggleLiabilities = () => {
    dispatch(setToggleLiabilities(!fToggleLiabilities));
  };
  const toggleNet = () => {
    dispatch(setToggleNet(!fToggleNet));
  };

  return (
    <NetworthLayout>
      <section className='content-container'>
        <NetworthHead />
        <div className='content-wrapper'>
          <div className='container'>
            <NetworthFilter />
            <div className='row mb-40'>
              <div className='col-lg-9 mob-btm'>
                <div className='ct-box'>
                  <div className='graphbox'>
                    <ul>
                      {currentInvestmentAsset ? (
                        <li className='inv-data'>
                          <span>Investment Assets</span>
                          <h3>${numberWithCommas(fNumber(currentInvestmentAsset, 0))}</h3>
                        </li>
                      ) : null
                      }
                      {currentOtherAssets ? (
                        <li className='other-data'>
                          <span>Other Assets</span>
                          <h3>${numberWithCommas(fNumber(currentOtherAssets, 0))}</h3>
                        </li>
                      ) : null
                      }
                      {currentLiabilities ? (
                        <li className='lty-data'>
                          <span>Liabilities</span>
                          <h3>${numberWithCommas(fNumber(currentLiabilities, 0))}</h3>
                        </li>
                      ) : null
                      }
                      {currentInvestmentAsset && currentOtherAssets && currentLiabilities ? (
                        <li className='nw-data'>
                          <span>Net Worth</span>
                          <h3>${numberWithCommas(fNumber(currentNetworth, 0))}</h3>
                        </li>) : null}
                    </ul>
                    <div className='chartbox'>
                      <NetworthBarGraph networth={networth} fCategories={fCategories} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 mob-btm'>
                <div className='ct-box padd-20'>
                  <div className='measure-box'>
                    <h2>
                      <img src={MeasureIcon} alt='Measure UP' /> Minx Measure-up
                    </h2>
                    <div
                      className='bgbox'
                      style={{
                        backgroundImage: `url(${BlurChart})`,
                      }}
                    >
                      <p>Portfolio comparisons are coming soon. Complete your profile for better results once live.</p>
                      <Link to='/settings?active=Profile' className='mm-btn-animate mm-btn-primary'>
                        Complete Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {investmentAssets?.length ? (
              <div className='row mb-40'>
                <div className='col-12'>
                  <div className='ct-box box-b'>
                    <div className='table-holder'>
                      <Table className='tb-responsive' id='table-investment-xls'>
                        <thead onClick={toggleInvestment}>
                          <tr data-toggle='collapse'>
                            <th>
                              <span className={(!fToggleInvestment ? 't-span' : '')}>Investment Assets</span>
                            </th>
                            <th className={(!fToggleInvestment ? 'd-hide' : '')}>Type</th>

                            {investmentAssets?.[0]?.balances.map((item, idx) => (
                              <th key={idx} className={gc(item.interval)}>
                                {item.interval}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        {fToggleInvestment ? (
                          <tbody>
                            {investmentAssets?.map((iAsset, index) => {
                              return (
                                <tr key={index} onClick={() => handleAccountDetail(iAsset.accountId)}>
                                  <td>{iAsset.accountName}</td>
                                  <td className={`hide-type`}>{iAsset.accountType}</td>
                                  {iAsset.balances.map((b, idx) => (
                                    <td key={`${index}-${idx}`} className={[b.type === `projection` && `projection`, gc(b.interval)].join(' ')}>
                                      <span className={gc(b.interval)}>{b.interval}</span>
                                      {numberWithCommas(fNumber(b.balance, 2))}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        ) : null}
                        <tfoot className={'projection'}>
                          <tr data-href='#'>
                            <td>
                              <Link
                                to='#'
                                className='warning-popover'
                                data-classname='warning-pop'
                                data-container='body'
                                title='Warning'
                                data-toggle='popover'
                                data-placement='right'
                                data-content=''
                              >
                                Total
                                </Link>
                            </td>
                            <td className={[(!fToggleInvestment ? 'd-hide' : ''), `hide-type`].join(' ')}>{''}</td>
                            {networth?.map((nItem, idx) => (
                              <td key={idx} className={[nItem.type === `projection` && `projection`, gc(nItem.interval)].join(' ')}>
                                <span className={gc(nItem.interval)}>{nItem.interval}</span>
                                {numberWithCommas(fNumber(nItem.investmentAssets, 2))}
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {otherAssets?.length ? (
              <div className='row mb-40'>
                <div className='col-12'>
                  <div className='ct-box box-g'>
                    <div className='table-holder'>
                      <Table className='tb-responsive' id='table-other-xls'>
                        <thead onClick={toggleOther}>
                          <tr>
                            <th>
                              <span className={(!fToggleOther ? 't-span' : '')}>Other Assets</span>
                            </th>
                            <th className={(!fToggleOther ? 'd-hide' : '')}>Type</th>
                            {otherAssets?.[0]?.balances.map((item, idx) => (
                              <th key={idx} className={gc(item.interval)}>
                                {item.interval}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        {fToggleOther ? (
                          <tbody>
                            {otherAssets?.map((oAsset, index) => {
                              return (
                                <tr key={index} onClick={() => handleAccountDetail(oAsset.accountId)}>
                                  <td>{oAsset.accountName}</td>
                                  <td className={`hide-type`}>{oAsset.accountType}</td>
                                  {oAsset.balances.map((b, idx) => (
                                    <td key={`${index}-${idx}`} className={[b.type === `projection` && `projection`, gc(b.interval)].join(' ')}>
                                      <span className={gc(b.interval)}>{b.interval}</span>
                                      {numberWithCommas(fNumber(b.balance, 2))}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        ) : null}
                        <tfoot className={'projection'}>
                          <tr data-href='#'>
                            <td className={'text--primary'}>Total</td>
                            <td className={[(!fToggleOther ? 'd-hide' : ''), `hide-type`].join(' ')}>{''}</td>
                            {networth?.map((nItem, idx) => (
                              <td key={idx} className={[nItem.type === `projection` && `projection`, gc(nItem.interval)].join(' ')}>
                                <span className={gc(nItem.interval)}>{nItem.interval}</span>
                                {numberWithCommas(fNumber(nItem.otherAssets, 2))}
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {liabilities?.length ? (
              <div className='row mb-40'>
                <div className='col-12'>
                  <div className='ct-box box-r'>
                    <div className='table-holder'>
                      <Table className='tb-responsive' id='table-liabilities-xls'>
                        <thead onClick={toggleLiabilities}>
                          <tr>
                            <th>
                              <span className={(!fToggleLiabilities ? 't-span' : '')}>Liabilities</span>
                            </th>
                            <th className={(!fToggleLiabilities ? 'd-hide' : '')}>Type</th>
                            {liabilities?.[0]?.balances.map((item, idx) => (
                              <th key={idx} className={gc(item.interval)}>
                                {item.interval}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        {fToggleLiabilities ? (
                          <tbody className={'projection'}>
                            {liabilities?.map((liability, index) => {
                              return (
                                <tr key={index} onClick={() => handleAccountDetail(liability.accountId)}>
                                  <td>{liability.accountName}</td>
                                  <td className={`hide-type`}>{liability.accountType}</td>
                                  {liability.balances.map((b, idx) => (
                                    <td key={`${index}-${idx}`} className={[b.type === `projection` && `projection`, gc(b.interval)].join(' ')}>
                                      <span className={gc(b.interval)}>{b.interval}</span>
                                      {numberWithCommas(fNumber(b.balance, 2))}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        ) : null}
                        <tfoot className={'projection'}>
                          <tr>
                            <td className={'text--primary'}>Total</td>
                            <td className={[(!fToggleInvestment ? 'd-hide' : ''), `hide-type`].join(' ')}>{''}</td>
                            {networth?.map((nItem, idx) => (
                              <td key={idx} className={[nItem.type === `projection` && `projection`, gc(nItem.interval)].join(' ')}>
                                <span className={gc(nItem.interval)}>{nItem.interval}</span>
                                {numberWithCommas(fNumber(nItem.liabilities, 2))}
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {currentInvestmentAsset && currentOtherAssets && currentLiabilities ? (
              <div className='row mb-40'>
                <div className='col-12'>
                  <div className='ct-box box-v'>
                    <div className='table-holder'>
                      <Table className='tb-responsive' id='table-net-xls'>
                        <thead onClick={toggleNet}>
                          <tr>
                            <th>
                              <span className={(!fToggleNet ? 't-span text--primary' : 'text--primary')}>Net Worth</span>
                            </th>
                            <th className='tab-hide'>{''}</th>
                            {networth?.map((nItem, idx) => (
                              <th key={idx} className={gc(nItem.interval)}>
                                {nItem.interval}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        {fToggleNet ? (
                          <tbody className={'projection'}>
                            <tr data-href='#'>
                              <td>Investment Assets</td>
                              <td className='tab-hide'>{''}</td>
                              {networth?.map((nItem, idx) => (
                                <td key={idx} className={[nItem.type === `projection` && `projection`, gc(nItem.interval)].join(' ')}>
                                  <span className={gc(nItem.interval)}>{nItem.interval}</span>
                                  {numberWithCommas(fNumber(nItem.investmentAssets, 2))}
                                </td>
                              ))}
                            </tr>
                            <tr data-href='#'>
                              <td>Other Assets</td>
                              <td className='tab-hide'>{''}</td>

                              {networth?.map((nItem, idx) => (
                                <td key={idx} className={[nItem.type === `projection` && `projection`, gc(nItem.interval)].join(' ')}>
                                  <span className={gc(nItem.interval)}>{nItem.interval}</span>
                                  {numberWithCommas(fNumber(nItem.otherAssets, 2))}
                                </td>
                              ))}
                            </tr>
                            <tr data-href='#'>
                              <td>Liabilities</td>
                              <td className='tab-hide'>{''}</td>

                              {networth?.map((nItem, idx) => (
                                <td key={idx} className={[nItem.type === `projection` && `projection`, gc(nItem.interval)].join(' ')}>
                                  <span className={gc(nItem.interval)}>{nItem.interval}</span>
                                  {numberWithCommas(fNumber(nItem.liabilities, 2))}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        ) : null}
                        <tfoot className={'projection'}>
                          <tr>
                            <td className={'text--primary'}>Net Worth</td>
                            <td className='tab-hide'>{''}</td>
                            {networth?.map((nItem, idx) => (
                              <td key={idx} className={[nItem.type === `projection` && `projection`, gc(nItem.interval)].join(' ')}>
                                <span className={gc(nItem.interval)}>{nItem.interval}</span>
                                {numberWithCommas(fNumber(nItem.networth, 2))}
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/*Todo show an alert when connections are broken with count of broken connections*/}
        {/*<ConnectionAlert connectionAlert={connectionAlert} message='2 connections need attention' />*/}
      </section>
    </NetworthLayout>
  );
};

export default Networth;
