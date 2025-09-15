import React, { useState, useCallback, useMemo } from 'react';
import { SYMBOL_CATEGORIES } from '../constants';
import type { SymbolCategory } from '../types';
import ClipboardIcon from './icons/ClipboardIcon';
import SearchIcon from './icons/SearchIcon';

const CategorySection: React.FC<{ category: SymbolCategory; onCopy: (symbol: string) => void }> = ({ category, onCopy }) => {
  return (
    <div className="mb-6 bg-brand-surface rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-1 text-brand-secondary">{category.name}</h2>
      {category.description && <p className="text-sm text-brand-subtle mb-3">{category.description}</p>}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {category.symbols.map((symbol, index) => (
          <button
            key={`${category.name}-${index}`}
            onClick={() => onCopy(symbol)}
            className="flex items-center justify-center text-xl p-2 bg-brand-bg rounded-md hover:bg-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-200 aspect-square"
            aria-label={`Copy symbol ${symbol}`}
          >
            {symbol}
          </button>
        ))}
      </div>
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

const SymbolList: React.FC = () => {
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = useCallback((symbol: string) => {
    navigator.clipboard.writeText(symbol);
    setCopiedSymbol(`'${symbol}' Copied!`);
    setTimeout(() => setCopiedSymbol(null), 1500);
  }, []);

  const filteredCategories = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (!lowercasedQuery) {
        return SYMBOL_CATEGORIES;
    }

    return SYMBOL_CATEGORIES.reduce((acc, category) => {
        const matchingSymbols = category.symbols.filter(symbol =>
            symbol.toLowerCase().includes(lowercasedQuery)
        );

        const categoryNameMatches = category.name.toLowerCase().includes(lowercasedQuery);

        if (categoryNameMatches || matchingSymbols.length > 0) {
            acc.push({
                ...category,
                symbols: categoryNameMatches ? category.symbols : matchingSymbols,
            });
        }
        return acc;
    }, [] as SymbolCategory[]);
  }, [searchQuery]);


  return (
    <div className="animate-fade-in">
       <h2 className="text-2xl font-bold mb-4 text-center">Symbol Library</h2>
       <p className="text-brand-subtle text-center mb-6">Tap any symbol to copy it to your clipboard.</p>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            placeholder="Search symbols or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-surface border border-brand-primary/30 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition"
            aria-label="Search symbols"
          />
        </div>

      {filteredCategories.length > 0 ? (
        filteredCategories.map(category => (
          <CategorySection key={category.name} category={category} onCopy={handleCopy} />
        ))
      ) : (
        <div className="text-center py-10">
            <p className="text-brand-subtle">No results found for "{searchQuery}"</p>
        </div>
      )}
      {copiedSymbol && <CopyToast message={copiedSymbol} />}
    </div>
  );
};

export default SymbolList;