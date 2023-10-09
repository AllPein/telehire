import styled from 'styled-components';

export const FormGroup = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
`;

export const FormInput = styled.textarea`
  font-family: inherit;
  width: 100%;
  border: none;
  padding: 16px;
  font-size: 16px;
  color: var(--tg-theme-text-color);
  background: var(--tg-theme-secondary-bg-color);
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 12px;
  resize: none;
  height: 200px;
`;
