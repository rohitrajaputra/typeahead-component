import React from "react";
import { SuggestionListProps } from "./types";

const SuggestionList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
}: SuggestionListProps) => {
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index} style={{ color: "blue" }}>
              {part}
            </b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-item"
          >
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
