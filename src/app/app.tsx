import React from 'react';
import Main from './main';
import { AppProvider } from './app.context';
import { AuthProvider } from 'auth/auth.context';
import { ToastContainer } from 'react-toastify';

import 'assets/css/app.scss';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
