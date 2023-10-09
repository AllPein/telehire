import styled from 'styled-components';

export const InactiveWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
`;

export const CVWrapper = styled.div`
  background-color: var(--tg-theme-secondary-bg-color);
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
