import React from 'react';

const Symbols = function () {
  return (
    <svg style={{ display: 'none' }}>
      <symbol id='icon-add' viewBox='0 0 24 24'>
        <path d='M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z' />
      </symbol>

      <symbol id='icon-arrow-east' viewBox='0 0 24 24'>
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
      </symbol>

      <symbol id='icon-arrow-west' viewBox='0 0 24 24'>
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' style={{ transform: 'rotate(180deg)', transformOrigin: '50% 50%' }} />
      </symbol>

      <symbol id='icon-close' viewBox='0 0 24 24'>
        <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
      </symbol>

      <svg id='icon-context-menu' viewBox='0 0 24 24'>
        <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-4.5 14c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm4.5 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm4.5 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z' />
      </svg>

      <symbol id='icon-lock' viewBox='0 0 24 24'>
        <path d='M10 16c0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723v2.277h-2v-2.277c-.596-.347-1-.985-1-1.723zm11-6v14h-18v-14h3v-4c0-3.313 2.687-6 6-6s6 2.687 6 6v4h3zm-13 0h8v-4c0-2.206-1.795-4-4-4s-4 1.794-4 4v4zm11 2h-14v10h14v-10z' />
      </symbol>

      <symbol id='icon-menu' viewBox='0 0 24 24'>
        <path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
      </symbol>

      <symbol id='icon-fullscreen' viewBox='0 0 24 24'>
        <path d='M24 13h-4v-9h-9v-4h13v13zm-24 11h13v-4h-9v-9h-4v13z' />
      </symbol>
    </svg>
  );
};

export default Symbols;
