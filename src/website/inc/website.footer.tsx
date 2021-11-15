import React from 'react';
import { Link } from 'react-router-dom';

import footerData from '@mm/data/footer.data.json';
import featureList from '@mm/data/feature.list.json';
import resourceList from '@mm/data/resource.list.json';
import companyInfoList from '@mm/data/company-info.list.json';
import SignupToday from 'website/partials/signup-today.footer';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';
import { ReactComponent as YoutubeIcon } from 'assets/icons/youtube.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as LinkedinIcon } from 'assets/icons/linkedin.svg';
import { ReactComponent as InstagramIcon } from 'assets/icons/instagram.svg';
import { ReactComponent as PinterestIcon } from 'assets/icons/pinterest.svg';
import { ReactComponent as AppStoreLogo } from 'assets/icons/app-store-black.svg';
import { ReactComponent as GooglePlayLogo } from 'assets/icons/google-play-black.svg';

interface ListType {
  title: string;
  list: {
    name: string;
    link: string;
    external?: boolean;
  }[];
}

interface Data {
  data: ListType;
}

const List = ({ data }: Data) => {
  const list = data.list.map((item, idx) => (
    <p key={idx} className=''>
      {item.external ? (
        <a href={item.link} target='_blank' rel='noopener noreferrer' className='text-white'>
          {item.name}
        </a>
      ) : (
        <Link to={item.link} className='text-white'>
          {item.name}
        </Link>
      )}
    </p>
  ));
  return (
    <div className='wf-list-wrapper py-2'>
      <h5>{data.title}</h5>
      <div className='wf-list-items'>{list}</div>
    </div>
  );
};

const FooterList = () => {
  return (
    <div className='row'>
      <div className='col-sm-4'>
        <List data={resourceList} />
      </div>
      <div className='col-sm-4'>
        <List data={featureList} />
      </div>
      <div className='col-sm-4'>
        <List data={companyInfoList} />
      </div>
    </div>
  );
};

const social = [
  {
    icon: <FacebookIcon />,
    link: 'https://www.facebook.com/moneyminx',
  },
  {
    icon: <TwitterIcon />,
    link: 'https://twitter.com/moneyminxapp',
  },
  {
    icon: <InstagramIcon />,
    link: 'https://instagram.com/moneyminxapp',
  },
  {
    icon: <LinkedinIcon />,
    link: 'https://linkedin.com/company/moneyminx',
  },
  {
    icon: <YoutubeIcon />,
    link: 'https://www.youtube.com/channel/UCmWuUaetlK3fABjglo9cEaQ',
  },
  {
    icon: <PinterestIcon />,
    link: 'https://www.pinterest.com/moneyminx/',
  },
];

const SocialList: React.FC = () => (
  <ul className='navbar-nav'>
    {social.map(({ icon, link }, idx) => {
      return (
        <li key={idx} className='social-links'>
          <a href={link} target='_blank' rel='noopener noreferrer'>
            {icon}
          </a>
        </li>
      );
    })}
  </ul>
);

const footerListComponent = <FooterList />;

interface WebsiteFooter {
  isSignupToday?: boolean;
}

const WebsiteFooter: React.FC<WebsiteFooter> = ({ isSignupToday = true }) => {
  return (
    <div className='website-footer'>
      {isSignupToday ? <SignupToday /> : null}

      <div className='website-footer-wrapper bg-secondary text-white'>
        <div className='footer-hero-wrapper'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='coming-soon-wrapper'>
                <p className='large-heading-light'>Coming Soon</p>
                <p className='light-80'>
                  Money Minx is currently available online and coming soon to iOS and Android devices.
                </p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='download-btn-wrapper'>
                <AppStoreLogo className='first-svg-item' />
                <GooglePlayLogo className='ml-3 text-white' color='white' />
              </div>
            </div>
          </div>
        </div>

        <div className='footer-end-section p-t-40'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='mm-links-wrapper'>{footerListComponent}</div>
            </div>
            <div className='col-lg-6'>
              <div className='info-copyright-wrapper'>
                <div className='info-wrapper light py-2'>{footerData.moneyminxInfo}</div>
                <div className='social-links-wrapper d-flex flex-row'>
                  <SocialList />
                </div>
                <div className='copyright-wrapper'>{footerData.copyrightText.replace(':year', '2020')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFooter;
