import { ChangeEvent, FC } from 'react';
import { SelectWrapper } from './Select.styles';

type Option = {
  text: string;
  value: string;
};

type Props = {
  options: Option[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  value: string;
};

const Select: FC<Props> = ({ options, onChange, name, value }) => {
  return (
    <SelectWrapper name={name} onChange={onChange} value={value}>
      <option value={undefined} disabled hidden>
        Choose company volume
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </SelectWrapper>
  );
};

export { Select };
