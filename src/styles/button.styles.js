import { css } from 'lit-element';

export const buttonStyles = css`
  button {
    cursor: pointer;
    background: none;
    border-radius: var(--border-radius);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-family: VT323;
    padding: 8px 4px;
    font-size: 24px;
    position: relative;
    display: flex;
    align-items: center;
  }
  button[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
