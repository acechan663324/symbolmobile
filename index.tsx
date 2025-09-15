import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI, Type } from "@google/genai";

// --- ICONS ---

const SparklesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 3L9.25 9.25L3 12L9.25 14.75L12 21L14.75 14.75L21 12L14.75 9.25L12 3Z" />
    <path d="M5 3V5" />
    <path d="M19 3V5" />
    <path d="M3 19V21" />
    <path d="M19 19V21" />
  </svg>
);

const ListIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const TextIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 6.1H3" />
        <path d="M21 12.1H3" />
        <path d="M15.1 18.1H3" />
    </svg>
);

const ClipboardIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-subtle">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// --- TYPES ---

interface SymbolCategory {
  name: string;
  symbols: string[];
  description?: string;
}

interface Nickname {
  name: string;
  platform: string;
}

type Page = 'symbols' | 'nicknames' | 'generator';


// --- CONSTANTS ---

const SYMBOL_CATEGORIES: SymbolCategory[] = [
  { name: 'Popular Stars', symbols: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✶', '✷', '✸', '✹', '✺', '❂'], description: 'Add a touch of magic and recognition to your name.' },
  { name: 'Cute Emojis', symbols: ['✨', '💖', '🌸', '🦋', '⭐', '🌈', '🌙', '☀️', '☁️', '🍭', '🎀', '🧸', '🍓', '👑', '💎', '🎨', '💌', '💫', '🕊️', '🔮'], description: 'Add a splash of color and personality with these popular emojis.' },
  { name: 'Cute & Kaomoji', symbols: ['♡', 'ღ', 'ツ', 'ヅ', '❥', '웃', '유', '❤', '♥', ' UwU', ' OwO', '(｡♥‿♥｡)', 'ヽ(♡‿♡)ノ', '´･ᴗ･`', '(つ´∀｀)つ', '(≧◡≦)', '( ´ ▽ ` )ﾉ', '(^ω^)', '(o^∀^o)', '٩(◕‿◕)۶', '(づ｡◕‿‿◕｡)づ', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '(*^▽^*)', '( ´ ▽ ` )', '(⌒▽⌒)', '(*¯︶¯*)', '٩(｡•́‿•̀｡)۶', '(─‿‿─)', '(´｡• ᵕ •｡`)', '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '╰(▔∀▔)╯', 'ヽ(o^―^o)ﾉ', '＼(￣▽￣)／', '(o･ω･o)', ' T_T', ' (╥_╥)', ' ಥ_ಥ', ' (╯︵╰,)', 'o(╥﹏╥)o', '(-_-)', '(︶︹︺)', '(¬_¬)', '(ﾒ` ﾛ ´)', '(╬`益´)', 'щ(ºДºщ)', '┗( T﹏T )┛', '(；￣Д￣)', '(・_・;)', 'ㄟ( ▔, ▔ )ㄏ', '¯\\_(ツ)_/¯', '(^._.^)ﾉ', '=＾● ⋏ ●＾=', '(*ΦωΦ*)', '(^·ω·^ )', '(>‘o’)>', '<(‘o’<)', '(づ￣ ³￣)づ', '(╯3╰)', '(づ￣ ³￣)づ'], description: 'Express emotions and cuteness with Japanese-style emoticons.' },
  { name: 'Hearts', symbols: [ '❤', '♡', '♥', '❣', '❥', '❦', '❧', 'დ', 'ღ', '💖', '💘', '💝', '💞', '💟', '💕', '💓', '💗', '💙', '💚', '💛', '💜', '🧡', '🖤', '💔', '🤍', '🤎'], description: 'A collection of heart symbols for every occasion.' },
  { name: 'Brackets & Decor', symbols: ['【】', '『』', '〖〗', '«»', '‹›', '﴾﴿', '︵', '︶', '︷', '︸', '꧁', '꧂', '༺', '༻', '⦓⦔', '⦕⦖', '⦗⦘', '⧼⧽', '⦅⦆', '⦍⦎', '⦏⦐', '⦑⦒', '⌈⌋', '⌊⌉', '⧘⧙', '⧚⧛', '◢◣', '◤◥', '⫷⫸', '⫹⫺', '▰▱', '▱▰'], description: 'Frame your name with stylish and decorative brackets.' },
  { name: 'Arrows', symbols: ['→', '←', '↑', '↓', '↔', '↕', '➾', '➙', '➽', '➸', '➳', '➴', '➵', '➶', '➷', '↶', '↷', '➔', '➘', '➙', '➚', '➛', '➜', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦', '➧', '➨', '↚', '↛', '↜', '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩', '↪', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵', '↶', '↷', '↸', '↹', '↺', '↻', '↼', '↽', '↾', '↿', '⇀', '⇁', '⇂', '⇃', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊'], description: 'Point the way or add a dynamic feel to your nickname.' },
  { name: 'Gaming & Weapons', symbols: ['⚔', '☠', '♕', '♛', '♖', '♜', '☾', '☽', '❂', '❖', '⚜', '✧', ' dagger', ' pistol', ' sniper', '💣', '💥', '🎯', '🎮', '🕹️', '🎲', '🔫', '🔪', '🛡️'], description: 'Show off your competitive spirit with iconic gaming symbols.' },
  { name: 'Personality & Traits', symbols: ['😇', '😈', '👼', '🕊️', '💀', '👑', '🔮', '♠️', '♣️', '♦️', '♥️', '🌊', '🔥', '🍃', '❄️', '⚡'], description: 'Showcase your character with symbols for angels, devils, royalty, and more.' },
  { name: 'Musical Notes', symbols: ['♪', '♫', '♩', '♬', '♭', '♮', '♯', '𝄞', '𝅘𝅥𝅯', '𝅘𝅥𝅰'], description: 'For music lovers, add a melodic touch to your name.' },
  { name: 'Geometric Shapes', symbols: ['■', '□', '▪', '▫', '▲', '△', '▼', '▽', '◆', '◇', '●', '○', '◎', '◉', '◘', '◙', '◧', '◨', '◩', '◪', '▨', '▩', '▱', '▰', '◚', '◛', '◢', '◣', '◤', '◥', '◰', '◱', '◲', '◳'], description: 'Add a modern, clean, or abstract feel with geometric forms.' },
  { name: 'Line & Box Drawing', symbols: ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '═', '║', '╒', '╓', '╔', '╕', '╖', '╗', '╘', '╙', '╚', '╛', '╜', '╝', '╞', '╟', '╠', '╡', '╢', '╣', '╤', '╥', '╦', '╧', '╨', '╩', '╪', '╫', '╬'], description: 'For creating text art and complex dividers.' },
  { name: 'Weather & Nature', symbols: ['☀', '☁', '☂', '☃', '☄', '★', '☇', '☈', '☉', '☊', '☋', '☌', '☍', '☼', '☽', '☾', '♁', '♨', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋', '✶', '✸', '✹', '✺', 'ϟ', '🌍', '🌎', '🌏', '🏔', '🌋', '🌊', '🌬', '💧'], description: 'Symbols representing the sky, elements, and nature.' },
  { name: 'Zodiac Signs', symbols: ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'], description: 'Represent your astrological sign.' },
  { name: 'Math & Currency', symbols: ['+', '-', '×', '÷', '±', '≠', '≈', '≤', '≥', '∞', '∑', '∫', '√', 'ƒ', 'π', '°', 'µ', '$', '€', '£', '¥', '¢', '₩', '₹', '₽', '₿'], description: 'For mathematical expressions or showing off wealth.' },
  { name: 'Circled Numbers & Letters', symbols: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', 'Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ', 'Ⓔ', 'Ⓕ', 'Ⓖ', 'Ⓗ', 'Ⓘ', 'Ⓙ', 'Ⓚ', 'Ⓛ', 'Ⓜ', 'Ⓝ', 'Ⓞ', 'Ⓟ', 'Ⓠ', 'Ⓡ', 'Ⓢ', 'Ⓣ', 'Ⓤ', 'Ⓥ', 'Ⓦ', 'Ⓧ', 'Ⓨ', 'Ⓩ'], description: 'Stylish, enclosed characters for emphasis or lists.' }
];

const PREMADE_NICKNAMES: Nickname[] = [
    { name: '꧁༺₦Ї₦ℑ₳༻꧂', platform: 'PUBG / Free Fire' },
    { name: '♛Vł₳ⱤɆⱫ♛', platform: 'General Gaming' },
    { name: '★彡[ᴅᴇᴀᴅ ᴋɪʟʟᴇʀ]彡★', platform: 'FPS Games' },
    { name: '♥♡~Sωєєт Pєα~♡♥', platform: 'Social Media' },
    { name: 'ツ『FÜЯY』ツ', platform: 'Apex Legends' },
    { name: '✧-Ethereal-✧', platform: 'Valorant' },
    { name: '웃☾Lυɳαɾ☽웃', platform: 'Instagram / TikTok' },
    { name: '『Đ₳Ɽ₭ ₩₳ⱤⱤłØⱤ』', platform: 'Mobile Legends' },
    { name: '✩•Cryѕтal•✩', platform: 'Roblox' },
    { name: '☠︎︎ⓈⒽⒶⒹⓄⓌ☠︎︎', platform: 'Call of Duty' },
];


// --- SERVICES ---

interface GenerateNicknamesParams {
  keyword: string;
  symbol: string;
  count: number;
  platform: string;
}

const generateNicknames = async ({
  keyword,
  symbol,
  count,
  platform,
}: GenerateNicknamesParams): Promise<string[]> => {
  try {
    // FIX: Lazily check for API_KEY only when the function is called.
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable is not configured.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `You are an expert in creating cool, stylish, and unique nicknames for gamers and social media users.
      Generate 5 distinct nicknames based on the following criteria:
      - Main Keyword: "${keyword}"
      - Symbol to incorporate: "${symbol}"
      - Number of times to use the symbol per nickname: ${count}
      - Target Platform: "${platform}"
      
      Instructions:
      1. Creatively integrate the symbol into and around the keyword.
      2. The style should be modern and fitting for the platform.
      3. Avoid simply adding the symbol at the beginning or end. Be artistic.
      4. Ensure the output is only a JSON array of strings.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "A unique and stylish nickname"
          }
        },
        temperature: 0.9,
      },
    });
    
    const jsonString = response.text.trim();
    const generatedNames = JSON.parse(jsonString);
    
    if (Array.isArray(generatedNames) && generatedNames.every(item => typeof item === 'string')) {
        return generatedNames;
    } else {
        throw new Error("Invalid response format from API.");
    }

  } catch (error) {
    console.error("Error generating nicknames:", error);
    if (error instanceof Error && error.message.includes("API_KEY")) {
        throw new Error("The AI service is not configured. Please contact the administrator.");
    }
    throw new Error("Failed to generate nicknames. Please try again later.");
  }
};


// --- COMPONENTS ---

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

const NicknameList: React.FC = () => {
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName('Copied!');
    setTimeout(() => setCopiedName(null), 1500);
  }, []);

  const NicknameCard: React.FC<{ nickname: Nickname; onCopy: (name: string) => void }> = ({ nickname, onCopy }) => (
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

  const CopyToast: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 z-50">
      <ClipboardIcon />
      <span>{message}</span>
    </div>
  );

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
    if (!lowercasedQuery) return SYMBOL_CATEGORIES;

    return SYMBOL_CATEGORIES.reduce((acc, category) => {
        const matchingSymbols = category.symbols.filter(symbol => symbol.toLowerCase().includes(lowercasedQuery));
        const categoryNameMatches = category.name.toLowerCase().includes(lowercasedQuery);
        if (categoryNameMatches || matchingSymbols.length > 0) {
            acc.push({ ...category, symbols: categoryNameMatches ? category.symbols : matchingSymbols });
        }
        return acc;
    }, [] as SymbolCategory[]);
  }, [searchQuery]);

  const CategorySection: React.FC<{ category: SymbolCategory; onCopy: (symbol: string) => void }> = ({ category, onCopy }) => (
    <div className="mb-6 bg-brand-surface rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-1 text-brand-secondary">{category.name}</h2>
      {category.description && <p className="text-sm text-brand-subtle mb-3">{category.description}</p>}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {category.symbols.map((symbol, index) => (
          <button key={`${category.name}-${index}`} onClick={() => onCopy(symbol)} className="flex items-center justify-center text-xl p-2 bg-brand-bg rounded-md hover:bg-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-200 aspect-square" aria-label={`Copy symbol ${symbol}`}>
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );

  const CopyToast: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 z-50">
      <ClipboardIcon />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="animate-fade-in">
       <h2 className="text-2xl font-bold mb-4 text-center">Symbol Library</h2>
       <p className="text-brand-subtle text-center mb-6">Browse and copy symbols to create your perfect name.</p>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon /></div>
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
        <div className="text-center py-10"><p className="text-brand-subtle">No results found for "{searchQuery}"</p></div>
      )}
      {copiedSymbol && <CopyToast message={copiedSymbol} />}
    </div>
  );
};


interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  interface NavItemProps {
    label: string;
    page: Page;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: (page: Page) => void;
  }
  const NavItem: React.FC<NavItemProps> = ({ label, page, icon, isActive, onClick }) => (
    <button onClick={() => onClick(page)} className={`flex flex-col items-center justify-center gap-1 w-full transition-all duration-300 ease-in-out ${isActive ? 'text-brand-secondary scale-110' : 'text-brand-subtle'}`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-brand-surface/80 backdrop-blur-lg border-t border-brand-primary/20 shadow-t-lg shadow-black/30 flex justify-around items-center px-4">
      <NavItem label="Symbols" page="symbols" icon={<ListIcon />} isActive={activePage === 'symbols'} onClick={onNavigate} />
      <NavItem label="Nicknames" page="nicknames" icon={<TextIcon />} isActive={activePage === 'nicknames'} onClick={onNavigate} />
      <NavItem label="Generator" page="generator" icon={<SparklesIcon />} isActive={activePage === 'generator'} onClick={onNavigate} />
    </nav>
  );
};

// --- APP ---

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('symbols');
  const handleNavigate = (page: Page) => setActivePage(page);

  const renderContent = () => {
    switch (activePage) {
      case 'symbols': return <SymbolList />;
      case 'nicknames': return <NicknameList />;
      case 'generator': return <NicknameGenerator />;
      default: return <SymbolList />;
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <main className="flex-grow p-4 pt-8 pb-24">{renderContent()}</main>
      <BottomNav activePage={activePage} onNavigate={handleNavigate} />
    </div>
  );
};


// --- RENDER ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);