import React, { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import './App.scss';
import words from './Words';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const App = () => {
  const [showWords, setShowWords] = useState(false);

  const handleButtonClick = () => {
    setShowWords(true);
  };

  const wordAnimations = useSprings(
    words.length,
    words.map((word, index) => {
      const startPosition = getRandomNumber(-500, -100);
      const endPosition = window.innerHeight + 100;
      const startLeft = getRandomNumber(0, window.innerWidth - 100);
      const endLeft = getRandomNumber(0, window.innerWidth - 100);
      const delay = getRandomNumber(0, 1000);

      return {
        from: {
          opacity: 0,
          transform: `translate(${startLeft}px, ${startPosition}px)`,
        },
        to: {
          opacity: 1,
          transform: `translate(${endLeft}px, ${endPosition}px)`,
        },
        delay,
        config: { tension: 3, friction: 40 },
        onRest: () => {
          if (index === words.length - 1) {
            setShowWords(false);
          }
        },
      };
    }),
  );

  return (
    <div className="container">
      <button onClick={handleButtonClick} className="button">
        Нажми меня
      </button>
      {showWords && (
        <div className="word-container">
          {wordAnimations.map((wordAnimation, index) => (
            <animated.div
              className="animated-word"
              key={words[index]}
              style={{
                ...wordAnimation,
                position: 'absolute',
                left: '0',
                right: '0',
                margin: 'auto',
              }}
              onAnimationEnd={() => {
                // Удаляем слово из списка слов при попадании вниз
                if (wordAnimation.to.transform.startsWith(`translate(0px, ${endPosition}px)`)) {
                  words.splice(index, 1);
                }
              }}>
              {words[index]}
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
