import { Button } from '@/components/Button/Button';
import { Heading1 } from '@/components/Typography/Typography.styles';
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
  const handleApplicantClick = () => {
    history.push('/vacancies');
    dispatch(UserAction.initLogin('applicant'));
  };

  return (
    <AppContainer>
      <HeadingWrapper>
        <Heading1>Continue as</Heading1>
      </HeadingWrapper>
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button onClick={() => history.push('/employer')} block>
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
