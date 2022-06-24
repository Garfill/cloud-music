import styled from 'styled-components';

export const PlayListWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: var(--background-color-shadow);
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: var(--highlight-background-color);
    transform: translate3d (0, 0, 0);
    .list-close {
      text-align: center;
      line-height: 50px;
      background: var(--background-color);
      font-size: var(--font-size-l);
      color: var(--font-color-desc);
    }
  }
`;
export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: auto;
`;