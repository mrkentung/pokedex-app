import React from 'react';

const Tab = ({ children, handleSelect, isSelected }) => {
  return (
    <button
      className={
        'inline-block pb-3 focus:outline-none transition-all duration-100' +
        (isSelected && ' border-b-2 border-primary font-semibold')
      }
      onClick={handleSelect}>
      {children}
    </button>
  );
};
export default Tab;
