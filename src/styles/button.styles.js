import { css } from 'lit';

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
  button:focus-visible {
    border-color: var(--accent-color);
    color: var(--accent-color);
    outline: 1px solid var(--accent-color);
    text-decoration: underline;
  }
`;
