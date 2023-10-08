import { Caption, Heading6 } from '@/components/Typography/Typography.styles';
import { useTelegram } from '@/hooks/useTelegram';
import { User } from '@/models/User';
import { selectUser } from '@/store/auth/UserSelectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { SmallWrapper } from './UserInfo.styles';

type Props = {
  user: User;
};

const UserInfo: FC<Props> = ({ user }) => {
  const { tg } = useTelegram();
  const currentUser = useSelector(selectUser);

  const handleOpenChat = () => {
    if (user.id !== currentUser?.id) {
      tg.openTelegramLink(`https://t.me/${user.username}`);
    }
  };

  return (
    <div>
      <Heading6>
        {user.firstName} {user.lastName}
      </Heading6>
      {user.isPremium && (
        <SmallWrapper center>
          <Caption color="rgb(223, 174, 83)">{'Premium user'}</Caption>
        </SmallWrapper>
      )}
      <SmallWrapper center>
        <Caption onClick={handleOpenChat}>@{user.username}</Caption>
      </SmallWrapper>
    </div>
  );
};

export { UserInfo };
