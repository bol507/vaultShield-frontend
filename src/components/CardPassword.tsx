import { useState } from 'react';
import { IconHiddenPassword, IconViewPassword } from './svg/IconViewPassword';

type InfoAcount = {
  name: string;
  nameUser: string;
  password: string;
};
export function CardPassword({
  name = 'Google',
  nameUser = ' Juan',
  password = '****'
}: InfoAcount) {
  const [userPassword, setUserPassword] = useState(false);
  return (
    <tr className="h-16 pl-0 border-b-[1.2px] border-cinder-500 border-opacity-20">
      <td className="py-2 px-4">{name}</td>
      <td className="py-2 px-4">{nameUser}</td>
      <td className="py-2  relative">
        {userPassword && <div className="w-full h-full">{password}</div>}
        {!userPassword && <div className="w-full h-full">***</div>}
        <button
          onClick={() => setUserPassword(!userPassword)}
          className=" absolute top-1/2 -translate-y-2/4 -translate-x-2/4 right-0"
        >
          {!userPassword && <IconViewPassword />}
          {userPassword && <IconHiddenPassword />}
        </button>
      </td>
    </tr>
  );
}
