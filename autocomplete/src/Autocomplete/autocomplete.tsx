import { FC, Fragment, SetStateAction, useState } from "react";
import "./autocomplete.css";

const Autocomplete: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const ENTER = 13;
  const ESCAPE = 27;
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;

  const onChange = async (e: { currentTarget: { value: any } }) => {
    const userInput = e.currentTarget.value;

    if (userInput) {
      try {
        let response = await fetch(
          `http://localhost:8080/cities-list/${userInput}`
        );
        let suggestions = await response.json();
        setSuggestions(suggestions);
      } catch (e) {
        console.error(e);
      }
    }

    setSelectedIndex(0);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onClick = (e: {
    currentTarget: { innerText: SetStateAction<string> };
  }) => {
    setSelectedIndex(0);
    setSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: { keyCode: number; preventDefault: () => void }) => {
    if (e.keyCode === ENTER) {
      setSelectedIndex(0);
      setShowSuggestions(false);
      setUserInput(suggestions[selectedIndex]);
    } else if (e.keyCode === ESCAPE) {
      setSelectedIndex(0);
      setShowSuggestions(false);
    } else if (e.keyCode === UP_ARROW) {
      e.preventDefault();
      if (selectedIndex === 0) {
        return;
      }
      setSelectedIndex(selectedIndex - 1);
    } else if (e.keyCode === DOWN_ARROW) {
      if (selectedIndex + 1 === suggestions.length) {
        return;
      }
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const getSuggestion = (index: number, suggestion: string) => {
    let className;

    if (index === selectedIndex) {
      className = "suggestion-active";
    }

    return (
      <li className={className} key={index} onClick={onClick}>
        {suggestion}
      </li>
    );
  };

  const getSuggestionsList = () => {
    if (showSuggestions && userInput) {
      if (suggestions.length) {
        return (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => {
              return getSuggestion(index, suggestion);
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
  };

  return (
    <>
      <input
        autoFocus
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {getSuggestionsList()}
    </>
  );
};

export default Autocomplete;
