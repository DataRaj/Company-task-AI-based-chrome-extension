import React, { useState } from 'react';

const ButtonComponent = () => {
  const [counter, setCounter] = useState(0);

  const increase = () => {
    setCounter(counter + 1);
  };

  return (
    <button
      onClick={increase}
      type="button"
      className="flex flex-row bg-slate-50 text-slate-800 shadow-lg
      hover:bg-slate-100 hover:text-slate-900 hover:shadow-md active:scale-105
        items-center px-4 py-2 text-sm rounded-lg transition-all border-none"
    >
      Count:
      <span className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs
       font-semibold rounded-full">
        {counter}
      </span>
    </button>
  );
};

export default ButtonComponent;
