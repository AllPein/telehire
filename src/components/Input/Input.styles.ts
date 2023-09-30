import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  background: var(--tg-theme-bg-secondary);
  border-radius: 12px;
  padding-left: 10px;
  width: 100%;
  align-items: center;

  img {
    height: 24px;
  }
`;

export const FormInput = styled.input`
  font-family: inherit;
  width: 100%;
  border: none;
  padding: 16px;
  font-size: 16px;
  color: #fff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background: var(--tg-theme-bg-secondary);
  background-color: var(--tg-theme-bg-secondary);
`;
