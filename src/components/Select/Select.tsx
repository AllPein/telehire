import { Option } from '@/types/Select';
import { FC } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import ReactSelect from 'react-select/creatable';

const styles = {
  control: (baseStyles: any, state: { isDisabled: boolean }) => ({
    ...baseStyles,
    backgroundColor: state.isDisabled ? '#777' : 'var(--tg-theme-bg-secondary)',
    border: 'none',
    borderColor: 'var(--tg-theme-bg-color)',
    outline: 'none',
    borderRadius: '12px',
    padding: '8px',
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: 'var(--tg-theme-bg-secondary)',
    color: '#fff',
  }),
  placeholder: (baseStyles: any, state: { isDisabled: boolean }) => ({
    ...baseStyles,
    color: state.isDisabled ? '#aaa' : '#bbb',
  }),
  option: (baseStyles: any, state: { isFocused: boolean }) => ({
    ...baseStyles,
    backgroundColor: !state.isFocused
      ? 'var(--tg-theme-bg-secondary)'
      : 'var(--tg-theme-bg-color)',
    color: '#fff',
  }),
  singleValue: (baseStyles: any) => ({
    ...baseStyles,
    color: '#fff',
  }),
  multiValue: (baseStyles: any) => ({
    ...baseStyles,
    color: '#fff',
    backgroundColor: 'var(--tg-theme-button-color)',
    minHeight: '30px',
    margin: '5px 10px',
    padding: '10px',
    alignItems: 'center',
    borderRadius: '8px',
  }),
  multiValueLabel: (baseStyles: any) => ({
    ...baseStyles,
    color: '#fff',
  }),
  input: (baseStyles: any) => ({
    ...baseStyles,
    color: '#fff',
  }),
};

type Props = {
  options: Option[];
  value: Option | Option[] | null;
  onChange: (target: any) => any;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => any;
  isMulti?: boolean;
  onInputChange?: (newValue: string) => void;
  loading?: boolean;
};

const Select: FC<Props> = ({
  options,
  value,
  onChange,
  loading,
  name,
  disabled,
  isMulti,
  onInputChange,
  placeholder,
  onFocus,
}) => {
  const handleChange = (event: SingleValue<Option> | MultiValue<Option>) => {
    onChange({
      target: {
        name,
        value: event,
      },
    });
  };

  return (
    <ReactSelect
      onFocus={onFocus}
      isDisabled={disabled}
      options={options}
      value={value}
      onInputChange={onInputChange}
      isMulti={isMulti}
      styles={styles}
      onChange={handleChange}
      placeholder={placeholder ?? 'Select..'}
      isLoading={loading}
    />
  );
};

export { Select };
