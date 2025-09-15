
import React from 'react';
import type { Page } from '../types.ts';
import SparklesIcon from './icons/SparklesIcon.tsx';
import ListIcon from './icons/ListIcon.tsx';
import TextIcon from './icons/TextIcon.tsx';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

interface NavItemProps {
  label: string;
  page: Page;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, page, icon, isActive, onClick }) => {
  const activeClasses = 'text-brand-secondary scale-110';
  const inactiveClasses = 'text-brand-subtle';

  return (
    <button
      onClick={() => onClick(page)}
      className={`flex flex-col items-center justify-center gap-1 w-full transition-all duration-300 ease-in-out ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-brand-surface/80 backdrop-blur-lg border-t border-brand-primary/20 shadow-t-lg shadow-black/30 flex justify-around items-center px-4">
      <NavItem
        label="Symbols"
        page="symbols"
        icon={<ListIcon />}
        isActive={activePage === 'symbols'}
        onClick={onNavigate}
      />
      <NavItem
        label="Nicknames"
        page="nicknames"
        icon={<TextIcon />}
        isActive={activePage === 'nicknames'}
        onClick={onNavigate}
      />
      <NavItem
        label="Generator"
        page="generator"
        icon={<SparklesIcon />}
        isActive={activePage === 'generator'}
        onClick={onNavigate}
      />
    </nav>
  );
};

export default BottomNav;