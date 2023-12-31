import styled from 'styled-components';

type WrapperProps = {
  center?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
