import styled from 'styled-components';

type ButtonProps = {
  size: 's' | 'm' | 'l';
  block?: boolean;
};

export const ButtonWrapper = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.size === 's' ? '36px' : '56px')};
  background-color: ${(props) =>
    props.disabled ? '#777' : 'var(--tg-theme-button-color)'};
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: var(--tg-theme-button-text-color);
  outline: none;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  padding: 0 16px;
  border: none;
  width: ${(props) => (props.block ? '100%' : 'auto')};
  transition: 0.3s opacity;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.9)};
  }

  &:active {
    opacity: ${(props) => (props.disabled ? 1 : 0.7)};
  }
`;
