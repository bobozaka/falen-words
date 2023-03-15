import React, { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import './App.scss';
import words from './Words';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const App = () => {
  const [showWords, setShowWords] = useState(false);
  const [wordList, setWordList] = useState([]);

  const handleButtonClick = () => {
    setShowWords(true);
    setWordList([...wordList, ...words]);
  };

  const wordAnimations = useSprings(
    wordList.length,
    wordList.map((word, index) => {
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
        config: { mass: 1, tension: 2, friction: 40 },
        onRest: () => {
          // Удаляем слово из списка слов при попадании вниз
          if (wordList.includes(word)) {
            setWordList(wordList.filter((w) => w !== word));
          }
        },
      };
    }),
  );

  return (
    <div className="container">
      <button onClick={handleButtonClick} className="button">
        Нажми на меня и узнаешь какая ты 
      </button>
      {showWords && (
        <div className="word-container">
          {wordAnimations.map((wordAnimation, index) => (
            <animated.div
              className="animated-word"
              key={wordList[index]}
              style={wordAnimation}
              onAnimationEnd={() => {
                // Удаляем слово из списка слов при попадании вниз
                if (wordList.includes(wordList[index])) {
                  setWordList(wordList.filter((w) => w !== wordList[index]));
                }
              }}>
              {wordList[index]}
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
