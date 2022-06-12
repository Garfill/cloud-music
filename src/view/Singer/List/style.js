import styled from 'styled-components';


export const ListContainer = styled.div`
  height: calc(100vh - 94px - 80px);
  overflow: hidden;
`
export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: var(--font-color-desc);
    font-size: var(--font-size-s);
  }
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 5px;
  padding: 5px 0;
  border-bottom: 1px solid var(--border-color);
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: var(--font-size-m);
    color: var(--font-color-desc);
    font-weight: 500;
  }
`;

export const ListFooter = styled.div`
  padding: 5px 0;
  text-align: center;
  color: var(--font-color-desc);
`

