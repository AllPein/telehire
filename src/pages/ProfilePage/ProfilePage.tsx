import { Caption, Heading6 } from '@/components/Typography/Typography.styles';
import { useBackButton } from '@/hooks/useBackButton';
import { useTelegram } from '@/hooks/useTelegram';
import { history } from '@/utils/history';
import { SmallWrapper, Wrapper } from './ProfilePage.styles';

const ProfilePage = () => {
  const { user, tg } = useTelegram();

  useBackButton({
    onClick: () => history.goBack(),
  });

  return (
    <Wrapper>
      <Heading6>
        {user?.first_name} {user?.last_name}
      </Heading6>
      {user?.is_premium && (
        <SmallWrapper>
          <Caption color="rgb(223, 174, 83)">{'Premium user'}</Caption>
        </SmallWrapper>
      )}
      <SmallWrapper>
        <Caption
          onClick={() => tg.openTelegramLink(`https://t.me/${user?.username}`)}
          color="#ffffffB2"
        >
          @{user?.username}
        </Caption>
      </SmallWrapper>
    </Wrapper>
  );
};

export { ProfilePage };
