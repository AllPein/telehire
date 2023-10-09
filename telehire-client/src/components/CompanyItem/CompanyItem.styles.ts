import styled from 'styled-components';

export const CompanyWrapper = styled.div`
  margin: 20px 0;
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  display: flex;
  transition: 0.3s opacity;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
