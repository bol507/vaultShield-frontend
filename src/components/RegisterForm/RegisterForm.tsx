// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputBase, InputSelect } from 'components/Inputs';
const RegisterForm = () => {
  const options = ['address', 'contact', 'general', 'server'];

  return (
    <div className="flex justify-center dark:text-white ">
      <InputSelect label="Select an option" options={options} />
    </div>
  );
};

export default RegisterForm;
