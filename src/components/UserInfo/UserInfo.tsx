import { Caption, Heading6 } from '@/components/Typography/Typography.styles';
import { useTelegram } from '@/hooks/useTelegram';
import { User } from '@/models/User';
import { FC } from 'react';
import { SmallWrapper } from './UserInfo.styles';

type Props = {
  user: User;
};

const UserInfo: FC<Props> = ({ user }) => {
  const { tg } = useTelegram();
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
        <Caption
          onClick={() => tg.openTelegramLink(`https://t.me/${user.username}`)}
          color="#ffffffB2"
        >
          @{user.username}
        </Caption>
      </SmallWrapper>
    </div>
  );
};

export { UserInfo };
