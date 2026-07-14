import React, { useState } from 'react';

export const CalculatorApp: React.FC<{ windowId: string }> = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleClick = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      return;
    }
    
    if (val === '=') {
      try {
        // Safe evaluation for simple calc
        // eslint-disable-next-line no-eval
        const result = eval(equation + display);
        setDisplay(String(result));
        setEquation('');
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(val)) {
      setEquation(equation + display + ' ' + val + ' ');
      setDisplay('0');
      return;
    }

    if (display === '0') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const buttons = [
    'C', '(', ')', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ];

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#202020] text-gray-900 dark:text-gray-100 p-1">
      <div className="flex-1 flex flex-col justify-end items-end p-4">
        <div className="text-sm text-gray-500 h-5">{equation}</div>
        <div className="text-5xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-0.5 mt-2 h-[320px]">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            className={`
              flex items-center justify-center text-lg font-medium rounded-sm
              ${btn === '=' ? 'col-span-2 bg-blue-500 text-white hover:bg-blue-600' : 
                ['/', '*', '-', '+'].includes(btn) ? 'bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20' : 
                'bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10'}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};
