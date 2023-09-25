import { FC } from 'react';
import { FormInput } from './Input.styles';

type Props = {
  value: string;
  onChange: (event: any) => void;
  placeholder?: string;
  name?: string;
};

const Input: FC<Props> = ({ placeholder, value, onChange, name }) => {
  return (
    <FormInput
      value={value}
      onChange={onChange}
      type="text"
      name={name}
      placeholder={placeholder}
    />
  );
};

export { Input };
