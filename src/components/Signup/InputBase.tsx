import {
  wrapperInputBorderBottom,
  inputTransparent
} from 'styles/tailwind.classes';

interface InputBaseProps {
  type: string;
  label: string;
  placeholder?: string;
}

const InputBase = (props: InputBaseProps) => {
  return (
    <div className={wrapperInputBorderBottom}>
      <label className="block dark:text-gray-100 text-sm mb-2">
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={inputTransparent}
      />
    </div>
  );
};

export default InputBase;
