import React from 'react';
interface Props {}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='container-fluid menu-dashboard-layout-wrapper'>
      <div className='row'>
        <div className='col-md-2 sidebar-wrapper'>{}</div>
        <div className='col-md-10  dashboard-wrapper'>
          <div className='dashboard-nav-wrapper'>dashboard nav</div>
          <div className='dashboard-content-wrapper'>{children}</div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
