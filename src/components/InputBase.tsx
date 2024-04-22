import {
  wrapperInputBorderBottom,
  inputTransparent
} from 'styles/tailwind.classes';

interface InputBaseProps {
  type: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  alignment?: string;
}

const InputBase = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  readOnly,
  alignment
}: InputBaseProps) => {
  return (
    <div className={wrapperInputBorderBottom}>
      <label className="block dark:text-gray-100 text-sm mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`${inputTransparent} ${alignment}`}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputBase;
