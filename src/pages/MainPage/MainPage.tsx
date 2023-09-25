import { Button } from '@/components/Button/Button';
import { Heading1 } from '@/components/Typography/Typography.styles';
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
          <Button block>Employer</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button block>Applicant</Button>
        </ButtonWrapper>
      </ButtonsWrapper>
    </AppContainer>
  );
};

export { MainPage };
