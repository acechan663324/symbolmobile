export interface SymbolCategory {
  name: string;
  symbols: string[];
  description?: string;
}

export interface Nickname {
  name: string;
  platform: string;
}

// FIX: Add missing Page type definition.
export type Page = 'symbols' | 'nicknames' | 'generator';
