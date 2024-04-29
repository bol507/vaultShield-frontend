/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//contexts
import { RegisterContext } from 'contexts/registerContext';
import { KeyPairContext } from 'contexts/keypairContext';
//hooks
import { useRegister } from 'hooks/useRegister';
import { useKeyPair } from 'hooks/useKeyPair';
//utils
import { decrypt } from 'utils/encriptation';
//styles
import {
  borderBottom,
  inputTransparent,
  labelup,
  textArea,
  wrapperInputBorderBottomMd,
  wrapperTextAreaMd
} from 'styles/tailwind.classes';
//svgs
import { SvgViewPassword } from 'components/svg/SvgViewPassword';
import { SvgHiddenPassword } from 'components/svg/SvgHiddenPassword';

const RegisterDetails = () => {
  const { id } = useParams();
  const { register } = useRegister();
  const { privateKey } = useKeyPair();
  const { getRegisterDetails } = useContext(RegisterContext);
  const { getKeyPair } = useContext(KeyPairContext);
  const [toggleView, setToggleView] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getKeyPair();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getRegisterDetails(id);
    };
    fetchData();
  }, []);

  const handleButtonEye = async () => {
    setPassword('');
    setToggleView(false);
  };

  const handleButtonNotEye = async () => {
    const dec = decrypt(privateKey, register?.password);
    console.log(dec);
    setPassword(dec);
    setToggleView(true);
  };

  const handleButtonCancel = () => {
    navigate('/');
  };
  const handleButtonSave = () => {};
  const handleButtonEdit = () => {};
  const handleButtonDelete = () => {};

  return (
    <div>
      {register && (
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
              onClick={() => handleButtonEdit()}
            >
              Edit
            </button>
            <button
              className="self-center w-auto rounded-lg text-center bg-cinder-500  hover:bg-cinder-600 my-4 py-1 px-[8px] text-gray-100"
              onClick={() => handleButtonDelete()}
            >
              Delete
            </button>
          </div>

          <p className="self-center text-left w-3/4 md:w-4/12 dark:text-gray-100">
            Register details
          </p>

          <div className={wrapperInputBorderBottomMd}>
            <div className={borderBottom}>
              <label className={labelup}>Title</label>
              <input
                type="text"
                value={register.title}
                readOnly
                className={inputTransparent}
              />
            </div>
          </div>

          <div className={wrapperInputBorderBottomMd}>
            <div className={borderBottom}>
              <label className={labelup}>Login</label>
              <input
                type="text"
                value={register.login}
                readOnly
                className={inputTransparent}
              />
            </div>
          </div>
          <div className={wrapperInputBorderBottomMd}>
            <div className="self-center flex flex-col items-start  w-full">
              <label className={labelup}>Password</label>
              <div className="flex items-center w-full ">
                <input
                  type={toggleView ? 'text' : 'password'}
                  value={password}
                  readOnly
                  className={inputTransparent}
                />
                {toggleView ? (
                  <SvgViewPassword onClick={() => handleButtonEye()} />
                ) : (
                  <SvgHiddenPassword onClick={() => handleButtonNotEye()} />
                )}
              </div>
            </div>
          </div>
          <div className={wrapperInputBorderBottomMd}>
            <div className={borderBottom}>
              <label className={labelup}>Website</label>
              <input
                type="text"
                value={register.website}
                readOnly
                className={inputTransparent}
              />
            </div>
          </div>
          <div className={wrapperTextAreaMd}>
            <label className={labelup}>Notes</label>
            <textarea value={register.notes} readOnly className={textArea} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterDetails;
