import styled from 'styled-components';

type WrapperProps = {
  center?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 48px;
  align-items: center;
`;

export const SmallWrapper = styled.div<WrapperProps>`
  margin-top: 16px;
  width: 100%;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`;

export const BigWrapper = styled.div<WrapperProps>`
  margin-top: 32px;
  width: 100%;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`;

export const CountryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const JobInfoWrapper = styled.div`
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 8px;
`;

export const Delimiter = styled.div`
  width: 1px;
  background-color: rgba(0, 0, 0, 0.2);
`;
