import { css } from 'lit-element';

export const detailStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    margin: 0 8px;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: var(--border-radius);
    flex-grow: 1;
  }
  .stat {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  header {
    color: white;
    font-size: 24px;
    text-align: center;
  }
  .underlabelled {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  progress {
    border-radius: 2px;
  }
  progress[value]::-webkit-progress-bar {
    background-color: var(--primary-color);
  }
  progress[value]::-webkit-progress-value {
    background-color: var(--primary-grey);
  }
  .gem-slots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  button.gem {
    cursor: pointer;
  }
  .gem {
    position: relative;
    height: 32px;
    width: 16px;
    clip-path: polygon(50% 0px, 0px 30%, 0px 70%, 50% 100%, 100% 70%, 100% 30%, 50% 0px);
    background: white;
    border: none;
  }
  .gem::before {
    content: '';
    position: absolute;
    display: block;
    background: var(--gem-color, black);
    height: 30px;
    width: 14px;
    clip-path: polygon(50% 0px, 0px 30%, 0px 70%, 50% 100%, 100% 70%, 100% 30%, 50% 0px);
    z-index: -1;
    top: 1px;
    left: 1px;
  }
`;
