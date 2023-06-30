import "./App.css";
import { useState } from "react";

const text =
  "You don't need to implement data structures like I said. They are already there in all languages. You just need to know why, how, when about it. Every software engineer must have good DS knowledge to write good code. D.S is just one of the basic things you need to know. Youll discover more things in your journey soon.";
const synth = window.speechSynthesis;
const charIndexToWordMapping = (words) => {
  let index = 0;
  let indexToWord = {};

  words.forEach((element, idx) => {
    indexToWord[index] = idx;
    index += element.length + 1;
  });

  return indexToWord;
};

function App() {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [speaking, setSpeaking] = useState(false);
  const charIndexMapping = charIndexToWordMapping(text.split(" "));

  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";

    speech.onboundary = (event) => {
      const currentIndex = charIndexMapping[event.charIndex];
      setHighlightedIndex(currentIndex);
    };

    if (speaking) {
      synth.cancel();
    } else synth.speak(speech);
    
    setSpeaking(!speaking);
  };

  return (
    <div className="App">
      <p id="words-container">
        {text.split(" ").map((word, index) => (
          <span
            key={index}
            className={index === highlightedIndex ? "highlight" : ""}
          >
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="button-div">
        <button onClick={handleSpeak}>{speaking ? 'Cancel' : 'Speak'}</button>
      </div>
    </div>
  );
}

export default App;
