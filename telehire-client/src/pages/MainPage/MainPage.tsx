import { Button } from '@/components/Button/Button';
import { Heading1 } from '@/components/Typography/Typography.styles';
import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { UserAction } from '@/store/auth/UserActions';
import { history } from '@/utils/history';
import { useDispatch } from 'react-redux';
import {
  AppContainer,
  ButtonWrapper,
  ButtonsWrapper,
  HeadingWrapper,
} from './MainPage.styles';

const MainPage = () => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(UserAction.initLogin(null));
  });

  const handleApplicantClick = () => {
    history.push('/vacancies');
    dispatch(UserAction.initLogin('applicant'));
    localStorage.removeItem(CURRENT_COMPANY_ID);
  };

  const handleEmployerClick = () => {
    history.push('/employer');
  };

  return (
    <AppContainer>
      <HeadingWrapper>
        <Heading1>Continue as</Heading1>
      </HeadingWrapper>
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button onClick={handleEmployerClick} block>
            Employer
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={handleApplicantClick} block>
            Applicant
          </Button>
        </ButtonWrapper>
      </ButtonsWrapper>
    </AppContainer>
  );
};

export { MainPage };
