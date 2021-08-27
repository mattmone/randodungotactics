import { css } from 'https://unpkg.com/lit-dist/dist/lit.js';

export const buttonStyles = css`
  button {
    cursor: pointer;
    background:none;
    border-radius: var(--border-radius);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-family: VT323;
    padding:8px 4px;
    font-size:24px;
    position:relative;
    display:flex;
    align-content: center;
  }
`;