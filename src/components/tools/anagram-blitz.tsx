"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/site/glass-card";
import { useLanguage } from "@/components/i18n/language-provider";

interface PuzzleState {
  scrambled: string;
  answer: string;
  hint: string;
}

export function AnagramBlitz() {
  const { lang } = useLanguage(); 
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleState | null>(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealMessage, setRevealMessage] = useState("");
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [fetchingWord, setFetchingWord] = useState(false);

  useEffect(() => {
    const checkDailyStatus = async () => {
      setLoading(true);
      const todayStr = new Date().toDateString();
      const lastPlayedDate = localStorage.getItem("izy_blitz_last_played");
      const dailyHighScore = localStorage.getItem("izy_blitz_high_score");
      
      if (lastPlayedDate === todayStr) {
        setHasPlayedToday(true);
        if (dailyHighScore) setScore(parseInt(dailyHighScore, 10));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkDailyStatus();
  }, []);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0 || !!revealMessage) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isPlaying, revealMessage]);

  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      handleStopGame();
    }
  }, [timeLeft, isPlaying]);

  const fetchWordFromDictionary = async (modeType: "daily" | "infinite") => {
    setFetchingWord(true);
    try {
      const activeLang = lang && lang.trim() ? lang.toLowerCase() : "en";
      const origin = typeof window !== "undefined" ? window.location.origin : "https://wordizy.com";
      const targetUrl = `${origin}/api/game/random-word?mode=${modeType}&lang=${activeLang}&t=${Date.now()}`;
      
      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      const data = await res.json();
      
      if (data && data.scrambled) {
        // 🎯 SAVES BOTH STRINGS LOCKED TOGETHER INSTANTLY
        setCurrentPuzzle({
          scrambled: data.scrambled,
          answer: data.answer,
          hint: data.hint
        });
      }
    } catch (e) {
      console.error("Fetch pipeline anomaly managed safely", e);
    } finally {
      setFetchingWord(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPuzzle || fetchingWord || !!revealMessage) return;

    if (input.toUpperCase().trim() === currentPuzzle.answer) {
      setScore((prev) => prev + 20);
      setInput("");
      setRevealMessage("✨ Perfect! Correct Answer!");
      
      if (isInfiniteMode) {
        setTimeLeft((prev) => prev + 10);
      }
      
      setTimeout(async () => {
        setRevealMessage("");
        await fetchWordFromDictionary("infinite");
      }, 1200);
    }
  };

  const handleGiveUpAndSolve = () => {
    if (!currentPuzzle || fetchingWord || !!revealMessage) return;
    
    // 🎯 REVEALS THE EXACT ANSWER TIED TO THIS SINGLE DATA OBJECT
    setRevealMessage(`The answer was: ${currentPuzzle.answer}`);
    setInput("");
    setScore((prev) => Math.max(0, prev - 5));
    
    setTimeout(async () => {
      setRevealMessage("");
      await fetchWordFromDictionary("infinite");
    }, 2000);
  };

  const handleStopGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);

    if (!isInfiniteMode) {
      const todayStr = new Date().toDateString();
      localStorage.setItem("izy_blitz_last_played", todayStr);
      setHasPlayedToday(true);
    }

    const currentHigh = localStorage.getItem("izy_blitz_high_score") || "0";
    if (score > parseInt(currentHigh, 10)) {
      localStorage.setItem("izy_blitz_high_score", score.toString());
    }
  };

  const startInfinitePractice = async () => {
    setIsInfiniteMode(true);
    setIsPlaying(true);
    setIsGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setRevealMessage("");
    setInput("");
    await fetchWordFromDictionary("infinite");
  };

  const startDailyChallenge = async () => {
    setIsInfiniteMode(false);
    setIsPlaying(true);
    setIsGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setRevealMessage("");
    setInput("");
    await fetchWordFromDictionary("daily");
  };

  if (loading) {
    return <GlassCard className="p-6 text-center max-w-md mx-auto text-xs text-muted-foreground">Loading Puzzle Engine...</GlassCard>;
  }

  if (hasPlayedToday && !isPlaying && !isGameOver) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto border-emerald-500/20 bg-emerald-500/[0.02]">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">Completed</span>
        <h3 className="text-xl font-bold mt-2 mb-1">📅 Today's Puzzle Solved!</h3>
        <p className="text-muted-foreground text-xs mb-4">You have already used your daily attempt! Come back tomorrow at midnight for a brand-new challenge.</p>
        <button onClick={startInfinitePractice} className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md">Play Infinite Practice Mode</button>
      </GlassCard>
    );
  }

  if (!isPlaying && !isGameOver) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand/10 text-brand uppercase tracking-wider">New Daily Challenge Live</span>
        <h3 className="text-xl font-bold mt-2 mb-1">⚡ Anagram Blitz Challenge</h3>
        <p className="text-muted-foreground text-xs mb-4">Unscramble words under a 60-second time limit from our Scrabble dictionaries.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button onClick={startDailyChallenge} className="w-full sm:w-auto px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold cursor-pointer">Start Today's Puzzle</button>
          <button onClick={startInfinitePractice} className="w-full sm:w-auto px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-xs font-semibold cursor-pointer">Play Infinite Practice</button>
        </div>
      </GlassCard>
    );
  }

  if (isGameOver && !isPlaying) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto">
        <h4 className="text-lg font-bold">⏱️ Time's Up! Game Over</h4>
        <p className="text-sm my-2">Final Score: <span className="font-bold text-brand">{score}</span> points.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          {isInfiniteMode ? (
            <button onClick={startInfinitePractice} className="w-full sm:w-auto px-4 py-2 bg-brand text-white rounded-lg text-xs font-medium cursor-pointer">
              🔄 Play Practice Again
            </button>
          ) : (
            <p className="text-xs text-muted-foreground bg-emerald-500/5 border border-emerald-500/10 p-2 rounded-lg w-full">
              Your daily attempt is locked. See you tomorrow!
            </p>
          )}
          <button onClick={() => { setIsGameOver(false); setScore(0); }} className="w-full sm:w-auto px-4 py-2 bg-muted rounded-lg text-xs font-medium cursor-pointer">
            Return to Menu
          </button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 text-center max-w-md mx-auto">
      <div className="flex justify-between text-xs text-muted-foreground mb-4">
        <span className="font-mono tabular-nums">⏱️ Time Left: {timeLeft}s</span>
        <span className="font-mono tabular-nums">🏆 Total Score: {score}</span>
      </div>
      <div className="space-y-4">
        
        {fetchingWord || !currentPuzzle ? (
          <div className="h-[76px] flex items-center justify-center text-xs text-muted-foreground tracking-widest uppercase font-mono animate-pulse">
            🎲 Generating Word...
          </div>
        ) : (
          <>
            <div className="text-3xl font-extrabold tracking-widest text-gradient-brand my-4 uppercase font-mono">
              {currentPuzzle.scrambled}
            </div>
            
            <p className="text-xs text-muted-foreground bg-white/[0.03] py-1.5 px-3 rounded-lg border border-white/5 max-w-xs mx-auto">
              💡 Hint: {currentPuzzle.hint}
            </p>
          </>
        )}
        
        {revealMessage ? (
          <p className="text-xs font-bold text-amber-500 h-9 flex items-center justify-center">{revealMessage}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              disabled={fetchingWord}
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className="w-full text-center p-2 rounded-lg bg-background border text-sm h-9 uppercase tracking-wider font-mono font-bold border-brand/20 focus:border-brand disabled:opacity-40" 
              placeholder={fetchingWord ? "Waiting..." : "Type word..."} 
              autoFocus 
            />
          </form>
        )}

        <div className="flex items-center gap-2 max-w-xs mx-auto pt-1">
          <button 
            onClick={handleGiveUpAndSolve}
            type="button"
            disabled={!!revealMessage || fetchingWord}
            className="flex-1 py-1.5 px-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20 text-[11px] font-semibold rounded-md transition-colors cursor-pointer disabled:opacity-40"
          >
            🏳️ Skip &amp; Reveal
          </button>
          <button
            onClick={handleStopGame}
            type="button"
            className="py-1.5 px-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 text-[11px] font-bold rounded-md transition-all shadow-lg shadow-black/40 hover:shadow-black/60 active:scale-95 cursor-pointer shrink-0"
          >
            🛑 Stop Game
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
