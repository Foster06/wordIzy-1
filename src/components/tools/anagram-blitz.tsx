"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/site/glass-card";

const PUZZLES = [
  { scrambled: "AMRGNAO", answer: "ANAGRAM" },
  { scrambled: "ELDRWO", answer: "WORDLE" },
  { scrambled: "CLBSREBA", answer: "SCRABBLE" },
  { scrambled: "CEXNIDIO", answer: "DICTIONARY" }
];

export function AnagramBlitz() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isPlaying]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase() === PUZZLES[puzzleIndex].answer) {
      setScore(score + 10);
      setInput("");
      setPuzzleIndex((puzzleIndex + 1) % PUZZLES.length);
    }
  };

  if (!isPlaying) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-2">⚡ Anagram Blitz Challenge</h3>
        <p className="text-muted-foreground text-xs mb-4">Unscramble as many words as you can in 60 seconds!</p>
        <button onClick={() => { setIsPlaying(true); setTimeLeft(60); setScore(0); }} className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold">Start Game</button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 text-center max-w-md mx-auto">
      <div className="flex justify-between text-xs text-muted-foreground mb-4">
        <span>⏱️ Time: {timeLeft}s</span>
        <span>🏆 Score: {score}</span>
      </div>
      {timeLeft > 0 ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-3xl font-extrabold tracking-widest text-gradient-brand my-4">{PUZZLES[puzzleIndex].scrambled}</div>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full text-center p-2 rounded-lg bg-background border text-sm" placeholder="Type your answer..." autoFocus />
        </form>
      ) : (
        <div className="space-y-2">
          <h4 className="text-lg font-bold">Game Over!</h4>
          <p className="text-sm">Final Score: <span className="font-bold text-brand">{score}</span></p>
          <button onClick={() => setIsPlaying(false)} className="px-4 py-2 bg-muted rounded-lg text-xs">Back</button>
        </div>
      )}
    </GlassCard>
  );
}
