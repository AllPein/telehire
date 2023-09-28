import { Button } from '@/components/Button/Button';
import {
  Body,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { CV } from '@/components/models/CV';
import { useTelegram } from '@/hooks/useTelegram';
import { selectUser } from '@/store/auth/UserSelectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BigWrapper, CVWrapper, SmallWrapper, Wrapper } from './Profile.styles';

type Props = {
  cvs: CV[];
};

const Profile: FC<Props> = ({ cvs }) => {
  const { tg } = useTelegram();
  const user = useSelector(selectUser);

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
      {cvs.length > 0 ? (
        <>
          <BigWrapper>
            <Heading6>Your CVs</Heading6>
          </BigWrapper>
          <SmallWrapper>
            {cvs.map((cv) => (
              <CVWrapper>
                <div>
                  <Body>{cv.position}</Body>
                  <SmallWrapper>
                    <Caption color="#ffffffB2">{cv.salary}</Caption>
                  </SmallWrapper>
                </div>
                <Caption color="#ffffffB2">23 views</Caption>
              </CVWrapper>
            ))}
          </SmallWrapper>
        </>
      ) : (
        <BigWrapper>
          <Heading6>You don't have any CVs</Heading6>
        </BigWrapper>
      )}

      <BigWrapper>
        <Button block>Create new</Button>
      </BigWrapper>
    </Wrapper>
  );
};

export { Profile };