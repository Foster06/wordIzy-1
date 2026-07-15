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
  const [revealMessage, setRevealMessage] = useState("");

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
      setRevealMessage("");
      setPuzzleIndex((puzzleIndex + 1) % PUZZLES.length);
    }
  };

  // 🎯 NEW: Reveal the answer, show it briefly, penalize slightly, and go to the next word
  const handleGiveUpAndSolve = () => {
    const correctAnswer = PUZZLES[puzzleIndex].answer;
    setRevealMessage(`The answer was: ${correctAnswer}`);
    setScore((prev) => Math.max(0, prev - 5)); // 5 point penalty for skipping
    setInput("");
    
    // Pause briefly so the user can actually see the answer they missed
    setTimeout(() => {
      setRevealMessage("");
      setPuzzleIndex((puzzleIndex + 1) % PUZZLES.length);
    }, 1500);
  };

  if (!isPlaying) {
    return (
      <GlassCard className="p-6 text-center max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-2">⚡ Anagram Blitz Challenge</h3>
        <p className="text-muted-foreground text-xs mb-4">Unscramble as many words as you can in 60 seconds!</p>
        <button onClick={() => { setIsPlaying(true); setTimeLeft(60); setScore(0); setRevealMessage(""); }} className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold cursor-pointer">Start Game</button>
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
        <div className="space-y-4">
          <div className="text-3xl font-extrabold tracking-widest text-gradient-brand my-4">
            {PUZZLES[puzzleIndex].scrambled}
          </div>
          
          {/* Show the solved word reveal transient message here if they skip */}
          {revealMessage ? (
            <p className="text-xs font-bold text-amber-500 animate-pulse h-9 flex items-center justify-center">{revealMessage}</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                className="w-full text-center p-2 rounded-lg bg-background border text-sm h-9" 
                placeholder="Type your answer..." 
                autoFocus 
              />
            </form>
          )}

          {/* 🎯 ACTIONS ROWS: Submit answer or hit the new reveal button */}
          <div className="flex items-center gap-2 pt-2">
            <button 
              onClick={handleGiveUpAndSolve}
              type="button"
              disabled={!!revealMessage}
              className="w-full py-2 bg-muted text-muted-foreground hover:bg-muted/80 text-xs font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              🏳️ Give Up &amp; Solve
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h4 className="text-lg font-bold">Game Over!</h4>
          <p className="text-sm">Final Score: <span className="font-bold text-brand">{score}</span></p>
          <button onClick={() => setIsPlaying(false)} className="px-4 py-2 bg-muted rounded-lg text-xs cursor-pointer">Back</button>
        </div>
      )}
    </GlassCard>
  );
}
