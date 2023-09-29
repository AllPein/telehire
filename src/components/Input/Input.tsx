import { FC } from 'react';
import { FormGroup, FormInput } from './Input.styles';
type Props = {
  value: string;
  onChange: (event: any) => void;
  placeholder?: string;
  name?: string;
  icon?: any;
  type?: string;
};

const Input: FC<Props> = ({
  placeholder,
  value,
  onChange,
  name,
  icon,
  type,
}) => (
  <FormGroup>
    {icon && icon}
    <FormInput
      type={type ?? 'text'}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  </FormGroup>
);

export { Input };
