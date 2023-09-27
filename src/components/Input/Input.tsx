import { FC } from 'react';
import { FormGroup, FormInput } from './Input.styles';
type Props = {
  value: string;
  onChange: (event: any) => void;
  placeholder?: string;
  name?: string;
  icon?: any;
};

const Input: FC<Props> = ({ placeholder, value, onChange, name, icon }) => (
  <FormGroup>
    {icon && icon}
    <FormInput
      value={value}
      onChange={onChange}
      type="text"
      name={name}
      placeholder={placeholder}
    />
  </FormGroup>
);

export { Input };
