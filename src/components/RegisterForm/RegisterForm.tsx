// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//contexts
import { KeyPairContext } from 'contexts/keypairContext';
import { RegisterContext } from 'contexts/registerContext';
import { NotificationContext } from 'contexts/notificationContext';
//hooks
import { useKeyPair } from 'hooks/useKeyPair';
//utils
import { encrypt } from 'utils/encriptation';
//Svgs
import { SvgRefresh } from 'components/svg/SvgRefresh';
import { SvgViewPassword } from 'components/svg/SvgViewPassword';
import { SvgHiddenPassword } from 'components/svg/SvgHiddenPassword';
import {
  labelup,
  textArea,
  wrapperInputBorderBottomMd,
  wrapperTextAreaMd
} from 'styles/tailwind.classes';
const RegisterForm = () => {
  const [form, setForm] = useState({
    title: '',
    login: '',
    password: '',
    website: '',
    notes: ''
  });
  const navigate = useNavigate();
  const [toggleView, setToggleView] = useState(false);
  const { publicKey } = useKeyPair();
  const { getKeyPair } = useContext(KeyPairContext);
  const { createRegister } = useContext(RegisterContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const fetchData = async () => {
      await getKeyPair();
    };

    fetchData();
  }, []);

  const geneareteRandomWord = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_';
    const characterCount = 16;
    let result = '';

    for (let i = 0; i < characterCount; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const character = characters.charAt(randomIndex);
      result += character;
    }

    setForm({ ...form, password: result });
  };

  const handleButtonCancel = () => {
    navigate('/');
  };

  const handleButtonSave = async () => {
    const enc = encrypt(publicKey, form.password);
    const updatedForm = { ...form, password: enc };
    await createRegister(updatedForm);
    setForm({
      title: '',
      login: '',
      password: '',
      website: '',
      notes: ''
    });
    showNotification({
      message: 'Registration successful!',
      variant: 'success'
    });
  };

  return (
    <div className="flex flex-col justify-center dark:text-white mt-4 ">
      <div className="self-center flex justify-end items-center space-x-4 mr-2">
        <button
          className="self-center w-auto rounded-lg text-center bg-cinder-950 border-cinder-800  hover:bg-primary my-4 py-1 px-[8px] text-gray-100"
          onClick={() => handleButtonCancel()}
        >
          Cancel
        </button>
        <button
          className="self-center w-auto rounded-lg text-center bg-cinder-500  hover:bg-cinder-600 my-4 py-1 px-[8px] text-gray-100"
          onClick={() => handleButtonSave()}
        >
          Save
        </button>
      </div>

      <p className="self-center w-3/4 md:w-4/12 text-left ">New record</p>

      {/* Title */}
      <div className={wrapperInputBorderBottomMd}>
        <div className="self-center flex flex-col items-start hover:border-b-4 border-b-2  border-cinder-900 hover:border-cinder-800  w-full ">
          <label className={labelup}>Title</label>
          <input
            type="text"
            value={form.title}
            className="w-full appearance-none bg-transparent dark:text-gray-100 leading-tight focus:outline-none  "
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
      </div>

      {/* Login */}
      <div className={wrapperInputBorderBottomMd}>
        <div className="self-center flex flex-col items-start hover:border-b-4 border-b-2  border-cinder-900 hover:border-cinder-800  w-full ">
          <label className={labelup}>Login</label>
          <input
            type="text"
            value={form.login}
            autoComplete="off"
            name="u1"
            className="w-full appearance-none bg-transparent dark:text-gray-100 leading-tight focus:outline-none  "
            onChange={(e) => setForm({ ...form, login: e.target.value })}
          />
        </div>
      </div>
      {/* Password */}
      <div className={wrapperInputBorderBottomMd}>
        <div className="self-center flex flex-col items-start  w-full">
          <label className={labelup}>password</label>
          <div className="flex items-center w-full ">
            <input
              type={toggleView ? 'text' : 'password'}
              value={form.password}
              autoComplete="new-password"
              name="p1"
              className="w-full appearance-none bg-transparent dark:text-gray-100 leading-tight focus:outline-none hover:border-b-4 border-b-2  border-cinder-900 hover:border-cinder-800 "
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {toggleView ? (
              <SvgViewPassword onClick={() => setToggleView(!toggleView)} />
            ) : (
              <SvgHiddenPassword onClick={() => setToggleView(!toggleView)} />
            )}
            <SvgRefresh onClick={() => geneareteRandomWord()} />
          </div>
        </div>
      </div>

      {/* Website */}
      <div className={wrapperInputBorderBottomMd}>
        <div className="self-center flex flex-col items-start hover:border-b-4 border-b-2  border-cinder-900 hover:border-cinder-800  w-full ">
          <label className={labelup}>Website</label>
          <input
            type="text"
            value={form.website}
            className="w-full appearance-none bg-transparent dark:text-gray-100 leading-tight focus:outline-none  "
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>
      </div>

      <div className={wrapperTextAreaMd}>
        <label className={labelup}>Notes</label>
        <textarea
          className={textArea}
          rows="3"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};

export default RegisterForm;
