import type { SymbolCategory, Nickname } from './types';

export const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    name: 'Popular Stars',
    symbols: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✶', '✷', '✸', '✹', '✺', '❂'],
    description: 'Add a touch of magic and recognition to your name.'
  },
  {
    name: 'Cute Emojis',
    symbols: ['✨', '💖', '🌸', '🦋', '⭐', '🌈', '🌙', '☀️', '☁️', '🍭', '🎀', '🧸', '🍓', '👑', '💎', '🎨', '💌', '💫', '🕊️', '🔮'],
    description: 'Add a splash of color and personality with these popular emojis.'
  },
  {
    name: 'Cute & Kaomoji',
    symbols: [
        '♡', 'ღ', 'ツ', 'ヅ', '❥', '웃', '유', '❤', '♥', ' UwU', ' OwO', 
        '(｡♥‿♥｡)', 'ヽ(♡‿♡)ノ', '´･ᴗ･`', '(つ´∀｀)つ', '(≧◡≦)', '( ´ ▽ ` )ﾉ', 
        '(^ω^)', '(o^∀^o)', '٩(◕‿◕)۶', '(づ｡◕‿‿◕｡)づ', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
        '(*^▽^*)', '( ´ ▽ ` )', '(⌒▽⌒)', '(*¯︶¯*)', '٩(｡•́‿•̀｡)۶', '(─‿‿─)',
        '(´｡• ᵕ •｡`)', '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '╰(▔∀▔)╯', 'ヽ(o^―^o)ﾉ',
        '＼(￣▽￣)／', '(o･ω･o)', ' T_T', ' (╥_╥)', ' ಥ_ಥ', ' (╯︵╰,)',
        'o(╥﹏╥)o', '(-_-)', '(︶︹︺)', '(¬_¬)', '(ﾒ` ﾛ ´)', '(╬`益´)',
        'щ(ºДºщ)', '┗( T﹏T )┛', '(；￣Д￣)', '(・_・;)', 'ㄟ( ▔, ▔ )ㄏ',
        '¯\\_(ツ)_/¯', '(^._.^)ﾉ', '=＾● ⋏ ●＾=', '(*ΦωΦ*)', '(^·ω·^ )',
        '(>‘o’)>', '<(‘o’<)', '(づ￣ ³￣)づ', '(╯3╰)', '(づ￣ ³￣)づ'
    ],
    description: 'Express emotions and cuteness with Japanese-style emoticons.'
  },
  {
      name: 'Hearts',
      symbols: [ '❤', '♡', '♥', '❣', '❥', '❦', '❧', 'დ', 'ღ', '💖', '💘', '💝', '💞', '💟', '💕', '💓', '💗', '💙', '💚', '💛', '💜', '🧡', '🖤', '💔', '🤍', '🤎'],
      description: 'A collection of heart symbols for every occasion.'
  },
  {
    name: 'Brackets & Decor',
    symbols: [
        '【】', '『』', '〖〗', '«»', '‹›', '﴾﴿', '︵', '︶', '︷', '︸', '꧁', '꧂', '༺', '༻',
        '⦓⦔', '⦕⦖', '⦗⦘', '⧼⧽', '⦅⦆', '⦍⦎', '⦏⦐', '⦑⦒', '⌈⌋', '⌊⌉',
        '⧘⧙', '⧚⧛', '◢◣', '◤◥', '⫷⫸', '⫹⫺', '▰▱', '▱▰'
    ],
    description: 'Frame your name with stylish and decorative brackets.'
  },
  {
    name: 'Arrows',
    symbols: [
        '→', '←', '↑', '↓', '↔', '↕', '➾', '➙', '➽', '➸', '➳', '➴', '➵', '➶', '➷', '↶', '↷',
        '➔', '➘', '➙', '➚', '➛', '➜', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦', '➧',
        '➨', '↚', '↛', '↜', '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨',
        '↩', '↪', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵', '↶', '↷', '↸', '↹',
        '↺', '↻', '↼', '↽', '↾', '↿', '⇀', '⇁', '⇂', '⇃', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊'
    ],
    description: 'Point the way or add a dynamic feel to your nickname.'
  },
  {
      name: 'Gaming & Weapons',
      symbols: ['⚔', '☠', '♕', '♛', '♖', '♜', '☾', '☽', '❂', '❖', '⚜', '✧', ' dagger', ' pistol', ' sniper', '💣', '💥', '🎯', '🎮', '🕹️', '🎲', '🔫', '🔪', '🛡️'],
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
  },
  {
    name: 'Geometric Shapes',
    symbols: ['■', '□', '▪', '▫', '▲', '△', '▼', '▽', '◆', '◇', '●', '○', '◎', '◉', '◘', '◙', '◧', '◨', '◩', '◪', '▨', '▩', '▱', '▰', '◚', '◛', '◢', '◣', '◤', '◥', '◰', '◱', '◲', '◳'],
    description: 'Add a modern, clean, or abstract feel with geometric forms.'
  },
  {
      name: 'Line & Box Drawing',
      symbols: ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '═', '║', '╒', '╓', '╔', '╕', '╖', '╗', '╘', '╙', '╚', '╛', '╜', '╝', '╞', '╟', '╠', '╡', '╢', '╣', '╤', '╥', '╦', '╧', '╨', '╩', '╪', '╫', '╬'],
      description: 'For creating text art and complex dividers.'
  },
  {
      name: 'Weather & Nature',
      symbols: ['☀', '☁', '☂', '☃', '☄', '★', '☇', '☈', '☉', '☊', '☋', '☌', '☍', '☼', '☽', '☾', '♁', '♨', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋', '✶', '✸', '✹', '✺', 'ϟ', '🌍', '🌎', '🌏', '🏔', '🌋', '🌊', '🌬', '💧'],
      description: 'Symbols representing the sky, elements, and nature.'
  },
  {
      name: 'Zodiac Signs',
      symbols: ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'],
      description: 'Represent your astrological sign.'
  },
  {
      name: 'Math & Currency',
      symbols: ['+', '-', '×', '÷', '±', '≠', '≈', '≤', '≥', '∞', '∑', '∫', '√', 'ƒ', 'π', '°', 'µ', '$', '€', '£', '¥', '¢', '₩', '₹', '₽', '₿'],
      description: 'For mathematical expressions or showing off wealth.'
  },
  {
      name: 'Circled Numbers & Letters',
      symbols: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', 'Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ', 'Ⓔ', 'Ⓕ', 'Ⓖ', 'Ⓗ', 'Ⓘ', 'Ⓙ', 'Ⓚ', 'Ⓛ', 'Ⓜ', 'Ⓝ', 'Ⓞ', 'Ⓟ', 'Ⓠ', 'Ⓡ', 'Ⓢ', 'Ⓣ', 'Ⓤ', 'Ⓥ', 'Ⓦ', 'Ⓧ', 'Ⓨ', 'Ⓩ'],
      description: 'Stylish, enclosed characters for emphasis or lists.'
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