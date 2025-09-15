import type { SymbolCategory, Nickname } from './types';

export const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    name: 'Popular Stars',
    symbols: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✶', '✷', '✸', '✹', '✺', '❂'],
    description: 'Add a touch of magic and recognition to your name.'
  },
  {
    name: 'Cute Emojis',
    symbols: ['✨', '💖', '🌸', '🦋', '⭐', '🌈', '🌙', '☀️', '☁️', '🍭', '🎀', '🧸', '🍓', '👑', '💎'],
    description: 'Add a splash of color and personality with these popular emojis.'
  },
  {
    name: 'Cute & Kaomoji',
    symbols: ['♡', 'ღ', 'ツ', 'ヅ', '❥', '웃', '유', '❤', '♥', ' UwU', ' OwO', '(｡♥‿♥｡)', 'ヽ(♡‿♡)ノ', '´･ᴗ･`', '(つ´∀｀)つ', '(≧◡≦)', '( ´ ▽ ` )ﾉ', '(^ω^)', '(o^∀^o)', '٩(◕‿◕)۶', '(づ｡◕‿‿◕｡)づ', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧'],
    description: 'Express emotions and cuteness with Japanese-style emoticons.'
  },
  {
    name: 'Brackets & Decor',
    symbols: ['【】', '『』', '〖〗', '«»', '‹›', '﴾﴿', '︵', '︶', '︷', '︸', '꧁', '꧂', '༺', '༻'],
    description: 'Frame your name with stylish and decorative brackets.'
  },
  {
    name: 'Arrows',
    symbols: ['→', '←', '↑', '↓', '↔', '↕', '➾', '➙', '➽', '➸', '➳', '➴', '➵', '➶', '➷', '↶', '↷'],
    description: 'Point the way or add a dynamic feel to your nickname.'
  },
  {
      name: 'Gaming & Weapons',
      symbols: ['⚔', '☠', '♕', '♛', '♖', '♜', '☾', '☽', '❂', '❖', '⚜', '✧', ' dagger', ' pistol', ' sniper'],
      description: 'Show off your competitive spirit with iconic gaming symbols.'
  },
  {
    name: 'Personality & Traits',
    symbols: ['😇', '😈', '👼', '🕊️', '💀', '👑', '🔮', '♠️', '♣️', '♦️', '♥️', '🌊', '🔥', '🍃', '❄️', '⚡'],
    description: 'Showcase your character with symbols for angels, devils, royalty, and more.'
  },
  {
    name: 'Musical Notes',
    symbols: ['♪', '♫', '♩', '♬', '♭', '♮', '♯', '𝄞', '𝅘𝅥𝅯', '𝅘𝅥𝅰'],
    description: 'For music lovers, add a melodic touch to your name.'
  }
];

export const PREMADE_NICKNAMES: Nickname[] = [
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