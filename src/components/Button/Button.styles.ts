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
  background-color: var(--tg-theme-button-color);
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: #fff;
  outline: none;
  cursor: pointer;
  padding: 0 16px;
  border: none;
  width: ${(props) => (props.block ? '100%' : 'auto')};
  transition: 0.3s opacity;

  &:hover {
    opacity: 0.9;
  }
`;
