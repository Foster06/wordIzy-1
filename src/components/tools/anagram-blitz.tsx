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
  const { t, lang } = useLanguage();
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleState | null>(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealMessage, setRevealMessage] = useState("");
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  // SSR-friendly: default to NOT loading so the start menu renders during SSR.
  // The daily-status check runs in useEffect (client-only) and updates
  // hasPlayedToday after hydration. This means the SSR HTML contains the
  // game title, description, and buttons — critical for SEO.
  const [loading, setLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [fetchingWord, setFetchingWord] = useState(false);

  useEffect(() => {
    const checkDailyStatus = async () => {
      const todayStr = new Date().toDateString();
      const lastPlayedDate = localStorage.getItem("izy_blitz_last_played");
      const dailyHighScore = localStorage.getItem("izy_blitz_high_score");

      if (lastPlayedDate === todayStr) {
        setHasPlayedToday(true);
        if (dailyHighScore) setScore(parseInt(dailyHighScore, 10));
      }
      // No setLoading(false) needed — we default to false.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isPlaying]);

  const fetchWordFromDictionary = async (modeType: "daily" | "infinite") => {
    setFetchingWord(true);
    try {
      const activeLang = lang && lang.trim() ? lang.toLowerCase() : "en";
      // Use relative URL — works in both dev and production, avoids
      // window.location.origin access which can cause hydration mismatches.
      // The cache-busting param `t` is only needed for infinite mode (daily
      // mode returns the same word all day anyway).
      const cacheBust = modeType === "infinite" ? `&t=${Date.now()}` : "";
      const targetUrl = `/api/game/random-word?mode=${modeType}&lang=${activeLang}${cacheBust}`;

      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      const data = await res.json();

      if (data && data.scrambled) {
        setCurrentPuzzle({
          scrambled: data.scrambled,
          answer: data.answer,
          hint: data.hint,
        });
      }
    } catch (e) {
      console.error("Fetch failed:", e);
    } finally {
      setFetchingWord(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPuzzle || fetchingWord || !!revealMessage) return;

    if (input.toUpperCase().trim() === currentPuzzle.answer) {
      // CORRECT answer — show success message, add points, load next word
      setScore((prev) => prev + 20);
      setInput("");
      setRevealMessage(t.blitz.correct);

      if (isInfiniteMode) {
        setTimeLeft((prev) => prev + 10);
      }

      // After 1.2s, clear message and fetch a new word
      setTimeout(async () => {
        setRevealMessage("");
        await fetchWordFromDictionary("infinite");
      }, 1200);
    } else {
      // WRONG answer — show error message, clear input, let user try again
      setRevealMessage(t.blitz.wrong);
      setInput("");

      // After 1s, clear the error message so the user can try again
      setTimeout(() => {
        setRevealMessage("");
      }, 1000);
    }
  };

  const handleGiveUpAndSolve = () => {
    if (!currentPuzzle || fetchingWord || !!revealMessage) return;

    setRevealMessage(`${t.blitz.answerWas} ${currentPuzzle.answer}`);
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
    return <GlassCard className="p-6 text-center max-w-md mx-auto text-xs text-muted-foreground">{t.blitz.loadingEngine}</GlassCard>;
  }

  if (hasPlayedToday && !isPlaying && !isGameOver) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto border-emerald-500/20 bg-emerald-500/[0.02]">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">{t.blitz.completed}</span>
        <h3 className="text-xl font-bold mt-2 mb-1">{t.blitz.todaysPuzzleSolved}</h3>
        <p className="text-muted-foreground text-xs mb-4">{t.blitz.alreadyPlayed}</p>
        <button onClick={startInfinitePractice} className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md">{t.blitz.playInfinite}</button>
      </GlassCard>
    );
  }

  if (!isPlaying && !isGameOver) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand/10 text-brand uppercase tracking-wider">{t.ui.newDailyChallenge}</span>
        <h3 className="text-xl font-bold mt-2 mb-1">{t.blitz.challengeTitle}</h3>
        <p className="text-muted-foreground text-xs mb-4">{t.blitz.challengeDesc}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button onClick={startDailyChallenge} className="w-full sm:w-auto px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold cursor-pointer">{t.blitz.startToday}</button>
          <button onClick={startInfinitePractice} className="w-full sm:w-auto px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-xs font-semibold cursor-pointer">{t.blitz.playInfiniteBtn}</button>
        </div>
      </GlassCard>
    );
  }

  if (isGameOver && !isPlaying) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto">
        <h4 className="text-lg font-bold">{t.blitz.timesUp}</h4>
        <p className="text-sm my-2">{t.blitz.finalScore} <span className="font-bold text-brand">{score}</span> {t.blitz.points}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          {isInfiniteMode ? (
            <button onClick={startInfinitePractice} className="w-full sm:w-auto px-4 py-2 bg-brand text-white rounded-lg text-xs font-medium cursor-pointer">
              {t.blitz.playAgain}
            </button>
          ) : (
            <p className="text-xs text-muted-foreground bg-emerald-500/5 border border-emerald-500/10 p-2 rounded-lg w-full">
              {t.blitz.dailyLocked}
            </p>
          )}
          <button onClick={() => { setIsGameOver(false); setScore(0); }} className="w-full sm:w-auto px-4 py-2 bg-muted rounded-lg text-xs font-medium cursor-pointer">
            {t.blitz.returnMenu}
          </button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 text-center max-w-md mx-auto">
      <div className="flex justify-between items-center text-xs text-muted-foreground mb-4 gap-2">
        <span className="font-mono tabular-nums shrink-0">⏱️ {timeLeft}{t.blitz.timeLeft}</span>
        <span className="font-mono tabular-nums shrink-0 min-w-[80px] text-right">🏆 {score} {t.blitz.totalScore}</span>
      </div>
      <div className="space-y-4">

        {fetchingWord || !currentPuzzle ? (
          <div className="h-[76px] flex items-center justify-center text-xs text-muted-foreground tracking-widest uppercase font-mono animate-pulse">
            {t.blitz.generating}
          </div>
        ) : (
          <>
            <div className="text-3xl font-extrabold tracking-widest text-gradient-brand my-4 uppercase font-mono">
              {currentPuzzle.scrambled}
            </div>

            <p className="text-xs text-muted-foreground bg-white/[0.03] py-1.5 px-3 rounded-lg border border-white/5 max-w-xs mx-auto">
              {t.blitz.hint} {currentPuzzle.hint}
            </p>
          </>
        )}

        {revealMessage ? (
          <p className="text-xs font-bold text-amber-500 h-9 flex items-center justify-center">{revealMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              disabled={fetchingWord}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-center p-2 rounded-lg bg-background border text-sm h-9 uppercase tracking-wider font-mono font-bold border-brand/20 focus:border-brand disabled:opacity-40"
              placeholder={fetchingWord ? t.blitz.waiting : t.blitz.typeWord}
              autoFocus
              aria-label={t.blitz.typeWord}
            />
            <button
              type="submit"
              disabled={fetchingWord || !input.trim()}
              className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-bold cursor-pointer transition-colors transition-transform hover:bg-brand/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {t.blitz.play}
            </button>
          </form>
        )}

        <div className="flex items-center gap-2 max-w-xs mx-auto pt-1">
          <button
            onClick={handleGiveUpAndSolve}
            type="button"
            disabled={!!revealMessage || fetchingWord}
            className="flex-1 py-1.5 px-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20 text-[11px] font-semibold rounded-md transition-colors cursor-pointer disabled:opacity-40"
          >
            {t.blitz.skipReveal}
          </button>
          <button
            onClick={handleStopGame}
            type="button"
            className="py-1.5 px-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 text-[11px] font-bold rounded-md transition-colors transition-transform shadow-lg shadow-black/40 hover:shadow-black/60 active:scale-95 cursor-pointer shrink-0"
          >
            {t.blitz.stopGame}
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
