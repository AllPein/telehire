import styled from 'styled-components';

export const SelectWrapper = styled.select`
  appearance: none;
  outline: none;
  border: 0;
  background-color: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
  background-image: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 15px;
  padding: 16px;
  width: 100%;

  &::-ms-expand {
    display: none;
  }
`;
