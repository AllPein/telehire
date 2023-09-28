import { Button } from '@/components/Button/Button';
import { Spinner } from '@/components/Spinner/Spinner';
import { Heading1 } from '@/components/Typography/Typography.styles';
import { selectAuthLoading } from '@/store/Loader/LoaderSelectors';
import { history } from '@/utils/history';
import { useSelector } from 'react-redux';
import {
  AppContainer,
  ButtonWrapper,
  ButtonsWrapper,
  HeadingWrapper,
} from './MainPage.styles';

const MainPage = () => {
  const loading = useSelector(selectAuthLoading);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

export { MainPage };
