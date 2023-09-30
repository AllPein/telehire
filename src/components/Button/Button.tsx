import { FC, MouseEventHandler } from 'react';
import { ButtonWrapper } from './Button.styles';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 's' | 'm' | 'l';
  block?: boolean;
  disabled?: boolean;
  children: any;
};

const Button: FC<Props> = ({
  onClick,
  size = 'm',
  children,
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
      {children}
    </ButtonWrapper>
  );
};

export { Button };
