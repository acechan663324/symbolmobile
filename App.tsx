
import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import SymbolList from './components/SymbolList';
import NicknameList from './components/NicknameList';
import NicknameGenerator from './components/NicknameGenerator';
import type { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('symbols');

  const renderPage = () => {
    switch (activePage) {
      case 'symbols':
        return <SymbolList />;
      case 'nicknames':
        return <NicknameList />;
      case 'generator':
        return <NicknameGenerator />;
      default:
        return <SymbolList />;
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-10 text-center p-4 shadow-lg shadow-brand-primary/10">
        <h1 className="text-xl font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
          Symbolic Names
        </h1>
      </header>
      
      <main className="flex-grow p-4 pb-24">
        {renderPage()}
      </main>
      
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
};

export default App;
