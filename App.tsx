import React, { useState } from 'react';
import SymbolList from './components/SymbolList.tsx';
import NicknameList from './components/NicknameList.tsx';
import NicknameGenerator from './components/NicknameGenerator.tsx';
import BottomNav from './components/BottomNav.tsx';
import type { Page } from './types.ts';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('symbols');

  const handleNavigate = (page: Page) => {
    setActivePage(page);
  };

  const renderContent = () => {
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
      <main className="flex-grow p-4 pt-8 pb-24">
        {renderContent()}
      </main>
      <BottomNav activePage={activePage} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;