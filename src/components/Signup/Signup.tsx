import { useContext, useState, MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { validateForm } from 'utils/validations';
import { btnDefault } from 'styles/tailwind.classes';
import InputBase from 'components/InputBase';
import { UserContext } from 'contexts/userContext';
import { NotificationContext } from 'contexts/notificationContext';

interface ErrorsForm {
  email?: string;
  password?: string;
  username?: string;
  error?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  //context
  const { addUser } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);
  //user variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  //validation error;
  const [errors, setErrors] = useState<ErrorsForm>({});

  const handleRegister: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    try {
      event.preventDefault();

      const errorsForm: ErrorsForm = validateForm([
        { name: 'email', value: email, required: true },
        { name: 'password', value: password, required: true, minLength: 8 },
        { name: 'username', value: username, required: true }
      ]);

      setErrors(errorsForm);

      if (!errorsForm.email && !errorsForm.password && !errorsForm.username) {
        const newUser = {
          email,
          password,
          username
        };
        await addUser(newUser);
        showNotification({
          message: 'Registration successfuly!',
          variant: 'success'
        });
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error) setErrors({ error: err.message });
      showNotification({
        message: `Error in registration! ${err.message}`,
        variant: 'danger'
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border rounded-md shadow-xl h-max w-11/12 md:w-4/12 m-0 pb-4 px-4 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white flex flex-col">
        <div className="flex justify-evenly flex-col rounded-md dark:bg-zinc-700 h-[420px] mt-9 w-full px-2">
          <div>
            <h2 className="dark:text-gray-100 text-lg">
              Create a VaultShield account
            </h2>
            <p className="dark:text-gray-100"> one account for everything!</p>
          </div>
          <InputBase
            label="Username"
            type="text"
            placeholder="what do you want to call yourself?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></InputBase>
          {errors.username && <p className="text-red-500">{errors.username}</p>}{' '}
          <InputBase
            label="Email"
            type="email"
            placeholder="input your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}{' '}
          <InputBase
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}{' '}
          <button className={btnDefault} onClick={handleRegister}>
            Create Account
          </button>
          {errors.error && <p className="text-red-500">{errors.error}</p>}{' '}
          <div>
            <span>Already have an account?</span>

            <Link
              className="ml-2 hover:underline hover:text-cinder-600 text-cinder-400 cursor-pointer"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
