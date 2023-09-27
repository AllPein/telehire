import { Button } from '@/components/Button/Button';
import { Heading1 } from '@/components/Typography/Typography.styles';
import { history } from '@/utils/history';
import {
  AppContainer,
  ButtonWrapper,
  ButtonsWrapper,
  HeadingWrapper,
} from './MainPage.styles';

const MainPage = () => {
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
          <Button onClick={() => history.push('/vacancies')} block>
            Applicant
          </Button>
        </ButtonWrapper>
      </ButtonsWrapper>
    </AppContainer>
  );
};

export { MainPage };
