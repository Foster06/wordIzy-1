export interface PuzzleItem {
  scrambled: string;
  answer: string;
  hint: string;
}

// 🎯 MASTER POOL: Expand this list over time with any words you like!
export const DAILY_PUZZLES: PuzzleItem[] = [
  { scrambled: "AMRGNAO", answer: "ANAGRAM", hint: "A word formed by rearranging letters." },
  { scrambled: "ELDRWO", answer: "WORDLE", hint: "The famous daily 5-letter green grid game." },
  { scrambled: "CLBSREBA", answer: "SCRABBLE", hint: "The ultimate tile-placing board game." },
  { scrambled: "CEXNIDIO", answer: "DICTIONARY", hint: "Where all these words live." },
  { scrambled: "YPTNHMO", answer: "PYTHON", hint: "A popular backend programming language." },
  { scrambled: "CVERLE", answer: "VERCEL", hint: "Where your frontend application is hosted." },
  { scrambled: "SUOTR", answer: "TURSO", hint: "Your private, lightweight edge database." },
  { scrambled: "TZBLI", answer: "BLITZ", hint: "A fast, high-energy attack or challenge." },
  { scrambled: "OMNRETI", answer: "MENTOR", hint: "A trusted guide or counselor." },
  { scrambled: "SPXERES", answer: "EXPRESS", hint: "To state your thoughts quickly or clearly." },
  { scrambled: "GICAOMN", answer: "NOMADIC", hint: "Roaming from place to place without a fixed home." },
  { scrambled: "KWYONR", answer: "NETWORK", hint: "A system of interconnected lines or channels." },
  { scrambled: "VSAIUL", answer: "VISUAL", hint: "Relating to seeing or sight layout graphics." },
  { scrambled: "OIEZMPD", answer: "OPTIMIZE", hint: "To make something as perfect or fast as possible." },
  { scrambled: "UJMEBL", answer: "JUMBLE", hint: "An unsorted, mixed-up pile of letters." }
];

// 🎯 CALENDAR SEED ALGORITHM: Returns a completely unique index using today's calendar date string
export function getDailyPuzzleIndex(): number {
  const today = new Date();
  
  // Create a unique integer based on Year, Month (0-11), and Day (1-31)
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Deterministic mathematical hash function (Simple LCG style) to mix up the distribution sequence
  const hash = (seed * 16807) % 2147483647;
  
  // Map the calculated index number strictly inside our current puzzle pool boundaries safely
  return Math.abs(hash) % DAILY_PUZZLES.length;
}
