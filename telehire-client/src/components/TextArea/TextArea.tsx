import { FC } from 'react';
import { FormInput } from './TextArea.styles';

type Props = {
  value: string;
  onChange: (event: any) => void;
  placeholder?: string;
  name?: string;
};

const TextArea: FC<Props> = ({ placeholder, value, onChange, name }) => {
  return (
    <FormInput
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
};

export { TextArea };
