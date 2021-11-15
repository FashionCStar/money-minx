import React from 'react';
import { Link } from 'react-router-dom';
import { SettingTitleProps, SettingPageEnum } from 'setting/setting.type';

export const SettingTitleSection: React.FC<SettingTitleProps> = ({ handlePageSelect, pageTitle }) => {
  const tc = (title: SettingPageEnum) =>
    title === pageTitle ? 'mm-settings-title--type active' : 'mm-settings-title--type';

  return (
    <div className='mm-settings-title'>
      <ul className='mm-settings-title--list'>
        <li
          className={tc(SettingPageEnum.SETTINGS)}
          role='button'
          onClick={() => handlePageSelect(SettingPageEnum.SETTINGS)}
        >
          <Link className='mm-settings-title--link' to='#'>
            Settings
          </Link>
        </li>
        <li
          className={tc(SettingPageEnum.PROFILE)}
          role='button'
          onClick={() => handlePageSelect(SettingPageEnum.PROFILE)}
        >
          <Link className='mm-settings-title--link' to='#'>
            Profile
          </Link>
        </li>
        <li className={tc(SettingPageEnum.PLAN)} role='button' onClick={() => handlePageSelect(SettingPageEnum.PLAN)}>
          <Link className='mm-settings-title--link' to='#'>
            Plan
          </Link>
        </li>
        <li
          className={tc(SettingPageEnum.ACCOUNTS)}
          role='button'
          onClick={() => handlePageSelect(SettingPageEnum.ACCOUNTS)}
        >
          <Link className='mm-settings-title--link' to='#'>
            Accounts
          </Link>
        </li>
      </ul>
      <div className='mm-settings-title--bar' />
    </div>
  );
};

export default SettingTitleSection;
