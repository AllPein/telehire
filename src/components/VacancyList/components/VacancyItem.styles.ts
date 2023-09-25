import styled from 'styled-components';

type ItemProps = {
  margin?: 's' | 'l';
};

export const Wrapper = styled.div`
  background-color: var(--tg-theme-bg-secondary);
  margin: 16px;
  border-radius: 8px;
  color: #fff;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 16px;
  letter-spacing: 0.035px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const ItemWrapper = styled.div<ItemProps>`
  margin-top: ${(props) => (props.margin === 'l' ? '16px' : '8px')};
`;
