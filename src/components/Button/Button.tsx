import { FC, MouseEventHandler } from 'react';
import { ButtonWrapper } from './Button.styles';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 's' | 'm' | 'l';
  block?: boolean;
  children: any;
};

const Button: FC<Props> = ({ onClick, size = 'm', children, block }) => {
  return (
    <ButtonWrapper size={size} block={block} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export { Button };
