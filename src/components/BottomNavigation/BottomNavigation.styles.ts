import styled from 'styled-components';

type Props = {
  active?: boolean;
};

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
`;

export const ImgWrapper = styled.div<Props>`
  background-color: ${(props) => (props.active ? '#1a212c' : 'inherit')};
  width: 40px;
  height: 40px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  user-select: none;

  z-index: 1;

  img {
    z-index: 2;
  }
`;
