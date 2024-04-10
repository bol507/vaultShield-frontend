import React from 'react';
import {
  card,
  insideCard,
  wrapperInputBorderBottom,
  inputTransparent,
  btnDefault
} from 'styles/tailwind.classes';

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

        <div className={wrapperInputBorderBottom}>
          <label className="block dark:text-gray-100 text-sm mb-2">
            Username
          </label>
          <input
            type="email"
            placeholder="your_name@email.com"
            className={inputTransparent}
          />
        </div>

        <div className={wrapperInputBorderBottom}>
          <label className="block dark:text-gray-100 text-sm mb-2">
            Password
          </label>
          <input type="password" className={inputTransparent} />
        </div>

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
