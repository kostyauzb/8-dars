import React, { useState } from "react";
const jsonData = {
  items: [
    { name: "UKRAINA", description: "UKRAINA" },
    { name: "UZBEKISTAN", description: "O'zbekiston" },
    { name: "GERMANY", description: "Germaniya" },
    { name: "JAPAN", description: "Yaponiya" },
  ],
  name: "Mamlakatlar toping",
};

const App = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guesses, setGuesses] = useState(6);

  const selectWord = () => {
    const randomIndex = Math.floor(Math.random() * jsonData.items.length);
    setSelectedWord(jsonData.items[randomIndex].name);
  };

  const checkLetter = (letter) => {
    if (selectedWord.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setGuesses(guesses - 1);
    }
  };

  useState(() => {
    selectWord();
  }, []);

  const isGameWon = () => {
    return selectedWord
      .split("")
      .every((letter) => guessedLetters.includes(letter));
  };

  const isGameOver = () => {
    return guesses === 0 || isGameWon();
  };

  const generateLetterButtons = () => {
    return Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    ).map((letter, index) => (
      <button key={index} onClick={() => checkLetter(letter)}>
        {letter}
      </button>
    ));
  };

  const drawWord = () => {
    return selectedWord.split("").map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter : "_"}
      </span>
    ));
  };

  return (
    <div>
      <div className="container">
        <div className="navbar">
          <img src="./public/logo.svg" alt="" />
          <h1 className="nav_tit">{jsonData.name}</h1>
          <h2 className="raqam">{guesses}</h2>
        </div>

        <div className="yozuvlar">
          <div className="katek">{drawWord()}</div>
        </div>

        <div className="bnnlar">
          <div className="qator1">{generateLetterButtons()}</div>
        </div>

        {isGameOver() && (
          <div className="message">
            {isGameWon()
              ? "Tabriklayman! Siz yutdingiz!"
              : "Uzur, siz yutqazdingiz!"}
            <button onClick={() => window.location.reload()}>
              Qayta o'ynash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
