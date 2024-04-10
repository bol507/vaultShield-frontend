import React from 'react';
import { card, insideCard, btnDefault } from 'styles/tailwind.classes';
import InputBase from './InputBase';

const Signup = () => {
  return (
    <div className={card}>
      <div className={insideCard}>
        <div>
          <h2 className="dark:text-gray-100 text-lg">
            Create a VaultShield account
          </h2>
          <p className="dark:text-gray-100"> one account for everything!</p>
        </div>

        <InputBase
          label="Email"
          type="email"
          placeholder="input your email..."
        />
        <InputBase label="Password" type="password" />

        <button className={btnDefault}>Create Account</button>
        <div>
          <span>Already have an account?</span>
          <span className="ml-2">sign in</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
