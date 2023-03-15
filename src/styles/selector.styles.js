import { css } from 'lit';

export const selectorStyles = css`
  .selector {
    display: flex;
    flex-direction: row;
    height: max-content;
  }
  .selector button {
    flex: 1;
    justify-content: center;
    text-transform: uppercase;
    border-radius: 0;
    border-right-width: 0;
  }
  .selector button:first-child {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
  .selector button:last-child {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    border-right-width: 1px;
  }
  .selector button[selected] {
    background-color: var(--primary-color);
    color: var(--primary-dark);
  }
  .selector button[selected]:focus-visible {
    background-color: var(--accent-color);
    color: var(--accent-dark);
  }
`;
