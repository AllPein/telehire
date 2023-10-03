import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 48px;
  text-align: center;
`;

export const HeadingWrapper = styled.div`
  margin: 36px 0;
`;

export const SmallWrapper = styled.div`
  margin-top: 8px;
`;

export const BigWrapper = styled.div`
  margin-top: 16px;
`;

export const InactiveWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CVWrapper = styled.div`
  background-color: var(--tg-theme-bg-secondary);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  text-align: start;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  transition: 0.3s opacity;
  margin: 16px 0;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
