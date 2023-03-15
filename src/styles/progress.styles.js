import { css } from 'lit';

export const progressStyles = css`
  progress {
    appearance: none;
    border-radius: var(--border-radius);
    overflow: hidden;
    width: 100%;
  }
  progress.background {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  progress[value]::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, 0);
  }
  progress[value]::-webkit-progress-value {
    background-color: var(--primary-color);
  }
`;
