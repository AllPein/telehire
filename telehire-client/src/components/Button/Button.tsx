import { Spinner } from '@/components/Spinner/Spinner';
import { FC, MouseEventHandler } from 'react';
import { ButtonWrapper } from './Button.styles';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 's' | 'm' | 'l';
  loading?: boolean;
  block?: boolean;
  disabled?: boolean;
  children: any;
};

const Button: FC<Props> = ({
  onClick,
  size = 'm',
  children,
  loading,
  block,
  disabled,
}) => {
  return (
    <ButtonWrapper
      disabled={disabled}
      size={size}
      block={block}
      onClick={onClick}
    >
      {loading ? <Spinner /> : children}
    </ButtonWrapper>
  );
};

export { Button };
