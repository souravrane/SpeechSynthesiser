import "./App.css";
import { useState } from "react";

const text =
  "If the heroes run and hide, who will stay and fight ? When I was a little boy I wanted to be a hero. Not some damn business man. But a superhero who could send rotten villains flying with one punch.";
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
    setSpeaking(true);
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = synth.getVoices().filter( voice => voice.lang === 'en-AU')[0];
    
    speech.onboundary = (event) => {
      const currentIndex = charIndexMapping[event.charIndex];
      setHighlightedIndex(currentIndex);
    };

    speech.onend = () => {
      setHighlightedIndex(-1);
      setSpeaking(false);
    };

    synth.speak(speech);
  };

  const handleCancel = () => {
    synth.cancel();
    setSpeaking(false);
    setHighlightedIndex(-1);
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
        {!speaking ? (
          <button onClick={handleSpeak}>Speak</button>
        ) : (
          <button onClick={handleCancel}>Cancel</button>
        )}
      </div>
      <p>
        <a href="https://github.com/souravrane/SpeechSynthesiser">
          source-code
        </a>
      </p>
    </div>
  );
}

export default App;
