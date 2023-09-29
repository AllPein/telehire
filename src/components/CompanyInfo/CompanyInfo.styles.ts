import styled from 'styled-components';

type WrapperProps = {
  center?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 52px 16px;
  align-items: center;
`;

export const SmallWrapper = styled.div<WrapperProps>`
  margin-top: 8px;
  width: 100%;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`;

export const BigWrapper = styled.div<WrapperProps>`
  margin-top: 16px;
  width: 100%;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`;

export const JobInfoWrapper = styled.div`
  background-color: var(--tg-theme-bg-secondary);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
