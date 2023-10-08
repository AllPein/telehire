import { Option } from '@/types/Select';
import { FC } from 'react';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';
import ReactSelectCreatable from 'react-select/creatable';

const styles = {
  control: (baseStyles: any, state: { isDisabled: boolean }) => ({
    ...baseStyles,
    backgroundColor: state.isDisabled
      ? '#777'
      : 'var(--tg-theme-secondary-bg-color)',
    border: 'none',
    borderColor: 'var(--tg-theme-bg-color)',
    outline: 'none',
    borderRadius: '12px',
    padding: '8px',
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: 'var(--tg-theme-secondary-bg-color)',
    color: '#fff',
  }),
  placeholder: (baseStyles: any, state: { isDisabled: boolean }) => ({
    ...baseStyles,
    color: state.isDisabled ? '#aaa' : '#bbb',
  }),
  option: (baseStyles: any, state: { isFocused: boolean }) => ({
    ...baseStyles,
    backgroundColor: !state.isFocused
      ? 'var(--tg-theme-secondary-bg-color)'
      : 'var(--tg-theme-bg-color)',
    color: 'var(--tg-theme-text-color)',
  }),
  singleValue: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--tg-theme-text-color)',
  }),
  multiValue: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--tg-theme-button-text-color)',
    backgroundColor: 'var(--tg-theme-button-color)',
    minHeight: '30px',
    margin: '5px 10px',
    padding: '10px',
    alignItems: 'center',
    borderRadius: '8px',
  }),
  multiValueLabel: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--tg-theme-button-text-color)',
  }),
  input: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--tg-theme-text-color)',
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
  withCreate?: boolean;
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
  withCreate,
}) => {
  const handleChange = (event: SingleValue<Option> | MultiValue<Option>) => {
    onChange({
      target: {
        name,
        value: event,
      },
    });
  };

  if (withCreate) {
    return (
      <ReactSelectCreatable
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
  }

  return (
    <ReactSelect
      onFocus={onFocus}
      isDisabled={disabled}
      options={options}
      value={value}
      onInputChange={onInputChange}
      isSearchable={false}
      isMulti={isMulti}
      styles={styles}
      onChange={handleChange}
      placeholder={placeholder ?? 'Select..'}
      isLoading={loading}
    />
  );
};

export { Select };
