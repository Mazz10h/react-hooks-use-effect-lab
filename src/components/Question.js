import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // 🕒 useEffect hook: sets up a 1-second countdown timer
  useEffect(() => {
    // If the timer hits 0, reset and call onAnswered(false)
    if (timeRemaining === 0) {
      setTimeRemaining(10); // reset timer for the next question
      onAnswered(false); // user ran out of time
      return; // stop further countdowns
    }

    // Create a timeout to reduce timeRemaining by 1 every second
    const timerId = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // 🧹 Cleanup: clear timeout to prevent memory leaks
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]); // dependencies: re-run when timeRemaining changes

  // ✅ When a user clicks an answer
  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // reset timer
    onAnswered(isCorrect); // tell parent whether they were right
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>

      {/* Render answer buttons */}
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}

      {/* Display countdown timer */}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
