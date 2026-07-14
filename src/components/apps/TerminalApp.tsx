import React, { useState, useRef, useEffect } from 'react';

export const TerminalApp: React.FC<{ windowId: string }> = () => {
  const [history, setHistory] = useState<string[]>([
    'Windows PowerShell Concept',
    'Copyright (C) Microsoft Corporation. All rights reserved.',
    '',
    'Try typing "help" to see available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const newHistory = [...history, `PS C:\\Users\\Guest> ${cmd}`];

    if (cmd.toLowerCase() === 'help') {
      newHistory.push('Available commands:');
      newHistory.push('  help - Show this message');
      newHistory.push('  clear - Clear the terminal');
      newHistory.push('  echo [text] - Print text');
      newHistory.push('  date - Show current date/time');
      newHistory.push('  whoami - Show current user');
    } else if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd.toLowerCase().startsWith('echo ')) {
      newHistory.push(cmd.substring(5));
    } else if (cmd.toLowerCase() === 'date') {
      newHistory.push(new Date().toString());
    } else if (cmd.toLowerCase() === 'whoami') {
      newHistory.push('desktop-concept\\guest');
    } else {
      newHistory.push(`${cmd} : The term '${cmd}' is not recognized as the name of a cmdlet, function, script file, or operable program.`);
    }

    newHistory.push('');
    setHistory(newHistory);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [history]);

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] text-[#cccccc] font-mono text-sm p-2 overflow-y-auto cursor-text" onClick={(e) => {
      const inputEl = document.getElementById('terminal-input');
      if (inputEl) inputEl.focus();
    }}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <form onSubmit={handleCommand} className="flex">
        <span className="mr-2 text-yellow-500">PS C:\Users\Guest&gt;</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[#cccccc] border-none"
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};
