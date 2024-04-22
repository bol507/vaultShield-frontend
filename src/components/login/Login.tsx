import { btnDefault } from 'styles/tailwind.classes';
import InputBase from '../InputBase';
import { useState, useContext } from 'react';
import { UserContext } from 'contexts/userContext';
import { validateForm } from 'utils/validations';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from 'contexts/notificationContext';

interface ErrorsForm {
  email?: string;
  password?: string;
  error?: string;
}

export function Login({ handleLogin }) {
  type InfoUser = {
    email: string;
    password: string;
  };
  const navigate = useNavigate();
  const [infoUser, setInfoUser] = useState({
    email: '',
    password: ''
  });
  //contexts
  const { loginUser } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);

  const [errors, setErrors] = useState<ErrorsForm>({});

  const sendData = async (infoUser: InfoUser) => {
    try {
      const errorsForm: ErrorsForm = validateForm([
        { name: 'email', value: infoUser.email, required: true },
        {
          name: 'password',
          value: infoUser.password,
          required: true,
          minLength: 8
        }
      ]);

      setErrors(errorsForm);
      if (!errorsForm.email && !errorsForm.password) {
        await loginUser(infoUser);
        showNotification({
          message: 'Registration successfuly!',
          variant: 'success'
        });
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error) setErrors({ error: err.message });
      showNotification({
        message: 'Error in registration!',
        variant: 'danger'
      });
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex flex-col justify-center items-center p-0 m-0">
      <div className="border rounded-md shadow-xl h-max w-max m-0 pb-4 px-4 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white flex flex-col">
        <form className="flex justify-evenly flex-col rounded-md dark:bg-zinc-700 h-[420px] mt-9 w-[420px]">
          <div>
            <h2 className="dark:text-gray-100 text-lg">Acount Login</h2>
            <p className="dark:text-gray-100"></p>
          </div>
          <InputBase
            label="Email"
            type="email"
            placeholder="example@..."
            value={infoUser.email}
            onChange={(e) =>
              setInfoUser({ ...infoUser, email: e.target.value })
            }
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}{' '}
          <InputBase
            label="Password"
            type="password"
            value={infoUser.password}
            onChange={(e) =>
              setInfoUser({ ...infoUser, password: e.target.value })
            }
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}{' '}
          <button
            onClick={(e) => {
              e.preventDefault();
              sendData(infoUser);
            }}
            className={btnDefault}
          >
            Login
          </button>
          {errors.error && <p className="text-red-500">{errors.error}</p>}{' '}
          <div>
            <span>You don't have an account?</span>

            <span
              className="ml-2 hover:underline hover:text-cinder-600 text-cinder-400 cursor-pointer"
              onClick={(e) => handleSignupClick(e)}
            >
              signup
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
