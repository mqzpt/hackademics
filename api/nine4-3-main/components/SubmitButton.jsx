import React from 'react';

const SubmitButton = ({ onClick, disabled }) => {
  return (
    <button
      className={`rounded-2xl border-2 border-dashed border-white bg-black px-6 py-3 font-semibold uppercase text-white transition-transform duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:translate-x-1 hover:translate-y-1 hover:shadow-lg active:translate-x-0 active:translate-y-0 active:shadow-none'}`}
      onClick={onClick}
      disabled={disabled}
    >
      Submit Text
    </button>
  );
};

export default SubmitButton;
