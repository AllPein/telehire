import SearchIcon from '@/assets/search.svg';
import { Input } from '@/components/Input/Input';
import { debounce } from 'lodash';
import { ChangeEvent, FC, useMemo, useState } from 'react';

const CHANGE_DEBOUNCE_TIME = 300;

type Props = {
  name?: string;
  onSearch: (value: string) => any;
  placeholder?: string;
};

const Search: FC<Props> = (props) => {
  const [value, setValue] = useState('');
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        props.onSearch(value);
      }, CHANGE_DEBOUNCE_TIME),
    [],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    handleSearch(value);
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      icon={<img src={SearchIcon} />}
    />
  );
};

export { Search };
