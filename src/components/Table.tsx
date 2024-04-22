import { CardPassword } from './CardPassword';

/**
 * example table
 * @returns
 */
const Table = () => {
  return (
    <table className="w-full">
      <thead className="border-cinder-500 border-opacity-20 ">
        <tr className="border-b-[1.2px] border-cinder-500 border-opacity-20 dark:bg-cinder-900 dark:bg-opacity-30 bg-cinder-700">
          <th className="py-2 pl-4   text-cinder-200 text-sm font-light rounded-tl-md">
            name
          </th>
          <th className="py-2 px-4  text-cinder-200 text-sm font-light ">
            name user
          </th>
          <th className="py-2 px-4  text-cinder-200 text-sm font-light rounded-tr-md">
            password
          </th>
        </tr>
      </thead>
      <tbody className="">
        <CardPassword
          name="Google"
          nameUser="example@...."
          password="12345678"
        />
        <CardPassword
          name="Facebook"
          nameUser="example@...."
          password="*****"
        />
        <CardPassword
          name="Instagram"
          nameUser="example@...."
          password="*****"
        />
        <CardPassword name="GitHub" nameUser="example@...." password="*****" />
        <CardPassword name="Discord" nameUser="example@...." password="*****" />
      </tbody>
    </table>
  );
};

export default Table;
