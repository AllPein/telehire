import { FC } from 'react';
import { AvatarWrapper } from './Avatar.styles';

type Props = {
  src: string;
};

const Avatar: FC<Props> = ({ src }) => {
  return <AvatarWrapper src={src} />;
};

export { Avatar };
