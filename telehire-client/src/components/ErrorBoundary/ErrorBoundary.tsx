import { Button } from '@/components/Button/Button';
import { Heading6 } from '@/components/Typography/Typography.styles';
import { history } from '@/utils/history';
import { ErrorInfo, PureComponent } from 'react';
import { Wrapper } from './ErrorBoundary.styles';

type Props = {
  children: JSX.Element;
};

type State = {
  pathname: string;
  hasError: boolean;
};

class ErrorBoundary extends PureComponent<Props, State> {
  state = {
    pathname: '',
    hasError: false,
  };

  static getDerivedStateFromError = () => ({
    hasError: true,
    pathname: window.location.pathname,
  });

  static getDerivedStateFromProps = (_: Props, prevState: State) => {
    if (prevState.hasError && window.location.pathname !== prevState.pathname) {
      return {
        hasError: false,
        pathname: '',
      };
    }
    return null;
  };

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.error('ErrorBoundary: Error', error);
    console.error('ErrorBoundary: Error Info', errorInfo.componentStack);
  };

  render = () => {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <Heading6>Something went wrong</Heading6>
          <Button block onClick={() => history.push('/')}>
            Return home
          </Button>
        </Wrapper>
      );
    }

    return this.props.children;
  };
}

export { ErrorBoundary };
