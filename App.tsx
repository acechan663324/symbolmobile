import React from 'react';
import SymbolList from './components/SymbolList.tsx';
import NicknameList from './components/NicknameList.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans flex flex-col">
      <main className="flex-grow p-4 pt-8">
        <div className="space-y-16">
          <SymbolList />
          <NicknameList />
        </div>
      </main>
    </div>
  );
};

export default App;