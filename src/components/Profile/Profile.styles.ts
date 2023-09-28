import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 16px;
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

export const CVWrapper = styled.div`
  background-color: var(--tg-theme-bg-secondary);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  text-align: start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s opacity;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;