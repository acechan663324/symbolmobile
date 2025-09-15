
import React, { useState, useCallback } from 'react';
import { generateNicknames } from '../services/geminiService';
import ClipboardIcon from './icons/ClipboardIcon';

const NicknameGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [symbol, setSymbol] = useState('★');
  const [count, setCount] = useState(1);
  const [platform, setPlatform] = useState('Gaming');
  
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) {
      setError('Please enter a keyword.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedNames([]);
    
    try {
      const names = await generateNicknames({ keyword, symbol, count: Number(count), platform });
      setGeneratedNames(names);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName('Copied!');
    setTimeout(() => setCopiedName(null), 1500);
  }, []);

  return (
    <div className="animate-fade-in flex flex-col items-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">AI Nickname Generator</h2>
        <p className="text-brand-subtle text-center mb-6">Create your unique identity with AI.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 bg-brand-surface p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-brand-subtle mb-1">Keyword</label>
            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., Shadow, Nova, Phoenix"
              className="w-full bg-brand-bg border border-brand-primary/30 rounded-md p-2 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-brand-subtle mb-1">Symbol</label>
              <input
                id="symbol"
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                maxLength={5}
                className="w-full bg-brand-bg border border-brand-primary/30 rounded-md p-2 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="count" className="block text-sm font-medium text-brand-subtle mb-1">Symbol Count</label>
              <input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="5"
                className="w-full bg-brand-bg border border-brand-primary/30 rounded-md p-2 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-brand-subtle mb-1">Platform</label>
            <input
              id="platform"
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="e.g., Valorant, Instagram"
              className="w-full bg-brand-bg border border-brand-primary/30 rounded-md p-2 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center"
          >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                'Generate Names'
            )}
          </button>
        </form>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {generatedNames.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">Your Names:</h3>
            <div className="space-y-3">
              {generatedNames.map((name, index) => (
                <div key={index} className="bg-brand-surface p-3 rounded-lg flex items-center justify-between animate-fade-in">
                  <p className="font-mono text-lg">{name}</p>
                  <button onClick={() => handleCopy(name)} className="p-2 rounded-full text-brand-secondary hover:bg-brand-primary/20 transition-colors">
                    <ClipboardIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {copiedName && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 z-50">
              <ClipboardIcon />
              <span>{copiedName}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default NicknameGenerator;
