import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--tg-theme-bg-secondary);
  height: 60px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid var(--tg-theme-bg-color);

  img {
    cursor: pointer;
  }
`;
