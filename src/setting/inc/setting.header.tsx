import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthState } from 'auth/auth.context';
import { capitalize } from 'common/common-helper';
import DefaultAvatar from 'assets/icons/default-avatar.svg';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as ProBadge } from 'assets/images/about/pro-badage.svg';

export const NavBarSection: React.FC = () => {
  const { user } = useAuthState();
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mm-setting-navbar'>
      <Link className='navbar-brand' to='/'>
        <Logo />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavDropdown'
        aria-controls='navbarNavDropdown'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>
      <div className='collapse navbar-collapse' id='navbarNavDropdown'>
        <ul className='navbar-nav mm-setting-nav'>
          <div className='d-flex align-items-center'>
            <li className='nav-item mm-setting-nav--item'>
              <Link className='nav-link' to='/net-worth'>
                Net Worth <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='#'>
                Allocation
              </Link>
            </li>
          </div>
          <div className='d-flex align-items-center'>
            <li className='mr-4'>
              <button type='button' className='btn btn-outline-primary custom-dot-btn'>
                Upgrade
              </button>
            </li>
            <div className='mt-vl' />
            <li className='mr-1'>
              <ProBadge />
            </li>
            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                id='navbarDropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <img
                  alt='Owner'
                  src={user?.picture || DefaultAvatar}
                  className='rounded-circle mr-2'
                  width='38'
                  height='38'
                />
                {capitalize(user?.firstName || 'User')}
              </Link>
              <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                <Link className='dropdown-item' to='#'>
                  Action
                </Link>
                <Link className='dropdown-item' to='#'>
                  Another action
                </Link>
                <Link className='dropdown-item' to='#'>
                  Something else here
                </Link>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarSection;
