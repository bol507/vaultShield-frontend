import { useState } from 'react';
import { wrapperInputBorderBottom } from 'styles/tailwind.classes';

interface Option {
  value: string;
  label: string;
}

interface InputBaseProps {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  alignment?: string;
  options: Option;
}

const InputSelect = ({ label, options }: InputBaseProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOptionsOpen(false);
  };
  return (
    <div className={wrapperInputBorderBottom}>
      <label className="block dark:text-gray-100 text-sm mb-2">{label}</label>
      <div className="relative inline-block w-full ">
        <div
          className="w-full
          rounded
          border-0
          bg-transparent
          outline-none
          transition-all
          duration-200
          ease-linear  flex items-center justify-between "
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <span className="dark:text-cinder-100 text-left">
            {selectedOption ? selectedOption : 'Select an option'}
          </span>
        </div>
        {isOptionsOpen && (
          <div className="absolute top-4 z-10 mt-2 bg-cinger-500 border border-cinder-700 w-full rounded-md shadow-lg">
            {options?.map((option) => (
              <div
                key={option}
                className="py-2 px-4 cursor-pointer bg-zinc-700 hover:bg-zinc-900"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSelect;
