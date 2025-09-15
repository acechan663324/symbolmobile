
import React, { useState, useCallback } from 'react';
import { PREMADE_NICKNAMES } from '../constants';
import type { Nickname } from '../types';
import ClipboardIcon from './icons/ClipboardIcon';

const NicknameCard: React.FC<{ nickname: Nickname; onCopy: (name: string) => void }> = ({ nickname, onCopy }) => {
  return (
    <div className="bg-brand-surface p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
      <div className="flex-grow">
        <p className="text-lg font-mono text-brand-text">{nickname.name}</p>
        <p className="text-xs text-brand-subtle uppercase tracking-wider">{nickname.platform}</p>
      </div>
      <button
        onClick={() => onCopy(nickname.name)}
        className="p-2 rounded-full bg-brand-primary/20 hover:bg-brand-primary/40 text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors"
        aria-label={`Copy nickname ${nickname.name}`}
      >
        <ClipboardIcon />
      </button>
    </div>
  );
};

const CopyToast: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 z-50">
      <ClipboardIcon />
      <span>{message}</span>
    </div>
  );
};


const NicknameList: React.FC = () => {
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName('Copied!');
    setTimeout(() => setCopiedName(null), 1500);
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-center">Curated Nicknames</h2>
      <p className="text-brand-subtle text-center mb-6">A collection of stylish names ready to use.</p>
      <div className="space-y-4">
        {PREMADE_NICKNAMES.map((nickname, index) => (
          <NicknameCard key={index} nickname={nickname} onCopy={handleCopy} />
        ))}
      </div>
      {copiedName && <CopyToast message={copiedName} />}
    </div>
  );
};

export default NicknameList;
