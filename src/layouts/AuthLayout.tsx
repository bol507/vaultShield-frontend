import React from 'react';
import { Outlet } from 'react-router-dom';
import style from 'layouts/authLayout.module.css';

const AuthLayout = () => {
  return (
    <div className={style.authLayout}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
